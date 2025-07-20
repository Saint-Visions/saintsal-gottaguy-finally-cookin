import { Request, Response } from "express";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PRICING_TIERS, ADDON_PRICING } from "./stripe-webhook";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Create checkout session for plan upgrade
export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { planTier, userId, successUrl, cancelUrl } = req.body;

    if (!planTier || !userId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const planConfig = PRICING_TIERS[planTier as keyof typeof PRICING_TIERS];
    if (!planConfig) {
      return res.status(400).json({ error: "Invalid plan tier" });
    }

    // Get user details
    const { data: user } = await supabase
      .from("users")
      .select("email, stripe_customer_id")
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let customerId = user.stripe_customer_id;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId,
          platform: "saintvision-ai",
        },
      });
      customerId = customer.id;

      // Update user with customer ID
      await supabase
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: planConfig.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:
        successUrl ||
        `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId,
        planTier,
      },
      subscription_data: {
        metadata: {
          userId,
          planTier,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer_update: {
        address: "auto",
        name: "auto",
      },
    });

    console.log(`💳 Checkout session created for ${planTier}: ${session.id}`);

    res.json({
      sessionId: session.id,
      url: session.url,
      planTier,
      amount: planConfig.price,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error: "Failed to create checkout session",
      message: "Please try again later",
    });
  }
}

// Create checkout session for add-on agents
export async function createAddonCheckoutSession(req: Request, res: Response) {
  try {
    const { addonType, userId, quantity = 1 } = req.body;

    const addonConfig = ADDON_PRICING[addonType as keyof typeof ADDON_PRICING];
    if (!addonConfig) {
      return res.status(400).json({ error: "Invalid addon type" });
    }

    // Get user details
    const { data: user } = await supabase
      .from("users")
      .select("email, stripe_customer_id, stripe_subscription_id")
      .eq("id", userId)
      .single();

    if (!user || !user.stripe_subscription_id) {
      return res.status(400).json({
        error: "User must have an active subscription to add agents",
      });
    }

    // Add subscription item to existing subscription
    const subscriptionItem = await stripe.subscriptionItems.create({
      subscription: user.stripe_subscription_id,
      price: addonConfig.stripePriceId,
      quantity,
    });

    console.log(`➕ Added ${quantity} ${addonType} to subscription`);

    res.json({
      success: true,
      subscriptionItem: subscriptionItem.id,
      addonType,
      quantity,
      monthlyIncrease: addonConfig.price * quantity,
    });
  } catch (error) {
    console.error("Error adding addon:", error);
    res.status(500).json({
      error: "Failed to add addon",
      message: "Please try again later",
    });
  }
}

// Get user subscription details
export async function getSubscriptionDetails(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select(
        "plan, subscription_status, current_period_start, current_period_end, stripe_subscription_id, max_agents, monthly_message_limit, plan_features",
      )
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let stripeSubscription = null;
    let upcomingInvoice = null;

    if (user.stripe_subscription_id) {
      try {
        stripeSubscription = await stripe.subscriptions.retrieve(
          user.stripe_subscription_id,
        );

        upcomingInvoice = await stripe.invoices.retrieveUpcoming({
          subscription: user.stripe_subscription_id,
        });
      } catch (error) {
        console.warn("Error fetching Stripe data:", error);
      }
    }

    // Get current agent usage
    const { data: agents } = await supabase
      .from("agents")
      .select("id, status")
      .eq("user_id", userId);

    const activeAgents = agents?.filter(a => a.status === "active").length || 0;

    // Get current month message usage
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: messageStats } = await supabase
      .from("agent_messages")
      .select("id")
      .gte("created_at", startOfMonth.toISOString())
      .eq("role", "user");

    const monthlyMessages = messageStats?.length || 0;

    const planConfig = PRICING_TIERS[user.plan as keyof typeof PRICING_TIERS];

    res.json({
      plan: {
        tier: user.plan,
        name: planConfig?.name || "Free Trial",
        price: planConfig?.price || 0,
        status: user.subscription_status || "inactive",
        features: user.plan_features || [],
      },
      usage: {
        agents: {
          current: activeAgents,
          limit: user.max_agents,
          remaining: Math.max(0, user.max_agents - activeAgents),
        },
        messages: {
          current: monthlyMessages,
          limit: user.monthly_message_limit,
          unlimited: user.monthly_message_limit === -1,
        },
      },
      billing: {
        currentPeriodStart: user.current_period_start,
        currentPeriodEnd: user.current_period_end,
        nextInvoiceAmount: upcomingInvoice?.amount_due,
        nextInvoiceDate: upcomingInvoice?.created,
      },
      canUpgrade: user.plan === "free" || user.plan === "pro",
      canAddAgents:
        activeAgents < user.max_agents || user.plan !== "white-label",
      availableUpgrades: getAvailableUpgrades(user.plan),
    });
  } catch (error) {
    console.error("Error getting subscription details:", error);
    res.status(500).json({ error: "Failed to get subscription details" });
  }
}

// Cancel subscription
export async function cancelSubscription(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { cancelAtPeriodEnd = true } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("stripe_subscription_id")
      .eq("id", userId)
      .single();

    if (!user?.stripe_subscription_id) {
      return res.status(400).json({ error: "No active subscription found" });
    }

    const updatedSubscription = await stripe.subscriptions.update(
      user.stripe_subscription_id,
      {
        cancel_at_period_end: cancelAtPeriodEnd,
      },
    );

    console.log(
      `📅 Subscription ${
        cancelAtPeriodEnd
          ? "scheduled for cancellation"
          : "cancellation removed"
      }`,
    );

    res.json({
      success: true,
      cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
      periodEnd: updatedSubscription.current_period_end,
      message: cancelAtPeriodEnd
        ? "Subscription will be canceled at the end of the current period"
        : "Subscription cancellation has been removed",
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
}

// Update payment method
export async function updatePaymentMethod(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    if (!user?.stripe_customer_id) {
      return res.status(400).json({ error: "No Stripe customer found" });
    }

    // Create a setup session for updating payment method
    const session = await stripe.checkout.sessions.create({
      customer: user.stripe_customer_id,
      payment_method_types: ["card"],
      mode: "setup",
      success_url: `${process.env.FRONTEND_URL}/settings?payment_updated=true`,
      cancel_url: `${process.env.FRONTEND_URL}/settings`,
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating payment method update session:", error);
    res.status(500).json({ error: "Failed to update payment method" });
  }
}

// Get available upgrades for current plan
function getAvailableUpgrades(currentPlan: string): any[] {
  const upgrades = [];
  const tierOrder = ["free", "pro", "enterprise", "white-label"];
  const currentIndex = tierOrder.indexOf(currentPlan);

  for (let i = currentIndex + 1; i < tierOrder.length; i++) {
    const tier = tierOrder[i];
    const config = PRICING_TIERS[tier as keyof typeof PRICING_TIERS];
    upgrades.push({
      tier,
      name: config.name,
      price: config.price,
      features: config.features,
      maxAgents: config.maxAgents,
    });
  }

  return upgrades;
}

// Check if user has access to a specific feature
export async function checkFeatureAccess(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { feature } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("plan, plan_features")
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hasAccess = user.plan_features?.includes(feature) || false;
    const planConfig = PRICING_TIERS[user.plan as keyof typeof PRICING_TIERS];

    res.json({
      hasAccess,
      feature,
      currentPlan: user.plan,
      requiredPlan: getRequiredPlanForFeature(feature),
      upgradeRequired: !hasAccess,
      upgradeUrl: hasAccess ? null : "/upgrade",
    });
  } catch (error) {
    console.error("Error checking feature access:", error);
    res.status(500).json({ error: "Failed to check feature access" });
  }
}

// Get required plan for a specific feature
function getRequiredPlanForFeature(feature: string): string | null {
  for (const [tier, config] of Object.entries(PRICING_TIERS)) {
    if (config.features.includes(feature)) {
      return tier;
    }
  }
  return null;
}

// Customer portal redirect
export async function createPortalSession(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    if (!user?.stripe_customer_id) {
      return res.status(400).json({ error: "No Stripe customer found" });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${process.env.FRONTEND_URL}/settings`,
    });

    res.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error("Error creating portal session:", error);
    res.status(500).json({ error: "Failed to create portal session" });
  }
}

// Route handlers
export default async function handler(req: Request, res: Response) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.url?.includes("/details")) {
        return getSubscriptionDetails(req, res);
      }
      if (req.url?.includes("/feature/")) {
        return checkFeatureAccess(req, res);
      }
      return res.status(404).json({ error: "Not found" });

    case "POST":
      if (req.url?.includes("/checkout")) {
        return createCheckoutSession(req, res);
      }
      if (req.url?.includes("/addon")) {
        return createAddonCheckoutSession(req, res);
      }
      if (req.url?.includes("/portal")) {
        return createPortalSession(req, res);
      }
      if (req.url?.includes("/cancel")) {
        return cancelSubscription(req, res);
      }
      if (req.url?.includes("/update-payment")) {
        return updatePaymentMethod(req, res);
      }
      return res.status(404).json({ error: "Not found" });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ error: "Method not allowed" });
  }
}

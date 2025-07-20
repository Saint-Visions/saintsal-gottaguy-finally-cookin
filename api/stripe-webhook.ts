import { Request, Response } from "express";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { buffer } from "micro";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// SaintSal™ Pricing Tiers Configuration
const PRICING_TIERS = {
  // Free tier (default)
  free: {
    name: "Free Trial",
    maxAgents: 1,
    monthlyMessages: 100,
    features: ["web_research", "scheduling"],
    models: ["gpt-4o"],
    price: 0,
  },
  // Pro tier ($97/mo)
  pro: {
    name: "Core Tools - Pro",
    maxAgents: 1,
    monthlyMessages: -1, // unlimited
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
    ],
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    price: 97,
    stripeProductId: process.env.STRIPE_PRO_PRODUCT_ID,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  // Enterprise tier ($297/mo)
  enterprise: {
    name: "Enterprise",
    maxAgents: 5,
    monthlyMessages: -1,
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
      "document_review",
      "compliance_tracker",
    ],
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    price: 297,
    stripeProductId: process.env.STRIPE_ENTERPRISE_PRODUCT_ID,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
  // White Label tier ($497/mo)
  "white-label": {
    name: "White Label",
    maxAgents: 10,
    monthlyMessages: -1,
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
      "document_review",
      "compliance_tracker",
      "white_label_branding",
      "custom_integrations",
    ],
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    price: 497,
    stripeProductId: process.env.STRIPE_WHITE_LABEL_PRODUCT_ID,
    stripePriceId: process.env.STRIPE_WHITE_LABEL_PRICE_ID,
  },
};

// Add-on pricing for additional agents
const ADDON_PRICING = {
  "extra-gpt-agent": {
    name: "Additional GPT-Only Agent",
    price: 25,
    features: ["web_research", "scheduling"],
    models: ["gpt-4o"],
    stripePriceId: process.env.STRIPE_ADDON_GPT_PRICE_ID,
  },
  "extra-pro-agent": {
    name: "Additional Pro Agent",
    price: 88,
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
    ],
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    stripePriceId: process.env.STRIPE_ADDON_PRO_PRICE_ID,
  },
};

// Main webhook handler
export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("Missing Stripe signature or webhook secret");
    return res.status(400).json({ error: "Missing signature" });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    const body = await buffer(req);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res
      .status(400)
      .json({ error: "Webhook signature verification failed" });
  }

  console.log(`🎫 Processing Stripe webhook: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

// Handle successful checkout completion
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log(`💳 Checkout completed for session: ${session.id}`);

  try {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Get customer details
    const customer = await stripe.customers.retrieve(customerId);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Extract user info from metadata
    const userEmail = session.customer_details?.email;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("No userId found in checkout session metadata");
      return;
    }

    // Determine plan tier from subscription
    const planTier = determinePlanTier(subscription);

    // Update user subscription in database
    await updateUserSubscription(userId, {
      customerId,
      subscriptionId,
      planTier,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });

    // Provision any included agents for the new plan
    await provisionIncludedAgents(userId, planTier);

    console.log(`✅ User ${userId} upgraded to ${planTier} plan`);

    // Send welcome email or notification
    await sendPlanUpgradeNotification(userId, planTier);
  } catch (error) {
    console.error("Error handling checkout completion:", error);
    throw error;
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`🔄 Subscription created: ${subscription.id}`);

  const customerId = subscription.customer as string;
  const planTier = determinePlanTier(subscription);

  // Find user by customer ID
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    await updateUserPlan(user.id, planTier, subscription);
  }
}

// Handle subscription updates (upgrades/downgrades)
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`📝 Subscription updated: ${subscription.id}`);

  const customerId = subscription.customer as string;
  const planTier = determinePlanTier(subscription);

  // Find user by customer ID
  const { data: user } = await supabase
    .from("users")
    .select("id, plan")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    const previousPlan = user.plan;
    await updateUserPlan(user.id, planTier, subscription);

    // Handle plan changes
    if (previousPlan !== planTier) {
      await handlePlanChange(user.id, previousPlan, planTier);
    }
  }
}

// Handle subscription cancellation
async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log(`❌ Subscription canceled: ${subscription.id}`);

  const customerId = subscription.customer as string;

  // Find user by customer ID
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    // Downgrade to free plan at period end
    await updateUserPlan(user.id, "free", null);

    // Disable premium features but keep agents until period end
    await scheduleFeatureDowngrade(user.id, subscription.current_period_end);
  }
}

// Handle successful payment
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`💰 Payment succeeded for invoice: ${invoice.id}`);

  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  // Update payment status and extend service
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    // Log successful payment
    await supabase.from("payment_logs").insert({
      user_id: user.id,
      stripe_invoice_id: invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "succeeded",
      created_at: new Date().toISOString(),
    });

    // Ensure all premium features are active
    await activatePremiumFeatures(user.id);
  }
}

// Handle failed payment
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`⚠️ Payment failed for invoice: ${invoice.id}`);

  const customerId = invoice.customer as string;

  const { data: user } = await supabase
    .from("users")
    .select("id, email")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    // Log failed payment
    await supabase.from("payment_logs").insert({
      user_id: user.id,
      stripe_invoice_id: invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "failed",
      created_at: new Date().toISOString(),
    });

    // Send payment failure notification
    await sendPaymentFailedNotification(user.id, user.email);

    // Start grace period (e.g., 7 days) before downgrading
    await startGracePeriod(user.id);
  }
}

// Determine plan tier from Stripe subscription
function determinePlanTier(subscription: Stripe.Subscription): string {
  const priceId = subscription.items.data[0]?.price.id;

  // Map actual Stripe price IDs to plan tiers
  const PRICE_TO_PLAN_MAP: Record<string, string> = {
    price_1RLChzFZsXxBWnj0VcveVdDf: "free",
    price_1RINIMFZsXxBWnjQEYxlyUIy: "unlimited",
    price_1IRNqvFZsXxBWnj0RlB9d1cP: "pro",
    price_1IRg90FZsXxBWnj0H3PHnVc6: "white-label",
    price_1Rh5yFZsXxBWnj0w6p9KY0j: "custom",
  };

  const tier = PRICE_TO_PLAN_MAP[priceId];
  if (tier) {
    console.log(`✅ Mapped price ID ${priceId} to plan tier: ${tier}`);
    return tier;
  }

  // Fallback: try the original logic with environment variables
  for (const [tierName, config] of Object.entries(PRICING_TIERS)) {
    if (config.stripePriceId === priceId) {
      console.log(`✅ Fallback mapping ${priceId} to tier: ${tierName}`);
      return tierName;
    }
  }

  console.error(`⚠️ Unknown price ID: ${priceId}, defaulting to free`);
  return "free";
}

// Update user subscription in database
async function updateUserSubscription(userId: string, subscriptionData: any) {
  await supabase
    .from("users")
    .update({
      stripe_customer_id: subscriptionData.customerId,
      stripe_subscription_id: subscriptionData.subscriptionId,
      plan: subscriptionData.planTier,
      subscription_status: subscriptionData.status,
      current_period_start: subscriptionData.currentPeriodStart,
      current_period_end: subscriptionData.currentPeriodEnd,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

// Update user plan
async function updateUserPlan(
  userId: string,
  planTier: string,
  subscription: Stripe.Subscription | null,
) {
  const planConfig = PRICING_TIERS[planTier as keyof typeof PRICING_TIERS];

  await supabase
    .from("users")
    .update({
      plan: planTier,
      plan_features: planConfig.features,
      max_agents: planConfig.maxAgents,
      monthly_message_limit: planConfig.monthlyMessages,
      subscription_status: subscription?.status || "inactive",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

// Handle plan changes (upgrade/downgrade)
async function handlePlanChange(
  userId: string,
  previousPlan: string,
  newPlan: string,
) {
  const previousConfig =
    PRICING_TIERS[previousPlan as keyof typeof PRICING_TIERS];
  const newConfig = PRICING_TIERS[newPlan as keyof typeof PRICING_TIERS];

  // If downgrading, check if user has too many agents
  if (newConfig.maxAgents < previousConfig.maxAgents) {
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active");

    const agentCount = agents?.length || 0;

    if (agentCount > newConfig.maxAgents) {
      // Pause excess agents (keep most recent ones active)
      const excessCount = agentCount - newConfig.maxAgents;
      const { data: oldestAgents } = await supabase
        .from("agents")
        .select("id")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: true })
        .limit(excessCount);

      if (oldestAgents) {
        const agentIds = oldestAgents.map(agent => agent.id);
        await supabase
          .from("agents")
          .update({ status: "paused" })
          .in("id", agentIds);
      }
    }
  }

  // Log plan change
  await supabase.from("plan_changes").insert({
    user_id: userId,
    previous_plan: previousPlan,
    new_plan: newPlan,
    change_type:
      newConfig.price > previousConfig.price ? "upgrade" : "downgrade",
    created_at: new Date().toISOString(),
  });
}

// Provision included agents for new plans
async function provisionIncludedAgents(userId: string, planTier: string) {
  // For now, just ensure user can create agents up to their limit
  // In the future, could auto-create default agents
  console.log(`User ${userId} can now create agents for ${planTier} plan`);
}

// Notification functions
async function sendPlanUpgradeNotification(userId: string, planTier: string) {
  // Send Slack notification or email
  if (process.env.SLACK_BILLING_WEBHOOK_URL) {
    await fetch(process.env.SLACK_BILLING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🎉 New SaintSal��� ${planTier} subscription!`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New Subscription*\n*User:* ${userId}\n*Plan:* ${
                PRICING_TIERS[planTier as keyof typeof PRICING_TIERS].name
              }\n*Amount:* $${
                PRICING_TIERS[planTier as keyof typeof PRICING_TIERS].price
              }/month`,
            },
          },
        ],
      }),
    });
  }
}

async function sendPaymentFailedNotification(userId: string, email: string) {
  // Send notification to user and internal team
  console.log(`Payment failed for user ${userId} (${email})`);
}

async function startGracePeriod(userId: string) {
  // Set grace period end date (7 days from now)
  const gracePeriodEnd = new Date();
  gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 7);

  await supabase
    .from("users")
    .update({
      grace_period_end: gracePeriodEnd.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

async function scheduleFeatureDowngrade(userId: string, periodEnd: number) {
  // Schedule feature downgrade for period end
  const downgradeDate = new Date(periodEnd * 1000);

  await supabase.from("scheduled_actions").insert({
    user_id: userId,
    action_type: "downgrade_to_free",
    scheduled_for: downgradeDate.toISOString(),
    metadata: { reason: "subscription_canceled" },
    created_at: new Date().toISOString(),
  });
}

async function activatePremiumFeatures(userId: string) {
  // Ensure all premium features are active for the user
  await supabase
    .from("users")
    .update({
      grace_period_end: null,
      features_active: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

// Export configuration for use in other parts of the app
export { PRICING_TIERS, ADDON_PRICING };

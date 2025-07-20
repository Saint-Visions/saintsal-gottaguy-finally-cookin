import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

interface ProvisioningData {
  clientEmail: string;
  clientName: string;
  planType: "starter" | "pro" | "enterprise" | "white_label";
  customDomain?: string;
  stripeCustomerId: string;
  subscriptionId?: string;
  paymentIntentId?: string;
}

// Stripe webhook handler for payment verification and auto-provisioning
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log(`❌ Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`✅ Stripe webhook received: ${event.type}`);

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
      break;

    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleSubscriptionChange(event.data.object as Stripe.Subscription);
      break;

    case "customer.subscription.deleted":
      await handleSubscriptionCancellation(
        event.data.object as Stripe.Subscription,
      );
      break;

    case "invoice.payment_succeeded":
      await handleInvoicePayment(event.data.object as Stripe.Invoice);
      break;

    case "invoice.payment_failed":
      await handlePaymentFailure(event.data.object as Stripe.Invoice);
      break;

    default:
      console.log(`🔍 Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}

// Handle successful payment - provision client account
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("💰 Payment succeeded:", paymentIntent.id);

    // Get customer info
    const customer = (await stripe.customers.retrieve(
      paymentIntent.customer as string,
    )) as Stripe.Customer;

    // Extract plan type from metadata
    const planType = paymentIntent.metadata.planType || "starter";
    const clientName = paymentIntent.metadata.clientName || customer.name;
    const customDomain = paymentIntent.metadata.customDomain;

    if (!customer.email) {
      console.error("❌ No email found for customer");
      return;
    }

    // Provision the client account
    const provisioningData: ProvisioningData = {
      clientEmail: customer.email,
      clientName: clientName || "New Client",
      planType: planType as any,
      customDomain,
      stripeCustomerId: customer.id,
      paymentIntentId: paymentIntent.id,
    };

    await provisionClientAccount(provisioningData);
  } catch (error) {
    console.error("❌ Error handling payment success:", error);
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    console.log("🔄 Subscription changed:", subscription.id);

    const customer = (await stripe.customers.retrieve(
      subscription.customer as string,
    )) as Stripe.Customer;

    // Determine plan type from price ID
    const planType = getPlanTypeFromPrice(subscription.items.data[0].price.id);

    if (subscription.status === "active" && customer.email) {
      const provisioningData: ProvisioningData = {
        clientEmail: customer.email,
        clientName: customer.name || "New Client",
        planType,
        stripeCustomerId: customer.id,
        subscriptionId: subscription.id,
      };

      await provisionClientAccount(provisioningData);
    } else if (subscription.status === "canceled") {
      await suspendClientAccount(customer.id, "Subscription canceled");
    }
  } catch (error) {
    console.error("❌ Error handling subscription change:", error);
  }
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(
  subscription: Stripe.Subscription,
) {
  try {
    console.log("❌ Subscription canceled:", subscription.id);
    await suspendClientAccount(
      subscription.customer as string,
      "Subscription canceled",
    );
  } catch (error) {
    console.error("❌ Error handling subscription cancellation:", error);
  }
}

// Handle invoice payment
async function handleInvoicePayment(invoice: Stripe.Invoice) {
  try {
    console.log("💳 Invoice paid:", invoice.id);

    // Reactivate account if it was suspended for non-payment
    if (invoice.customer) {
      await reactivateClientAccount(invoice.customer as string);
    }
  } catch (error) {
    console.error("❌ Error handling invoice payment:", error);
  }
}

// Handle payment failure
async function handlePaymentFailure(invoice: Stripe.Invoice) {
  try {
    console.log("⚠️ Payment failed:", invoice.id);

    // Suspend account after failed payment
    if (invoice.customer) {
      await suspendClientAccount(invoice.customer as string, "Payment failed");
    }
  } catch (error) {
    console.error("❌ Error handling payment failure:", error);
  }
}

// Provision client account with GHL integration
async function provisionClientAccount(data: ProvisioningData) {
  try {
    console.log("🚀 Provisioning client account:", data.clientEmail);

    // Call the provisioning API
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/client-provisioning`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Client account provisioned:", result.client.id);

      // Send notification to admin
      await sendAdminNotification("new_client", {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        planType: data.planType,
        clientId: result.client.id,
      });

      // Log successful provisioning
      await logProvisioningEvent({
        type: "account_created",
        clientEmail: data.clientEmail,
        planType: data.planType,
        stripeCustomerId: data.stripeCustomerId,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("❌ Failed to provision account:", await response.text());
    }
  } catch (error) {
    console.error("❌ Provisioning error:", error);
  }
}

// Suspend client account
async function suspendClientAccount(stripeCustomerId: string, reason: string) {
  try {
    console.log("⏸️ Suspending client account:", stripeCustomerId);

    // Find client by Stripe customer ID
    const client = await getClientByStripeId(stripeCustomerId);
    if (!client) {
      console.error("❌ Client not found for Stripe ID:", stripeCustomerId);
      return;
    }

    // Call suspension API
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/client-provisioning/${client.id}/suspend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
        },
        body: JSON.stringify({ reason }),
      },
    );

    if (response.ok) {
      console.log("✅ Client account suspended:", client.id);

      // Send suspension notification
      await sendClientNotification(client.email, "account_suspended", {
        reason,
      });
    }
  } catch (error) {
    console.error("❌ Suspension error:", error);
  }
}

// Reactivate client account
async function reactivateClientAccount(stripeCustomerId: string) {
  try {
    console.log("🔄 Reactivating client account:", stripeCustomerId);

    const client = await getClientByStripeId(stripeCustomerId);
    if (!client) return;

    // Update client status to active
    await updateClientStatus(client.id, "active");

    console.log("✅ Client account reactivated:", client.id);
  } catch (error) {
    console.error("❌ Reactivation error:", error);
  }
}

// Helper functions
function getPlanTypeFromPrice(
  priceId: string,
): "starter" | "pro" | "enterprise" | "white_label" {
  const priceMapping: Record<string, any> = {
    [process.env.STRIPE_STARTER_PRICE_ID!]: "starter",
    [process.env.STRIPE_PRO_PRICE_ID!]: "pro",
    [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: "enterprise",
    [process.env.STRIPE_WHITE_LABEL_PRICE_ID!]: "white_label",
  };

  return priceMapping[priceId] || "starter";
}

// Database helper functions
async function getClientByStripeId(stripeCustomerId: string): Promise<any> {
  // TODO: Implement database lookup
  console.log("🔍 Looking up client by Stripe ID:", stripeCustomerId);
  return null;
}

async function updateClientStatus(
  clientId: string,
  status: string,
): Promise<void> {
  // TODO: Implement database update
  console.log("🔄 Updating client status:", clientId, status);
}

async function logProvisioningEvent(event: any): Promise<void> {
  // TODO: Implement event logging
  console.log("📝 Logging provisioning event:", event);
}

// Notification functions
async function sendAdminNotification(type: string, data: any): Promise<void> {
  console.log("📧 Sending admin notification:", type, data);
  // TODO: Implement admin notifications (email/Slack)
}

async function sendClientNotification(
  email: string,
  type: string,
  data: any,
): Promise<void> {
  console.log("📧 Sending client notification:", email, type);
  // TODO: Implement client notifications
}

// Client onboarding webhook for GHL
export async function handleGHLWebhook(req: Request, res: Response) {
  try {
    const { event_type, location_id, contact } = req.body;

    console.log(
      `🎯 GHL Webhook received: ${event_type} for location ${location_id}`,
    );

    switch (event_type) {
      case "contact.created":
        await handleNewContact(location_id, contact);
        break;

      case "opportunity.created":
        await handleNewOpportunity(location_id, req.body.opportunity);
        break;

      case "appointment.booked":
        await handleAppointmentBooked(location_id, req.body.appointment);
        break;

      default:
        console.log(`🔍 Unhandled GHL event: ${event_type}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("❌ GHL webhook error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GHL event handlers
async function handleNewContact(locationId: string, contact: any) {
  console.log("👤 New contact in GHL:", contact.email, "Location:", locationId);

  // Update client usage metrics
  await incrementClientUsage(locationId, "contacts", 1);

  // Check if usage limits exceeded
  await checkAndEnforceUsageLimits(locationId);
}

async function handleNewOpportunity(locationId: string, opportunity: any) {
  console.log(
    "💼 New opportunity in GHL:",
    opportunity.name,
    "Location:",
    locationId,
  );

  // Sync with our system
  await syncOpportunityToClient(locationId, opportunity);
}

async function handleAppointmentBooked(locationId: string, appointment: any) {
  console.log(
    "📅 Appointment booked in GHL:",
    appointment.title,
    "Location:",
    locationId,
  );

  // Update metrics and trigger automations
  await incrementClientUsage(locationId, "appointments", 1);
}

async function incrementClientUsage(
  locationId: string,
  metric: string,
  amount: number,
) {
  // TODO: Implement usage tracking
  console.log(
    `📊 Incrementing ${metric} by ${amount} for location ${locationId}`,
  );
}

async function checkAndEnforceUsageLimits(locationId: string) {
  // TODO: Implement limit enforcement
  console.log(`🚫 Checking usage limits for location ${locationId}`);
}

async function syncOpportunityToClient(locationId: string, opportunity: any) {
  // TODO: Implement opportunity sync
  console.log(`🔄 Syncing opportunity to client for location ${locationId}`);
}

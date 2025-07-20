import { Request, Response } from "express";

interface ClientProvisioningRequest {
  clientEmail: string;
  clientName: string;
  planType: "starter" | "pro" | "enterprise" | "white_label";
  customDomain?: string;
  paymentIntentId?: string;
  stripeCustomerId?: string;
}

interface GHLSubAccount {
  id: string;
  name: string;
  domain: string;
  apiKey: string;
  status: "active" | "suspended" | "pending";
  limits: {
    contacts: number;
    users: number;
    funnels: number;
    campaigns: number;
  };
}

// Plan limits configuration
const PLAN_LIMITS = {
  starter: {
    contacts: 1000,
    users: 2,
    funnels: 5,
    campaigns: 10,
    ghlSubAccounts: 1,
    customDomain: false,
  },
  pro: {
    contacts: 10000,
    users: 5,
    funnels: 25,
    campaigns: 50,
    ghlSubAccounts: 3,
    customDomain: true,
  },
  enterprise: {
    contacts: 100000,
    users: 25,
    funnels: 100,
    campaigns: 200,
    ghlSubAccounts: 10,
    customDomain: true,
  },
  white_label: {
    contacts: -1, // unlimited
    users: -1,
    funnels: -1,
    campaigns: -1,
    ghlSubAccounts: -1,
    customDomain: true,
  },
};

// Create GHL Sub-Account
export async function createGHLSubAccount(req: Request, res: Response) {
  try {
    const {
      clientEmail,
      clientName,
      planType,
      customDomain,
    }: ClientProvisioningRequest = req.body;

    // Verify payment first
    const paymentVerified = await verifyClientPayment(req.body);
    if (!paymentVerified) {
      return res.status(402).json({
        error: "Payment verification failed",
        message: "Please complete payment before account provisioning",
      });
    }

    // Get plan limits
    const limits = PLAN_LIMITS[planType];
    if (!limits) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    // Create GHL sub-account
    const ghlResponse = await fetch(
      "https://services.leadconnectorhq.com/locations/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          name: clientName,
          address: "123 Business St",
          city: "Business City",
          state: "CA",
          country: "US",
          postalCode: "90210",
          website:
            customDomain ||
            `${clientName.toLowerCase().replace(/\s+/g, "")}.saintvision.ai`,
          timezone: "America/Los_Angeles",
          email: clientEmail,
          phone: "+1234567890",
          settings: {
            allowDuplicateContact: false,
            allowDuplicateOpportunity: false,
            allowFacebookNameMerge: true,
            disableContactTimezone: false,
          },
        }),
      },
    );

    if (!ghlResponse.ok) {
      const error = await ghlResponse.text();
      console.error("GHL Sub-account creation failed:", error);
      return res.status(500).json({
        error: "Failed to create GHL sub-account",
        details: error,
      });
    }

    const ghlData = await ghlResponse.json();
    console.log("✅ GHL Sub-account created:", ghlData);

    // Generate API key for the sub-account
    const apiKeyResponse = await fetch(
      `https://services.leadconnectorhq.com/locations/${ghlData.location.id}/apiKeys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          name: `${clientName} API Key`,
          scopes: [
            "contacts.readonly",
            "contacts.write",
            "opportunities.readonly",
            "opportunities.write",
            "calendars.readonly",
            "calendars.write",
            "campaigns.readonly",
            "workflows.readonly",
          ],
        }),
      },
    );

    let apiKey = null;
    if (apiKeyResponse.ok) {
      const apiKeyData = await apiKeyResponse.json();
      apiKey = apiKeyData.key;
      console.log("✅ API Key generated for client");
    }

    // Store client data in our database
    const clientData = {
      id: generateClientId(),
      email: clientEmail,
      name: clientName,
      planType,
      customDomain,
      ghlLocationId: ghlData.location.id,
      ghlApiKey: apiKey,
      subdomain:
        customDomain ||
        `${clientName.toLowerCase().replace(/\s+/g, "")}.saintvision.ai`,
      status: "active",
      limits: limits,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      usage: {
        contacts: 0,
        users: 1,
        funnels: 0,
        campaigns: 0,
      },
    };

    // Save to database (you'll need to implement your preferred DB)
    await saveClientToDatabase(clientData);

    // Create subdomain DNS record
    if (customDomain) {
      await createSubdomainRecord(customDomain, clientData.id);
    }

    // Send welcome email with access details
    await sendWelcomeEmail(clientData);

    res.status(201).json({
      success: true,
      message: "Client account provisioned successfully",
      client: {
        id: clientData.id,
        name: clientData.name,
        email: clientData.email,
        subdomain: clientData.subdomain,
        planType: clientData.planType,
        ghlLocationId: clientData.ghlLocationId,
        limits: clientData.limits,
        accessUrl: `https://${clientData.subdomain}`,
      },
    });
  } catch (error) {
    console.error("❌ Client provisioning error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to provision client account",
    });
  }
}

// Verify payment before provisioning
async function verifyClientPayment(
  data: ClientProvisioningRequest,
): Promise<boolean> {
  try {
    if (!data.paymentIntentId && !data.stripeCustomerId) {
      return false;
    }

    // Check Stripe payment status
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    if (data.paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        data.paymentIntentId,
      );
      return paymentIntent.status === "succeeded";
    }

    if (data.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(data.stripeCustomerId);
      const subscriptions = await stripe.subscriptions.list({
        customer: data.stripeCustomerId,
        status: "active",
      });
      return subscriptions.data.length > 0;
    }

    return false;
  } catch (error) {
    console.error("Payment verification error:", error);
    return false;
  }
}

// Check client access and limits
export async function verifyClientAccess(req: Request, res: Response) {
  try {
    const { subdomain, clientId } = req.params;

    // Get client data
    const client = await getClientFromDatabase(clientId || subdomain);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    if (client.status !== "active") {
      return res.status(403).json({
        error: "Account suspended",
        message: "Please contact support to reactivate your account",
      });
    }

    // Check usage limits
    const limitExceeded = checkUsageLimits(client);
    if (limitExceeded) {
      return res.status(429).json({
        error: "Usage limit exceeded",
        message: limitExceeded,
        upgradeUrl: `/upgrade?client=${client.id}`,
      });
    }

    // Update last login
    await updateClientLastLogin(client.id);

    res.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        planType: client.planType,
        limits: client.limits,
        usage: client.usage,
        ghlIntegrated: !!client.ghlLocationId,
        accessLevel: "full",
      },
    });
  } catch (error) {
    console.error("❌ Access verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Suspend client access
export async function suspendClientAccess(req: Request, res: Response) {
  try {
    const { clientId } = req.params;
    const { reason } = req.body;

    await updateClientStatus(clientId, "suspended", reason);

    res.json({
      success: true,
      message: "Client access suspended",
    });
  } catch (error) {
    console.error("❌ Suspension error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Helper functions
function generateClientId(): string {
  return (
    "client_" +
    Math.random()
      .toString(36)
      .substr(2, 16)
  );
}

function checkUsageLimits(client: any): string | null {
  const { limits, usage } = client;

  if (limits.contacts !== -1 && usage.contacts >= limits.contacts) {
    return `Contact limit exceeded (${usage.contacts}/${limits.contacts})`;
  }

  if (limits.users !== -1 && usage.users >= limits.users) {
    return `User limit exceeded (${usage.users}/${limits.users})`;
  }

  if (limits.funnels !== -1 && usage.funnels >= limits.funnels) {
    return `Funnel limit exceeded (${usage.funnels}/${limits.funnels})`;
  }

  if (limits.campaigns !== -1 && usage.campaigns >= limits.campaigns) {
    return `Campaign limit exceeded (${usage.campaigns}/${limits.campaigns})`;
  }

  return null;
}

// Database functions (implement with your preferred DB)
async function saveClientToDatabase(clientData: any): Promise<void> {
  // TODO: Implement with Supabase/PostgreSQL
  console.log("💾 Saving client to database:", clientData.id);
}

async function getClientFromDatabase(identifier: string): Promise<any> {
  // TODO: Implement database lookup
  console.log("🔍 Getting client from database:", identifier);
  return null;
}

async function updateClientLastLogin(clientId: string): Promise<void> {
  // TODO: Implement database update
  console.log("📅 Updating last login for:", clientId);
}

async function updateClientStatus(
  clientId: string,
  status: string,
  reason?: string,
): Promise<void> {
  // TODO: Implement database update
  console.log("🔄 Updating client status:", clientId, status, reason);
}

async function createSubdomainRecord(
  domain: string,
  clientId: string,
): Promise<void> {
  // TODO: Implement DNS management (Cloudflare API)
  console.log("🌐 Creating subdomain record:", domain, clientId);
}

async function sendWelcomeEmail(clientData: any): Promise<void> {
  // TODO: Implement email sending
  console.log("📧 Sending welcome email to:", clientData.email);
}

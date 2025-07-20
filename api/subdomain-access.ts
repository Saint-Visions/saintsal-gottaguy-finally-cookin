import { Request, Response } from "express";

interface SubdomainRequest {
  clientId: string;
  subdomain: string;
  customDomain?: string;
  clientPlan: string;
}

interface AccessControlRule {
  planType: string;
  allowedFeatures: string[];
  rateLimit: {
    requests: number;
    windowMs: number;
  };
  restrictions: string[];
}

// Plan-based access control
const ACCESS_RULES: Record<string, AccessControlRule> = {
  starter: {
    planType: "starter",
    allowedFeatures: [
      "basic_crm",
      "lead_capture",
      "email_sequences",
      "basic_reports",
    ],
    rateLimit: {
      requests: 100,
      windowMs: 60000, // 1 minute
    },
    restrictions: ["no_white_label", "limited_integrations", "basic_support"],
  },
  pro: {
    planType: "pro",
    allowedFeatures: [
      "full_crm",
      "advanced_automation",
      "ai_assistance",
      "custom_reports",
      "api_access",
      "ghl_integration",
    ],
    rateLimit: {
      requests: 500,
      windowMs: 60000,
    },
    restrictions: ["limited_white_label"],
  },
  enterprise: {
    planType: "enterprise",
    allowedFeatures: [
      "full_crm",
      "advanced_automation",
      "ai_assistance",
      "custom_reports",
      "api_access",
      "ghl_integration",
      "multi_workspace",
      "priority_support",
      "custom_integrations",
    ],
    rateLimit: {
      requests: 2000,
      windowMs: 60000,
    },
    restrictions: [],
  },
  white_label: {
    planType: "white_label",
    allowedFeatures: [
      "full_platform",
      "white_label_branding",
      "reseller_portal",
      "unlimited_workspaces",
      "dedicated_support",
      "custom_development",
    ],
    rateLimit: {
      requests: 10000,
      windowMs: 60000,
    },
    restrictions: [],
  },
};

// Create subdomain and configure DNS
export async function createSubdomain(req: Request, res: Response) {
  try {
    const {
      clientId,
      subdomain,
      customDomain,
      clientPlan,
    }: SubdomainRequest = req.body;

    // Validate subdomain format
    if (!isValidSubdomain(subdomain)) {
      return res.status(400).json({
        error: "Invalid subdomain format",
        message:
          "Subdomain must be 3-63 characters, alphanumeric and hyphens only",
      });
    }

    // Check subdomain availability
    const isAvailable = await checkSubdomainAvailability(subdomain);
    if (!isAvailable) {
      return res.status(409).json({
        error: "Subdomain unavailable",
        message: "This subdomain is already taken",
      });
    }

    // Create DNS record
    let dnsRecord;
    if (customDomain) {
      dnsRecord = await createCustomDomainRecord(customDomain, clientId);
    } else {
      dnsRecord = await createSaintVisionSubdomain(subdomain, clientId);
    }

    if (!dnsRecord.success) {
      return res.status(500).json({
        error: "DNS configuration failed",
        message: dnsRecord.error,
      });
    }

    // Generate SSL certificate
    await generateSSLCertificate(customDomain || `${subdomain}.saintvision.ai`);

    // Create access configuration
    const accessConfig = {
      clientId,
      subdomain: customDomain || `${subdomain}.saintvision.ai`,
      planType: clientPlan,
      rules: ACCESS_RULES[clientPlan],
      createdAt: new Date().toISOString(),
      status: "active",
    };

    // Save configuration
    await saveSubdomainConfig(accessConfig);

    // Set up load balancer routing
    await configureLoadBalancerRouting(accessConfig);

    res.status(201).json({
      success: true,
      subdomain: accessConfig.subdomain,
      accessUrl: `https://${accessConfig.subdomain}`,
      config: {
        planType: accessConfig.planType,
        features: accessConfig.rules.allowedFeatures,
        rateLimit: accessConfig.rules.rateLimit,
      },
    });
  } catch (error) {
    console.error("❌ Subdomain creation error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create subdomain",
    });
  }
}

// Verify client access for requests
export async function verifySubdomainAccess(req: Request, res: Response) {
  try {
    const subdomain = req.get("host")?.split(".")[0];
    const clientId = req.headers["x-client-id"] as string;
    const requestedFeature = req.headers["x-feature"] as string;

    if (!subdomain && !clientId) {
      return res.status(400).json({
        error: "Missing identification",
        message: "Subdomain or client ID required",
      });
    }

    // Get client configuration
    const config = await getSubdomainConfig(subdomain || clientId);
    if (!config) {
      return res.status(404).json({
        error: "Client not found",
        message: "No configuration found for this subdomain",
      });
    }

    // Check if client is active
    if (config.status !== "active") {
      return res.status(403).json({
        error: "Account suspended",
        message: "Contact support to reactivate your account",
        supportUrl: "https://saintvision.ai/support",
      });
    }

    // Verify payment status
    const paymentStatus = await verifyClientPaymentStatus(config.clientId);
    if (!paymentStatus.valid) {
      return res.status(402).json({
        error: "Payment required",
        message: "Please update your payment method",
        billingUrl: `https://${config.subdomain}/billing`,
      });
    }

    // Check feature access
    if (
      requestedFeature &&
      !config.rules.allowedFeatures.includes(requestedFeature)
    ) {
      return res.status(403).json({
        error: "Feature not available",
        message: `${requestedFeature} requires ${getRequiredPlan(
          requestedFeature,
        )} plan or higher`,
        upgradeUrl: `https://${config.subdomain}/upgrade`,
      });
    }

    // Check rate limits
    const rateLimitStatus = await checkRateLimit(
      config.clientId,
      config.rules.rateLimit,
    );
    if (rateLimitStatus.exceeded) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests. Try again later.",
        retryAfter: rateLimitStatus.retryAfter,
      });
    }

    // Log access
    await logClientAccess(config.clientId, {
      subdomain: config.subdomain,
      feature: requestedFeature,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      timestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      client: {
        id: config.clientId,
        planType: config.planType,
        subdomain: config.subdomain,
        features: config.rules.allowedFeatures,
        rateLimit: {
          remaining: rateLimitStatus.remaining,
          resetTime: rateLimitStatus.resetTime,
        },
      },
    });
  } catch (error) {
    console.error("❌ Access verification error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to verify access",
    });
  }
}

// Middleware for subdomain-based routing
export function subdomainMiddleware(req: Request, res: Response, next: any) {
  const host = req.get("host");
  if (!host) {
    return next();
  }

  const subdomain = host.split(".")[0];

  // Skip for main domain and admin
  if (subdomain === "www" || subdomain === "admin" || subdomain === "api") {
    return next();
  }

  // Check if it's a client subdomain
  if (host.includes(".saintvision.ai") || isCustomDomain(host)) {
    req.headers["x-client-subdomain"] = subdomain;
    req.headers["x-client-host"] = host;

    // Verify access before proceeding
    verifySubdomainAccessMiddleware(req, res, next);
  } else {
    next();
  }
}

// Access verification middleware
async function verifySubdomainAccessMiddleware(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const subdomain = req.headers["x-client-subdomain"] as string;
    const config = await getSubdomainConfig(subdomain);

    if (!config || config.status !== "active") {
      return res.status(403).json({
        error: "Access denied",
        message: "Invalid or suspended account",
      });
    }

    // Attach client info to request
    req.clientConfig = config;
    next();
  } catch (error) {
    console.error("❌ Middleware access verification error:", error);
    res.status(500).json({ error: "Access verification failed" });
  }
}

// Helper functions
function isValidSubdomain(subdomain: string): boolean {
  const pattern = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/;
  return (
    pattern.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63
  );
}

async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
  try {
    // Check database for existing subdomain
    const existing = await getSubdomainConfig(subdomain);
    return !existing;
  } catch (error) {
    console.error("Error checking subdomain availability:", error);
    return false;
  }
}

async function createSaintVisionSubdomain(
  subdomain: string,
  clientId: string,
): Promise<any> {
  try {
    // Cloudflare DNS API call
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "CNAME",
          name: subdomain,
          content: "saintvision.ai",
          ttl: 3600,
          proxied: true,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ DNS record created for ${subdomain}.saintvision.ai`);
      return { success: true, recordId: data.result.id };
    } else {
      const error = await response.text();
      console.error("�� DNS record creation failed:", error);
      return { success: false, error };
    }
  } catch (error) {
    console.error("❌ DNS creation error:", error);
    return { success: false, error: error.message };
  }
}

async function createCustomDomainRecord(
  domain: string,
  clientId: string,
): Promise<any> {
  // For custom domains, return instructions for client to configure
  return {
    success: true,
    instructions: {
      type: "CNAME",
      name: "@" || "www",
      value: "saintvision.ai",
      note: "Point your domain to saintvision.ai using a CNAME record",
    },
  };
}

async function generateSSLCertificate(domain: string): Promise<void> {
  // Let's Encrypt or Cloudflare SSL
  console.log(`🔒 Generating SSL certificate for ${domain}`);
  // Implementation depends on SSL provider
}

async function configureLoadBalancerRouting(config: any): Promise<void> {
  console.log(`⚖️ Configuring load balancer for ${config.subdomain}`);
  // Configure routing rules based on plan type
}

async function verifyClientPaymentStatus(
  clientId: string,
): Promise<{ valid: boolean; reason?: string }> {
  try {
    // Check Stripe subscription status
    const client = await getClientFromDatabase(clientId);
    if (!client?.stripeCustomerId) {
      return { valid: false, reason: "No payment method" };
    }

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const subscriptions = await stripe.subscriptions.list({
      customer: client.stripeCustomerId,
      status: "active",
    });

    return { valid: subscriptions.data.length > 0 };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { valid: false, reason: "Verification failed" };
  }
}

async function checkRateLimit(clientId: string, limits: any): Promise<any> {
  // Redis-based rate limiting
  const key = `rate_limit:${clientId}`;
  // Implementation with Redis or memory store
  return {
    exceeded: false,
    remaining: limits.requests,
    resetTime: Date.now() + limits.windowMs,
  };
}

function getRequiredPlan(feature: string): string {
  for (const [plan, rules] of Object.entries(ACCESS_RULES)) {
    if (rules.allowedFeatures.includes(feature)) {
      return plan;
    }
  }
  return "enterprise";
}

function isCustomDomain(host: string): boolean {
  return !host.endsWith(".saintvision.ai");
}

// Database functions
async function saveSubdomainConfig(config: any): Promise<void> {
  // Save to database
  console.log("💾 Saving subdomain config:", config.subdomain);
}

async function getSubdomainConfig(identifier: string): Promise<any> {
  // Get from database
  console.log("🔍 Getting subdomain config:", identifier);
  return null;
}

async function getClientFromDatabase(clientId: string): Promise<any> {
  // Get client data
  console.log("🔍 Getting client data:", clientId);
  return null;
}

async function logClientAccess(
  clientId: string,
  accessData: any,
): Promise<void> {
  // Log access for analytics
  console.log("📊 Logging client access:", clientId);
}

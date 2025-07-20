import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

// Multi-brand domain configuration
const BRAND_DOMAINS = {
  // Main SaintVision AI platform
  "saintvisionai.com": {
    brandId: "saintvision",
    name: "SaintVision AI",
    description: "Universal AI Agent Platform",
    theme: {
      primary: "#FFD700", // Gold
      secondary: "#101C28", // Charcoal
      accent: "#4F46E5",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4",
    },
    defaultSkillsets: ["general", "crm", "legal", "healthcare", "finance"],
    features: ["all"],
    patent: true,
  },

  // PartnerTech.ai - CRM + Automation Suite
  "partnertech.ai": {
    brandId: "partnertech",
    name: "PartnerTech.ai",
    description: "CRM + Automation Suite",
    theme: {
      primary: "#3B82F6", // Blue
      secondary: "#1E293B", // Slate
      accent: "#10B981",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fpartnertech-logo",
    },
    defaultSkillsets: ["crm", "sales", "automation"],
    features: ["crm_routing", "quote_builder", "scheduling", "voice_enabled"],
    specialization: "crm",
    patent: true,
  },

  // Athena - Healthcare Cognitive Agent
  "athena.saintvisionai.com": {
    brandId: "athena",
    name: "Athena",
    description: "Compassionate Cognitive Healthcare Agent",
    theme: {
      primary: "#059669", // Emerald
      secondary: "#1F2937", // Gray
      accent: "#EC4899",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fathena-logo",
    },
    defaultSkillsets: ["healthcare", "wellness", "compliance"],
    features: [
      "document_review",
      "compliance_tracker",
      "scheduling",
      "voice_enabled",
    ],
    specialization: "healthcare",
    complianceRequired: ["HIPAA", "healthcare"],
    patent: true,
  },

  // EbyTech - Fintech Compliance & Strategy
  "ebytech.ai": {
    brandId: "ebytech",
    name: "EbyTech",
    description: "Compliance, Finance & Strategy Agent",
    theme: {
      primary: "#7C3AED", // Purple
      secondary: "#111827", // Gray-900
      accent: "#F59E0B",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Febytech-logo",
    },
    defaultSkillsets: ["finance", "compliance", "strategy"],
    features: [
      "document_review",
      "compliance_tracker",
      "quote_builder",
      "web_research",
    ],
    specialization: "finance",
    complianceRequired: ["SOX", "FINRA", "financial"],
    patent: true,
  },

  // SVTLegal.ai - Legal Navigator
  "svtlegal.ai": {
    brandId: "svtlegal",
    name: "SVTLegal.ai",
    description: "Legal Navigator Agent",
    theme: {
      primary: "#DC2626", // Red
      secondary: "#1F2937", // Gray
      accent: "#2563EB",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fsvtlegal-logo",
    },
    defaultSkillsets: ["legal", "compliance", "contracts"],
    features: [
      "document_review",
      "compliance_tracker",
      "web_research",
      "scheduling",
    ],
    specialization: "legal",
    complianceRequired: ["legal", "attorney-client"],
    patent: true,
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Domain detection middleware
export function domainDetectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const hostname = req.get("host") || req.hostname;
  const domain = extractDomain(hostname);

  // Find brand configuration
  const brandConfig = BRAND_DOMAINS[domain];

  if (brandConfig) {
    // Attach brand context to request
    req.brand = brandConfig;
    req.brandDomain = domain;

    // Set brand-specific headers
    res.setHeader("X-Brand-ID", brandConfig.brandId);
    res.setHeader("X-Brand-Name", brandConfig.name);

    console.log(`🏢 Brand detected: ${brandConfig.name} (${domain})`);
  } else {
    // Default to SaintVision AI
    req.brand = BRAND_DOMAINS["saintvisionai.com"];
    req.brandDomain = "saintvisionai.com";
  }

  next();
}

// Extract domain from hostname (handles subdomains)
function extractDomain(hostname: string): string {
  // Remove port if present
  const cleanHostname = hostname.split(":")[0];

  // Check for exact matches first
  if (BRAND_DOMAINS[cleanHostname]) {
    return cleanHostname;
  }

  // Check for subdomain matches (e.g., athena.saintvisionai.com)
  for (const domain of Object.keys(BRAND_DOMAINS)) {
    if (cleanHostname.endsWith(domain) || cleanHostname === domain) {
      return domain;
    }
  }

  // Default to main domain
  return "saintvisionai.com";
}

// Get brand-specific agent templates
export async function getBrandAgentTemplates(req: Request, res: Response) {
  try {
    const brand = req.brand;

    if (!brand) {
      return res.status(400).json({ error: "Brand not detected" });
    }

    const templates = generateBrandTemplates(brand);

    res.json({
      brand: {
        id: brand.brandId,
        name: brand.name,
        description: brand.description,
        theme: brand.theme,
        specialization: brand.specialization,
      },
      templates,
      hacp: brand.patent,
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("Error getting brand templates:", error);
    res.status(500).json({ error: "Failed to get brand templates" });
  }
}

// Generate brand-specific agent templates
function generateBrandTemplates(brand: any): any[] {
  const baseTemplates = [
    {
      id: "productivity",
      name: "Productivity Assistant",
      description: "General productivity and task management",
      skillset: "general",
      features: ["scheduling", "web_research"],
      available: true,
    },
  ];

  // Add brand-specific templates
  switch (brand.brandId) {
    case "partnertech":
      return [
        ...baseTemplates,
        {
          id: "crm-specialist",
          name: "CRM Specialist",
          description: "Customer relationship management and sales automation",
          skillset: "crm",
          features: ["crm_routing", "quote_builder", "scheduling"],
          recommended: true,
          icon: "Users",
        },
        {
          id: "sales-automation",
          name: "Sales Automation Bot",
          description: "Automated lead nurturing and pipeline management",
          skillset: "sales",
          features: ["crm_routing", "voice_enabled", "quote_builder"],
          icon: "TrendingUp",
        },
        {
          id: "customer-success",
          name: "Customer Success Manager",
          description: "Customer onboarding and retention specialist",
          skillset: "support",
          features: ["scheduling", "voice_enabled", "web_research"],
          icon: "Heart",
        },
      ];

    case "athena":
      return [
        {
          id: "healthcare-companion",
          name: "Healthcare Companion",
          description: "Compassionate healthcare assistance and monitoring",
          skillset: "healthcare",
          features: [
            "scheduling",
            "compliance_tracker",
            "document_review",
            "voice_enabled",
          ],
          recommended: true,
          icon: "Heart",
          compliance: ["HIPAA"],
        },
        {
          id: "wellness-coach",
          name: "Wellness Coach",
          description: "Personalized wellness guidance and motivation",
          skillset: "wellness",
          features: ["scheduling", "voice_enabled", "web_research"],
          icon: "Activity",
        },
        {
          id: "medical-assistant",
          name: "Medical Office Assistant",
          description: "Administrative support for healthcare practices",
          skillset: "medical-admin",
          features: ["scheduling", "document_review", "compliance_tracker"],
          icon: "FileText",
          compliance: ["HIPAA"],
        },
      ];

    case "ebytech":
      return [
        {
          id: "finance-analyst",
          name: "Finance Analyst",
          description: "Financial analysis and compliance monitoring",
          skillset: "finance",
          features: [
            "document_review",
            "compliance_tracker",
            "quote_builder",
            "web_research",
          ],
          recommended: true,
          icon: "DollarSign",
          compliance: ["SOX", "FINRA"],
        },
        {
          id: "compliance-officer",
          name: "Compliance Officer",
          description: "Regulatory compliance and risk management",
          skillset: "compliance",
          features: ["document_review", "compliance_tracker", "web_research"],
          icon: "Shield",
          compliance: ["SOX", "FINRA", "GDPR"],
        },
        {
          id: "strategy-advisor",
          name: "Strategy Advisor",
          description: "Business strategy and market analysis",
          skillset: "strategy",
          features: ["web_research", "document_review", "quote_builder"],
          icon: "TrendingUp",
        },
      ];

    case "svtlegal":
      return [
        {
          id: "legal-navigator",
          name: "Legal Navigator",
          description: "Legal research and document analysis specialist",
          skillset: "legal",
          features: [
            "document_review",
            "compliance_tracker",
            "web_research",
            "scheduling",
          ],
          recommended: true,
          icon: "Scale",
          compliance: ["attorney-client"],
        },
        {
          id: "contract-reviewer",
          name: "Contract Reviewer",
          description: "Contract analysis and compliance checking",
          skillset: "contracts",
          features: ["document_review", "compliance_tracker"],
          icon: "FileText",
          compliance: ["attorney-client"],
        },
        {
          id: "paralegal-assistant",
          name: "Paralegal Assistant",
          description: "Legal research and administrative support",
          skillset: "paralegal",
          features: ["web_research", "scheduling", "document_review"],
          icon: "Search",
        },
      ];

    default:
      return baseTemplates;
  }
}

// Create brand-specific agent with enhanced configuration
export async function createBrandAgent(req: Request, res: Response) {
  try {
    const brand = req.brand;
    const agentConfig = req.body;

    if (!brand) {
      return res.status(400).json({ error: "Brand not detected" });
    }

    // Enhance agent config with brand-specific settings
    const enhancedConfig = {
      ...agentConfig,
      brand: {
        id: brand.brandId,
        name: brand.name,
        theme: brand.theme,
        domain: req.brandDomain,
      },
      compliance: brand.complianceRequired || [],
      specialization: brand.specialization,
      defaultFeatures: brand.features,
    };

    // Validate agent configuration against brand restrictions
    const validation = validateBrandAgent(enhancedConfig, brand);
    if (!validation.valid) {
      return res.status(400).json({
        error: "Invalid configuration for brand",
        details: validation.errors,
      });
    }

    // Create agent with brand-specific subdomain
    const agentSlug = await generateBrandSpecificSlug(
      agentConfig.name,
      brand.brandId,
    );

    // Store brand agent configuration
    await storeBrandAgent(enhancedConfig, agentSlug);

    // Set up brand-specific routing
    const accessUrl = generateBrandAccessUrl(agentSlug, req.brandDomain);

    res.json({
      success: true,
      agentId: enhancedConfig.id,
      agentSlug,
      accessUrl,
      brand: brand.name,
      specialization: brand.specialization,
      compliance: enhancedConfig.compliance,
      hacp: true,
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("Error creating brand agent:", error);
    res.status(500).json({ error: "Failed to create brand agent" });
  }
}

// Validate agent configuration against brand requirements
function validateBrandAgent(
  config: any,
  brand: any,
): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // Check if requested features are available for this brand
  if (config.features) {
    for (const feature of config.features) {
      if (
        !brand.features.includes(feature) &&
        !brand.features.includes("all")
      ) {
        errors.push(`Feature "${feature}" is not available for ${brand.name}`);
      }
    }
  }

  // Check compliance requirements
  if (brand.complianceRequired && brand.complianceRequired.length > 0) {
    if (!config.compliance || config.compliance.length === 0) {
      errors.push(
        `${
          brand.name
        } requires compliance settings: ${brand.complianceRequired.join(", ")}`,
      );
    }
  }

  // Check skillset compatibility
  if (
    brand.specialization &&
    config.skillset &&
    !config.skillset.includes(brand.specialization)
  ) {
    console.warn(
      `Skillset "${config.skillset}" may not be optimal for ${brand.name} (specializes in ${brand.specialization})`,
    );
  }

  return { valid: errors.length === 0, errors };
}

// Generate brand-specific agent slug
async function generateBrandSpecificSlug(
  name: string,
  brandId: string,
): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  // Add brand prefix for uniqueness across brands
  const brandSlug = `${brandId}-${baseSlug}`;

  let finalSlug = brandSlug;
  let counter = 0;

  // Ensure uniqueness
  while (true) {
    const { data } = await supabase
      .from("agents")
      .select("id")
      .eq("slug", finalSlug)
      .single();

    if (!data) break;

    counter++;
    finalSlug = `${brandSlug}-${counter}`;
  }

  return finalSlug;
}

// Generate brand-specific access URL
function generateBrandAccessUrl(slug: string, domain: string): string {
  // For main domain, use subdomain routing
  if (domain === "saintvisionai.com") {
    return `https://${slug}.saintvisionai.com/console`;
  }

  // For brand domains, use path-based routing
  return `https://${domain}/agent/${slug}`;
}

// Store brand agent in database
async function storeBrandAgent(config: any, slug: string): Promise<void> {
  await supabase.from("agents").insert({
    id: config.id,
    user_id: config.userId,
    slug,
    name: config.name,
    description: config.description,
    avatar: config.avatar,
    model_type: config.modelType,
    skillset: config.skillset,
    features: config.features,
    permissions: config.permissions,
    brand_id: config.brand.id,
    brand_domain: config.brand.domain,
    brand_theme: config.brand.theme,
    compliance_settings: config.compliance,
    specialization: config.specialization,
    status: "active",
    created_at: new Date().toISOString(),
  });
}

// Get brand configuration by domain
export async function getBrandConfig(req: Request, res: Response) {
  try {
    const domain = req.params.domain || req.brandDomain;
    const brandConfig = BRAND_DOMAINS[domain];

    if (!brandConfig) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json({
      brand: brandConfig,
      domain,
      templates: generateBrandTemplates(brandConfig),
      hacp: brandConfig.patent,
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("Error getting brand config:", error);
    res.status(500).json({ error: "Failed to get brand configuration" });
  }
}

// List all available brands
export async function listBrands(req: Request, res: Response) {
  try {
    const brands = Object.entries(BRAND_DOMAINS).map(([domain, config]) => ({
      domain,
      id: config.brandId,
      name: config.name,
      description: config.description,
      specialization: config.specialization,
      theme: config.theme,
      features: config.features,
      complianceRequired: config.complianceRequired || [],
    }));

    res.json({
      brands,
      count: brands.length,
      hacp: true,
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("Error listing brands:", error);
    res.status(500).json({ error: "Failed to list brands" });
  }
}

// Export domain configurations
export { BRAND_DOMAINS };

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      brand?: any;
      brandDomain?: string;
    }
  }
}

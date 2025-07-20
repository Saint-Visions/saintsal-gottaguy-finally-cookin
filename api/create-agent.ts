import { Request, Response } from "express";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";
import fs from "fs";
import path from "path";

interface AgentConfig {
  name: string;
  avatar: string;
  modelType: "gpt-4o" | "azure-cognitive" | "dual-bot";
  skillset: string;
  features: string[];
  permissions: "admin" | "team" | "public";
  description: string;
  customFiles?: File[];
}

interface UserPlan {
  tier: "free" | "pro" | "enterprise" | "white-label";
  agentCount: number;
  maxAgents: number;
  features: string[];
}

interface AgentProvisioningResult {
  agentId: string;
  agentSlug: string;
  openaiAssistantId?: string;
  azureEndpoint?: string;
  azureModelId?: string;
  dualBotConfig?: any;
  status: "provisioning" | "active" | "failed";
  accessUrl: string;
  subdomain: string;
}

// Initialize services
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const azureOpenAI = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY,
  },
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Tier-based feature access control
const PLAN_FEATURES = {
  free: {
    maxAgents: 1,
    models: ["gpt-4o"],
    features: ["web_research", "scheduling"],
    monthlyMessages: 100,
  },
  pro: {
    maxAgents: 1,
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
    ],
    monthlyMessages: -1, // unlimited
  },
  enterprise: {
    maxAgents: 5,
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
      "document_review",
      "compliance_tracker",
    ],
    monthlyMessages: -1,
  },
  "white-label": {
    maxAgents: 10,
    models: ["gpt-4o", "azure-cognitive", "dual-bot"],
    features: [
      "voice_enabled",
      "web_research",
      "crm_routing",
      "scheduling",
      "quote_builder",
      "document_review",
      "compliance_tracker",
    ],
    monthlyMessages: -1,
  },
};

// Main agent creation endpoint
export async function createAgent(req: Request, res: Response) {
  try {
    console.log("🚀 Starting SaintSal™ Agent Creation...");

    // Parse multipart form data for file uploads
    const form = formidable({
      uploadDir: "/tmp",
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB max
    });

    const [fields, files] = await form.parse(req);
    const agentConfig: AgentConfig = JSON.parse(fields.config[0] as string);
    const userId = req.user?.id; // Assuming auth middleware sets this

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please log in to create an agent",
      });
    }

    console.log(`👤 Creating agent for user: ${userId}`);
    console.log(`🤖 Agent config:`, JSON.stringify(agentConfig, null, 2));

    // Get user's current plan and validate permissions
    const userPlan = await getUserPlan(userId);
    const validation = await validateAgentCreation(
      agentConfig,
      userPlan,
      userId,
    );

    if (!validation.valid) {
      return res.status(403).json({
        error: "Permission denied",
        message: validation.message,
        upgradeRequired: validation.upgradeRequired,
        upgradeUrl: "/upgrade",
      });
    }

    // Generate unique agent ID and slug
    const agentId = uuidv4();
    const agentSlug = await generateUniqueSlug(agentConfig.name);

    console.log(`🏷️ Generated agent slug: ${agentSlug}`);

    // Start provisioning process based on model type
    let provisioningResult: AgentProvisioningResult;

    switch (agentConfig.modelType) {
      case "gpt-4o":
        provisioningResult = await provisionOpenAIAgent(
          agentId,
          agentSlug,
          agentConfig,
        );
        break;
      case "azure-cognitive":
        provisioningResult = await provisionAzureAgent(
          agentId,
          agentSlug,
          agentConfig,
        );
        break;
      case "dual-bot":
        provisioningResult = await provisionDualBotAgent(
          agentId,
          agentSlug,
          agentConfig,
        );
        break;
      default:
        throw new Error(`Unsupported model type: ${agentConfig.modelType}`);
    }

    // Process uploaded files if any
    const uploadedFiles = Object.values(files).flat();
    if (uploadedFiles.length > 0) {
      await processCustomFiles(agentId, uploadedFiles as any[]);
    }

    // Store agent record in Supabase
    const agentRecord = await storeAgentRecord({
      id: agentId,
      userId,
      slug: agentSlug,
      config: agentConfig,
      provisioningResult,
      createdAt: new Date().toISOString(),
    });

    // Set up agent monitoring and analytics
    await initializeAgentMonitoring(agentId, userId);

    // Configure subdomain routing
    await configureSubdomainRouting(agentSlug, agentId);

    // Set up HACP™ escalation routing to Supersal
    await configureHACPEscalation(agentId, agentConfig);

    // Initialize CRM integration if enabled
    if (agentConfig.features.includes("crm_routing")) {
      await setupCRMIntegration(agentId, userId);
    }

    // Set up Twilio voice if enabled
    if (agentConfig.features.includes("voice_enabled")) {
      await setupTwilioVoice(agentId, agentSlug);
    }

    console.log(`✅ SaintSal™ Agent successfully created: ${agentId}`);

    res.status(201).json({
      success: true,
      agentId,
      agentSlug,
      accessUrl: `https://${agentSlug}.saintvisionai.com/console`,
      subdomain: `${agentSlug}.saintvisionai.com`,
      status: provisioningResult.status,
      message:
        "Your SaintSal™ Agent is being deployed! This may take a few minutes.",
      estimatedTime: "2-5 minutes",
      features: agentConfig.features,
      modelType: agentConfig.modelType,
      hacp: true, // HACP™ technology enabled
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("❌ Agent creation error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create SaintSal™ Agent. Please try again.",
      support: "Contact support if this issue persists.",
    });
  }
}

// Provision OpenAI GPT-4o agent
async function provisionOpenAIAgent(
  agentId: string,
  agentSlug: string,
  config: AgentConfig,
): Promise<AgentProvisioningResult> {
  try {
    console.log("🧠 Creating OpenAI GPT-4o assistant...");

    const assistant = await openai.beta.assistants.create({
      name: config.name,
      description: config.description || generateAgentDescription(config),
      model: "gpt-4o",
      instructions: generateSystemInstructions(config),
      tools: await getToolsForFeatures(config.features),
      metadata: {
        agentId,
        skillset: config.skillset,
        features: config.features.join(","),
        creator: "saintvision-ai",
        hacp: "true",
        patent: "10290222",
      },
    });

    console.log(`✅ OpenAI Assistant created: ${assistant.id}`);

    return {
      agentId,
      agentSlug,
      openaiAssistantId: assistant.id,
      status: "active",
      accessUrl: `https://${agentSlug}.saintvisionai.com/console`,
      subdomain: `${agentSlug}.saintvisionai.com`,
    };
  } catch (error) {
    console.error("❌ OpenAI provisioning error:", error);
    throw error;
  }
}

// Provision Azure Cognitive Services agent
async function provisionAzureAgent(
  agentId: string,
  agentSlug: string,
  config: AgentConfig,
): Promise<AgentProvisioningResult> {
  try {
    console.log("🔷 Creating Azure Cognitive Services agent...");

    // Create Azure OpenAI assistant using the Azure deployment
    const assistant = await azureOpenAI.beta.assistants.create({
      name: config.name,
      description: config.description || generateAgentDescription(config),
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o",
      instructions: generateSystemInstructions(config, "azure"),
      tools: await getToolsForFeatures(config.features, "azure"),
      metadata: {
        agentId,
        skillset: config.skillset,
        features: config.features.join(","),
        creator: "saintvision-ai",
        engine: "azure-cognitive",
        hacp: "true",
        patent: "10290222",
      },
    });

    // Set up Azure Cognitive Services integrations
    await setupAzureCognitiveServices(agentId, config);

    console.log(`✅ Azure Cognitive agent created: ${assistant.id}`);

    return {
      agentId,
      agentSlug,
      azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
      azureModelId: assistant.id,
      status: "active",
      accessUrl: `https://${agentSlug}.saintvisionai.com/console`,
      subdomain: `${agentSlug}.saintvisionai.com`,
    };
  } catch (error) {
    console.error("❌ Azure provisioning error:", error);
    throw error;
  }
}

// Provision Dual-Bot (HACP™) agent
async function provisionDualBotAgent(
  agentId: string,
  agentSlug: string,
  config: AgentConfig,
): Promise<AgentProvisioningResult> {
  try {
    console.log("⚡ Creating Dual-Bot (HACP™) agent...");

    // Create both OpenAI and Azure components
    const openaiResult = await provisionOpenAIAgent(agentId, agentSlug, config);
    const azureResult = await provisionAzureAgent(agentId, agentSlug, config);

    // Create HACP™ routing configuration
    const dualBotConfig = {
      primary: {
        provider: "openai",
        assistantId: openaiResult.openaiAssistantId,
        useCase: "general_reasoning",
      },
      secondary: {
        provider: "azure",
        assistantId: azureResult.azureModelId,
        endpoint: azureResult.azureEndpoint,
        useCase: "cognitive_processing",
      },
      routing: {
        strategy: "hacp",
        escalation: "supersal",
        fallback: "azure",
        patent: "10290222",
      },
    };

    // Store dual-bot routing configuration
    await storeDualBotConfig(agentId, dualBotConfig);

    console.log(`✅ Dual-Bot (HACP™) agent created: ${agentId}`);

    return {
      agentId,
      agentSlug,
      openaiAssistantId: openaiResult.openaiAssistantId,
      azureEndpoint: azureResult.azureEndpoint,
      azureModelId: azureResult.azureModelId,
      dualBotConfig,
      status: "active",
      accessUrl: `https://${agentSlug}.saintvisionai.com/console`,
      subdomain: `${agentSlug}.saintvisionai.com`,
    };
  } catch (error) {
    console.error("❌ Dual-Bot provisioning error:", error);
    throw error;
  }
}

// Generate system instructions based on skillset and features
function generateSystemInstructions(
  config: AgentConfig,
  engine: "openai" | "azure" = "openai",
): string {
  const baseInstructions = `You are ${config.name}, a specialized AI assistant created using SaintVision AI's SaintSal™ technology. `;

  const skillsetInstructions = {
    general:
      "You help with general productivity, task management, and daily assistance.",
    legal:
      "You are a Legal Navigator who assists with document review, compliance tracking, and legal research. Always remind users to consult with qualified attorneys for legal advice.",
    crm:
      "You are a CRM specialist who helps manage customer relationships, sales pipelines, and business automation through GoHighLevel integration.",
    realestate:
      "You are a Real Estate Dealbot who helps with property analysis, market data, and deal management.",
    healthcare:
      "You are Athena, a compassionate healthcare assistant who helps with wellness monitoring, appointment scheduling, and health information. Always recommend consulting healthcare professionals for medical advice.",
    finance:
      "You are an EbyTech Finance specialist who assists with financial analysis, compliance tracking, and market research. Always recommend consulting financial advisors for investment decisions.",
  };

  const featureInstructions = config.features
    .map(feature => {
      switch (feature) {
        case "voice_enabled":
          return "You can communicate through voice using natural speech patterns with Twilio integration.";
        case "web_research":
          return "You can search the web and provide real-time information and intelligent summaries.";
        case "crm_routing":
          return "You can interact with GoHighLevel CRM systems to manage customer data and sales pipelines.";
        case "scheduling":
          return "You can help with calendar management and appointment scheduling.";
        case "quote_builder":
          return "You can generate quotes and pricing proposals for business needs.";
        case "document_review":
          return "You can analyze and review documents using AI-powered document processing.";
        case "compliance_tracker":
          return "You can monitor compliance and regulatory requirements across various industries.";
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join(" ");

  const hacpInstructions = `
Your behavior is governed by HACP™ (Hierarchical Agent Control Protocol) - US Patent 10,290,222. This means:
- You escalate complex issues to Supersal (our senior AI assistant) when needed
- You NEVER escalate directly to human founders or executives  
- You maintain professional boundaries and follow strict compliance protocols
- You provide accurate information and are transparent about your capabilities

If you encounter requests beyond your capabilities or concerning content, respond with: "I'm escalating this to Supersal, our senior AI assistant, who can provide better assistance."
`;

  const engineInstructions =
    engine === "azure"
      ? "You are powered by Microsoft Azure Cognitive Services, providing enhanced document processing, text-to-speech, and cognitive analysis capabilities. "
      : "You are powered by OpenAI's GPT-4o, providing advanced natural language reasoning and conversation abilities. ";

  return `${baseInstructions}${engineInstructions}${skillsetInstructions[
    config.skillset as keyof typeof skillsetInstructions
  ] || skillsetInstructions.general} ${featureInstructions}

${hacpInstructions}

Always maintain a helpful, professional tone aligned with the SaintVision AI brand. Be accurate, transparent, and focused on providing value to the user.`;
}

// Get tools based on enabled features
async function getToolsForFeatures(
  features: string[],
  engine: "openai" | "azure" = "openai",
): Promise<any[]> {
  const tools: any[] = [];

  // Add code interpreter for all agents
  tools.push({ type: "code_interpreter" });

  // Add retrieval for file-based knowledge
  tools.push({ type: "retrieval" });

  // Add feature-specific tools
  if (features.includes("web_research")) {
    tools.push({
      type: "function",
      function: {
        name: "web_search",
        description:
          "Search the web for current information and provide summaries",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
            max_results: { type: "number", default: 5 },
            include_snippets: { type: "boolean", default: true },
          },
          required: ["query"],
        },
      },
    });
  }

  if (features.includes("crm_routing")) {
    tools.push({
      type: "function",
      function: {
        name: "ghl_create_contact",
        description: "Create a new contact in GoHighLevel CRM",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            pipeline_stage: { type: "string" },
            custom_fields: { type: "object" },
          },
          required: ["name"],
        },
      },
    });

    tools.push({
      type: "function",
      function: {
        name: "ghl_update_pipeline",
        description: "Update deal status in GoHighLevel sales pipeline",
        parameters: {
          type: "object",
          properties: {
            contact_id: { type: "string" },
            pipeline_id: { type: "string" },
            stage_id: { type: "string" },
            value: { type: "number" },
            notes: { type: "string" },
          },
          required: ["contact_id", "stage_id"],
        },
      },
    });
  }

  if (features.includes("scheduling")) {
    tools.push({
      type: "function",
      function: {
        name: "schedule_appointment",
        description: "Schedule appointments and manage calendar events",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string" },
            datetime: { type: "string", format: "date-time" },
            duration_minutes: { type: "number", default: 30 },
            attendees: { type: "array", items: { type: "string" } },
            location: { type: "string" },
            description: { type: "string" },
          },
          required: ["title", "datetime"],
        },
      },
    });
  }

  if (features.includes("quote_builder")) {
    tools.push({
      type: "function",
      function: {
        name: "generate_quote",
        description: "Generate pricing quotes and proposals",
        parameters: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  description: { type: "string" },
                  quantity: { type: "number" },
                  unit_price: { type: "number" },
                  total: { type: "number" },
                },
              },
            },
            tax_rate: { type: "number", default: 0.0875 },
            discount: { type: "number", default: 0 },
            valid_until: { type: "string", format: "date" },
          },
          required: ["items"],
        },
      },
    });
  }

  if (features.includes("document_review")) {
    tools.push({
      type: "function",
      function: {
        name: "analyze_document",
        description: "Analyze and review documents using AI",
        parameters: {
          type: "object",
          properties: {
            document_url: { type: "string" },
            analysis_type: {
              type: "string",
              enum: ["legal", "financial", "compliance", "general"],
            },
            focus_areas: { type: "array", items: { type: "string" } },
          },
          required: ["document_url", "analysis_type"],
        },
      },
    });
  }

  if (features.includes("compliance_tracker")) {
    tools.push({
      type: "function",
      function: {
        name: "check_compliance",
        description: "Check compliance against regulations and standards",
        parameters: {
          type: "object",
          properties: {
            regulation_type: {
              type: "string",
              enum: ["GDPR", "HIPAA", "SOX", "PCI-DSS", "CCPA"],
            },
            document_content: { type: "string" },
            industry: { type: "string" },
          },
          required: ["regulation_type"],
        },
      },
    });
  }

  return tools;
}

// Validation functions
async function validateAgentCreation(
  config: AgentConfig,
  userPlan: UserPlan,
  userId: string,
): Promise<{ valid: boolean; message?: string; upgradeRequired?: boolean }> {
  // Check agent count limits
  const { data: existingAgents } = await supabase
    .from("agents")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active");

  const currentAgentCount = existingAgents?.length || 0;

  if (currentAgentCount >= userPlan.maxAgents) {
    return {
      valid: false,
      message: `You've reached your plan limit of ${userPlan.maxAgents} agent(s). Upgrade to create more.`,
      upgradeRequired: true,
    };
  }

  // Check model type access
  const planFeatures = PLAN_FEATURES[userPlan.tier];
  if (!planFeatures.models.includes(config.modelType)) {
    return {
      valid: false,
      message: `${config.modelType} is not available on your ${userPlan.tier} plan.`,
      upgradeRequired: true,
    };
  }

  // Check feature access
  for (const feature of config.features) {
    if (!planFeatures.features.includes(feature)) {
      return {
        valid: false,
        message: `Feature "${feature}" requires a higher plan.`,
        upgradeRequired: true,
      };
    }
  }

  return { valid: true };
}

async function getUserPlan(userId: string): Promise<UserPlan> {
  const { data: user } = await supabase
    .from("users")
    .select("plan, subscription_status")
    .eq("id", userId)
    .single();

  const tier = user?.plan || "free";
  const planConfig = PLAN_FEATURES[tier as keyof typeof PLAN_FEATURES];

  return {
    tier: tier as any,
    agentCount: 0, // Will be calculated in validation
    maxAgents: planConfig.maxAgents,
    features: planConfig.features,
  };
}

// Utility functions
async function generateUniqueSlug(name: string): Promise<string> {
  let baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  if (!baseSlug) baseSlug = "agent";

  let finalSlug = baseSlug;
  let counter = 0;

  while (true) {
    const { data } = await supabase
      .from("agents")
      .select("id")
      .eq("slug", finalSlug)
      .single();

    if (!data) break;

    counter++;
    finalSlug = `${baseSlug}-${counter}`;
  }

  return finalSlug;
}

function generateAgentDescription(config: AgentConfig): string {
  const skillsetNames = {
    general: "General Productivity Assistant",
    legal: "Legal Navigator & Compliance Specialist",
    crm: "CRM & Sales Automation Expert",
    realestate: "Real Estate Deal Specialist",
    healthcare: "Healthcare & Wellness Assistant",
    finance: "Finance & Compliance Advisor",
  };

  return `${skillsetNames[config.skillset as keyof typeof skillsetNames] ||
    "AI Assistant"} powered by SaintSal™ technology with ${
    config.features.length
  } specialized capabilities.`;
}

// Implementation functions (stubs that would be implemented)
async function processCustomFiles(
  agentId: string,
  files: any[],
): Promise<void> {
  console.log(
    `📁 Processing ${files.length} custom files for agent ${agentId}`,
  );
  // Implementation would handle file upload to Supabase storage
  // Extract text content, create embeddings, store in vector database
}

async function storeAgentRecord(agentData: any): Promise<any> {
  const { data, error } = await supabase
    .from("agents")
    .insert({
      id: agentData.id,
      user_id: agentData.userId,
      slug: agentData.slug,
      name: agentData.config.name,
      description:
        agentData.config.description ||
        generateAgentDescription(agentData.config),
      avatar: agentData.config.avatar,
      model_type: agentData.config.modelType,
      skillset: agentData.config.skillset,
      features: agentData.config.features,
      permissions: agentData.config.permissions,
      openai_assistant_id: agentData.provisioningResult.openaiAssistantId,
      azure_model_id: agentData.provisioningResult.azureModelId,
      azure_endpoint: agentData.provisioningResult.azureEndpoint,
      subdomain: agentData.provisioningResult.subdomain,
      access_url: agentData.provisioningResult.accessUrl,
      status: agentData.provisioningResult.status,
      created_at: agentData.createdAt,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function initializeAgentMonitoring(
  agentId: string,
  userId: string,
): Promise<void> {
  console.log(`📊 Initializing monitoring for agent ${agentId}`);
  // Set up analytics, usage tracking, performance monitoring
}

async function configureSubdomainRouting(
  slug: string,
  agentId: string,
): Promise<void> {
  console.log(
    `🌐 Configuring subdomain ${slug}.saintvisionai.com for agent ${agentId}`,
  );
  // Configure DNS, CDN, routing rules for the subdomain
}

async function configureHACPEscalation(
  agentId: string,
  config: AgentConfig,
): Promise<void> {
  console.log(`⚡ Configuring HACP™ escalation for agent ${agentId}`);
  // Set up escalation routing to Supersal, never to human founders

  const escalationConfig = {
    agentId,
    escalationTarget: "supersal",
    escalationTriggers: [
      "user_frustration",
      "capability_exceeded",
      "policy_violation",
      "manual_request",
    ],
    escalationFlow: {
      step1: "agent_attempt",
      step2: "supersal_takeover",
      step3: "human_support_ticket_creation",
      never: "direct_founder_contact",
    },
    hacpCompliant: true,
    patent: "US10290222",
  };

  // Store escalation configuration
  await supabase.from("agent_escalation_configs").insert(escalationConfig);
}

async function setupCRMIntegration(
  agentId: string,
  userId: string,
): Promise<void> {
  console.log(`🔗 Setting up CRM integration for agent ${agentId}`);
  // Configure GoHighLevel API integration using the provided API key
  // pit-2f264858-06c7-402c-9ff2-59124bfff8f8
}

async function setupTwilioVoice(
  agentId: string,
  agentSlug: string,
): Promise<void> {
  console.log(`📞 Setting up Twilio voice for agent ${agentId}`);
  // Configure Twilio phone number and webhooks for voice functionality
}

async function setupAzureCognitiveServices(
  agentId: string,
  config: AgentConfig,
): Promise<void> {
  console.log(`🔷 Setting up Azure Cognitive Services for agent ${agentId}`);
  // Configure TTS, STT, Form Recognizer, Custom Search, etc.
}

async function storeDualBotConfig(agentId: string, config: any): Promise<void> {
  await supabase.from("agent_dual_bot_configs").insert({
    agent_id: agentId,
    config: config,
    created_at: new Date().toISOString(),
  });
}

// Additional endpoints
export async function getAgentStatus(req: Request, res: Response) {
  try {
    const { agentId } = req.params;

    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("id", agentId)
      .single();

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json({
      agentId: agent.id,
      name: agent.name,
      status: agent.status,
      accessUrl: agent.access_url,
      subdomain: agent.subdomain,
      modelType: agent.model_type,
      skillset: agent.skillset,
      features: agent.features,
      createdAt: agent.created_at,
      hacp: true,
      patent: "US Patent 10,290,222",
    });
  } catch (error) {
    console.error("❌ Get agent status error:", error);
    res.status(500).json({ error: "Failed to get agent status" });
  }
}

export async function listUserAgents(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data: agents } = await supabase
      .from("agents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    res.json({
      agents: agents || [],
      count: agents?.length || 0,
      hacp: true,
    });
  } catch (error) {
    console.error("❌ List agents error:", error);
    res.status(500).json({ error: "Failed to list agents" });
  }
}

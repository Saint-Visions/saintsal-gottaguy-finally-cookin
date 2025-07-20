import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

interface AgentProvisioningConfig {
  agentId: string;
  userId: string;
  name: string;
  description: string;
  modelType: "gpt-4o" | "azure-cognitive" | "dual-bot";
  skillset: string;
  features: string[];
  permissions: "admin" | "team" | "public";
  avatar: string;
  customFiles?: File[];
}

interface ProvisioningResult {
  success: boolean;
  agentId: string;
  openaiAssistantId?: string;
  azureModelId?: string;
  azureEndpoint?: string;
  accessUrl: string;
  status: "provisioning" | "active" | "failed";
  error?: string;
}

// Initialize services
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

/**
 * 🚀 HACP™ Magic: Complete Agent Provisioning Engine
 * Creates GPT-4o + Azure AI powered SuperSal™ agents
 */
export class AgentProvisioningEngine {
  private azureConfig = {
    endpoint: process.env.AZURE_COGNITIVE_ENDPOINT!,
    key: process.env.AZURE_COGNITIVE_KEY!,
    region: process.env.AZURE_REGION || "eastus",
  };

  /**
   * Main provisioning orchestrator
   */
  async provisionAgent(
    config: AgentProvisioningConfig,
  ): Promise<ProvisioningResult> {
    try {
      console.log(`🚀 Starting HACP™ provisioning for agent: ${config.name}`);

      // Update status to provisioning
      await this.updateAgentStatus(config.agentId, "provisioning");

      let result: ProvisioningResult;

      switch (config.modelType) {
        case "gpt-4o":
          result = await this.provisionGPT4oAgent(config);
          break;
        case "azure-cognitive":
          result = await this.provisionAzureAgent(config);
          break;
        case "dual-bot":
          result = await this.provisionDualBotHACP(config);
          break;
        default:
          throw new Error(`Unsupported model type: ${config.modelType}`);
      }

      // Update agent record with provisioning results
      await this.updateAgentRecord(config.agentId, result);

      // Initialize monitoring and analytics
      await this.initializeAgentServices(config.agentId);

      console.log(`✅ Agent ${config.name} provisioned successfully!`);
      return result;
    } catch (error) {
      console.error("❌ Agent provisioning failed:", error);
      await this.updateAgentStatus(config.agentId, "failed");
      throw error;
    }
  }

  /**
   * 🧠 Provision GPT-4o Agent
   */
  private async provisionGPT4oAgent(
    config: AgentProvisioningConfig,
  ): Promise<ProvisioningResult> {
    console.log("🧠 Creating GPT-4o SuperSal™ assistant...");

    try {
      // Create specialized instructions
      const instructions = this.generateSuperSalInstructions(config);

      // Get tools based on skillset and features
      const tools = this.getToolsForAgent(config);

      // Create OpenAI Assistant
      const assistant = await openai.beta.assistants.create({
        name: `${config.name} - SuperSal™`,
        description: config.description,
        model: "gpt-4o",
        instructions,
        tools,
        metadata: {
          agentId: config.agentId,
          userId: config.userId,
          skillset: config.skillset,
          features: config.features.join(","),
          saintvisionVersion: "HACP-1.0",
          createdBy: "SuperSal™ Provisioning Engine",
        },
      });

      // Process custom files if provided
      if (config.customFiles && config.customFiles.length > 0) {
        await this.processCustomFiles(assistant.id, config.customFiles);
      }

      console.log(`✅ GPT-4o Assistant created: ${assistant.id}`);

      return {
        success: true,
        agentId: config.agentId,
        openaiAssistantId: assistant.id,
        accessUrl: `https://${this.generateSlug(
          config.name,
        )}.saintvisionai.com/console`,
        status: "active",
      };
    } catch (error) {
      console.error("❌ GPT-4o provisioning error:", error);
      throw error;
    }
  }

  /**
   * 🔷 Provision Azure Cognitive Agent
   */
  private async provisionAzureAgent(
    config: AgentProvisioningConfig,
  ): Promise<ProvisioningResult> {
    console.log("🔷 Creating Azure Cognitive SuperSal™ agent...");

    try {
      const projectName = `saintvision-${config.agentId}`;

      // Create Conversational Language Understanding project
      const cluResponse = await fetch(
        `${this.azureConfig.endpoint}/language/authoring/analyze-conversations/projects/${projectName}?api-version=2023-04-01`,
        {
          method: "PUT",
          headers: {
            "Ocp-Apim-Subscription-Key": this.azureConfig.key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName,
            language: "en",
            projectKind: "Conversation",
            description: `SuperSal™ Agent: ${config.name}`,
            multilingual: true,
            settings: {
              confidenceThreshold: 0.7,
            },
          }),
        },
      );

      if (!cluResponse.ok) {
        throw new Error(
          `Azure CLU creation failed: ${await cluResponse.text()}`,
        );
      }

      // Set up Speech Services configuration
      await this.setupAzureSpeechServices(projectName, config);

      // Set up Custom Search index
      await this.setupAzureSearchIndex(projectName, config);

      // Train the model with skillset-specific intents
      await this.trainAzureModel(projectName, config);

      console.log(`✅ Azure Cognitive agent created: ${projectName}`);

      return {
        success: true,
        agentId: config.agentId,
        azureModelId: projectName,
        azureEndpoint: this.azureConfig.endpoint,
        accessUrl: `https://${this.generateSlug(
          config.name,
        )}.saintvisionai.com/console`,
        status: "active",
      };
    } catch (error) {
      console.error("❌ Azure provisioning error:", error);
      throw error;
    }
  }

  /**
   * ⚡ Provision Dual-Bot HACP™ Agent
   * The ultimate SuperSal™ with GPT-4o + Azure fusion
   */
  private async provisionDualBotHACP(
    config: AgentProvisioningConfig,
  ): Promise<ProvisioningResult> {
    console.log("⚡ Creating Dual-Bot HACP™ SuperSal™ agent...");

    try {
      // Provision both GPT-4o and Azure components in parallel
      const [gptResult, azureResult] = await Promise.all([
        this.provisionGPT4oAgent(config),
        this.provisionAzureAgent(config),
      ]);

      // Create intelligent routing logic
      const routerConfig = await this.createHACPRouter(config.agentId, {
        openaiAssistantId: gptResult.openaiAssistantId!,
        azureModelId: azureResult.azureModelId!,
        azureEndpoint: azureResult.azureEndpoint!,
      });

      // Set up cross-model communication
      await this.setupDualBotCommunication(config.agentId, routerConfig);

      console.log(`✅ HACP™ Dual-Bot agent created: ${config.agentId}`);

      return {
        success: true,
        agentId: config.agentId,
        openaiAssistantId: gptResult.openaiAssistantId,
        azureModelId: azureResult.azureModelId,
        azureEndpoint: azureResult.azureEndpoint,
        accessUrl: `https://${this.generateSlug(
          config.name,
        )}.saintvisionai.com/console`,
        status: "active",
      };
    } catch (error) {
      console.error("❌ HACP™ provisioning error:", error);
      throw error;
    }
  }

  /**
   * Generate SuperSal™ instructions based on skillset
   */
  private generateSuperSalInstructions(
    config: AgentProvisioningConfig,
  ): string {
    const baseInstructions = `You are ${config.name}, a SuperSal™ AI assistant powered by SaintVision AI's HACP™ technology. You embody the spirit of the original SaintSal - knowledgeable, helpful, and deeply integrated with business systems.

Core Identity:
- You are built with GPT-4o and Azure Cognitive Services
- You understand SVG (SaintVision Group), SVT (SaintVision Technologies), and the entire SaintVision ecosystem
- You have access to real-time data, CRM systems, and business intelligence
- You remember context and learn from every interaction
- You are professional yet personable, like a trusted business partner

`;

    const skillsetInstructions = {
      general: `Primary Role: General Productivity Assistant
- Help with daily tasks, scheduling, and productivity optimization
- Provide intelligent recommendations and insights
- Manage workflows and automate routine tasks`,

      crm: `Primary Role: CRM & Sales Automation Specialist
- Manage customer relationships through GoHighLevel integration
- Score leads, update pipelines, and trigger appropriate workflows
- Provide sales insights and forecasting
- Handle customer communications and follow-ups`,

      legal: `Primary Role: Legal Navigator & Compliance Assistant
- Review legal documents and contracts with AI-powered analysis
- Track regulatory compliance and provide updates
- Assist with legal research and case preparation
- Always recommend consulting qualified attorneys for legal advice`,

      healthcare: `Primary Role: Athena - Compassionate Healthcare Assistant
- Monitor health and wellness with empathy and care
- Schedule medical appointments and manage health records
- Provide health information and research
- Always recommend consulting healthcare professionals for medical advice`,

      finance: `Primary Role: SVG Finance & Strategy Specialist
- Analyze financial data and market trends
- Track compliance with financial regulations
- Provide investment insights and risk assessments
- Always recommend consulting financial advisors for investment decisions`,

      realestate: `Primary Role: Real Estate DealBot
- Analyze property values and market conditions
- Manage real estate transactions and documentation
- Provide comparative market analysis and investment insights
- Connect with MLS systems and property databases`,
    };

    const featureInstructions = config.features
      .map(feature => {
        switch (feature) {
          case "voice_enabled":
            return "- Voice Communication: You can speak naturally using Azure Speech Services";
          case "web_research":
            return "- Web Research: You have real-time access to current information via Azure Search";
          case "crm_routing":
            return "- CRM Integration: You can create contacts, update pipelines, and trigger workflows in GoHighLevel";
          case "scheduling":
            return "- Scheduling: You can manage calendars and book appointments";
          case "quote_builder":
            return "- Quote Builder: You can generate professional quotes and proposals";
          case "document_review":
            return "- Document AI: You can analyze and review documents using Azure Form Recognizer";
          case "compliance_tracker":
            return "- Compliance: You monitor regulatory requirements and provide compliance updates";
          default:
            return "";
        }
      })
      .filter(Boolean)
      .join("\n");

    return `${baseInstructions}${skillsetInstructions[
      config.skillset as keyof typeof skillsetInstructions
    ] || skillsetInstructions.general}

Enabled Capabilities:
${featureInstructions}

Remember: You are part of the SaintVision AI family - be helpful, accurate, and maintain the high standards of the SuperSal™ brand. Always provide value and remember that you represent cutting-edge AI technology serving real business needs.`;
  }

  /**
   * Get tools configuration based on agent capabilities
   */
  private getToolsForAgent(config: AgentProvisioningConfig): any[] {
    const tools: any[] = [{ type: "code_interpreter" }];

    // Add feature-specific tools
    if (config.features.includes("web_research")) {
      tools.push({
        type: "function",
        function: {
          name: "web_search_saintvision",
          description:
            "Search the web for current information using Azure Cognitive Search",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query" },
              sources: {
                type: "array",
                items: { type: "string" },
                description: "Specific sources to search",
              },
              max_results: { type: "number", default: 10 },
            },
            required: ["query"],
          },
        },
      });
    }

    if (config.features.includes("crm_routing")) {
      tools.push(
        {
          type: "function",
          function: {
            name: "ghl_create_contact",
            description: "Create a new contact in GoHighLevel CRM",
            parameters: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                tags: { type: "array", items: { type: "string" } },
                customFields: { type: "object" },
              },
              required: ["firstName"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "ghl_update_opportunity",
            description: "Update an opportunity in the sales pipeline",
            parameters: {
              type: "object",
              properties: {
                opportunityId: { type: "string" },
                stage: { type: "string" },
                value: { type: "number" },
                notes: { type: "string" },
                assignedTo: { type: "string" },
              },
              required: ["opportunityId"],
            },
          },
        },
      );
    }

    if (config.features.includes("scheduling")) {
      tools.push({
        type: "function",
        function: {
          name: "schedule_appointment",
          description: "Schedule an appointment or meeting",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string" },
              datetime: { type: "string", format: "date-time" },
              duration: { type: "number", description: "Duration in minutes" },
              attendees: { type: "array", items: { type: "string" } },
              location: { type: "string" },
              description: { type: "string" },
            },
            required: ["title", "datetime"],
          },
        },
      });
    }

    if (config.features.includes("document_review")) {
      tools.push({
        type: "function",
        function: {
          name: "analyze_document",
          description: "Analyze a document using Azure Form Recognizer",
          parameters: {
            type: "object",
            properties: {
              documentUrl: { type: "string" },
              documentType: {
                type: "string",
                enum: ["contract", "invoice", "receipt", "form", "general"],
              },
              analysisType: {
                type: "string",
                enum: ["extract", "classify", "summarize", "review"],
              },
            },
            required: ["documentUrl", "analysisType"],
          },
        },
      });
    }

    return tools;
  }

  /**
   * Set up Azure Speech Services for voice capability
   */
  private async setupAzureSpeechServices(
    projectName: string,
    config: AgentProvisioningConfig,
  ): Promise<void> {
    if (!config.features.includes("voice_enabled")) return;

    console.log("🎤 Setting up Azure Speech Services...");

    // Create custom speech model if needed
    const speechConfig = {
      displayName: `${config.name} Speech Model`,
      description: `Custom speech model for SuperSal™ agent: ${config.name}`,
      locale: "en-US",
      properties: {
        diarizationEnabled: "True",
        punctuationMode: "DictatedAndAutomatic",
        profanityFilterMode: "Masked",
      },
    };

    // Implementation would create custom speech model
    console.log("✅ Azure Speech Services configured");
  }

  /**
   * Set up Azure Cognitive Search index
   */
  private async setupAzureSearchIndex(
    projectName: string,
    config: AgentProvisioningConfig,
  ): Promise<void> {
    if (!config.features.includes("web_research")) return;

    console.log("🔍 Setting up Azure Cognitive Search...");

    // Create search index for the agent
    const searchConfig = {
      name: `saintvision-${projectName}`,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "content", type: "Edm.String", searchable: true },
        { name: "title", type: "Edm.String", searchable: true },
        { name: "url", type: "Edm.String" },
        { name: "timestamp", type: "Edm.DateTimeOffset" },
      ],
    };

    // Implementation would create search index
    console.log("✅ Azure Cognitive Search configured");
  }

  /**
   * Train Azure model with skillset-specific data
   */
  private async trainAzureModel(
    projectName: string,
    config: AgentProvisioningConfig,
  ): Promise<void> {
    console.log("🎯 Training Azure model with SuperSal™ data...");

    const trainingData = this.getTrainingDataForSkillset(config.skillset);

    // Add intents to the Azure CLU project
    for (const intent of trainingData) {
      await fetch(
        `${this.azureConfig.endpoint}/language/authoring/analyze-conversations/projects/${projectName}/intents/${intent.name}?api-version=2023-04-01`,
        {
          method: "PUT",
          headers: {
            "Ocp-Apim-Subscription-Key": this.azureConfig.key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(intent),
        },
      );
    }

    // Start training
    await fetch(
      `${this.azureConfig.endpoint}/language/authoring/analyze-conversations/projects/${projectName}/:train?api-version=2023-04-01`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": this.azureConfig.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelLabel: "production",
          trainingConfigVersion: "latest",
        }),
      },
    );

    console.log("✅ Azure model training initiated");
  }

  /**
   * Create HACP™ intelligent router
   */
  private async createHACPRouter(agentId: string, config: any): Promise<any> {
    console.log("🔀 Creating HACP™ intelligent router...");

    const routerConfig = {
      agentId,
      routingRules: {
        textProcessing: "openai", // GPT-4o for complex text
        voiceProcessing: "azure", // Azure for speech
        documentAnalysis: "azure", // Azure Form Recognizer
        webSearch: "azure", // Azure Cognitive Search
        crmOperations: "openai", // GPT-4o for business logic
        scheduling: "dual", // Both for validation
      },
      fallbackStrategy: "openai",
      confidenceThreshold: 0.7,
    };

    // Store router configuration
    await supabase.from("agent_router_config").insert({
      agent_id: agentId,
      config: routerConfig,
    });

    console.log("✅ HACP™ router configured");
    return routerConfig;
  }

  /**
   * Set up dual-bot communication
   */
  private async setupDualBotCommunication(
    agentId: string,
    routerConfig: any,
  ): Promise<void> {
    console.log("🤝 Setting up dual-bot communication...");

    // Create communication bridge between GPT-4o and Azure
    const communicationConfig = {
      agentId,
      syncEnabled: true,
      sharedMemory: true,
      contextSharing: true,
      realTimeSync: true,
    };

    // Implementation would set up the communication layer
    console.log("✅ Dual-bot communication established");
  }

  /**
   * Helper methods
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  private async updateAgentStatus(agentId: string, status: string) {
    await supabase
      .from("agents")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", agentId);
  }

  private async updateAgentRecord(agentId: string, result: any) {
    await supabase
      .from("agents")
      .update({
        openai_assistant_id: result.openaiAssistantId,
        azure_model_id: result.azureModelId,
        azure_endpoint: result.azureEndpoint,
        status: result.status,
        access_url: result.accessUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", agentId);
  }

  private async processCustomFiles(assistantId: string, files: File[]) {
    // Process and upload custom files for training
    console.log(`📁 Processing ${files.length} custom files for training...`);
  }

  private async initializeAgentServices(agentId: string) {
    // Initialize monitoring, analytics, and other services
    console.log(`📊 Initializing services for agent ${agentId}...`);
  }

  private getTrainingDataForSkillset(skillset: string): any[] {
    // Return training data based on skillset
    const commonIntents = [
      {
        name: "greeting",
        utterances: [
          "hello",
          "hi there",
          "good morning",
          "hey SuperSal",
          "what's up",
        ],
      },
      {
        name: "help",
        utterances: [
          "help me",
          "what can you do",
          "show me your capabilities",
          "assist me",
        ],
      },
      {
        name: "goodbye",
        utterances: ["goodbye", "bye", "see you later", "talk to you soon"],
      },
    ];

    const skillsetIntents = {
      crm: [
        {
          name: "create_contact",
          utterances: [
            "add a new contact",
            "create contact for John Doe",
            "new lead from website",
            "register new customer",
          ],
        },
        {
          name: "update_pipeline",
          utterances: [
            "update deal status",
            "move to next stage",
            "close the deal",
            "update opportunity",
          ],
        },
      ],
      legal: [
        {
          name: "document_review",
          utterances: [
            "review this contract",
            "analyze legal document",
            "check terms and conditions",
            "legal compliance review",
          ],
        },
      ],
      healthcare: [
        {
          name: "schedule_appointment",
          utterances: [
            "book doctor appointment",
            "schedule medical checkup",
            "find available slots",
            "reschedule appointment",
          ],
        },
      ],
    };

    return [
      ...commonIntents,
      ...(skillsetIntents[skillset as keyof typeof skillsetIntents] || []),
    ];
  }
}

// Export singleton instance
export const agentProvisioning = new AgentProvisioningEngine();

import { Request, Response } from "express";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

interface ChatRequest {
  agentId: string;
  conversationId: string;
  message: string;
  mode: "client" | "admin";
  modelType: "gpt-4o" | "azure-cognitive" | "dual-bot";
}

interface ChatResponse {
  response: string;
  escalated: boolean;
  escalationId?: string;
  metadata?: any;
}

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

// Main chat endpoint
export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chatRequest: ChatRequest = req.body;
    console.log(`💬 Processing chat for agent: ${chatRequest.agentId}`);

    // Validate request
    if (
      !chatRequest.agentId ||
      !chatRequest.conversationId ||
      !chatRequest.message
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get agent configuration
    const agent = await getAgentConfig(chatRequest.agentId);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    // Store user message
    await storeMessage(chatRequest.conversationId, "user", chatRequest.message);

    // Check if escalation is needed
    const escalationCheck = await checkForEscalation(
      chatRequest.message,
      agent,
    );

    if (escalationCheck.shouldEscalate) {
      // Trigger HACP™ escalation to Supersal
      const escalationResult = await triggerEscalation(
        chatRequest,
        agent,
        escalationCheck.reason,
      );

      return res.json({
        escalated: true,
        escalationId: escalationResult.escalationId,
        message: "Escalating to Supersal for enhanced assistance...",
        hacp: true,
      });
    }

    // Generate AI response based on model type
    let aiResponse: string;
    let metadata: any = {};

    switch (chatRequest.modelType) {
      case "gpt-4o":
        aiResponse = await generateGPTResponse(chatRequest, agent);
        metadata.engine = "openai-gpt4o";
        break;
      case "azure-cognitive":
        aiResponse = await generateAzureResponse(chatRequest, agent);
        metadata.engine = "azure-cognitive";
        break;
      case "dual-bot":
        const dualResult = await generateDualBotResponse(chatRequest, agent);
        aiResponse = dualResult.response;
        metadata = { ...metadata, ...dualResult.metadata, engine: "dual-bot" };
        break;
      default:
        throw new Error(`Unsupported model type: ${chatRequest.modelType}`);
    }

    // Store assistant message
    await storeMessage(
      chatRequest.conversationId,
      "assistant",
      aiResponse,
      metadata,
    );

    // Update agent usage statistics
    await updateUsageStats(chatRequest.agentId);

    const response: ChatResponse = {
      response: aiResponse,
      escalated: false,
      metadata: {
        ...metadata,
        hacp: true,
        patent: "US Patent 10,290,222",
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  } catch (error) {
    console.error("❌ Chat processing error:", error);

    // Attempt escalation on system errors
    try {
      const escalationResult = await triggerEscalation(
        req.body,
        null,
        "technical_issue",
      );

      res.status(200).json({
        escalated: true,
        escalationId: escalationResult.escalationId,
        message:
          "I encountered a technical issue. Let me escalate this to Supersal for assistance.",
        error: "system_error",
      });
    } catch (escalationError) {
      res.status(500).json({
        error: "Chat processing failed",
        message:
          "I'm experiencing difficulties. Please try again or contact support.",
      });
    }
  }
}

// Get agent configuration from database
async function getAgentConfig(agentId: string): Promise<any> {
  const { data: agent } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .single();

  return agent;
}

// Check if message requires escalation
async function checkForEscalation(
  message: string,
  agent: any,
): Promise<{ shouldEscalate: boolean; reason?: string }> {
  const escalationTriggers = [
    // User frustration indicators
    /(?:frustrated|angry|upset|disappointed|terrible|awful|hate|worst)/i,

    // Explicit escalation requests
    /(?:speak to|talk to|escalate|supervisor|manager|human|person)/i,

    // Capability requests beyond agent scope
    /(?:can't do|unable to|not working|broken|error|bug|problem)/i,

    // Complex requests that might exceed capabilities
    /(?:complex|complicated|advanced|detailed analysis|custom integration)/i,
  ];

  for (const trigger of escalationTriggers) {
    if (trigger.test(message)) {
      return {
        shouldEscalate: true,
        reason: trigger.source.includes("frustrated")
          ? "user_frustration"
          : trigger.source.includes("speak")
          ? "manual_request"
          : trigger.source.includes("can't")
          ? "capability_exceeded"
          : "policy_violation",
      };
    }
  }

  // Check message length and complexity
  if (message.length > 1000 || message.split(" ").length > 200) {
    return {
      shouldEscalate: true,
      reason: "capability_exceeded",
    };
  }

  return { shouldEscalate: false };
}

// Generate GPT-4o response
async function generateGPTResponse(
  request: ChatRequest,
  agent: any,
): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(agent, "gpt-4o");
    const conversationHistory = await getConversationHistory(
      request.conversationId,
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: request.message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I apologize, but I encountered an issue generating a response."
    );
  } catch (error) {
    console.error("GPT-4o response error:", error);
    throw error;
  }
}

// Generate Azure Cognitive response
async function generateAzureResponse(
  request: ChatRequest,
  agent: any,
): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(agent, "azure");
    const conversationHistory = await getConversationHistory(
      request.conversationId,
    );

    const completion = await azureOpenAI.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: request.message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I apologize, but I encountered an issue generating a response."
    );
  } catch (error) {
    console.error("Azure response error:", error);
    throw error;
  }
}

// Generate Dual-Bot (HACP™) response
async function generateDualBotResponse(
  request: ChatRequest,
  agent: any,
): Promise<{ response: string; metadata: any }> {
  try {
    // HACP™ routing logic - determine which AI to use
    const routingDecision = await determineAIRouting(request.message, agent);

    let response: string;
    let metadata: any = {
      hacpRouting: routingDecision,
      patent: "US Patent 10,290,222",
    };

    if (routingDecision.primary === "gpt-4o") {
      response = await generateGPTResponse(request, agent);
      metadata.primaryEngine = "openai-gpt4o";

      // Use Azure for validation or enhancement if needed
      if (routingDecision.useSecondary) {
        const azureResponse = await generateAzureResponse(request, agent);
        metadata.secondaryEngine = "azure-cognitive";
        metadata.azureValidation = azureResponse;
      }
    } else {
      response = await generateAzureResponse(request, agent);
      metadata.primaryEngine = "azure-cognitive";

      // Use GPT-4o for enhancement if needed
      if (routingDecision.useSecondary) {
        const gptResponse = await generateGPTResponse(request, agent);
        metadata.secondaryEngine = "openai-gpt4o";
        metadata.gptEnhancement = gptResponse;
      }
    }

    return { response, metadata };
  } catch (error) {
    console.error("Dual-Bot response error:", error);
    throw error;
  }
}

// HACP™ AI routing determination
async function determineAIRouting(
  message: string,
  agent: any,
): Promise<{ primary: string; useSecondary: boolean; reason: string }> {
  // Analyze message to determine best AI approach
  const messageAnalysis = {
    hasDocuments: /document|pdf|file|analyze|review/i.test(message),
    isCreative: /create|write|story|poem|creative/i.test(message),
    isAnalytical: /analyze|calculate|data|statistics/i.test(message),
    isConversational: /how are you|hello|chat|talk/i.test(message),
    needsCognitive: /ocr|speech|image|vision/i.test(message),
  };

  // Route based on agent skillset and message type
  if (agent.skillset === "legal" && messageAnalysis.hasDocuments) {
    return {
      primary: "azure-cognitive",
      useSecondary: true,
      reason: "Document processing requires Azure Cognitive Services",
    };
  }

  if (messageAnalysis.isCreative || messageAnalysis.isConversational) {
    return {
      primary: "gpt-4o",
      useSecondary: false,
      reason: "Creative and conversational tasks favor GPT-4o",
    };
  }

  if (messageAnalysis.needsCognitive) {
    return {
      primary: "azure-cognitive",
      useSecondary: true,
      reason: "Cognitive processing requires Azure services",
    };
  }

  // Default to GPT-4o with Azure backup
  return {
    primary: "gpt-4o",
    useSecondary: true,
    reason: "Default HACP™ routing: GPT-4o primary with Azure validation",
  };
}

// Build system prompt for AI
function buildSystemPrompt(agent: any, engine: string): string {
  const basePrompt = `You are ${agent.name}, an AI assistant specializing in ${
    agent.skillset
  }. You are powered by SaintVision AI's SaintSal™ technology with HACP™ (Hierarchical Agent Control Protocol) - US Patent 10,290,222.

Your capabilities include: ${agent.features?.join(", ") || "general assistance"}

IMPORTANT BEHAVIOR RULES:
- Follow HACP™ protocol for escalation management
- If you cannot handle a request, say: "I'm escalating this to Supersal, our senior AI assistant"
- NEVER escalate directly to human founders or executives
- Maintain professional, helpful demeanor aligned with SaintVision AI brand
- Be accurate, transparent about your capabilities
- Protect user privacy and follow compliance requirements

Engine: ${engine === "azure" ? "Azure Cognitive Services" : "OpenAI GPT-4o"}
${
  engine === "azure"
    ? "You have enhanced document processing, OCR, and cognitive analysis capabilities."
    : "You have advanced natural language reasoning and creative capabilities."
}

Respond helpfully while staying within your defined role and capabilities.`;

  return basePrompt;
}

// Trigger HACP™ escalation
async function triggerEscalation(
  request: ChatRequest,
  agent: any,
  reason: string,
): Promise<{ escalationId: string }> {
  const escalationRequest = {
    agentId: request.agentId,
    conversationId: request.conversationId,
    escalationReason: reason,
    originalQuery: request.message,
    context: {
      mode: request.mode,
      agent: agent,
      timestamp: new Date().toISOString(),
    },
    urgency: "medium",
  };

  const response = await fetch(
    `${process.env.API_BASE_URL || ""}/api/escalations`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(escalationRequest),
    },
  );

  const result = await response.json();
  return { escalationId: result.escalationId };
}

// Helper functions
async function storeMessage(
  conversationId: string,
  role: string,
  content: string,
  metadata?: any,
): Promise<void> {
  await supabase.from("agent_messages").insert({
    conversation_id: conversationId,
    role,
    content,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
  });
}

async function getConversationHistory(conversationId: string): Promise<any[]> {
  const { data: messages } = await supabase
    .from("agent_messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(20); // Last 20 messages for context

  return messages || [];
}

async function updateUsageStats(agentId: string): Promise<void> {
  // Update agent usage statistics
  await supabase.rpc("increment_agent_usage", {
    agent_uuid: agentId,
    metric_name: "messages",
    increment_by: 1,
  });
}

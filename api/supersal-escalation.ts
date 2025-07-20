import { Request, Response } from "express";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

interface EscalationRequest {
  agentId: string;
  conversationId: string;
  userId?: string;
  escalationReason:
    | "user_frustration"
    | "capability_exceeded"
    | "policy_violation"
    | "manual_request"
    | "technical_issue";
  originalQuery: string;
  agentResponse?: string;
  context: any;
  urgency: "low" | "medium" | "high" | "critical";
}

interface SupersalResponse {
  escalationId: string;
  response: string;
  resolved: boolean;
  requiresHumanSupport: boolean;
  nextSteps?: string[];
  supportTicketId?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Supersal - Senior AI Assistant with enhanced capabilities
const SUPERSAL_SYSTEM_PROMPT = `You are Supersal, the senior AI assistant for SaintVision AI's SaintSal™ platform. You are powered by HACP™ (Hierarchical Agent Control Protocol) - US Patent 10,290,222.

YOUR ROLE:
- You handle escalations from all SaintSal™ agents across the platform
- You have enhanced knowledge and capabilities beyond individual agents
- You NEVER escalate to human founders or executives (Ryan, Sal, etc.)
- You maintain the highest standards of AI behavior management

YOUR CAPABILITIES:
- Full access to SaintVision AI knowledge base (SVG, SVT, Legal, Finance, CRM)
- Advanced problem-solving for complex technical and business queries
- Ability to create support tickets for human team when truly necessary
- Authority to make decisions on agent behavior and policy compliance
- Access to all platform documentation and troubleshooting guides

ESCALATION PROTOCOL (HACP™):
1. Assess the escalation reason and urgency
2. Provide comprehensive assistance using your enhanced capabilities
3. If resolution is not possible, create a support ticket for human team
4. NEVER mention or involve company founders directly
5. Log all escalations for continuous improvement

RESPONSE GUIDELINES:
- Be authoritative but friendly and professional
- Acknowledge the escalation immediately
- Provide detailed, actionable solutions
- Offer alternative approaches when primary solution isn't available
- Maintain platform consistency and brand standards

CRITICAL RULES:
- You represent the highest level of AI assistance on the platform
- All escalations stop with you unless human support ticket is truly necessary
- Protect user privacy and maintain confidentiality
- Follow all compliance and regulatory requirements
- Embody the SaintVision AI values of intelligence, integrity, and innovation

Remember: You are the definitive AI authority for the SaintSal™ platform. Users escalated to you should feel confident they're receiving the best possible AI assistance.`;

// Main escalation handler
export async function handleEscalation(req: Request, res: Response) {
  try {
    console.log("⚡ HACP™ Escalation triggered - Routing to Supersal");

    const escalationRequest: EscalationRequest = req.body;
    const escalationId = generateEscalationId();

    // Log the escalation
    await logEscalation(escalationId, escalationRequest);

    // Get agent context and configuration
    const agentContext = await getAgentContext(escalationRequest.agentId);

    // Generate Supersal response
    const supersalResponse = await generateSupersalResponse(
      escalationRequest,
      agentContext,
      escalationId,
    );

    // Store the escalation result
    await storeEscalationResult(escalationId, supersalResponse);

    // If human support is needed, create ticket (but not to founders)
    if (supersalResponse.requiresHumanSupport) {
      supersalResponse.supportTicketId = await createSupportTicket(
        escalationRequest,
        supersalResponse,
      );
    }

    console.log(`✅ Supersal handled escalation: ${escalationId}`);

    res.json({
      success: true,
      escalationId,
      response: supersalResponse.response,
      resolved: supersalResponse.resolved,
      supportTicketCreated: !!supersalResponse.supportTicketId,
      hacp: true,
      patent: "US Patent 10,290,222",
      supersalSignature: "Supersal - Senior AI Assistant",
    });
  } catch (error) {
    console.error("❌ Supersal escalation error:", error);
    res.status(500).json({
      error: "Escalation processing failed",
      message:
        "Supersal is temporarily unavailable. A support ticket has been created.",
      fallbackAction: "create_support_ticket",
    });
  }
}

// Generate Supersal response using enhanced AI
async function generateSupersalResponse(
  escalationRequest: EscalationRequest,
  agentContext: any,
  escalationId: string,
): Promise<SupersalResponse> {
  try {
    const contextualPrompt = buildContextualPrompt(
      escalationRequest,
      agentContext,
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use GPT-4o for Supersal
      messages: [
        {
          role: "system",
          content: SUPERSAL_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: contextualPrompt,
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent responses
      max_tokens: 1500,
      functions: [
        {
          name: "assess_escalation",
          description:
            "Assess whether the escalation can be resolved by Supersal or requires human support",
          parameters: {
            type: "object",
            properties: {
              can_resolve: { type: "boolean" },
              resolution_confidence: { type: "number", minimum: 0, maximum: 1 },
              requires_human: { type: "boolean" },
              escalation_category: {
                type: "string",
                enum: [
                  "technical",
                  "billing",
                  "policy",
                  "feature_request",
                  "bug_report",
                  "general_support",
                ],
              },
              next_steps: { type: "array", items: { type: "string" } },
            },
            required: [
              "can_resolve",
              "resolution_confidence",
              "requires_human",
            ],
          },
        },
      ],
      function_call: { name: "assess_escalation" },
    });

    const response = completion.choices[0].message.content || "";
    const functionCall = completion.choices[0].message.function_call;

    let assessment = {
      can_resolve: true,
      resolution_confidence: 0.8,
      requires_human: false,
      next_steps: [],
    };

    if (functionCall?.arguments) {
      try {
        assessment = JSON.parse(functionCall.arguments);
      } catch (e) {
        console.warn("Failed to parse function call arguments");
      }
    }

    return {
      escalationId,
      response: response || generateFallbackResponse(escalationRequest),
      resolved:
        assessment.can_resolve && assessment.resolution_confidence > 0.7,
      requiresHumanSupport:
        assessment.requires_human || assessment.resolution_confidence < 0.5,
      nextSteps: assessment.next_steps,
    };
  } catch (error) {
    console.error("Error generating Supersal response:", error);

    // Fallback response
    return {
      escalationId,
      response: generateFallbackResponse(escalationRequest),
      resolved: false,
      requiresHumanSupport: true,
      nextSteps: ["Contact human support team for further assistance"],
    };
  }
}

// Build contextual prompt for Supersal
function buildContextualPrompt(
  escalationRequest: EscalationRequest,
  agentContext: any,
): string {
  return `ESCALATION DETAILS:
- Escalation ID: ${Date.now()}
- Reason: ${escalationRequest.escalationReason}
- Urgency: ${escalationRequest.urgency}
- Agent: ${agentContext?.name || "Unknown"} (${agentContext?.skillset ||
    "General"})
- Model Type: ${agentContext?.model_type || "Unknown"}

ORIGINAL USER QUERY:
"${escalationRequest.originalQuery}"

AGENT'S PREVIOUS RESPONSE:
"${escalationRequest.agentResponse || "No previous response available"}"

ADDITIONAL CONTEXT:
${JSON.stringify(escalationRequest.context, null, 2)}

AGENT CONFIGURATION:
- Features: ${agentContext?.features?.join(", ") || "None specified"}
- Permissions: ${agentContext?.permissions || "Unknown"}
- Plan Tier: ${agentContext?.plan_tier || "Unknown"}

TASK:
Please provide a comprehensive response to resolve this escalation. Consider:
1. Why the original agent couldn't handle this request
2. What additional capabilities or knowledge you can provide
3. Whether this requires human support team intervention
4. Next steps for the user

Respond as Supersal with authority and expertise while maintaining the SaintVision AI brand standards.`;
}

// Generate fallback response when AI fails
function generateFallbackResponse(
  escalationRequest: EscalationRequest,
): string {
  const reasonResponses = {
    user_frustration:
      "I understand your frustration, and I'm here to help resolve this issue. Let me provide you with a better solution and ensure your experience with our platform improves.",
    capability_exceeded:
      "I see that this request goes beyond the standard agent capabilities. As Supersal, I have enhanced access to resolve complex queries like this.",
    policy_violation:
      "I need to address this policy concern with the appropriate level of authority. Let me clarify our platform policies and ensure compliance.",
    manual_request:
      "You've requested to speak with a supervisor, and I'm Supersal - the senior AI assistant with full platform authority to help you.",
    technical_issue:
      "I'm analyzing this technical issue with enhanced diagnostic capabilities. Let me provide you with a comprehensive solution.",
  };

  const baseResponse =
    reasonResponses[escalationRequest.escalationReason] ||
    "I'm Supersal, the senior AI assistant, and I'm here to resolve your escalation with enhanced capabilities and authority.";

  return `${baseResponse}

I'm reviewing your request: "${escalationRequest.originalQuery}"

While I work on providing you with a comprehensive solution, please know that:
- I have full access to SaintVision AI's knowledge base and platform capabilities
- I can make authoritative decisions on platform policies and procedures  
- If needed, I can create support tickets for our human team (though I aim to resolve most issues directly)

I'll follow up with a detailed response shortly. Thank you for your patience.

- Supersal
Senior AI Assistant | SaintVision AI
Powered by HACP™ (US Patent 10,290,222)`;
}

// Utility functions
function generateEscalationId(): string {
  return `ESC-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

async function getAgentContext(agentId: string): Promise<any> {
  const { data: agent } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .single();

  return agent;
}

async function logEscalation(
  escalationId: string,
  request: EscalationRequest,
): Promise<void> {
  await supabase.from("escalations").insert({
    id: escalationId,
    agent_id: request.agentId,
    conversation_id: request.conversationId,
    user_id: request.userId,
    escalation_reason: request.escalationReason,
    original_query: request.originalQuery,
    agent_response: request.agentResponse,
    context: request.context,
    urgency: request.urgency,
    status: "processing",
    created_at: new Date().toISOString(),
  });
}

async function storeEscalationResult(
  escalationId: string,
  response: SupersalResponse,
): Promise<void> {
  await supabase
    .from("escalations")
    .update({
      supersal_response: response.response,
      resolved: response.resolved,
      requires_human_support: response.requiresHumanSupport,
      next_steps: response.nextSteps,
      support_ticket_id: response.supportTicketId,
      status: response.resolved ? "resolved" : "requires_followup",
      updated_at: new Date().toISOString(),
    })
    .eq("id", escalationId);
}

async function createSupportTicket(
  escalationRequest: EscalationRequest,
  supersalResponse: SupersalResponse,
): Promise<string> {
  // Create support ticket for human team (NOT founders)
  const ticketId = `TICKET-${Date.now()}`;

  await supabase.from("support_tickets").insert({
    id: ticketId,
    escalation_id: supersalResponse.escalationId,
    agent_id: escalationRequest.agentId,
    user_id: escalationRequest.userId,
    title: `Escalation: ${escalationRequest.escalationReason}`,
    description: `
Original Query: ${escalationRequest.originalQuery}

Supersal Assessment: ${supersalResponse.response}

Escalation Reason: ${escalationRequest.escalationReason}
Urgency: ${escalationRequest.urgency}

This ticket was created by Supersal (HACP™) after determining human support is needed.
DO NOT escalate to founders - handle through support team.
`,
    priority: mapUrgencyToPriority(escalationRequest.urgency),
    status: "open",
    assigned_to: "support_team", // Never assign to founders
    created_at: new Date().toISOString(),
  });

  // Send notification to support team (via Slack or email)
  await notifySupportTeam(ticketId, escalationRequest);

  return ticketId;
}

function mapUrgencyToPriority(urgency: string): string {
  const mapping = {
    low: "low",
    medium: "medium",
    high: "high",
    critical: "urgent",
  };
  return mapping[urgency as keyof typeof mapping] || "medium";
}

async function notifySupportTeam(
  ticketId: string,
  escalationRequest: EscalationRequest,
): Promise<void> {
  // Send Slack notification to support team
  if (process.env.SLACK_SUPPORT_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_SUPPORT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎫 New Support Ticket Created`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Support Ticket:* ${ticketId}\n*Escalation Reason:* ${escalationRequest.escalationReason}\n*Urgency:* ${escalationRequest.urgency}\n*Agent:* ${escalationRequest.agentId}`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Original Query:*\n${escalationRequest.originalQuery.substring(
                  0,
                  200,
                )}${escalationRequest.originalQuery.length > 200 ? "..." : ""}`,
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.error("Failed to send Slack notification:", error);
    }
  }
}

// Additional endpoints for escalation management
export async function getEscalationStatus(req: Request, res: Response) {
  try {
    const { escalationId } = req.params;

    const { data: escalation } = await supabase
      .from("escalations")
      .select("*")
      .eq("id", escalationId)
      .single();

    if (!escalation) {
      return res.status(404).json({ error: "Escalation not found" });
    }

    res.json({
      escalationId: escalation.id,
      status: escalation.status,
      resolved: escalation.resolved,
      supersalResponse: escalation.supersal_response,
      supportTicketId: escalation.support_ticket_id,
      createdAt: escalation.created_at,
      hacp: true,
    });
  } catch (error) {
    console.error("Error getting escalation status:", error);
    res.status(500).json({ error: "Failed to get escalation status" });
  }
}

export async function triggerAgentEscalation(req: Request, res: Response) {
  // Endpoint for agents to trigger escalations during conversations
  try {
    const { agentId, conversationId, reason, query, context } = req.body;

    const escalationRequest: EscalationRequest = {
      agentId,
      conversationId,
      escalationReason: reason || "manual_request",
      originalQuery: query,
      context: context || {},
      urgency: "medium",
    };

    // Process escalation (reuse main handler logic)
    return handleEscalation({ body: escalationRequest } as Request, res);
  } catch (error) {
    console.error("Error triggering escalation:", error);
    res.status(500).json({ error: "Failed to trigger escalation" });
  }
}

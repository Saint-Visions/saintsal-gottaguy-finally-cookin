import type { VercelRequest, VercelResponse } from "@vercel/node";

// Your GHL API configuration
const GHL_API_KEY = "pit-2f264858-06c7-402c-9ff2-59124bfff8f8";
const GHL_BASE_URL = "https://rest.gohighlevel.com/v1";

interface GHLAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Helper function to make GHL API calls
async function callGHLAPI(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
): Promise<GHLAPIResponse> {
  try {
    const response = await fetch(`${GHL_BASE_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("GHL API Error:", error);
    return { success: false, error: error.message };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action } = req.query;

  try {
    switch (action) {
      case "create-contact":
        return await handleCreateContact(req, res);

      case "create-opportunity":
        return await handleCreateOpportunity(req, res);

      case "log-conversation":
        return await handleLogConversation(req, res);

      case "send-message":
        return await handleSendMessage(req, res);

      case "get-locations":
        return await handleGetLocations(req, res);

      default:
        return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("CRM Action Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleCreateContact(req: VercelRequest, res: VercelResponse) {
  const { firstName, lastName, email, phone, notes, source, locationId } =
    req.body;

  // Default to your main location if not specified
  const targetLocationId = locationId || "your-default-location-id";

  const contactData = {
    firstName,
    lastName,
    email,
    phone,
    source: source || "SaintSal AI Assistant",
    tags: ["SaintSal", "AI Generated"],
    customField: {
      aiNotes: notes || "",
      createdBy: "SaintSal AI",
      createdAt: new Date().toISOString(),
    },
  };

  const result = await callGHLAPI(
    `/contacts?locationId=${targetLocationId}`,
    "POST",
    contactData,
  );

  if (result.success) {
    console.log(`✅ Contact created: ${firstName} ${lastName}`);
    return res.status(200).json({
      success: true,
      contactId: result.data.contact?.id,
      message: `Contact ${firstName} ${lastName} added to CRM`,
      data: result.data,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result.error,
      message: "Failed to create contact in CRM",
    });
  }
}

async function handleCreateOpportunity(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { title, value, contactId, stage, locationId } = req.body;

  const targetLocationId = locationId || "your-default-location-id";

  const opportunityData = {
    title,
    monetaryValue: value,
    contactId,
    pipelineStageId: stage || "new",
    source: "SaintSal AI",
  };

  const result = await callGHLAPI(
    `/opportunities?locationId=${targetLocationId}`,
    "POST",
    opportunityData,
  );

  if (result.success) {
    console.log(`💰 Opportunity created: ${title} ($${value})`);
    return res.status(200).json({
      success: true,
      opportunityId: result.data.opportunity?.id,
      message: `Opportunity "${title}" created`,
      data: result.data,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result.error,
      message: "Failed to create opportunity",
    });
  }
}

async function handleLogConversation(req: VercelRequest, res: VercelResponse) {
  const { contactId, summary, conversation, loggedBy } = req.body;

  const taskData = {
    title: "SaintSal AI Conversation Log",
    body: `Summary: ${summary}\n\nConversation:\n${conversation}`,
    contactId,
    type: "call",
    status: "completed",
    assignedTo: loggedBy || "SaintSal AI",
    dueDate: new Date().toISOString(),
  };

  const result = await callGHLAPI(
    `/contacts/${contactId}/tasks`,
    "POST",
    taskData,
  );

  if (result.success) {
    console.log(`📝 Conversation logged for contact: ${contactId}`);
    return res.status(200).json({
      success: true,
      message: "Conversation logged to CRM",
      data: result.data,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result.error,
      message: "Failed to log conversation",
    });
  }
}

async function handleSendMessage(req: VercelRequest, res: VercelResponse) {
  const { contactId, message, sentBy, locationId } = req.body;

  const targetLocationId = locationId || "your-default-location-id";

  const messageData = {
    contactId,
    message,
    type: "SMS",
    html: false,
  };

  const result = await callGHLAPI(
    `/conversations/messages?locationId=${targetLocationId}`,
    "POST",
    messageData,
  );

  if (result.success) {
    console.log(`📱 Message sent to contact: ${contactId}`);
    return res.status(200).json({
      success: true,
      message: "Message sent via CRM",
      data: result.data,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result.error,
      message: "Failed to send message",
    });
  }
}

async function handleGetLocations(req: VercelRequest, res: VercelResponse) {
  const result = await callGHLAPI("/locations");

  if (result.success) {
    return res.status(200).json({
      success: true,
      locations: result.data.locations || [],
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }
}

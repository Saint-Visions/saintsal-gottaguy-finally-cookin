import type { VercelRequest, VercelResponse } from "@vercel/node";

interface GHLWebhookPayload {
  type: string;
  locationId: string;
  contactId?: string;
  opportunityId?: string;
  appointmentId?: string;
  data: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    source?: string;
    tags?: string[];
    customFields?: Record<string, any>;
    dateAdded?: string;
    dateUpdated?: string;
    [key: string]: any;
  };
  timestamp: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Quickly respond to acknowledge receipt
    res
      .status(200)
      .json({ received: true, timestamp: new Date().toISOString() });

    const payload: GHLWebhookPayload = req.body;

    // Validate webhook payload
    if (!payload.type || !payload.locationId) {
      console.warn("Invalid GHL webhook payload:", payload);
      return;
    }

    // Log the event for debugging
    console.log(`🔄 GHL Webhook: ${payload.type}`, {
      locationId: payload.locationId,
      timestamp: payload.timestamp,
      data: payload.data,
    });

    // Process the webhook based on event type
    await processWebhookEvent(payload);
  } catch (error) {
    console.error("❌ Error processing GHL webhook:", error);
    // Note: We already sent 200 response, so don't send error response
  }
}

async function processWebhookEvent(payload: GHLWebhookPayload) {
  const { type, data, locationId } = payload;

  switch (type) {
    case "contact.created":
      console.log(
        `✅ New Contact: ${data.firstName} ${data.lastName} (${data.email})`,
      );
      await notifyNewContact(data, locationId);
      break;

    case "contact.updated":
      console.log(`📝 Contact Updated: ${data.firstName} ${data.lastName}`);
      break;

    case "opportunity.created":
      console.log(`💰 New Opportunity: ${data.title} ($${data.monetaryValue})`);
      await notifyNewOpportunity(data, locationId);
      break;

    case "appointment.created":
    case "appointment.booked":
      console.log(`📅 Appointment Booked: ${data.startTime}`);
      await notifyNewAppointment(data, locationId);
      break;

    case "conversation.message":
      console.log(`💬 New Message from ${data.contactId}`);
      break;

    default:
      console.log(`ℹ️ Unhandled GHL event: ${type}`);
  }
}

async function notifyNewContact(data: any, locationId: string) {
  // In production, this would:
  // 1. Find the user workspace linked to this GHL location
  // 2. Store the contact in Supabase
  // 3. Send real-time notification to the user's dashboard
  // 4. Potentially trigger AI actions

  console.log(`🎯 Processing new contact for location: ${locationId}`);

  // TODO: Implement Supabase integration
  // const { data: workspace } = await supabase
  //   .from('workspaces')
  //   .select('user_id, id')
  //   .eq('ghl_location_id', locationId)
  //   .single();
}

async function notifyNewOpportunity(data: any, locationId: string) {
  console.log(`🎯 Processing new opportunity for location: ${locationId}`);

  // TODO: Implement opportunity sync
}

async function notifyNewAppointment(data: any, locationId: string) {
  console.log(`🎯 Processing new appointment for location: ${locationId}`);

  // TODO: Implement appointment sync
}

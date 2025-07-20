import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

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

/**
 * Handle incoming webhooks from GoHighLevel
 * Events: contact.created, contact.updated, opportunity.created, appointment.booked, etc.
 */
export async function handleGHLWebhook(req: Request, res: Response) {
  try {
    // Quickly respond to acknowledge receipt
    res.status(200).json({ received: true });

    const payload: GHLWebhookPayload = req.body;

    // Validate webhook (in production, verify GHL signature/token)
    if (!payload.type || !payload.locationId) {
      console.warn("Invalid GHL webhook payload:", payload);
      return;
    }

    // Log the event for debugging
    console.log(`GHL Webhook: ${payload.type}`, {
      locationId: payload.locationId,
      timestamp: payload.timestamp,
      data: payload.data,
    });

    // Store webhook event in database
    await supabase.from("ghl_webhook_events").insert({
      event_type: payload.type,
      location_id: payload.locationId,
      payload: payload,
      processed_at: new Date().toISOString(),
    });

    // Process different event types
    switch (payload.type) {
      case "contact.created":
        await handleContactCreated(payload);
        break;

      case "contact.updated":
        await handleContactUpdated(payload);
        break;

      case "opportunity.created":
        await handleOpportunityCreated(payload);
        break;

      case "appointment.created":
      case "appointment.booked":
        await handleAppointmentBooked(payload);
        break;

      case "conversation.message":
        await handleNewMessage(payload);
        break;

      default:
        console.log(`Unhandled GHL event type: ${payload.type}`);
    }
  } catch (error) {
    console.error("Error processing GHL webhook:", error);
    // Note: We already sent 200 response, so don't send error response
  }
}

async function handleContactCreated(payload: GHLWebhookPayload) {
  const { data, locationId } = payload;

  try {
    // Find user workspace associated with this GHL location
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id, id")
      .eq("ghl_location_id", locationId)
      .single();

    if (!workspace) {
      console.warn(`No workspace found for GHL location: ${locationId}`);
      return;
    }

    // Create or update contact in our database
    const { error } = await supabase.from("contacts").upsert(
      {
        workspace_id: workspace.id,
        ghl_contact_id: data.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        source: data.source || "GHL",
        tags: data.tags || [],
        custom_fields: data.customFields || {},
        created_at: data.dateAdded,
        updated_at: data.dateUpdated,
      },
      {
        onConflict: "ghl_contact_id",
      },
    );

    if (error) {
      console.error("Error syncing contact:", error);
      return;
    }

    // Optional: Send real-time notification to user's dashboard
    await sendRealtimeNotification(workspace.user_id, {
      type: "contact_created",
      title: "New Contact Added",
      message: `${data.firstName} ${data.lastName} was added to your CRM`,
      data: {
        contactId: data.id,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
      },
    });

    console.log(
      `Contact synced: ${data.firstName} ${data.lastName} -> Workspace ${workspace.id}`,
    );
  } catch (error) {
    console.error("Error handling contact.created:", error);
  }
}

async function handleContactUpdated(payload: GHLWebhookPayload) {
  // Similar to handleContactCreated but for updates
  console.log("Contact updated:", payload.data);
}

async function handleOpportunityCreated(payload: GHLWebhookPayload) {
  const { data, locationId } = payload;

  try {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id, id")
      .eq("ghl_location_id", locationId)
      .single();

    if (!workspace) return;

    // Store opportunity in our database
    await supabase.from("opportunities").upsert(
      {
        workspace_id: workspace.id,
        ghl_opportunity_id: data.id,
        title: data.title || data.name,
        value: data.monetaryValue || 0,
        stage: data.stage,
        contact_id: data.contactId,
        created_at: data.dateAdded,
      },
      {
        onConflict: "ghl_opportunity_id",
      },
    );

    await sendRealtimeNotification(workspace.user_id, {
      type: "opportunity_created",
      title: "New Opportunity",
      message: `New opportunity: ${data.title ||
        "Untitled"} ($${data.monetaryValue || 0})`,
      data: { opportunityId: data.id },
    });
  } catch (error) {
    console.error("Error handling opportunity.created:", error);
  }
}

async function handleAppointmentBooked(payload: GHLWebhookPayload) {
  const { data, locationId } = payload;

  try {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id, id")
      .eq("ghl_location_id", locationId)
      .single();

    if (!workspace) return;

    await sendRealtimeNotification(workspace.user_id, {
      type: "appointment_booked",
      title: "New Appointment Booked",
      message: `Appointment scheduled for ${data.startTime}`,
      data: {
        appointmentId: data.id,
        startTime: data.startTime,
        contactId: data.contactId,
      },
    });
  } catch (error) {
    console.error("Error handling appointment.booked:", error);
  }
}

async function handleNewMessage(payload: GHLWebhookPayload) {
  // Handle new conversations/messages from GHL
  console.log("New message received:", payload.data);
}

async function sendRealtimeNotification(userId: string, notification: any) {
  try {
    // Send real-time notification via Supabase realtime
    await supabase.from("notifications").insert({
      user_id: userId,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      read: false,
      created_at: new Date().toISOString(),
    });

    console.log(`Notification sent to user ${userId}:`, notification.title);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

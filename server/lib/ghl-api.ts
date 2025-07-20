/**
 * GoHighLevel API Integration
 * Handles outgoing API calls to GHL for AI-driven actions
 */

interface GHLContact {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  locationId: string;
}

interface GHLOpportunity {
  title: string;
  monetaryValue?: number;
  contactId: string;
  pipelineId: string;
  pipelineStageId: string;
  locationId: string;
}

class GHLAPIClient {
  private apiKey: string;
  private baseUrl: string = "https://rest.gohighlevel.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: any,
  ) {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GHL API Error (${response.status}): ${error}`);
    }

    return await response.json();
  }

  /**
   * Create a new contact in GHL
   */
  async createContact(contactData: GHLContact) {
    try {
      const payload = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        source: contactData.source || "SaintVisionAI",
        tags: contactData.tags || [],
        customField: contactData.customFields || {},
      };

      const result = await this.makeRequest(
        `/contacts?locationId=${contactData.locationId}`,
        "POST",
        payload,
      );

      console.log("Contact created in GHL:", result);
      return result;
    } catch (error) {
      console.error("Error creating GHL contact:", error);
      throw error;
    }
  }

  /**
   * Update an existing contact in GHL
   */
  async updateContact(contactId: string, contactData: Partial<GHLContact>) {
    try {
      const result = await this.makeRequest(
        `/contacts/${contactId}`,
        "PUT",
        contactData,
      );
      return result;
    } catch (error) {
      console.error("Error updating GHL contact:", error);
      throw error;
    }
  }

  /**
   * Get contact by ID
   */
  async getContact(contactId: string) {
    try {
      return await this.makeRequest(`/contacts/${contactId}`);
    } catch (error) {
      console.error("Error fetching GHL contact:", error);
      throw error;
    }
  }

  /**
   * Search contacts by email or phone
   */
  async searchContacts(locationId: string, query: string) {
    try {
      return await this.makeRequest(
        `/contacts/search?locationId=${locationId}&query=${encodeURIComponent(
          query,
        )}`,
      );
    } catch (error) {
      console.error("Error searching GHL contacts:", error);
      throw error;
    }
  }

  /**
   * Create a new opportunity
   */
  async createOpportunity(opportunityData: GHLOpportunity) {
    try {
      const result = await this.makeRequest(
        `/opportunities?locationId=${opportunityData.locationId}`,
        "POST",
        opportunityData,
      );
      return result;
    } catch (error) {
      console.error("Error creating GHL opportunity:", error);
      throw error;
    }
  }

  /**
   * Get all pipelines for a location
   */
  async getPipelines(locationId: string) {
    try {
      return await this.makeRequest(`/pipelines?locationId=${locationId}`);
    } catch (error) {
      console.error("Error fetching GHL pipelines:", error);
      throw error;
    }
  }

  /**
   * Create a task/note for a contact
   */
  async createTask(contactId: string, taskData: any) {
    try {
      return await this.makeRequest(
        `/contacts/${contactId}/tasks`,
        "POST",
        taskData,
      );
    } catch (error) {
      console.error("Error creating GHL task:", error);
      throw error;
    }
  }

  /**
   * Send SMS message via GHL
   */
  async sendSMS(contactId: string, message: string, locationId: string) {
    try {
      const payload = {
        contactId,
        message,
        type: "SMS",
      };

      return await this.makeRequest(
        `/conversations/messages?locationId=${locationId}`,
        "POST",
        payload,
      );
    } catch (error) {
      console.error("Error sending GHL SMS:", error);
      throw error;
    }
  }

  /**
   * Create calendar appointment
   */
  async createAppointment(appointmentData: any) {
    try {
      return await this.makeRequest("/appointments", "POST", appointmentData);
    } catch (error) {
      console.error("Error creating GHL appointment:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const ghlAPI = new GHLAPIClient(process.env.GHL_API_KEY || "");

/**
 * AI-driven helper functions for SaintSal Boss Mode
 */
export class SaintSalCRMActions {
  /**
   * Create contact from AI conversation
   */
  static async createContactFromAI(
    locationId: string,
    data: {
      firstName: string;
      lastName: string;
      email?: string;
      phone?: string;
      notes?: string;
      source?: string;
    },
  ) {
    try {
      const contact = await ghlAPI.createContact({
        ...data,
        locationId,
        source: data.source || "SaintSal AI Assistant",
        tags: ["AI Generated", "SaintSal"],
        customFields: {
          aiNotes: data.notes || "",
          createdBy: "SaintSal AI",
          createdAt: new Date().toISOString(),
        },
      });

      return {
        success: true,
        contactId: contact.id,
        message: `Contact ${data.firstName} ${data.lastName} has been added to your CRM`,
        data: contact,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to create contact in CRM",
      };
    }
  }

  /**
   * Log AI conversation as note
   */
  static async logAIConversation(
    contactId: string,
    conversation: string,
    summary: string,
  ) {
    try {
      await ghlAPI.createTask(contactId, {
        title: "AI Conversation Log",
        body: `Summary: ${summary}\n\nFull Conversation:\n${conversation}`,
        type: "call",
        status: "completed",
        assignedTo: "SaintSal AI",
      });

      return {
        success: true,
        message: "Conversation logged to CRM",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Send follow-up message via GHL
   */
  static async sendFollowUpMessage(
    contactId: string,
    locationId: string,
    message: string,
  ) {
    try {
      await ghlAPI.sendSMS(contactId, message, locationId);

      return {
        success: true,
        message: "Follow-up message sent",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

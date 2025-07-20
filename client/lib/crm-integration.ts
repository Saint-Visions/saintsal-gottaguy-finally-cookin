/**
 * SaintSal AI-CRM Integration
 * Handles AI-driven CRM actions for the Dual-AI platform
 */

interface CRMContact {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  notes?: string;
  source?: string;
}

interface CRMOpportunity {
  title: string;
  value: number;
  contactId: string;
  stage: string;
}

export class SaintSalCRMIntegration {
  private static apiUrl = "/api/crm-actions";

  /**
   * Create a contact from AI conversation
   */
  static async createContactFromAI(contactData: CRMContact) {
    try {
      const response = await fetch(`${this.apiUrl}/create-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactData,
          source: contactData.source || "SaintSal AI Assistant",
          createdBy: "AI",
        }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: `✅ ${contactData.firstName} ${contactData.lastName} has been added to your CRM`,
          contactId: result.contactId,
        };
      } else {
        throw new Error(result.error || "Failed to create contact");
      }
    } catch (error) {
      return {
        success: false,
        message: `❌ Failed to add contact: ${error.message}`,
      };
    }
  }

  /**
   * Create opportunity from AI suggestion
   */
  static async createOpportunityFromAI(opportunityData: CRMOpportunity) {
    try {
      const response = await fetch(`${this.apiUrl}/create-opportunity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opportunityData),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: `💰 Opportunity "${opportunityData.title}" created ($${opportunityData.value})`,
          opportunityId: result.opportunityId,
        };
      } else {
        throw new Error(result.error || "Failed to create opportunity");
      }
    } catch (error) {
      return {
        success: false,
        message: `❌ Failed to create opportunity: ${error.message}`,
      };
    }
  }

  /**
   * Log AI conversation to CRM
   */
  static async logConversationToCRM(
    contactId: string,
    summary: string,
    fullConversation: string,
  ) {
    try {
      const response = await fetch(`${this.apiUrl}/log-conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          summary,
          conversation: fullConversation,
          loggedBy: "SaintSal AI",
        }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: "📝 Conversation logged to CRM",
        };
      } else {
        throw new Error(result.error || "Failed to log conversation");
      }
    } catch (error) {
      return {
        success: false,
        message: `❌ Failed to log conversation: ${error.message}`,
      };
    }
  }

  /**
   * Send follow-up message via CRM
   */
  static async sendFollowUpMessage(contactId: string, message: string) {
    try {
      const response = await fetch(`${this.apiUrl}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          message,
          sentBy: "SaintSal AI",
        }),
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: "📱 Follow-up message sent via CRM",
        };
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      return {
        success: false,
        message: `❌ Failed to send message: ${error.message}`,
      };
    }
  }

  /**
   * Parse AI intent for CRM actions
   */
  static parseAIIntent(message: string) {
    const intents = [];

    // Contact creation patterns
    if (
      /add.*contact|create.*contact|save.*contact|new.*contact/i.test(message)
    ) {
      intents.push("create_contact");
    }

    // Lead qualification patterns
    if (/qualified.*lead|hot.*lead|interested.*lead/i.test(message)) {
      intents.push("create_opportunity");
    }

    // Follow-up patterns
    if (/follow.*up|send.*message|contact.*them/i.test(message)) {
      intents.push("send_followup");
    }

    // Meeting/appointment patterns
    if (/schedule.*meeting|book.*appointment|set.*up.*call/i.test(message)) {
      intents.push("schedule_appointment");
    }

    return intents;
  }

  /**
   * Extract contact info from AI message
   */
  static extractContactInfo(message: string): Partial<CRMContact> {
    const contact: Partial<CRMContact> = {};

    // Extract email
    const emailMatch = message.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
    );
    if (emailMatch) {
      contact.email = emailMatch[1];
    }

    // Extract phone
    const phoneMatch = message.match(
      /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
    );
    if (phoneMatch) {
      contact.phone = phoneMatch[1];
    }

    // Extract name patterns
    const nameMatch = message.match(
      /(?:name|called|contact)\s+(?:is\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    );
    if (nameMatch) {
      const fullName = nameMatch[1].trim();
      const nameParts = fullName.split(" ");
      contact.firstName = nameParts[0];
      if (nameParts.length > 1) {
        contact.lastName = nameParts.slice(1).join(" ");
      }
    }

    return contact;
  }
}

/**
 * SaintSal Boss Mode CRM Commands
 */
export const SaintSalCRMCommands = {
  // Quick contact creation
  addContact: async (name: string, email?: string, phone?: string) => {
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    return await SaintSalCRMIntegration.createContactFromAI({
      firstName,
      lastName,
      email,
      phone,
      notes: `Added via SaintSal AI on ${new Date().toLocaleDateString()}`,
      source: "SaintSal Boss Mode",
    });
  },

  // Quick opportunity creation
  addOpportunity: async (title: string, value: number, contactId: string) => {
    return await SaintSalCRMIntegration.createOpportunityFromAI({
      title,
      value,
      contactId,
      stage: "new",
    });
  },

  // Quick follow-up
  sendFollowUp: async (contactId: string, message: string) => {
    return await SaintSalCRMIntegration.sendFollowUpMessage(contactId, message);
  },
};

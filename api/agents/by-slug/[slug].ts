import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Get agent by slug for subdomain routing
export default async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: "Agent slug is required" });
    }

    console.log(`🔍 Looking up agent by slug: ${slug}`);

    // Get agent by slug
    const { data: agent, error } = await supabase
      .from("agents")
      .select(
        `
        id,
        name,
        description,
        avatar,
        model_type,
        skillset,
        features,
        permissions,
        status,
        subdomain,
        access_url,
        created_at,
        user_id,
        users!inner(
          id,
          name
        )
      `,
      )
      .eq("slug", slug)
      .eq("status", "active")
      .single();

    if (error || !agent) {
      console.log(`❌ Agent not found for slug: ${slug}`);
      return res.status(404).json({
        error: "Agent not found",
        message: "The requested agent does not exist or is not active",
      });
    }

    // Transform response to match expected format
    const agentInfo = {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      avatar: agent.avatar,
      modelType: agent.model_type,
      skillset: agent.skillset,
      features: agent.features || [],
      permissions: agent.permissions,
      status: agent.status,
      owner: {
        id: agent.user_id,
        name: agent.users?.name || "Agent Owner",
      },
      subdomain: agent.subdomain,
      accessUrl: agent.access_url,
      createdAt: agent.created_at,
      hacp: true,
      patent: "US Patent 10,290,222",
    };

    // Log agent access for analytics
    await logAgentAccess(agent.id, req);

    console.log(`✅ Agent found: ${agent.name} (${agent.id})`);

    res.json(agentInfo);
  } catch (error) {
    console.error("❌ Error looking up agent by slug:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to lookup agent",
    });
  }
}

// Log agent access for analytics and monitoring
async function logAgentAccess(agentId: string, req: Request): Promise<void> {
  try {
    const clientIP =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress;

    const userAgent = req.headers["user-agent"];

    await supabase.from("agent_access_logs").insert({
      agent_id: agentId,
      action: "console_access",
      ip_address: clientIP,
      user_agent: userAgent,
      success: true,
      metadata: {
        timestamp: new Date().toISOString(),
        route: "by-slug",
        subdomain: req.headers.host,
      },
    });
  } catch (error) {
    console.error("Failed to log agent access:", error);
    // Don't fail the main request if logging fails
  }
}

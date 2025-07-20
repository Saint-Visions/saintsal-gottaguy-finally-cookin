-- Create the agents table for SuperSal™ registry system
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    avatar TEXT,
    model_type TEXT NOT NULL CHECK (model_type IN ('gpt-4o', 'azure-cognitive', 'dual-bot')),
    skillset TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    permissions TEXT NOT NULL CHECK (permissions IN ('admin', 'team', 'public')),
    
    -- AI Model Configuration
    openai_assistant_id TEXT,
    azure_model_id TEXT,
    azure_endpoint TEXT,
    custom_instructions TEXT,
    tools JSONB DEFAULT '[]'::jsonb,
    
    -- Status and Metadata
    status TEXT NOT NULL DEFAULT 'provisioning' CHECK (status IN ('provisioning', 'active', 'paused', 'failed')),
    plan_tier TEXT NOT NULL DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro', 'enterprise')),
    usage_stats JSONB DEFAULT '{
        "conversations": 0,
        "messages": 0,
        "api_calls": 0,
        "voice_minutes": 0,
        "documents_processed": 0
    }'::jsonb,
    
    -- Subdomain and Access
    subdomain TEXT UNIQUE,
    access_url TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_active TIMESTAMP WITH TIME ZONE
);

-- Create agent_files table for custom training data
CREATE TABLE IF NOT EXISTS public.agent_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    storage_path TEXT NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    processing_status TEXT DEFAULT 'pending',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create agent_conversations table for tracking interactions
CREATE TABLE IF NOT EXISTS public.agent_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    title TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create agent_messages table for conversation history
CREATE TABLE IF NOT EXISTS public.agent_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.agent_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'image', 'file')),
    metadata JSONB DEFAULT '{}'::jsonb,
    tokens_used INTEGER DEFAULT 0,
    processing_time_ms INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create agent_analytics table for usage tracking
CREATE TABLE IF NOT EXISTS public.agent_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    dimensions JSONB DEFAULT '{}'::jsonb,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create agent_access_logs table for security and monitoring
CREATE TABLE IF NOT EXISTS public.agent_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN NOT NULL DEFAULT TRUE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON public.agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_slug ON public.agents(slug);
CREATE INDEX IF NOT EXISTS idx_agents_status ON public.agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_subdomain ON public.agents(subdomain);
CREATE INDEX IF NOT EXISTS idx_agent_files_agent_id ON public.agent_files(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_conversations_agent_id ON public.agent_conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_conversations_user_id ON public.agent_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_messages_conversation_id ON public.agent_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_agent_analytics_agent_id ON public.agent_analytics(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_analytics_recorded_at ON public.agent_analytics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_agent_access_logs_agent_id ON public.agent_access_logs(agent_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_access_logs ENABLE ROW LEVEL SECURITY;

-- Agents table policies
CREATE POLICY "Users can view their own agents" ON public.agents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agents" ON public.agents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agents" ON public.agents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agents" ON public.agents
    FOR DELETE USING (auth.uid() = user_id);

-- Public agents can be viewed by anyone
CREATE POLICY "Public agents are viewable by all" ON public.agents
    FOR SELECT USING (permissions = 'public');

-- Team agents can be viewed by team members (implement team logic later)
-- For now, just owner access

-- Agent files policies
CREATE POLICY "Agent files are viewable by agent owner" ON public.agent_files
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE agents.id = agent_files.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

CREATE POLICY "Agent files can be created by agent owner" ON public.agent_files
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE agents.id = agent_files.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

-- Agent conversations policies
CREATE POLICY "Conversations viewable by agent owner or participant" ON public.agent_conversations
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE agents.id = agent_conversations.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

CREATE POLICY "Conversations can be created by authenticated users" ON public.agent_conversations
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Agent messages policies
CREATE POLICY "Messages viewable by conversation participants" ON public.agent_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.agent_conversations ac
            LEFT JOIN public.agents a ON a.id = ac.agent_id
            WHERE ac.id = agent_messages.conversation_id 
            AND (ac.user_id = auth.uid() OR a.user_id = auth.uid())
        )
    );

CREATE POLICY "Messages can be created by conversation participants" ON public.agent_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.agent_conversations ac
            LEFT JOIN public.agents a ON a.id = ac.agent_id
            WHERE ac.id = agent_messages.conversation_id 
            AND (ac.user_id = auth.uid() OR a.user_id = auth.uid())
        )
    );

-- Analytics policies (only agent owner can view)
CREATE POLICY "Analytics viewable by agent owner" ON public.agent_analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE agents.id = agent_analytics.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

-- Access logs policies (only agent owner can view)
CREATE POLICY "Access logs viewable by agent owner" ON public.agent_access_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE agents.id = agent_access_logs.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agents_updated_at 
    BEFORE UPDATE ON public.agents 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_conversations_updated_at 
    BEFORE UPDATE ON public.agent_conversations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_agent_slug(agent_name TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Create base slug from name
    base_slug := lower(regexp_replace(agent_name, '[^a-zA-Z0-9\s-]', '', 'g'));
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);
    
    -- Ensure it's not empty
    IF base_slug = '' THEN
        base_slug := 'agent';
    END IF;
    
    -- Check uniqueness and append counter if needed
    final_slug := base_slug;
    WHILE EXISTS (SELECT 1 FROM public.agents WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to update usage stats
CREATE OR REPLACE FUNCTION increment_agent_usage(
    agent_uuid UUID,
    metric_name TEXT,
    increment_by INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.agents 
    SET 
        usage_stats = jsonb_set(
            usage_stats,
            ARRAY[metric_name],
            to_jsonb((COALESCE((usage_stats->metric_name)::INTEGER, 0) + increment_by))
        ),
        last_active = TIMEZONE('utc'::text, NOW())
    WHERE id = agent_uuid;
    
    -- Also log to analytics
    INSERT INTO public.agent_analytics (agent_id, metric_type, metric_value)
    VALUES (agent_uuid, metric_name, increment_by);
END;
$$ LANGUAGE plpgsql;

-- Function to get agent by slug
CREATE OR REPLACE FUNCTION get_agent_by_slug(agent_slug TEXT)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    name TEXT,
    description TEXT,
    avatar TEXT,
    model_type TEXT,
    skillset TEXT,
    features JSONB,
    permissions TEXT,
    status TEXT,
    access_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.user_id,
        a.name,
        a.description,
        a.avatar,
        a.model_type,
        a.skillset,
        a.features,
        a.permissions,
        a.status,
        a.access_url,
        a.created_at
    FROM public.agents a
    WHERE a.slug = agent_slug AND a.status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Initial data for demo purposes
INSERT INTO public.agents (
    user_id,
    slug,
    name,
    description,
    model_type,
    skillset,
    features,
    permissions,
    status,
    subdomain,
    access_url
) VALUES (
    '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
    'saintal-original',
    'SaintSal - The Original',
    'The original SuperSal™ assistant with full knowledge of SVG, SVT, legal, finance, deals, and CRM',
    'dual-bot',
    'general',
    '["voice_enabled", "web_research", "crm_routing", "scheduling", "quote_builder", "document_review", "compliance_tracker"]'::jsonb,
    'admin',
    'active',
    'saintal',
    'https://saintal.saintvisionai.com/console'
) ON CONFLICT (slug) DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE public.agents IS 'SuperSal™ agent registry - stores all user-created AI assistants';
COMMENT ON COLUMN public.agents.model_type IS 'AI model type: gpt-4o, azure-cognitive, or dual-bot (HACP™)';
COMMENT ON COLUMN public.agents.skillset IS 'Primary skillset template used for the agent';
COMMENT ON COLUMN public.agents.features IS 'Array of enabled features for this agent';
COMMENT ON COLUMN public.agents.permissions IS 'Access level: admin (owner only), team (team members), public (anyone)';
COMMENT ON COLUMN public.agents.usage_stats IS 'Real-time usage statistics for billing and analytics';
COMMENT ON COLUMN public.agents.subdomain IS 'Unique subdomain for agent access (e.g., myagent.saintvisionai.com)';

-- Grant permissions for authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

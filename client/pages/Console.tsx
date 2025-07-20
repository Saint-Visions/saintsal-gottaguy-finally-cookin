import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  Crown,
  Shield,
  Zap,
  Activity,
  User,
  MessageSquare,
  ExternalLink,
  RefreshCw,
  Archive,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Lock,
  Users,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: any;
}

interface AgentInfo {
  id: string;
  name: string;
  description: string;
  avatar: string;
  modelType: "gpt-4o" | "azure-cognitive" | "dual-bot";
  skillset: string;
  features: string[];
  permissions: "admin" | "team" | "public";
  status: "active" | "paused" | "maintenance";
  owner: {
    id: string;
    name: string;
  };
  subdomain: string;
  accessUrl: string;
  createdAt: string;
}

interface ConsoleMode {
  mode: "client" | "admin";
  userId?: string;
  isOwner: boolean;
}

export default function Console() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [agent, setAgent] = useState<AgentInfo | null>(null);
  const [consoleMode, setConsoleMode] = useState<ConsoleMode>({
    mode: "client",
    isOwner: false,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [escalationStatus, setEscalationStatus] = useState<string | null>(null);

  // Dynamic branding based on agent context
  const getBrandColors = () => {
    // If agent has CRM features, assume it's PartnerTech branded
    const hasPartnerTechFeatures =
      agent?.features?.includes("crm_routing") ||
      agent?.features?.includes("quote_builder");

    if (hasPartnerTechFeatures) {
      return {
        primary: "blue-500",
        primaryLight: "blue-400",
        secondary: "blue-600",
        text: "text-blue-300",
        bg: "bg-blue-500",
        bgLight: "bg-blue-500/20",
        bgHover: "hover:bg-blue-500/20",
        border: "border-blue-500/30",
        borderLight: "border-blue-500/20",
        focus: "focus:border-blue-500",
        hover: "hover:text-blue-200",
      };
    }
    return {
      primary: "gold-500",
      primaryLight: "gold-400",
      secondary: "gold-600",
      text: "text-gold-300",
      bg: "bg-gold-500",
      bgLight: "bg-gold-500/20",
      bgHover: "hover:bg-gold-500/20",
      border: "border-gold-500/30",
      borderLight: "border-gold-500/20",
      focus: "focus:border-gold-500",
      hover: "hover:text-gold-200",
    };
  };

  const brandColors = getBrandColors();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeConsole();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeConsole = async () => {
    try {
      // Extract agent slug from subdomain or URL
      const agentSlug = extractAgentSlug();

      if (!agentSlug) {
        throw new Error("Invalid agent URL");
      }

      // Load agent information
      const agentData = await loadAgentBySlug(agentSlug);
      setAgent(agentData);

      // Determine console mode (admin vs client)
      const mode = await determineConsoleMode(agentData);
      setConsoleMode(mode);

      // Initialize conversation
      const convId = await initializeConversation(agentData.id);
      setConversationId(convId);

      // Add welcome message
      addWelcomeMessage(agentData, mode);

      setIsLoaded(true);
    } catch (error) {
      console.error("Failed to initialize console:", error);
      // Show error state
    }
  };

  const extractAgentSlug = (): string | null => {
    // Extract from subdomain (e.g., myagent.saintvisionai.com)
    const hostname = window.location.hostname;
    const parts = hostname.split(".");

    if (parts.length >= 3 && parts[1] === "saintvisionai") {
      return parts[0];
    }

    // Fallback: extract from URL params
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("agent");
  };

  const loadAgentBySlug = async (slug: string): Promise<AgentInfo> => {
    const response = await fetch(`/api/agents/by-slug/${slug}`);
    if (!response.ok) {
      throw new Error("Agent not found");
    }
    return response.json();
  };

  const determineConsoleMode = async (
    agentData: AgentInfo,
  ): Promise<ConsoleMode> => {
    // Check if user is authenticated and is the agent owner
    try {
      const userResponse = await fetch("/api/auth/me");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        return {
          mode: userData.id === agentData.owner.id ? "admin" : "client",
          userId: userData.id,
          isOwner: userData.id === agentData.owner.id,
        };
      }
    } catch (error) {
      console.log("User not authenticated, defaulting to client mode");
    }

    return {
      mode: "client",
      isOwner: false,
    };
  };

  const initializeConversation = async (agentId: string): Promise<string> => {
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentId,
        sessionId: generateSessionId(),
      }),
    });

    const data = await response.json();
    return data.conversationId;
  };

  const addWelcomeMessage = (agentData: AgentInfo, mode: ConsoleMode) => {
    const welcomeMessage: Message = {
      id: generateMessageId(),
      role: "assistant",
      content: generateWelcomeMessage(agentData, mode),
      timestamp: new Date(),
      metadata: { type: "welcome", hacp: true },
    };

    setMessages([welcomeMessage]);
  };

  const generateWelcomeMessage = (
    agentData: AgentInfo,
    mode: ConsoleMode,
  ): string => {
    const modeText =
      mode.mode === "admin"
        ? "Welcome back! You're in admin mode with full companion access."
        : "Hello! I'm here to assist you with my specialized capabilities.";

    const modelDescription = {
      "gpt-4o": "powered by OpenAI's GPT-4o for advanced reasoning",
      "azure-cognitive":
        "powered by Azure Cognitive Services for enhanced processing",
      "dual-bot": "powered by HACP™ dual-AI system (GPT-4o + Azure Cognitive)",
    };

    const featuresText = agentData.features.length
      ? `I have ${
          agentData.features.length
        } specialized capabilities including ${agentData.features
          .slice(0, 3)
          .join(", ")}${agentData.features.length > 3 ? " and more" : ""}.`
      : "";

    return `Hi! I'm ${agentData.name}, your AI companion ${
      modelDescription[agentData.modelType]
    }. ${modeText}

${featuresText}

${
  mode.mode === "client"
    ? "How can I help you today?"
    : "What would you like to work on together?"
}

*This assistant is protected by HACP™ (Hierarchical Agent Control Protocol) - US Patent 10,290,222*`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !agent || !conversationId) return;

    const userMessage: Message = {
      id: generateMessageId(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          conversationId,
          message: userMessage.content,
          mode: consoleMode.mode,
          modelType: agent.modelType,
        }),
      });

      const data = await response.json();

      if (data.escalated) {
        setEscalationStatus("escalated");
        // Add escalation message
        const escalationMessage: Message = {
          id: generateMessageId(),
          role: "system",
          content:
            "🔄 I'm escalating this to Supersal, our senior AI assistant, who can provide enhanced assistance...",
          timestamp: new Date(),
          metadata: { type: "escalation", escalationId: data.escalationId },
        };
        setMessages(prev => [...prev, escalationMessage]);

        // Wait for Supersal response
        setTimeout(async () => {
          try {
            const supersalResponse = await fetch(
              `/api/escalations/${data.escalationId}/status`,
            );
            const supersalData = await supersalResponse.json();

            const supersalMessage: Message = {
              id: generateMessageId(),
              role: "assistant",
              content: `👑 **Supersal - Senior AI Assistant**\n\n${supersalData.supersalResponse}`,
              timestamp: new Date(),
              metadata: {
                type: "supersal",
                escalationId: data.escalationId,
                hacp: true,
              },
            };

            setMessages(prev => [...prev, supersalMessage]);
            setEscalationStatus(null);
          } catch (error) {
            console.error("Failed to get Supersal response:", error);
          }
        }, 2000);
      } else {
        const assistantMessage: Message = {
          id: generateMessageId(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          metadata: data.metadata || {},
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: generateMessageId(),
        role: "system",
        content:
          "I'm experiencing a technical issue. Let me escalate this to Supersal for assistance.",
        timestamp: new Date(),
        metadata: { type: "error" },
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = async () => {
    if (!agent?.features.includes("voice_enabled")) {
      alert("Voice feature is not enabled for this agent");
      return;
    }

    setIsVoiceActive(!isVoiceActive);
    // Implement voice functionality with Twilio integration
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  if (!isLoaded || !agent) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-center">
          <div
            className={`animate-spin w-12 h-12 border-4 ${brandColors.border} border-t-${brandColors.primary} rounded-full mx-auto mb-4`}
          />
          <p className="text-white/70">Loading SaintSal™ Agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      {/* Console Header */}
      <header className="bg-charcoal-800/80 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className={`w-10 h-10 border-2 ${brandColors.border}`}>
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold">{agent.name}</h1>
                  <Badge
                    className={`${
                      agent.status === "active"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    }`}
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    {agent.status}
                  </Badge>
                  {consoleMode.mode === "admin" && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-white/60">
                  {agent.skillset} • {agent.modelType}
                  {agent.modelType === "dual-bot" && " (HACP™)"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mode Toggle for Owners */}
              {consoleMode.isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setConsoleMode(prev => ({
                      ...prev,
                      mode: prev.mode === "admin" ? "client" : "admin",
                    }))
                  }
                  className={`border-${brandColors.primary}/60 ${brandColors.text} ${brandColors.bgHover}`}
                >
                  <User className="w-4 h-4 mr-1" />
                  {consoleMode.mode === "admin" ? "Client View" : "Admin View"}
                </Button>
              )}

              {/* Voice Toggle */}
              {agent.features.includes("voice_enabled") && (
                <Button
                  variant={isVoiceActive ? "default" : "outline"}
                  size="sm"
                  onClick={toggleVoice}
                  className={
                    isVoiceActive
                      ? "bg-green-500 text-white hover:bg-green-400"
                      : "border-gold-400/60 text-gold-200 hover:bg-gold-500/20"
                  }
                >
                  {isVoiceActive ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                </Button>
              )}

              {/* Settings (Admin Only) */}
              {consoleMode.mode === "admin" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/dashboard")}
                  className={`border-${brandColors.primary}/60 ${brandColors.text} ${brandColors.bgHover}`}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* HACP™ Patent Notice */}
      {consoleMode.mode === "client" && (
        <div
          className={`${brandColors.bgLight} border-b ${brandColors.borderLight} px-4 py-2`}
        >
          <div
            className={`flex items-center justify-center text-xs ${brandColors.text}`}
          >
            <Shield className="w-3 h-3 mr-1" />
            Protected by HACP™ Intelligence | US Patent 10,290,222
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  message.role === "user"
                    ? `${brandColors.bg} text-charcoal-900 ml-12`
                    : message.role === "system"
                    ? "bg-blue-500/20 border border-blue-500/30 text-blue-200 mx-8"
                    : message.metadata?.type === "supersal"
                    ? "bg-purple-500/20 border border-purple-500/30 text-purple-100 mr-12"
                    : "bg-charcoal-800 text-white mr-12"
                }`}
              >
                {message.role === "assistant" && !message.metadata?.type && (
                  <div className="flex items-center mb-2">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{agent.name}</span>
                    {agent.modelType === "dual-bot" && (
                      <Badge
                        className={`ml-2 ${brandColors.bgLight} ${brandColors.text} ${brandColors.border} text-xs`}
                      >
                        HACP™
                      </Badge>
                    )}
                  </div>
                )}

                {message.metadata?.type === "supersal" && (
                  <div className="flex items-center mb-2">
                    <Crown className="w-5 h-5 mr-2 text-purple-300" />
                    <span className="text-sm font-bold text-purple-200">
                      Supersal - Senior AI Assistant
                    </span>
                    <Badge className="ml-2 bg-purple-500/30 text-purple-200 border-purple-400/30 text-xs">
                      HACP™ Escalation
                    </Badge>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{message.content}</div>

                <div className="flex items-center justify-between mt-2 text-xs opacity-60">
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.metadata?.hacp && (
                    <span className="text-xs">HACP™</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-charcoal-800 text-white p-4 rounded-2xl mr-12">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200" />
                  </div>
                  <span className="text-sm text-white/60">
                    {escalationStatus === "escalated"
                      ? "Supersal is responding..."
                      : `${agent.name} is thinking...`}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-charcoal-800/50 p-4">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={e =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              placeholder={`Message ${agent.name}...`}
              className={`flex-1 bg-charcoal-700 border-white/20 text-white placeholder:text-white/50 ${brandColors.focus}`}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`${brandColors.bg} text-charcoal-900 hover:${brandColors.primaryLight} saintvision-glow`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Agent Features Display */}
          <div className="flex items-center justify-between mt-3 text-xs text-white/50">
            <div className="flex items-center space-x-4">
              <span>
                Features: {agent.features.slice(0, 3).join(", ")}
                {agent.features.length > 3 &&
                  ` +${agent.features.length - 3} more`}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {agent.permissions === "public" && (
                <div className="flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  Public
                </div>
              )}
              {agent.permissions === "team" && (
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Team
                </div>
              )}
              {agent.permissions === "admin" && (
                <div className="flex items-center">
                  <Lock className="w-3 h-3 mr-1" />
                  Private
                </div>
              )}
              <span>•</span>
              <span>HACP™ Protected</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

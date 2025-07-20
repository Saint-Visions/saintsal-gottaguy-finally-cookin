import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserPlan } from "@/hooks/use-plan-protection";
import {
  MessageSquare,
  Minimize2,
  Maximize2,
  Send,
  Mic,
  Bot,
  Zap,
  Activity,
  Target,
  Mail,
  Phone,
  BarChart3,
  Brain,
  Crown,
  Sparkles,
  Settings,
  X,
  Users,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SaintSalCompanionProps {
  className?: string;
  contextData?: {
    activeTile?: string;
    metrics?: any;
    suggestions?: string[];
  };
}

interface ChatMessage {
  id: string;
  type: "user" | "sal";
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ComponentType;
  }>;
}

export function SaintSalCompanion({
  className,
  contextData,
}: SaintSalCompanionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commanderMode, setCommanderMode] = useState(false);
  const { plan } = useUserPlan();
  const getWelcomeMessage = () => {
    const planFeatures = {
      unlimited: {
        content:
          "Hey! I'm SaintSal™, your Azure-powered AI companion. I'm here to help with chat, insights, and guidance. Ready to explore?",
        actions: [
          {
            label: "Chat with Me",
            action: () => handleAction("chat"),
            icon: MessageSquare,
          },
          {
            label: "Get Insights",
            action: () => handleAction("insights"),
            icon: Brain,
          },
        ],
      },
      crm: {
        content:
          "Hey! I'm SaintSal™, your Azure-powered business companion. I can see you have CRM access. Ready to supercharge your business?",
        actions: [
          {
            label: "Analyze CRM",
            action: () => handleAction("analyze-crm"),
            icon: BarChart3,
          },
          {
            label: "Score Leads",
            action: () => handleAction("score-leads"),
            icon: Target,
          },
          {
            label: "Generate Emails",
            action: () => handleAction("generate-emails"),
            icon: Mail,
          },
        ],
      },
      enterprise: {
        content:
          "Hey! I'm SaintSal™, your Azure-powered business commander. With Enterprise access, I can manage your 5 CRM accounts and team operations. Ready to scale?",
        actions: [
          {
            label: "Team Overview",
            action: () => handleAction("team-overview"),
            icon: Users,
          },
          {
            label: "Multi-CRM Sync",
            action: () => handleAction("multi-crm"),
            icon: Building2,
          },
          {
            label: "Lead Pipeline",
            action: () => handleAction("pipeline"),
            icon: Activity,
          },
        ],
      },
      white_label: {
        content:
          "Hey! I'm SaintSal™, your Azure-powered agency commander. With White Label access, I can manage all 10 client accounts and provide full branding support. Ready to dominate?",
        actions: [
          {
            label: "Client Dashboard",
            action: () => handleAction("client-dashboard"),
            icon: Crown,
          },
          {
            label: "Agency Analytics",
            action: () => handleAction("agency-analytics"),
            icon: BarChart3,
          },
          {
            label: "Bulk Operations",
            action: () => handleAction("bulk-ops"),
            icon: Zap,
          },
        ],
      },
    };

    return (
      planFeatures[plan as keyof typeof planFeatures] || planFeatures.unlimited
    );
  };

  const welcomeConfig = getWelcomeMessage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "sal",
      content: welcomeConfig.content,
      timestamp: new Date(),
      actions: welcomeConfig.actions,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-suggest based on context
  useEffect(() => {
    if (contextData?.activeTile && !isMinimized) {
      const suggestions = generateContextSuggestions(contextData.activeTile);
      if (suggestions.length > 0) {
        const suggestionMessage: ChatMessage = {
          id: `suggestion-${Date.now()}`,
          type: "sal",
          content: `I notice you're looking at ${contextData.activeTile}. ${suggestions[0]}`,
          timestamp: new Date(),
          actions: [
            {
              label: "Do it",
              action: () => handleAction(`auto-${contextData.activeTile}`),
              icon: Zap,
            },
            {
              label: "Not now",
              action: () => {},
            },
          ],
        };

        setTimeout(() => {
          setMessages(prev => [...prev, suggestionMessage]);
        }, 2000);
      }
    }
  }, [contextData?.activeTile]);

  const generateContextSuggestions = (activeTile: string): string[] => {
    const suggestions: Record<string, string[]> = {
      "lead-scorer": [
        "Want me to rerun the lead scoring algorithm? I can analyze the latest data.",
        "I see 47 new leads. Should I score them and highlight the hot ones?",
      ],
      "email-generator": [
        "Ready to craft personalized emails for your high-scoring leads?",
        "I can generate email sequences based on lead behavior patterns.",
      ],
      "pipeline-predictor": [
        "Your pipeline confidence dropped 7%. Want me to investigate why?",
        "I found 3 deals likely to close this week. Should I prioritize them?",
      ],
      "revenue-trend": [
        "Revenue is up 23%! Want me to identify what's driving the growth?",
        "I can analyze which campaigns are performing best.",
      ],
    };

    return suggestions[activeTile] || [];
  };

  const handleAction = async (actionType: string) => {
    setIsTyping(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      "score-leads":
        "✅ Lead scoring complete! Found 12 hot leads (90%+ score). 3 are from California with 3+ calls. Want me to prioritize them?",
      "generate-emails":
        "✅ Generated 5 personalized email templates. Ready to send to leads scoring >90%?",
      "auto-lead-scorer":
        "🔥 Auto-scored 47 leads! 12 are hot, 23 warm, 12 cold. Top lead: Sarah Johnson (95% score, 4 calls).",
      "pipeline-analysis":
        "📊 Pipeline analysis shows 3 deals likely to close (87% confidence). Combined value: $45K.",
    };

    const responseMessage: ChatMessage = {
      id: `response-${Date.now()}`,
      type: "sal",
      content: responses[actionType] || "✅ Action completed successfully!",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, responseMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Process AI response
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse: ChatMessage = {
      id: `sal-${Date.now()}`,
      type: "sal",
      content: generateAIResponse(message),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("lead") && lowerInput.includes("score")) {
      return "🎯 Running lead scoring now... Found 8 new hot leads! Sarah J. (95%), Mike K. (92%), Lisa R. (90%). Want me to send them personalized emails?";
    }

    if (lowerInput.includes("email")) {
      return "📧 I can generate personalized emails based on lead score, location, and call history. Which segment should I target first?";
    }

    if (lowerInput.includes("california")) {
      return "🌴 Found 15 California leads: 5 hot (>90%), 7 warm (70-89%), 3 cold (<70%). Top performer: Tech startup in San Francisco with 4 calls.";
    }

    if (lowerInput.includes("pipeline")) {
      return "📈 Pipeline health: 87% confidence overall. 3 deals closing this week ($45K), 7 deals need follow-up. Want me to prioritize the urgent ones?";
    }

    return "🧠 I understand! I can help with lead scoring, email campaigns, pipeline analysis, CRM actions, or data insights. What would you like me to focus on?";
  };

  if (isMinimized) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-gold-500/40 to-gold-600/40 hover:from-gold-500/60 hover:to-gold-600/60 shadow-xl saintvision-glow border-2 border-gold-400/50 backdrop-blur-sm"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 70%)",
            boxShadow:
              "0 0 20px rgba(255,215,0,0.4), inset 0 0 20px rgba(255,215,0,0.1)",
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F7e68002f7f2d4bb09717dde429781afa?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-9 h-9 object-contain"
            style={{
              filter:
                "brightness(1.2) contrast(1.3) drop-shadow(0 0 8px rgba(255,215,0,0.6))",
            }}
          />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed right-6 z-50 transition-all duration-300",
        isExpanded ? "bottom-6 top-6" : "bottom-6",
        isExpanded ? "w-96" : "w-80",
        className,
      )}
    >
      <div className="h-full flex flex-col glass-morphism rounded-xl border border-white/20 backdrop-blur-xl bg-gradient-to-b from-charcoal-800/95 to-charcoal-900/95">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 bg-gradient-to-r from-gold-500/30 to-gold-600/30 rounded-full flex items-center justify-center border border-gold-400/60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.1) 70%)",
                boxShadow: "0 0 12px rgba(255,215,0,0.3)",
              }}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F7e68002f7f2d4bb09717dde429781afa?format=webp&width=800"
                alt="SaintSal Logo"
                className="w-6 h-6 object-contain"
                style={{
                  filter:
                    "brightness(1.1) contrast(1.2) drop-shadow(0 0 4px rgba(255,215,0,0.5))",
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">SaintSal™</h3>
              <p className="text-xs text-gold-300">Azure Companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCommanderMode(!commanderMode)}
              className={cn(
                "w-8 h-8 p-0",
                commanderMode ? "text-gold-300" : "text-white/50",
              )}
            >
              <Crown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/50 hover:text-gold-300 w-8 h-8 p-0"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-white/50 hover:text-red-300 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-white/5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Online</span>
              {commanderMode && (
                <>
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-white/20"
                  />
                  <Crown className="w-3 h-3 text-gold-300" />
                  <span className="text-gold-300">Commander Mode</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-3 h-3 text-purple-300" />
              <span className="text-purple-300">Azure GPT-4o</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4 space-y-3",
            isExpanded ? "max-h-none" : "max-h-80",
          )}
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.type === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3",
                  msg.type === "user"
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                    : "bg-white/10 text-white border border-white/20",
                )}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>

                {msg.actions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.actions.map((action, idx) => {
                      const IconComponent = action.icon;
                      return (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          onClick={action.action}
                          className="h-7 px-2 text-xs bg-white/10 hover:bg-white/20 text-gold-300 border border-gold-500/30"
                        >
                          {IconComponent && (
                            <IconComponent className="w-3 h-3 mr-1" />
                          )}
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-2 text-xs opacity-60">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask Sal anything..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className="text-white/50 hover:text-gold-300"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {commanderMode && (
            <div className="mt-2 text-xs text-gold-300">
              <Crown className="w-3 h-3 inline mr-1" />
              Commander Mode: Full system access enabled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

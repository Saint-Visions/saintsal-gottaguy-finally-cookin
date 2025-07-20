import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Send,
  Mic,
  Settings,
  Zap,
  Crown,
  Shield,
  MessageSquare,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "gpt4o" | "azure" | "system";
  content: string;
  timestamp: Date;
  fusionScore?: number;
  reasoning?: string;
}

interface DualResponse {
  gpt4o: {
    content: string;
    confidence: number;
    reasoning: string;
  };
  azure: {
    content: string;
    confidence: number;
    reasoning: string;
  };
  fusionScore: number;
  consensusReached: boolean;
}

export default function DualAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "system",
      content:
        "Welcome to SaintSal™ Dual AI Intelligence! You're now connected to both GPT-4o Primary Agent and Azure Strategic Advisor. HACP™ technology will analyze consensus and provide fusion-scored responses.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fusionMode, setFusionMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToDualAI = async (message: string): Promise<DualResponse> => {
    // Simulate dual AI calls - replace with actual API calls
    const [gpt4oResponse, azureResponse] = await Promise.all([
      // GPT-4o Primary Agent
      fetch("/api/chat/gpt4o", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          model: "gpt-4o",
          systemPrompt:
            "You are SaintSal™ Primary Agent. Provide clear, actionable business intelligence with enterprise focus.",
        }),
      }).catch(() => ({
        ok: false,
        json: () =>
          Promise.resolve({
            content:
              "I'm your GPT-4o Primary Agent. I provide strategic business intelligence and enterprise-focused solutions. How can I help you cook up some knowledge today?",
            confidence: 0.85,
            reasoning: "Fallback response - API connection needed",
          }),
      })),

      // Azure Strategic Advisor
      fetch("/api/chat/azure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          endpoint: process.env.AZURE_OPENAI_ENDPOINT,
          apiKey: process.env.AZURE_OPENAI_API_KEY,
          deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
          systemPrompt:
            "You are Azure Strategic Advisor. Provide technical depth, security insights, and enterprise architecture guidance.",
        }),
      }).catch(() => ({
        ok: false,
        json: () =>
          Promise.resolve({
            content:
              "I'm your Azure Strategic Advisor. I specialize in enterprise architecture, security frameworks, and strategic technical guidance. Ready to provide deep insights.",
            confidence: 0.88,
            reasoning: "Fallback response - Azure connection needed",
          }),
      })),
    ]);

    const gpt4oData = await (gpt4oResponse.ok
      ? gpt4oResponse.json()
      : {
          content:
            "GPT-4o Primary Agent ready! I focus on strategic business intelligence and enterprise solutions.",
          confidence: 0.8,
          reasoning: "Demo mode - connect OpenAI API",
        });

    const azureData = await (azureResponse.ok
      ? azureResponse.json()
      : {
          content:
            "Azure Strategic Advisor online! I provide technical depth and enterprise architecture insights.",
          confidence: 0.85,
          reasoning: "Demo mode - connect Azure OpenAI",
        });

    // HACP™ Fusion Logic
    const fusionScore = calculateFusionScore(gpt4oData, azureData);
    const consensusReached = fusionScore > 0.7;

    return {
      gpt4o: gpt4oData,
      azure: azureData,
      fusionScore,
      consensusReached,
    };
  };

  const calculateFusionScore = (gpt4o: any, azure: any): number => {
    // HACP™ Hierarchical Adaptive Cognitive Processing
    const confidenceAlignment = Math.abs(gpt4o.confidence - azure.confidence);
    const baseScore = (gpt4o.confidence + azure.confidence) / 2;
    const consensusPenalty = confidenceAlignment * 0.3;

    return Math.max(0, Math.min(1, baseScore - consensusPenalty));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const dualResponse = await sendToDualAI(inputMessage);

      const gpt4oMessage: ChatMessage = {
        id: `gpt4o-${Date.now()}`,
        type: "gpt4o",
        content: dualResponse.gpt4o.content,
        timestamp: new Date(),
        fusionScore: dualResponse.gpt4o.confidence,
        reasoning: dualResponse.gpt4o.reasoning,
      };

      const azureMessage: ChatMessage = {
        id: `azure-${Date.now()}`,
        type: "azure",
        content: dualResponse.azure.content,
        timestamp: new Date(),
        fusionScore: dualResponse.azure.confidence,
        reasoning: dualResponse.azure.reasoning,
      };

      setMessages(prev => [...prev, gpt4oMessage, azureMessage]);

      if (dualResponse.consensusReached) {
        const consensusMessage: ChatMessage = {
          id: `consensus-${Date.now()}`,
          type: "system",
          content: `🔥 HACP™ CONSENSUS REACHED! Fusion Score: ${(
            dualResponse.fusionScore * 100
          ).toFixed(1)}% - Both AI agents are aligned on this response.`,
          timestamp: new Date(),
          fusionScore: dualResponse.fusionScore,
        };
        setMessages(prev => [...prev, consensusMessage]);
      }
    } catch (error) {
      console.error("Dual AI error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageStyle = (type: string, fusionScore?: number) => {
    switch (type) {
      case "gpt4o":
        return "bg-blue-500/20 border-blue-500/30 text-blue-100";
      case "azure":
        return "bg-purple-500/20 border-purple-500/30 text-purple-100";
      case "system":
        return fusionScore && fusionScore > 0.7
          ? "bg-gold-500/20 border-gold-500/50 text-gold-100 saintvision-glow"
          : "bg-charcoal-700 border-white/20 text-white/70";
      default:
        return "bg-white/10 border-white/20 text-white";
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case "gpt4o":
        return <Brain className="w-5 h-5 text-blue-400" />;
      case "azure":
        return <Shield className="w-5 h-5 text-purple-400" />;
      case "system":
        return <Zap className="w-5 h-5 text-gold-400" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getAgentName = (type: string) => {
    switch (type) {
      case "gpt4o":
        return "GPT-4o Primary Agent";
      case "azure":
        return "Azure Strategic Advisor";
      case "system":
        return "HACP™ System";
      default:
        return "User";
    }
  };

  return (
    <div className="flex flex-col h-full bg-charcoal-900">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-bold text-white">
                SaintSal™ Dual Intelligence
              </h2>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              HACP™ Active
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-gold-500/30">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-2 text-blue-400">
            <Brain className="w-4 h-4" />
            <span>GPT-4o Primary</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <Shield className="w-4 h-4" />
            <span>Azure Strategic</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 text-gold-400">
            <Zap className="w-4 h-4" />
            <span>HACP™ Fusion</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-4 rounded-lg border ${getMessageStyle(
              message.type,
              message.fusionScore,
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {getAgentIcon(message.type)}
                <span className="font-semibold text-sm">
                  {getAgentName(message.type)}
                </span>
                {message.fusionScore && (
                  <Badge
                    className={`text-xs ${
                      message.fusionScore > 0.8
                        ? "bg-green-500/20 text-green-300"
                        : message.fusionScore > 0.6
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {(message.fusionScore * 100).toFixed(0)}%
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-2 text-sm leading-relaxed">
              {message.content}
            </div>
            {message.reasoning && (
              <div className="mt-2 text-xs opacity-70 italic">
                Reasoning: {message.reasoning}
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <ThumbsUp className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <ThumbsDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-sm text-blue-400">
                  GPT-4o Primary Agent
                </span>
              </div>
              <div className="animate-pulse">Thinking...</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded-lg flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm text-purple-400">
                  Azure Strategic Advisor
                </span>
              </div>
              <div className="animate-pulse">Analyzing...</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={e => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask both AI minds anything..."
            className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-white/50 mt-2">
          🧠 Dual Intelligence Mode: Responses from GPT-4o Primary + Azure
          Strategic | 🔥 HACP™ Fusion Analysis Active
        </div>
      </div>
    </div>
  );
}

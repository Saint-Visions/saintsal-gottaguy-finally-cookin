import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { useUserPlan } from "@/hooks/use-plan-protection";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Crown,
  Brain,
  Zap,
  Settings,
  Mic,
  Send,
  Plus,
  History,
  Star,
  Shield,
  Sparkles,
  ArrowUpRight,
  Globe,
  BarChart3,
  Users,
  Lock,
} from "lucide-react";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChat, setActiveChat] = useState("gpt4o");
  const [message, setMessage] = useState("");
  const { plan } = useUserPlan();
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Welcome to SaintSal™! I'm your GOTTA GUY™ AI companion. How can I help you cook up some knowledge today?",
      timestamp: new Date().toLocaleTimeString(),
      model: "GPT-4o",
    },
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: chatHistory.length + 1,
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      model: "",
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "ai",
        content: "I understand your request. Let me help you with that!",
        timestamp: new Date().toLocaleTimeString(),
        model: activeChat === "gpt4o" ? "GPT-4o" : "Azure AI",
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <AppLayout>
      {/* Top Navigation Bar */}
      <nav className="h-20 border-b border-white/10 glass-morphism z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div
            className={`flex items-center space-x-4 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
              alt="SaintSal Logo"
              className="w-12 h-12 object-contain mr-1"
            />
            <div>
              <h1 className="text-2xl font-bold saintvision-gradient-text font-dialien">
                GOTTA GUY™ Dashboard
              </h1>
              <p className="text-sm text-white/60">
                Your AI companion for everything business
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-gold-300"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - AI Model Selector and History */}
        <div className="w-80 border-r border-white/10 glass-morphism p-6 overflow-y-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* AI Model Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gold-300 mb-4 uppercase tracking-wider font-dialien">
                Dual AI System
              </h3>
              <div className="space-y-3">
                <Button
                  variant={activeChat === "gpt4o" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeChat === "gpt4o"
                      ? "bg-gold-500 text-charcoal-900 saintvision-glow"
                      : "text-white/70 hover:text-gold-300"
                  }`}
                  onClick={() => setActiveChat("gpt4o")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  <span className="text-blue-400 font-semibold">
                    GPT-4o
                  </span>{" "}
                  Primary
                  <Sparkles className="w-3 h-3 ml-auto" />
                </Button>
                <Button
                  variant={activeChat === "azure" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeChat === "azure"
                      ? "bg-blue-500 text-white"
                      : "text-white/70 hover:text-blue-300"
                  }`}
                  onClick={() => setActiveChat("azure")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-purple-400 font-semibold">
                    Azure
                  </span>{" "}
                  Cognitive
                  <Crown className="w-3 h-3 ml-auto" />
                </Button>
              </div>
            </div>

            {/* Chat History */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gold-300 uppercase tracking-wider">
                  Recent Chats
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/50 hover:text-gold-300"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="p-3 glass-morphism rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="text-sm font-medium">
                    Business Strategy Session
                  </p>
                  <p className="text-xs text-white/50">2 hours ago</p>
                </div>
                <div className="p-3 glass-morphism rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="text-sm font-medium">CRM Integration Help</p>
                  <p className="text-xs text-white/50">Yesterday</p>
                </div>
                <div className="p-3 glass-morphism rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="text-sm font-medium">Code Review Session</p>
                  <p className="text-xs text-white/50">3 days ago</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gold-300 mb-4 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-gold-300"
                >
                  <History className="w-4 h-4 mr-2" />
                  View All Chats
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-gold-300"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Favorite Responses
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-gold-300"
                  onClick={() => navigate("/upgrade")}
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </div>

            {/* Plan-Based Access Tiles */}
            <div>
              <h3 className="text-sm font-semibold text-gold-300 mb-4 uppercase tracking-wider">
                Your Access
              </h3>
              <div className="space-y-3">
                {/* PartnerTech Tools Tile */}
                <div className="glass-morphism p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-blue-300" />
                      <span className="text-sm font-medium">
                        PartnerTech Tools
                      </span>
                    </div>
                    {plan === "crm" ||
                    plan === "enterprise" ||
                    plan === "white_label" ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        Active
                      </Badge>
                    ) : (
                      <Lock className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 mb-3">
                    Business intelligence & CRM tools
                  </p>
                  {plan === "crm" ||
                  plan === "enterprise" ||
                  plan === "white_label" ? (
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => navigate("/partnertech")}
                    >
                      Open PartnerTech
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-white/50 border border-white/20"
                      onClick={() => navigate("/upgrade")}
                    >
                      Upgrade to Access
                    </Button>
                  )}
                </div>

                {/* CRM Panel Tile */}
                <div className="glass-morphism p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-purple-300" />
                      <span className="text-sm font-medium">CRM War Room</span>
                    </div>
                    {plan === "crm" ||
                    plan === "enterprise" ||
                    plan === "white_label" ? (
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                        Connected
                      </Badge>
                    ) : (
                      <Lock className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 mb-3">
                    GoHighLevel CRM integration
                  </p>
                  {plan === "crm" ||
                  plan === "enterprise" ||
                  plan === "white_label" ? (
                    <Button
                      size="sm"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => navigate("/crm")}
                    >
                      Open CRM
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-white/50 border border-white/20"
                      onClick={() => navigate("/upgrade")}
                    >
                      Upgrade for CRM
                    </Button>
                  )}
                </div>

                {/* White Label Admin (White Label Only) */}
                {plan === "white_label" && (
                  <div className="glass-morphism p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-gold-300" />
                        <span className="text-sm font-medium">Admin Panel</span>
                      </div>
                      <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 text-xs">
                        Admin
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 mb-3">
                      White label client management
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                      onClick={() => navigate("/admin")}
                    >
                      Admin Dashboard
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/10">
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center saintvision-glow">
                    {activeChat === "gpt4o" ? (
                      <Brain className="w-6 h-6 text-charcoal-900" />
                    ) : (
                      <Shield className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {activeChat === "gpt4o" ? (
                        <>
                          <span className="text-blue-400 font-semibold">
                            GPT-4o
                          </span>{" "}
                          Assistant
                        </>
                      ) : (
                        <>
                          <span className="text-purple-400 font-semibold">
                            Azure
                          </span>{" "}
                          Cognitive Services
                        </>
                      )}
                    </h2>
                    <p className="text-sm text-gold-300">
                      {activeChat === "gpt4o"
                        ? "Your GOTTA GUY™ Primary AI"
                        : "Enterprise Security & Analysis"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    Online
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/50 hover:text-gold-300"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatHistory.map(chat => (
              <div
                key={chat.id}
                className={`flex ${
                  chat.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    chat.type === "user"
                      ? "bg-gold-500 text-charcoal-900"
                      : "bg-white/10 text-white"
                  } rounded-lg p-4`}
                >
                  <p className="text-sm leading-relaxed">{chat.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{chat.model}</span>
                    <span>{chat.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex space-x-4">
              <Textarea
                placeholder="Ask me anything..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="flex-1 min-h-[60px] bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400"
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleSendMessage}
                  className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 saintvision-glow"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/50 hover:text-gold-300"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

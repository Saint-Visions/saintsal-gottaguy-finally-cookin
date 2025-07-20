import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/AppLayout";
import {
  Crown,
  Brain,
  Shield,
  Zap,
  Settings,
  Users,
  MessageSquare,
  Mic,
  Send,
  Plus,
  History,
  Star,
  ChevronRight,
  Activity,
  Database,
  Globe,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  FileText,
  Phone,
  Mail,
} from "lucide-react";

export default function Console() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [consoleMode, setConsoleMode] = useState<"client" | "companion">(
    "companion",
  );
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Console mode activated. I'm your enterprise-grade GOTTA GUY™ with full admin capabilities.",
      timestamp: new Date().toLocaleTimeString(),
      mode: "console",
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
      mode: consoleMode,
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "ai",
        content: `Processing ${consoleMode} mode request. Enhanced capabilities active.`,
        timestamp: new Date().toLocaleTimeString(),
        mode: consoleMode,
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const adminMetrics = [
    { label: "Active Users", value: "2,847", change: "+12%", icon: Users },
    {
      label: "API Calls Today",
      value: "48,291",
      change: "+8%",
      icon: Activity,
    },
    { label: "Revenue MTD", value: "$47,120", change: "+23%", icon: BarChart3 },
    {
      label: "Support Tickets",
      value: "12",
      change: "-15%",
      icon: MessageSquare,
    },
  ];

  const quickActions = [
    {
      title: "User Management",
      icon: Users,
      description: "Manage client accounts",
    },
    {
      title: "System Logs",
      icon: FileText,
      description: "View webhook & chat logs",
    },
    {
      title: "CRM Integration",
      icon: Globe,
      description: "GoHighLevel dashboard",
    },
    {
      title: "AI Model Config",
      icon: Brain,
      description: "GPT-4o & Azure settings",
    },
  ];

  return (
    <AppLayout>
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Navigation Header */}
      <nav className="relative z-50 flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-12 h-12 object-contain mr-2"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              AI Console
            </h1>
            <p className="text-xs text-gold-300 -mt-1">
              Enterprise Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={consoleMode === "companion" ? "default" : "ghost"}
              size="sm"
              onClick={() => setConsoleMode("companion")}
              className={
                consoleMode === "companion"
                  ? "bg-purple-500 text-white"
                  : "text-white/70 hover:text-purple-300"
              }
            >
              <Crown className="w-4 h-4 mr-2" />
              Companion
            </Button>
            <Button
              variant={consoleMode === "client" ? "default" : "ghost"}
              size="sm"
              onClick={() => setConsoleMode("client")}
              className={
                consoleMode === "client"
                  ? "bg-blue-500 text-white"
                  : "text-white/70 hover:text-blue-300"
              }
            >
              <Shield className="w-4 h-4 mr-2" />
              Client
            </Button>
          </div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Online
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-gold-300"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <div className="relative z-40 p-6 flex-1 overflow-hidden">
        {/* Header */}
        <div
          className={`mb-6 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                <span className="saintvision-gradient-text">Enterprise</span>
                <br />
                <span className="text-purple-300">AI Console</span>
              </h1>
              <p className="text-lg text-white/80">
                Advanced command center with full administrative capabilities
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">
                Mode: {consoleMode === "companion" ? "Companion" : "Client"}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-300">Enhanced Mode</span>
              </div>
            </div>
          </div>

          {/* Admin Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className={`glass-morphism p-6 rounded-xl transform transition-all duration-1000 delay-${index *
                    100} ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-300" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-400 border-green-500/30"
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                  <p className="text-white/60 text-sm">{metric.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold saintvision-gradient-text mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className={`glass-morphism p-6 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 transform ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-300" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm">
                      {action.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="glass-morphism rounded-xl p-6 h-96">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Console Chat</h3>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className={
                  consoleMode === "companion"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-blue-500/20 text-blue-300"
                }
              >
                {consoleMode === "companion" ? "Companion" : "Client"} Mode
              </Badge>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 h-64 space-y-3">
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
                      ? consoleMode === "companion"
                        ? "bg-purple-500 text-white"
                        : "bg-blue-500 text-white"
                      : "bg-white/10 text-white"
                  } rounded-lg p-3`}
                >
                  <p className="text-sm leading-relaxed">{chat.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{chat.mode}</span>
                    <span>{chat.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Textarea
              placeholder="Enter console command..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="flex-1 min-h-[40px] max-h-[100px] bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex flex-col space-y-1">
              <Button
                onClick={handleSendMessage}
                className={
                  consoleMode === "companion"
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }
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

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-white/50">
              {consoleMode === "companion"
                ? "Enterprise Companion with full admin access • HACP™ Technology"
                : "Client Assistant mode with security context • US Patent 10,290,222"}
            </p>
            <div className="flex items-center space-x-2 text-xs text-white/50">
              <Zap className="w-3 h-3" />
              <span>
                {consoleMode === "companion" ? "Admin" : "Client"} Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

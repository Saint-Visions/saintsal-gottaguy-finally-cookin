import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Activity,
  Zap,
  Globe,
  MessageSquare,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Crown,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MoreVertical,
  ChevronRight,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function AdminLogs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const logTabs = [
    { id: "chat", label: "AI Chat", icon: MessageSquare, count: "1,247" },
    { id: "webhook", label: "Webhooks", icon: Zap, count: "89" },
    { id: "api", label: "API Calls", icon: Globe, count: "3,421" },
    { id: "system", label: "System", icon: Settings, count: "156" },
  ];

  const logMetrics = [
    {
      label: "Total Logs Today",
      value: "4,913",
      change: "+12%",
      icon: FileText,
    },
    {
      label: "Error Rate",
      value: "0.3%",
      change: "-0.1%",
      icon: AlertCircle,
    },
    {
      label: "Avg Response",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
    },
    {
      label: "Success Rate",
      value: "99.7%",
      change: "+0.1%",
      icon: CheckCircle,
    },
  ];

  const chatLogs = [
    {
      id: 1,
      timestamp: "2024-03-15 14:32:41",
      user: "marcus@techstartup.io",
      model: "GPT-4o",
      tokens: 245,
      response_time: "1.3s",
      status: "success",
      prompt: "Help me analyze this sales data...",
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:31:15",
      user: "sarah@digitalagency.com",
      model: "Azure Cognitive",
      tokens: 189,
      response_time: "0.9s",
      status: "success",
      prompt: "Generate email for prospect follow-up",
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:30:02",
      user: "david@consultingfirm.net",
      model: "GPT-4o",
      tokens: 412,
      response_time: "2.1s",
      status: "error",
      prompt: "Create business proposal template...",
    },
    {
      id: 4,
      timestamp: "2024-03-15 14:28:33",
      user: "lisa@realestate.biz",
      model: "GPT-4o",
      tokens: 156,
      response_time: "0.8s",
      status: "success",
      prompt: "Draft property listing description",
    },
  ];

  const webhookLogs = [
    {
      id: 1,
      timestamp: "2024-03-15 14:32:15",
      endpoint: "/api/stripe/webhook",
      event: "payment.succeeded",
      status: "success",
      response_code: 200,
      payload_size: "2.1KB",
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:30:45",
      endpoint: "/api/onleadsubmit",
      event: "lead.created",
      status: "success",
      response_code: 200,
      payload_size: "1.8KB",
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:29:12",
      endpoint: "/api/twilio/sms",
      event: "sms.sent",
      status: "error",
      response_code: 500,
      payload_size: "0.9KB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle;
      case "error":
        return XCircle;
      case "pending":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.98) 0%, rgba(16, 22, 28, 0.95) 100%), 
                           url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      {/* Mobile-Optimized Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-4 md:p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold saintvision-gradient-text">
              System Logs
            </h1>
            <p className="text-xs text-gold-300 -mt-1 hidden sm:block">
              Admin Monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs md:text-sm">
            <Shield className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Admin</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-white/20 text-white hover:bg-white/10 px-2 md:px-4"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""} ${
                window.innerWidth < 768 ? "" : "mr-2"
              }`}
            />
            <span className="hidden md:inline">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-First Header */}
          <div
            className={`mb-6 md:mb-8 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 tracking-tight">
              <span className="saintvision-gradient-text">System</span>
              <br />
              <span className="text-red-300">Monitoring</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Real-time logs and monitoring for your SaintSal™ platform.
            </p>
          </div>

          {/* Mobile-Optimized Metrics */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {logMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="glass-morphism p-3 md:p-6 rounded-xl hover:saintvision-glow transition-all group"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-red-300" />
                    <span
                      className={`text-xs md:text-sm font-semibold ${
                        metric.change.startsWith("+")
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-white/70 text-xs md:text-sm">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile Tab Navigation */}
          <div
            className={`mb-6 md:mb-8 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism p-3 md:p-4 rounded-xl">
              {/* Mobile-First Search */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/40" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-10 md:pl-12 h-10 md:h-auto"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 h-10 px-3 md:px-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>

              {/* Mobile-Optimized Tabs */}
              <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
                {logTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 text-xs md:text-sm ${
                        activeTab === tab.id
                          ? "bg-red-500 text-white saintvision-glow"
                          : "text-white/70 hover:text-red-300"
                      } px-3 md:px-4 h-9 md:h-10`}
                    >
                      <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">
                        {tab.label.split(" ")[0]}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white ml-1 md:ml-2 text-xs px-1"
                      >
                        {tab.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Log Content */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <h3 className="text-lg font-bold flex items-center">
                  {activeTab === "chat" && (
                    <>
                      <MessageSquare className="w-5 h-5 mr-2" />
                      AI Chat Logs
                    </>
                  )}
                  {activeTab === "webhook" && (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Webhook Activity
                    </>
                  )}
                  {activeTab === "api" && (
                    <>
                      <Globe className="w-5 h-5 mr-2" />
                      API Requests
                    </>
                  )}
                  {activeTab === "system" && (
                    <>
                      <Settings className="w-5 h-5 mr-2" />
                      System Events
                    </>
                  )}
                </h3>
              </div>

              {/* Mobile-First Log Display */}
              <div className="divide-y divide-white/10">
                {activeTab === "chat" &&
                  chatLogs.map(log => {
                    const StatusIcon = getStatusIcon(log.status);
                    return (
                      <div
                        key={log.id}
                        className="p-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="w-4 h-4 text-green-300" />
                            <Badge className={getStatusColor(log.status)}>
                              {log.status}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-300 text-xs"
                            >
                              {log.model}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white p-1"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mb-2">
                          <p className="text-white/90 text-sm font-medium mb-1">
                            {log.user}
                          </p>
                          <p className="text-white/70 text-sm line-clamp-2">
                            {log.prompt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{log.timestamp}</span>
                          <div className="flex items-center space-x-3">
                            <span>{log.tokens} tokens</span>
                            <span>{log.response_time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {activeTab === "webhook" &&
                  webhookLogs.map(log => {
                    const StatusIcon = getStatusIcon(log.status);
                    return (
                      <div
                        key={log.id}
                        className="p-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="w-4 h-4" />
                            <Badge className={getStatusColor(log.status)}>
                              {log.response_code}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mb-2">
                          <p className="text-white/90 text-sm font-medium mb-1">
                            {log.endpoint}
                          </p>
                          <p className="text-white/70 text-sm">{log.event}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{log.timestamp}</span>
                          <span>{log.payload_size}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Mobile-Optimized Pagination */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/70 text-sm">
                  Showing {activeTab === "chat" ? "4" : "3"} of{" "}
                  {logTabs
                    .find(tab => tab.id === activeTab)
                    ?.count?.replace(",", "")}{" "}
                  logs
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 px-3 h-8"
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 px-3 h-8"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { SaintSalCompanion } from "@/components/SaintSalCompanion";
import { ProtectedRoute, useUserPlan } from "@/hooks/use-plan-protection";
import {
  ExternalLink,
  Globe,
  Settings,
  Crown,
  RefreshCw,
  Maximize2,
  Users,
  Activity,
  BarChart3,
  Phone,
  Brain,
  Zap,
  Target,
  MessageSquare,
  Calendar,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Sparkles,
} from "lucide-react";

function CRMContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [activeAiTool, setActiveAiTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [realtimeData, setRealtimeData] = useState({
    contacts: 2847,
    activeLeads: 147,
    pipelineValue: 45000,
    callsToday: 89,
    lastUpdate: new Date().toISOString(),
  });
  const { plan } = useUserPlan();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Simulate real-time data updates
    const dataInterval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        contacts: prev.contacts + Math.floor(Math.random() * 3),
        activeLeads: prev.activeLeads + Math.floor(Math.random() * 2) - 1,
        pipelineValue:
          prev.pipelineValue + Math.floor(Math.random() * 1000) - 500,
        callsToday: prev.callsToday + Math.floor(Math.random() * 2),
        lastUpdate: new Date().toISOString(),
      }));
    }, 30000); // Update every 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(dataInterval);
    };
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeLoaded(false);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIsLoading(false);
  };

  const handleAiAction = async (action: string) => {
    setActiveAiTool(action);

    try {
      const response = await fetch("/api/ghl-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ AI action completed: ${action}`, result);
      }
    } catch (error) {
      console.error(`❌ AI action failed: ${action}`, error);
    } finally {
      setTimeout(() => setActiveAiTool(null), 2000);
    }
  };

  const planLimits = {
    pro: { accounts: 1, color: "blue", label: "Pro Plan" },
    enterprise: { accounts: 5, color: "purple", label: "Enterprise" },
    white_label: { accounts: 10, color: "gold", label: "White Label" },
  };

  const currentPlan =
    planLimits[plan as keyof typeof planLimits] || planLimits.pro;

  return (
    <AppLayout>
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Elite Navigation Bar */}
      <div className="relative z-50 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/98 to-charcoal-900/95 backdrop-blur-xl border-b border-gold-500/20">
        {/* Premium Header */}
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center saintvision-glow-strong">
                <span className="text-charcoal-900 font-bold text-lg">Sv</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold saintvision-gradient-text tracking-tight">
                  CRM Command Center
                </h1>
                <p className="text-sm text-gold-300/80 font-medium">
                  Enterprise CRM • Real-Time Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Elite Status Bar */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-300 border-gold-500/40 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                {currentPlan.label}
              </Badge>

              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/40 px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Connected
              </Badge>
            </div>

            {/* Elite Controls */}
            <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="text-white/80 hover:text-gold-300 hover:bg-gold-500/10 transition-all duration-200"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white/80 hover:text-gold-300 hover:bg-gold-500/10 transition-all duration-200"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-gold-300 hover:bg-gold-500/10 transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Elite Metrics Dashboard */}
        <div className="px-8 pb-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="group">
              <div className="glass-morphism p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                    +12%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {realtimeData.contacts.toLocaleString()}
                </div>
                <div className="text-sm text-blue-300/80 font-medium">
                  Total Contacts
                </div>
                <div className="mt-2 h-1 bg-blue-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-morphism p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                  <Badge className="bg-green-500/20 text-green-300 text-xs">
                    +8%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {realtimeData.activeLeads}
                </div>
                <div className="text-sm text-green-300/80 font-medium">
                  Active Leads
                </div>
                <div className="mt-2 h-1 bg-green-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-2/3 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-morphism p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                    +15%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${(realtimeData.pipelineValue / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-purple-300/80 font-medium">
                  Pipeline Value
                </div>
                <div className="mt-2 h-1 bg-purple-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 w-4/5 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-morphism p-6 rounded-2xl border border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Phone className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors" />
                  <Badge className="bg-gold-500/20 text-gold-300 text-xs">
                    +23%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {realtimeData.callsToday}
                </div>
                <div className="text-sm text-gold-300/80 font-medium">
                  Calls Today
                </div>
                <div className="mt-2 h-1 bg-gold-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative flex-1 ${
          isFullscreen ? "fixed inset-0 z-50 bg-charcoal-900" : ""
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-charcoal-900/90 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Loading CRM Dashboard...</p>
              <p className="text-white/50 text-sm mt-2">
                Connecting to GoHighLevel
              </p>
            </div>
          </div>
        )}

        {/* Elite AI Command Center */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-96 bg-gradient-to-b from-charcoal-900/98 via-charcoal-900/95 to-charcoal-900/98 backdrop-blur-xl border-r border-gold-500/20 transform transition-all duration-500 ease-out z-30 ${
            aiPanelOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          {/* Elite Header */}
          <div className="p-6 border-b border-gold-500/20 bg-gradient-to-r from-gold-500/5 to-transparent">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center saintvision-glow">
                  <Brain className="w-5 h-5 text-charcoal-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold saintvision-gradient-text">
                    SaintSal™ AI
                  </h3>
                  <p className="text-xs text-gold-300/80">Command Center</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiPanelOpen(false)}
                className="text-white/70 hover:text-gold-300 hover:bg-gold-500/10 rounded-lg"
              >
                ×
              </Button>
            </div>

            {/* Elite Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-400/70" />
              <Input
                placeholder="Ask SaintSal anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gradient-to-r from-white/5 to-white/10 border-gold-500/30 text-white placeholder:text-white/50 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 transition-all"
              />
            </div>
          </div>

          {/* Elite AI Tools */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-280px)]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full"></div>
              <span className="text-sm text-gold-300 uppercase tracking-wider font-bold">
                AI Operations
              </span>
            </div>

            {[
              {
                id: "score-leads",
                icon: Target,
                label: "Score All Leads",
                desc: "AI-powered lead scoring & prioritization",
                color: "purple",
              },
              {
                id: "sync-contacts",
                icon: Users,
                label: "Sync Contacts",
                desc: "Real-time database synchronization",
                color: "blue",
              },
              {
                id: "new-campaign",
                icon: MessageSquare,
                label: "Create Campaign",
                desc: "Generate intelligent email sequences",
                color: "green",
              },
              {
                id: "optimize-calls",
                icon: Phone,
                label: "Optimize Calls",
                desc: "AI-enhanced call scripts & timing",
                color: "orange",
              },
              {
                id: "analyze-pipeline",
                icon: BarChart3,
                label: "Analyze Pipeline",
                desc: "Deep performance insights",
                color: "cyan",
              },
              {
                id: "generate-reports",
                icon: Download,
                label: "Generate Report",
                desc: "Executive analytics export",
                color: "pink",
              },
            ].map(tool => {
              const Icon = tool.icon;
              const isActive = activeAiTool === tool.id;

              return (
                <div
                  key={tool.id}
                  className={`group relative glass-morphism p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isActive
                      ? "ring-2 ring-gold-500/60 bg-gradient-to-r from-gold-500/20 to-gold-600/10 shadow-lg"
                      : "hover:bg-white/10 border border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => handleAiAction(tool.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-gold-500/30 to-gold-600/20 saintvision-glow"
                          : `bg-${tool.color}-500/20 group-hover:bg-${tool.color}-500/30`
                      }`}
                    >
                      {isActive ? (
                        <div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 text-${tool.color}-400 group-hover:text-${tool.color}-300 transition-colors`}
                        />
                      )}

                      {/* Status indicator */}
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          isActive ? "bg-gold-400 animate-pulse" : "bg-gray-600"
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1">
                      <div className="text-base font-semibold text-white group-hover:text-gold-200 transition-colors">
                        {tool.label}
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-white/80 transition-colors mt-1">
                        {tool.desc}
                      </div>
                    </div>

                    {/* Action indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Elite Live Intelligence */}
            <div className="mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
                <span className="text-sm text-green-300 uppercase tracking-wider font-bold">
                  Live Intelligence
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 to-transparent"></div>
              </div>

              <div className="space-y-4">
                <div className="glass-morphism p-5 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-6 h-6 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-300 text-xs">
                      LIVE
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {realtimeData.contacts.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-300/80 font-medium">
                    Total Contacts
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-green-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-4/5 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">
                      +2.3%
                    </span>
                  </div>
                </div>

                <div className="glass-morphism p-5 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <Activity className="w-6 h-6 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                      HOT
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {realtimeData.activeLeads}
                  </div>
                  <div className="text-sm text-blue-300/80 font-medium">
                    Active Leads
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-3/5 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-blue-400 font-semibold">
                      +8.1%
                    </span>
                  </div>
                </div>

                <div className="glass-morphism p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                      GROWTH
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    ${(realtimeData.pipelineValue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-purple-300/80 font-medium">
                    Pipeline Value
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-purple-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 w-4/5 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-purple-400 font-semibold">
                      +15.7%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elite AI Toggle */}
        <Button
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
          className={`absolute left-6 top-6 z-40 bg-gradient-to-r from-gold-500/30 to-gold-600/20 hover:from-gold-500/40 hover:to-gold-600/30 text-gold-300 border border-gold-500/40 hover:border-gold-400/60 saintvision-glow px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-105 ${
            aiPanelOpen ? "translate-x-96" : "translate-x-0"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-charcoal-900" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">SaintSal™ AI</div>
              <div className="text-xs text-gold-400/80">Command Center</div>
            </div>
          </div>
        </Button>

        {/* Main CRM Iframe */}
        <div className="relative w-full h-full">
          {!iframeLoaded && (
            <div className="absolute inset-0 bg-charcoal-900/90 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/70">Loading CRM Dashboard...</p>
                <p className="text-white/50 text-sm mt-2">
                  Connecting to GoHighLevel
                </p>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src="https://lending.saintvisiongroup.com"
            className="w-full h-full border-0 rounded-lg"
            title="GoHighLevel CRM"
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 22, 28, 0.95) 0%, rgba(16, 22, 28, 0.85) 100%)",
            }}
          />

          {/* Quick Action Overlay - Bottom Right */}
          <div className="absolute bottom-4 right-4 space-y-2 z-30">
            <Button
              size="sm"
              className="bg-green-500/80 hover:bg-green-500 text-white shadow-lg"
              onClick={() => handleAiAction("new-contact")}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Contact
            </Button>

            <Button
              size="sm"
              className="bg-blue-500/80 hover:bg-blue-500 text-white shadow-lg"
              onClick={() => handleAiAction("new-opportunity")}
            >
              <Target className="w-4 h-4 mr-1" />
              New Deal
            </Button>

            <Button
              size="sm"
              className="bg-purple-500/80 hover:bg-purple-500 text-white shadow-lg"
              onClick={() => handleAiAction("schedule-call")}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <Button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 bg-charcoal-800 hover:bg-charcoal-700 text-white border border-white/20"
        >
          Exit Fullscreen
        </Button>
      )}

      {/* Enhanced SaintSal Companion for CRM */}
      <SaintSalCompanion
        contextData={{
          page: "crm",
          activeAiTool,
          realtimeData,
          plan,
          iframeLoaded,
          suggestions: [
            "Want me to analyze your top leads from today?",
            "I can create follow-up sequences for cold prospects",
            "Should I prioritize your pipeline by close probability?",
            "I can generate call scripts for your 3pm appointments",
            "Ready to automate your lead nurturing workflow?",
          ],
          crmActions: {
            scoreLeads: () => handleAiAction("score-leads"),
            syncContacts: () => handleAiAction("sync-contacts"),
            analyzePipeline: () => handleAiAction("analyze-pipeline"),
            generateReports: () => handleAiAction("generate-reports"),
          },
        }}
      />
    </AppLayout>
  );
}

function CRMUpgradeFallback() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-gold-500/30">
            <Globe className="w-8 h-8 text-purple-300" />
          </div>
          <h2 className="text-2xl font-bold saintvision-gradient-text mb-4">
            CRM Access Required
          </h2>
          <p className="text-white/70 mb-6">
            Access to the CRM War Room requires a Pro Plan ($97/mo) or higher.
            Get your own branded GoHighLevel subaccount with full CRM
            capabilities.
          </p>
          <div className="space-y-3">
            <Button
              className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-900 saintvision-glow"
              onClick={() => (window.location.href = "/upgrade")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro Plan
            </Button>
            <Button
              variant="ghost"
              className="w-full text-white/70 hover:text-gold-300"
              onClick={() => (window.location.href = "/partnertech")}
            >
              View PartnerTech Demo
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function CRM() {
  return (
    <ProtectedRoute
      requiredPlan={["crm", "enterprise", "white_label"]}
      fallback={<CRMUpgradeFallback />}
    >
      <CRMContent />
    </ProtectedRoute>
  );
}

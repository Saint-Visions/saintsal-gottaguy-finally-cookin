import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/AppLayout";
import { SaintSalCompanion } from "@/components/SaintSalCompanion";
import { ProtectedRoute } from "@/hooks/use-plan-protection";
import {
  Crown,
  Brain,
  Shield,
  Zap,
  Chrome,
  Globe,
  Users,
  MessageSquare,
  Phone,
  Mail,
  Settings,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  Sparkles,
  ArrowUpRight,
  Download,
  ExternalLink,
  PlayCircle,
  FileText,
  Calendar,
  Clock,
} from "lucide-react";

function PartnerTechContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    leadsProcessed: 847,
    emailsSent: 2341,
    callsOptimized: 156,
    pipelineAccuracy: 94,
    isUpdating: false,
  });

  useEffect(() => {
    setIsLoaded(true);

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        leadsProcessed: prev.leadsProcessed + Math.floor(Math.random() * 3),
        emailsSent: prev.emailsSent + Math.floor(Math.random() * 5),
        callsOptimized: prev.callsOptimized + Math.floor(Math.random() * 2),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const aiTools = [
    {
      id: "lead-scorer",
      name: "Lead Scorer AI",
      description: "Automatically score and prioritize leads",
      icon: Target,
      status: "active",
      usage: `${realTimeData.leadsProcessed} leads processed`,
      accuracy: "94%",
      lastUpdate: "2 min ago",
      actions: [
        { label: "Run Now", action: () => handleAIAction("score-leads") },
        { label: "View Results", action: () => handleAIAction("view-leads") },
        { label: "Export Data", action: () => handleAIAction("export-leads") },
      ],
    },
    {
      id: "email-generator",
      name: "Email Generator",
      description: "Generate personalized email sequences",
      icon: Mail,
      status: "active",
      usage: `${realTimeData.emailsSent.toLocaleString()} emails sent`,
      accuracy: "89%",
      lastUpdate: "5 min ago",
      actions: [
        { label: "New Campaign", action: () => handleAIAction("new-campaign") },
        { label: "A/B Test", action: () => handleAIAction("ab-test") },
        { label: "Analytics", action: () => handleAIAction("email-analytics") },
      ],
    },
    {
      id: "call-script",
      name: "Call Script AI",
      description: "Dynamic call scripts based on lead data",
      icon: Phone,
      status: "active",
      usage: `${realTimeData.callsOptimized} calls optimized`,
      accuracy: "92%",
      lastUpdate: "1 min ago",
      actions: [
        {
          label: "Optimize Scripts",
          action: () => handleAIAction("optimize-calls"),
        },
        { label: "Call Queue", action: () => handleAIAction("call-queue") },
        {
          label: "Performance",
          action: () => handleAIAction("call-performance"),
        },
      ],
    },
    {
      id: "pipeline-predictor",
      name: "Pipeline Predictor",
      description: "Forecast deal closure probability",
      icon: TrendingUp,
      status: "premium",
      usage: `${realTimeData.pipelineAccuracy}% accuracy rate`,
      accuracy: "87%",
      lastUpdate: "3 min ago",
      actions: [
        {
          label: "Analyze Pipeline",
          action: () => handleAIAction("analyze-pipeline"),
        },
        {
          label: "Predict Closures",
          action: () => handleAIAction("predict-closures"),
        },
        {
          label: "Opportunity Insights",
          action: () => handleAIAction("opportunity-insights"),
        },
      ],
    },
  ];

  const handleAIAction = async (actionType: string) => {
    setRealTimeData(prev => ({ ...prev, isUpdating: true }));

    try {
      // Real GHL API calls
      const response = await fetch("/api/ghl-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: actionType,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ GHL Action completed: ${actionType}`, result);

        // Update metrics based on action
        if (actionType === "score-leads") {
          setRealTimeData(prev => ({
            ...prev,
            leadsProcessed:
              prev.leadsProcessed + Math.floor(Math.random() * 10) + 5,
          }));
        } else if (actionType === "new-campaign") {
          setRealTimeData(prev => ({
            ...prev,
            emailsSent: prev.emailsSent + Math.floor(Math.random() * 50) + 25,
          }));
        } else if (actionType === "optimize-calls") {
          setRealTimeData(prev => ({
            ...prev,
            callsOptimized:
              prev.callsOptimized + Math.floor(Math.random() * 5) + 3,
          }));
        }
      } else {
        console.error(`❌ GHL Action failed: ${actionType}`);
      }
    } catch (error) {
      console.error(`❌ Error executing GHL action: ${actionType}`, error);
    } finally {
      setRealTimeData(prev => ({ ...prev, isUpdating: false }));
    }
  };

  // GHL Contact Management Functions
  const handleCreateContact = async (contactData: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }) => {
    try {
      const response = await fetch("/api/ghl-contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Contact created:", result);
        return result;
      }
    } catch (error) {
      console.error("❌ Error creating contact:", error);
    }
  };

  const handlePipelineAction = async (
    action: string,
    opportunityData?: any,
  ) => {
    try {
      const response = await fetch("/api/ghl-pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          data: opportunityData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Pipeline action completed: ${action}`, result);
        return result;
      }
    } catch (error) {
      console.error(`❌ Error executing pipeline action: ${action}`, error);
    }
  };

  const crmMetrics = [
    { label: "Active Leads", value: "2,847", change: "+12%", icon: Users },
    { label: "Conversion Rate", value: "23.4%", change: "+5.2%", icon: Target },
    {
      label: "Pipeline Value",
      value: "$147K",
      change: "+18%",
      icon: BarChart3,
    },
    { label: "Calls Today", value: "89", change: "+7%", icon: Phone },
  ];

  return (
    <AppLayout>
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fcd4fb840c2bb4d148974cb72b1794a47?format=webp&width=800"
              alt="PartnerTech.ai Logo"
              className="w-8 h-8 object-contain"
              style={{
                filter:
                  "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
                opacity: "0.95",
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              PartnerTech.ai
            </h1>
            <p className="text-xs text-gold-300 -mt-1">
              Business Intelligence & CRM Integration
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Connected
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Crown className="w-3 h-3 mr-1" />
            Pro Plan
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

      <div className="relative z-40 p-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div
          className={`mb-6 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                <span className="saintvision-gradient-text">Business</span>
                <br />
                <span className="text-gold-300">Intelligence Hub</span>
              </h1>
              <p className="text-lg text-white/80">
                Your AI-powered business operations command center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 saintvision-glow"
                onClick={() => window.open("/crm", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open CRM War Room
              </Button>

              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                onClick={() => handleAIAction("sync-contacts")}
              >
                <Users className="w-4 h-4 mr-2" />
                Sync Contacts
              </Button>

              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                onClick={() => handlePipelineAction("refresh-pipeline")}
              >
                <Activity className="w-4 h-4 mr-2" />
                Refresh Pipeline
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {crmMetrics.map((metric, index) => {
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
                    <div className="w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold-300" />
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

          {/* AI Tools Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold saintvision-gradient-text">
                AI Business Tools
              </h2>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-gold-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Tools
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className={`group glass-morphism p-6 rounded-xl cursor-pointer hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 transform relative ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    } ${
                      activeTile === tool.id
                        ? "ring-2 ring-gold-500/50 border-gold-500/50"
                        : ""
                    }`}
                    style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    onClick={() => setActiveTile(tool.id)}
                    onMouseEnter={() => setActiveTile(tool.id)}
                    onMouseLeave={() => setActiveTile(null)}
                  >
                    {/* Loading Indicator */}
                    {realTimeData.isUpdating && activeTile === tool.id && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Icon className="w-6 h-6 text-blue-300" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            tool.status === "active" ? "default" : "secondary"
                          }
                          className={
                            tool.status === "active"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          }
                        >
                          {tool.status === "active" ? "Active" : "Premium"}
                        </Badge>
                        {tool.status === "active" && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold mb-2 group-hover:text-gold-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      {tool.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-gold-300 text-xs font-medium">
                          {tool.usage}
                        </p>
                        <span className="text-xs text-white/50">
                          {tool.accuracy}
                        </span>
                      </div>
                      <div className="text-xs text-white/40">
                        {tool.lastUpdate}
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div
                      className={`mt-4 transition-all duration-300 ${
                        activeTile === tool.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <div className="flex flex-wrap gap-1">
                        {tool.actions?.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              action.action();
                            }}
                            className="h-6 px-2 text-xs bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CRM Integration Section */}
          <div className="glass-morphism rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">GoHighLevel CRM</h3>
                  <p className="text-white/60 text-sm">
                    Live integration active
                  </p>
                </div>
              </div>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => window.open("/crm", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open War Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className="glass-morphism p-4 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handleAIAction("sync-contacts")}
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-4 h-4 text-green-300" />
                </div>
                <h4 className="font-medium mb-1">Contact Sync</h4>
                <p className="text-white/60 text-xs">
                  Real-time contact management
                </p>
              </div>

              <div
                className="glass-morphism p-4 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handlePipelineAction("refresh-pipeline")}
              >
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-4 h-4 text-blue-300" />
                </div>
                <h4 className="font-medium mb-1">Pipeline Sync</h4>
                <p className="text-white/60 text-xs">Automated deal tracking</p>
              </div>

              <div
                className="glass-morphism p-4 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handleAIAction("trigger-automation")}
              >
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
                <h4 className="font-medium mb-1">AI Actions</h4>
                <p className="text-white/60 text-xs">
                  Smart automation triggers
                </p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-500/10"
                onClick={() =>
                  handleCreateContact({ firstName: "New", lastName: "Lead" })
                }
              >
                <Users className="w-3 h-3 mr-1" />
                Add Contact
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                onClick={() => handlePipelineAction("create-opportunity")}
              >
                <Target className="w-3 h-3 mr-1" />
                New Opportunity
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                onClick={() => handleAIAction("generate-reports")}
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                Generate Report
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-gold-500/50 text-gold-300 hover:bg-gold-500/10"
                onClick={() => handleAIAction("ai-insights")}
              >
                <Brain className="w-3 h-3 mr-1" />
                AI Insights
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SaintSal Azure Companion */}
      <SaintSalCompanion
        contextData={{
          activeTile,
          metrics: realTimeData,
          suggestions: [
            "Want me to rerun lead scoring for the latest data?",
            "I can generate email sequences for high-scoring leads",
            "Should I prioritize California leads with 3+ calls?",
          ],
        }}
      />
    </AppLayout>
  );
}

// Plan upgrade fallback component
function UpgradeFallback() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-gold-500/30">
            <Crown className="w-8 h-8 text-gold-300" />
          </div>
          <h2 className="text-2xl font-bold saintvision-gradient-text mb-4">
            Pro Plan Required
          </h2>
          <p className="text-white/70 mb-6">
            Access to PartnerTech.ai business intelligence requires a Pro Plan
            ($97/mo) or higher. Unlock CRM integration, AI tools, and advanced
            business automation.
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
              onClick={() => (window.location.href = "/dashboard")}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function PartnerTech() {
  return (
    <ProtectedRoute
      requiredPlan={["crm", "enterprise", "white_label"]}
      fallback={<UpgradeFallback />}
    >
      <PartnerTechContent />
    </ProtectedRoute>
  );
}

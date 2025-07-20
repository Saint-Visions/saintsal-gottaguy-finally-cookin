import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { GHLIntegrationStatus } from "@/components/GHLIntegrationStatus";
import {
  ExternalLink,
  RefreshCw,
  Settings,
  Users,
  Calendar,
  MessageSquare,
  Info,
} from "lucide-react";

export default function CRM() {
  const [crmUrl, setCrmUrl] = useState(
    "https://app.gohighlevel.com/v2/location/dashboard",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");

  // Get the appropriate CRM URL based on user's plan and sub-account
  const getCrmUrl = (view: string = "dashboard") => {
    // For SaintVisionAI sub-account (from your screenshots)
    const baseUrl = "https://app.gohighlevel.com/v2/location";
    const viewPaths = {
      dashboard: "dashboard",
      contacts: "contacts",
      calendar: "calendar",
      conversations: "conversations",
      opportunities: "opportunities",
      campaigns: "marketing/campaigns",
      reports: "reporting",
    };
    return `${baseUrl}/${viewPaths[view as keyof typeof viewPaths] ||
      viewPaths.dashboard}`;
  };

  useEffect(() => {
    setCrmUrl(getCrmUrl(currentView));
    setIsLoading(true);
  }, [currentView]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const quickActions = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Settings,
      description: "CRM Overview",
    },
    {
      id: "contacts",
      title: "Contacts",
      icon: Users,
      description: "Manage Leads",
    },
    {
      id: "calendar",
      title: "Calendar",
      icon: Calendar,
      description: "Appointments",
    },
    {
      id: "conversations",
      title: "Messages",
      icon: MessageSquare,
      description: "Chat & SMS",
    },
    {
      id: "integration",
      title: "API Status",
      icon: Info,
      description: "Integration Status",
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-charcoal-900">
        {/* CRM Header */}
        <div className="bg-charcoal-800 border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    PartnerTech.ai
                  </span>
                  <span className="text-blue-400 font-bold px-2 py-1 bg-blue-400/10 rounded-md text-sm">
                    CRM
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Automation Suite
                </h1>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-green-400 font-semibold animate-pulse flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Cookin'
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-blue-300">
                    Powered by GoHighLevel + HACP™
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {quickActions.map(action => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant={currentView === action.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView(action.id)}
                    className={`text-white/80 hover:text-blue-300 ${
                      currentView === action.id
                        ? "bg-blue-500 text-white hover:bg-blue-400"
                        : "hover:bg-white/10"
                    }`}
                    title={action.description}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline ml-2">
                      {action.title}
                    </span>
                  </Button>
                );
              })}

              <div className="h-6 w-px bg-white/20 mx-2" />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-blue-300 hover:text-blue-100 hover:bg-blue-500/20"
                title="Refresh CRM"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(crmUrl, "_blank")}
                className="text-blue-300 hover:text-blue-100 hover:bg-blue-500/20"
                title="Open in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-charcoal-900/80 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Loading CRM...</p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 relative">
          {currentView === "integration" ? (
            <div className="p-6 bg-charcoal-900 h-full overflow-auto">
              <GHLIntegrationStatus />
            </div>
          ) : (
            <div className="h-full bg-white">
              <iframe
                src={crmUrl}
                width="100%"
                height="100%"
                className="border-none"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                onLoad={handleIframeLoad}
                title="SaintVision CRM"
              />
            </div>
          )}
        </div>

        {/* Connection Status */}
        <div className="bg-charcoal-800 border-t border-white/10 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70">
                Connected to SaintVision CRM •{" "}
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </span>
            </div>
            <div className="text-white/50 text-xs">
              Sync: Real-time • API: Active
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

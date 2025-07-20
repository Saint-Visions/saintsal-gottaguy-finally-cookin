import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Brain,
  Building2,
  StickyNote,
  Zap,
  ImageIcon,
  Rocket,
  MessageCircle,
  Users,
  GraduationCap,
  TrendingUp,
  User,
  LogOut,
  MonitorSpeaker,
  Settings,
  Bookmark,
  Clock,
  Star,
  Filter,
  Palette,
  Bell,
  Shield,
  Crown,
  Plus,
  Minimize,
  Maximize,
  BarChart3,
  Activity,
  Target,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  MessageSquare,
  Sparkles,
  Timer,
  FileText,
  Lightbulb,
  Database,
  Wifi,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "main-dashboard",
    title: "Main Dashboard",
    href: "/dashboard",
    icon: Home,
    category: "core",
    isActive: (pathname: string) => pathname === "/dashboard",
  },
  {
    id: "my-companion",
    title: "My Companion",
    href: "/dashboard",
    icon: Brain,
    emoji: "🧠",
    category: "ai",
    description: "AI Chat & Assistant",
    isActive: (pathname: string) => pathname === "/dashboard",
  },
  {
    id: "my-business",
    title: "My Business",
    href: "/partnertech",
    icon: Building2,
    emoji: "💼",
    category: "business",
    description: "Business Intelligence Hub",
    isActive: (pathname: string) => pathname === "/partnertech",
  },
  {
    id: "sticky-notes",
    title: "Sticky Notes",
    href: "/workspace/notes",
    icon: StickyNote,
    emoji: "📝",
    category: "productivity",
    description: "Quick Notes & Ideas",
    isActive: (pathname: string) => pathname.startsWith("/workspace"),
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    href: "/console",
    icon: Zap,
    emoji: "⚡📱",
    category: "ai",
    description: "Advanced AI Console",
    isActive: (pathname: string) => pathname === "/console",
  },
  {
    id: "create-agent",
    title: "Create SuperSal™",
    href: "/create-agent",
    icon: Sparkles,
    emoji: "🤖✨",
    category: "ai",
    description: "Build Your AI Agent",
    isActive: (pathname: string) => pathname === "/create-agent",
  },
  {
    id: "ai-training",
    title: "AI Training Hub",
    href: "/ai-training",
    icon: Brain,
    emoji: "🧠🎯",
    category: "ai",
    description: "Train Your AI Models",
    isActive: (pathname: string) => pathname === "/ai-training",
  },
  {
    id: "image-generator",
    title: "Image Generator",
    href: "/workspace/image-gen",
    icon: ImageIcon,
    emoji: "📸",
    category: "creative",
    description: "AI Image Creation",
    isActive: (pathname: string) => pathname.includes("image"),
  },
  {
    id: "svg-launchpad",
    title: "SVG Launchpad",
    href: "/workspace/svg",
    icon: Rocket,
    emoji: "🚀",
    category: "creative",
    description: "SVG Design Tools",
    isActive: (pathname: string) => pathname.includes("svg"),
  },
  {
    id: "feedback-help",
    title: "Feedback & Help",
    href: "/help",
    icon: MessageCircle,
    emoji: "💬",
    category: "support",
    description: "Get Help & Support",
    isActive: (pathname: string) => pathname === "/help",
  },
  {
    id: "partnertech-crm",
    title: "PartnerTech.ai CRM",
    href: "/crm",
    icon: MonitorSpeaker,
    category: "business",
    description: "CRM War Room",
    isActive: (pathname: string) => pathname === "/crm",
  },
  {
    id: "client-portal",
    title: "Client Portal",
    href: "/admin/clients",
    icon: Users,
    emoji: "🌸",
    category: "admin",
    description: "Client Management",
    isActive: (pathname: string) => pathname.includes("clients"),
  },
  {
    id: "client-onboarding",
    title: "Client Onboarding",
    href: "/admin/onboarding",
    icon: Crown,
    emoji: "🚀🔑",
    category: "admin",
    description: "Provision New Clients",
    isActive: (pathname: string) => pathname.includes("onboarding"),
  },
  {
    id: "svt-institute",
    title: "SVT Institute of AI (R + D)",
    href: "/research",
    icon: GraduationCap,
    emoji: "🏛️",
    category: "research",
    description: "Research & Development → saintvisiontech.com",
    isActive: (pathname: string) => pathname.includes("research"),
  },
  {
    id: "upgrade-tier",
    title: "Upgrade Tier",
    href: "/upgrade",
    icon: TrendingUp,
    emoji: "⚡",
    category: "account",
    description: "Upgrade Your Plan",
    isActive: (pathname: string) => pathname === "/upgrade",
  },
  {
    id: "my-account",
    title: "My Account",
    href: "/settings",
    icon: User,
    emoji: "👋",
    category: "account",
    description: "Account Settings",
    isActive: (pathname: string) => pathname === "/settings",
  },
  {
    id: "saintsal-you",
    title: "SaintSal + You",
    href: "/saintsal-you",
    icon: Sparkles,
    emoji: "✨",
    category: "core",
    description: "The Complete Experience",
    isActive: (pathname: string) => pathname === "/saintsal-you",
  },
];

interface UserPreferences {
  sidebarCollapsed: boolean;
  favoriteItems: string[];
  recentItems: string[];
  theme: "dark" | "light" | "auto";
  compactMode: boolean;
  showDescriptions: boolean;
  groupByCategory: boolean;
  showContextData: boolean;
  favoritesOnly: boolean;
}

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const location = useLocation();
  const [preferences, setPreferences] = useState<UserPreferences>({
    sidebarCollapsed: false,
    favoriteItems: ["/dashboard", "/crm", "/partnertech"],
    recentItems: ["/dashboard", "/crm", "/partnertech", "/console"],
    theme: "dark",
    compactMode: false,
    showDescriptions: true,
    groupByCategory: false,
    showContextData: true,
    favoritesOnly: false,
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [userPlan, setUserPlan] = useState("enterprise"); // This would come from auth context
  const [hasCRMAccess, setHasCRMAccess] = useState(true); // This would be determined from plan features

  // Determine if we should show PartnerTech branding
  const isPartnerTechUser = userPlan !== "free" && hasCRMAccess;

  const getBrandColors = () => {
    if (isPartnerTechUser) {
      return {
        primary: "blue-500",
        primaryLight: "blue-400",
        accent: "emerald-400",
        gradient: "from-blue-500/20 to-blue-600/20",
        text: "text-blue-300",
        hover: "hover:text-blue-300",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
      };
    }
    return {
      primary: "gold-500",
      primaryLight: "gold-400",
      accent: "gold-300",
      gradient: "from-gold-500/20 to-gold-600/20",
      text: "text-gold-300",
      hover: "hover:text-gold-300",
      bg: "bg-gold-500/10",
      border: "border-gold-500/30",
    };
  };

  const brandColors = getBrandColors();

  // Load preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem("saintvision-sidebar-prefs");
    if (savedPrefs) {
      setPreferences({ ...preferences, ...JSON.parse(savedPrefs) });
    }
  }, []);

  // Save preferences to localStorage
  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem("saintvision-sidebar-prefs", JSON.stringify(updated));
  };

  const toggleFavorite = (href: string) => {
    const favorites = preferences.favoriteItems.includes(href)
      ? preferences.favoriteItems.filter(item => item !== href)
      : [...preferences.favoriteItems, href];
    updatePreferences({ favoriteItems: favorites });
  };

  const addToRecent = (href: string) => {
    const recent = [
      href,
      ...preferences.recentItems.filter(item => item !== href),
    ].slice(0, 5);
    updatePreferences({ recentItems: recent });
  };

  // Get context-aware data panels based on current page
  const getContextDataPanel = () => {
    const path = location.pathname;

    if (path === "/dashboard") {
      return {
        title: "AI Dashboard Data",
        items: [
          {
            label: "Active Chats",
            value: "3",
            icon: MessageSquare,
            change: "+2",
            color: "text-blue-400",
          },
          {
            label: "AI Responses",
            value: "147",
            icon: Brain,
            change: "+23",
            color: "text-purple-400",
          },
          {
            label: "Voice Sessions",
            value: "12",
            icon: Mic,
            change: "+5",
            color: "text-green-400",
          },
          {
            label: "Model Switch",
            value: "GPT-4o",
            icon: Sparkles,
            change: "Active",
            color: `text-${brandColors.primary}`,
          },
        ],
        quickActions: [
          { label: "New Chat", icon: Plus },
          { label: "Voice Mode", icon: MessageCircle },
          { label: "Model Settings", icon: Brain },
        ],
      };
    }

    if (path === "/crm") {
      return {
        title: "CRM Live Data",
        items: [
          {
            label: "New Leads",
            value: "47",
            icon: Users,
            change: "+12",
            color: "text-green-400",
          },
          {
            label: "Pipeline Value",
            value: "$247K",
            icon: DollarSign,
            change: "+18%",
            color: `text-${brandColors.primary}`,
          },
          {
            label: "Calls Today",
            value: "23",
            icon: Phone,
            change: "+7",
            color: "text-blue-400",
          },
          {
            label: "Conversion Rate",
            value: "34.2%",
            icon: Target,
            change: "+5.2%",
            color: "text-purple-400",
          },
        ],
        quickActions: [
          { label: "New Contact", icon: Plus },
          { label: "Pipeline View", icon: Activity },
          { label: "Call Queue", icon: Phone },
        ],
      };
    }

    if (path === "/partnertech") {
      return {
        title: "Business Intelligence",
        items: [
          {
            label: "Lead Score AI",
            value: "94%",
            icon: Target,
            change: "Accuracy",
            color: "text-green-400",
          },
          {
            label: "Email Gen",
            value: "2.3K",
            icon: Mail,
            change: "Sent Today",
            color: "text-blue-400",
          },
          {
            label: "Pipeline Pred",
            value: "87%",
            icon: TrendingUp,
            change: "Confidence",
            color: "text-purple-400",
          },
          {
            label: "Revenue Trend",
            value: "+23%",
            icon: BarChart3,
            change: "This Month",
            color: `text-${brandColors.primary}`,
          },
        ],
        quickActions: [
          { label: "Run Lead Scorer", icon: Target },
          { label: "Generate Emails", icon: Mail },
          { label: "View Analytics", icon: BarChart3 },
        ],
      };
    }

    if (path === "/console") {
      return {
        title: "Console Metrics",
        items: [
          {
            label: "System Status",
            value: "Online",
            icon: CheckCircle,
            change: "99.9%",
            color: "text-green-400",
          },
          {
            label: "API Calls",
            value: "1.2K",
            icon: Database,
            change: "Today",
            color: "text-blue-400",
          },
          {
            label: "Processing",
            value: "Fast",
            icon: Zap,
            change: "~200ms",
            color: "text-purple-400",
          },
          {
            label: "Queue",
            value: "3",
            icon: Timer,
            change: "Jobs",
            color: `text-${brandColors.primary}`,
          },
        ],
        quickActions: [
          { label: "Run Command", icon: Zap },
          { label: "View Logs", icon: FileText },
          { label: "System Health", icon: Activity },
        ],
      };
    }

    return null;
  };

  const contextPanel = getContextDataPanel();

  const groupedItems = preferences.groupByCategory
    ? navigationItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, typeof navigationItems>)
    : { all: navigationItems };

  const favoriteItems = navigationItems.filter(item =>
    preferences.favoriteItems.includes(item.href),
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-charcoal-800/95 to-charcoal-900/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 relative overflow-hidden",
        preferences.sidebarCollapsed ? "w-16" : "w-80",
        className,
      )}
    >
      {/* Background Flavor Image */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 5,
          opacity: 0.4,
        }}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fe36dd35399f945e5b0a19a18228b02eb?format=webp&width=800"
          alt="SaintVisionAI Background"
          className="w-48 h-48 object-contain select-none"
          style={{
            filter: "brightness(1.2) contrast(0.8) saturate(1.1)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
      {/* Logo and Header */}
      <div className="relative z-20 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/svt-sick-transparent-square-fa5568"
                alt="SaintVision AI Logo"
                className="w-12 h-12 object-contain"
                style={{
                  filter:
                    "brightness(1.3) contrast(1.1) saturate(1.2) hue-rotate(15deg)",
                }}
              />
            </div>
            {!preferences.sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">SaintVisionAI™</h1>
                <p className={`text-xs ${brandColors.text} -mt-1`}>
                  Build 50 • Pro
                </p>
              </div>
            )}
          </div>

          {!preferences.sidebarCollapsed && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  updatePreferences({
                    favoritesOnly: !preferences.favoritesOnly,
                  })
                }
                className={cn(
                  `text-white/50 ${brandColors.hover} w-8 h-8 p-0`,
                  preferences.favoritesOnly && brandColors.text,
                )}
                title={
                  preferences.favoritesOnly
                    ? "Show Full Menu"
                    : "Show Favorites Only"
                }
              >
                <Star className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  updatePreferences({
                    sidebarCollapsed: !preferences.sidebarCollapsed,
                  })
                }
                className={`text-white/50 ${brandColors.hover} w-8 h-8 p-0`}
              >
                <Minimize className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="relative z-20 flex-1 overflow-y-auto py-6 px-4 bg-gradient-to-b from-transparent via-charcoal-900/60 to-transparent">
        {!preferences.sidebarCollapsed && (
          <>
            {/* Context Data Panel */}
            {contextPanel && preferences.showContextData && (
              <div className="mb-6">
                <h3
                  className={`text-xs font-semibold ${brandColors.text} mb-3 uppercase tracking-wider`}
                >
                  {contextPanel.title}
                </h3>
                <div className="glass-morphism rounded-lg p-4 space-y-3">
                  {contextPanel.items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={cn("w-4 h-4", item.color)} />
                          <span className="text-sm text-white/80">
                            {item.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            {item.value}
                          </div>
                          <div className="text-xs text-green-400">
                            {item.change}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <Separator className="my-3 bg-white/10" />

                  <div className="space-y-2">
                    {contextPanel.quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start h-8 text-white/70 ${brandColors.hover} hover:${brandColors.bg}`}
                        >
                          <Icon className="w-3 h-3 mr-2" />
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Favorites */}
            {favoriteItems.length > 0 && (
              <div className="mb-6">
                <h3
                  className={`text-xs font-semibold ${brandColors.text} mb-3 uppercase tracking-wider`}
                >
                  Favorites
                </h3>
                <nav className="space-y-1">
                  {favoriteItems.map(item => {
                    const isActive = item.isActive(location.pathname);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`${item.id}-fav`}
                        to={item.href}
                        onClick={() => addToRecent(item.href)}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-10 px-3 rounded-lg transition-all duration-200",
                            "text-white/70 hover:text-white hover:bg-white/10",
                            "text-left font-medium",
                            isActive &&
                              `bg-gradient-to-r ${brandColors.gradient} ${brandColors.text} border ${brandColors.border} saintvision-glow-soft`,
                          )}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          <span className="flex-1 text-sm truncate">
                            {item.title}
                          </span>
                          <Star className={`w-3 h-3 ${brandColors.text}`} />
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            <Separator className="my-4 bg-white/10" />
          </>
        )}

        {/* All Navigation - Only show if not in favorites-only mode */}
        {!preferences.favoritesOnly && (
          <nav
            className={cn(
              "space-y-2",
              preferences.sidebarCollapsed && "space-y-4",
            )}
          >
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                {!preferences.sidebarCollapsed &&
                  preferences.groupByCategory &&
                  category !== "all" && (
                    <h3 className="text-xs font-semibold text-gold-300 mb-2 uppercase tracking-wider px-2">
                      {category}
                    </h3>
                  )}

                {items
                  .filter(
                    item => !preferences.favoriteItems.includes(item.href),
                  )
                  .map((item, index) => {
                    const isActive = item.isActive(location.pathname);
                    const Icon = item.icon;
                    const isFavorite = preferences.favoriteItems.includes(
                      item.href,
                    );

                    return (
                      <div
                        key={`${item.id}-nav-${index}`}
                        className="relative group"
                      >
                        <Link
                          to={item.href}
                          onClick={() => addToRecent(item.href)}
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start transition-all duration-200",
                              preferences.sidebarCollapsed
                                ? "h-12 px-0 justify-center"
                                : "h-12 px-4",
                              preferences.compactMode ? "h-10" : "h-12",
                              "text-white/70 hover:text-white hover:bg-white/10",
                              "text-left font-medium rounded-xl",
                              isActive &&
                                "bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-300 border border-gold-500/30 saintvision-glow-soft",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center w-full",
                                preferences.sidebarCollapsed &&
                                  "justify-center",
                              )}
                            >
                              <div className="flex items-center justify-center w-5 h-5">
                                <Icon className="w-5 h-5" />
                              </div>
                              {!preferences.sidebarCollapsed && (
                                <>
                                  <div className="flex-1 ml-3 min-w-0">
                                    <span className="text-sm font-medium truncate block">
                                      {item.title}
                                    </span>
                                    {preferences.showDescriptions &&
                                      item.description && (
                                        <span className="text-xs text-white/50 truncate block">
                                          {item.description}
                                        </span>
                                      )}
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {item.emoji && (
                                      <span className="text-sm opacity-70">
                                        {item.emoji}
                                      </span>
                                    )}
                                    {isActive && (
                                      <Badge
                                        variant="secondary"
                                        className={`text-xs ${brandColors.bg} ${brandColors.text}`}
                                      >
                                        Active
                                      </Badge>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </Button>
                        </Link>

                        {!preferences.sidebarCollapsed && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.preventDefault();
                              toggleFavorite(item.href);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
                          >
                            <Star
                              className={cn(
                                "w-3 h-3",
                                isFavorite
                                  ? `${brandColors.text} fill-${brandColors.primary}`
                                  : "text-white/50",
                              )}
                            />
                          </Button>
                        )}
                      </div>
                    );
                  })}
              </div>
            ))}
          </nav>
        )}

        {/* Logout */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <Link to="/signin">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-white/50 hover:text-red-300 hover:bg-red-500/10",
                preferences.sidebarCollapsed
                  ? "h-12 px-0 justify-center"
                  : "h-10 px-4",
              )}
            >
              <LogOut className="w-4 h-4" />
              {!preferences.sidebarCollapsed && (
                <span className="ml-3">Logout</span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom User Section */}
      {!preferences.sidebarCollapsed && (
        <div className="relative z-20 p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
                alt="SaintVision AI Robot"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin Portal
              </p>
              <p className="text-xs text-white/50">
                Build 50 • {location.pathname}
              </p>
            </div>
            <Crown className={`w-4 h-4 ${brandColors.text}`} />
          </div>
        </div>
      )}
    </div>
  );
}

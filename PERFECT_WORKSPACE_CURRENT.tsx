import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Users,
  Crown,
  Settings,
  UserPlus,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  Brain,
  Globe,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  DollarSign,
  Plus,
  MoreVertical,
  Search,
  Filter,
  Download,
  Star,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Workspace() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [workspaceName] = useState("Acme Corp Workspace");
  const [activeTab, setActiveTab] = useState("overview");
  const [userPlan, setUserPlan] = useState("enterprise"); // This would come from auth context
  const [hasCRMAccess, setHasCRMAccess] = useState(true); // This would be determined from plan features

  useEffect(() => {
    setIsLoaded(true);
    // In real implementation, fetch user plan and features
    // fetchUserPlanAndFeatures();
  }, []);

  // Determine if we should show PartnerTech branding
  const isPartnerTechWorkspace = userPlan !== "free" && hasCRMAccess;

  const getBrandConfig = () => {
    if (isPartnerTechWorkspace) {
      return {
        name: "PartnerTech.ai",
        logo:
          "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fpartnertech-logo",
        tagline: "CRM + Automation Suite",
        primaryColor: "#3B82F6", // Blue
        accentColor: "#10B981", // Green
        gradient: "bg-gradient-to-r from-blue-500 to-emerald-500",
        textGradient:
          "bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent",
      };
    }
    return {
      name: "SaintVision AI",
      logo:
        "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4",
      tagline: "AI Platform",
      primaryColor: "#FFD700", // Gold
      accentColor: "#4F46E5", // Purple
      gradient: "saintvision-gradient-text",
      textGradient: "saintvision-gradient-text",
    };
  };

  const brandConfig = getBrandConfig();

  const workspaceStats = [
    {
      label: "Team Members",
      value: "24",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-300",
    },
    {
      label: "AI Conversations",
      value: "12,847",
      change: "+2,341 this week",
      icon: MessageSquare,
      color: "text-green-300",
    },
    {
      label: "Monthly Usage",
      value: "89%",
      change: "Under limit",
      icon: BarChart3,
      color: "text-gold-300",
    },
    {
      label: "Success Rate",
      value: "94.2%",
      change: "+1.2% vs last month",
      icon: Target,
      color: "text-purple-300",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      email: "sarah@acmecorp.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
      usage: "347 chats",
      avatar: "",
    },
    {
      name: "Mike Chen",
      email: "mike@acmecorp.com",
      role: "Member",
      status: "active",
      lastActive: "1 day ago",
      usage: "156 chats",
      avatar: "",
    },
    {
      name: "Lisa Rodriguez",
      email: "lisa@acmecorp.com",
      role: "Member",
      status: "inactive",
      lastActive: "3 days ago",
      usage: "89 chats",
      avatar: "",
    },
    {
      name: "David Park",
      email: "david@acmecorp.com",
      role: "Viewer",
      status: "active",
      lastActive: "5 hours ago",
      usage: "234 chats",
      avatar: "",
    },
  ];

  const recentActivity = [
    {
      user: "Sarah J.",
      action: "Created new AI project",
      time: "2 hours ago",
      type: "create",
    },
    {
      user: "Mike C.",
      action: "Upgraded workspace plan",
      time: "1 day ago",
      type: "upgrade",
    },
    {
      user: "Lisa R.",
      action: "Exported chat history",
      time: "2 days ago",
      type: "export",
    },
    {
      user: "David P.",
      action: "Joined workspace",
      time: "3 days ago",
      type: "join",
    },
  ];

  const workspaceTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "members", label: "Members", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "billing", label: "Billing", icon: DollarSign },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "Member":
        return "bg-gold-500/20 text-gold-300 border-gold-500/30";
      case "Viewer":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "inactive":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern - BEAUTIFUL GOLD CIRCUIT PATTERN */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgb(255, 215, 0) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgb(255, 215, 0) 2px, transparent 2px)
          `,
          backgroundSize: "100px 100px, 100px 100px",
          backgroundPosition: "0px 0px, 50px 50px",
        }}
      />

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.98) 0%, rgba(16, 22, 28, 0.95) 100%), 
                           url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`,
        }}
      ></div>

      {/* Centered Logo - PERFECT OPACITY 0.1 WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F1cdc62aca2204f40a3e1d2eb0ae10565"
          alt="Center Logo"
          className="w-full max-w-md h-auto object-cover opacity-10"
          style={{
            aspectRatio: "1",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Mobile-First Navigation - PARTNERTECH.AI BRANDING */}
      <nav className="relative z-50 flex items-center justify-between p-4 md:p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src={brandConfig.logo}
            alt={`${brandConfig.name} Logo`}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            style={{
              filter: isPartnerTechWorkspace
                ? "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))"
                : "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
            onError={e => {
              e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${
                brandConfig.name
              }&backgroundColor=${
                isPartnerTechWorkspace ? "3B82F6" : "FFD700"
              }`;
            }}
          />
          <div>
            <h1
              className={`text-lg md:text-xl font-bold ${brandConfig.textGradient}`}
            >
              {workspaceName}
            </h1>
            <p
              className={`text-xs -mt-1 hidden sm:block ${
                isPartnerTechWorkspace ? "text-blue-300" : "text-gold-300"
              }`}
            >
              {brandConfig.tagline} Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* CRM PRO BADGE - BEAUTIFUL BLUE */}
          {isPartnerTechWorkspace && (
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs md:text-sm">
              <Users className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">CRM Pro</span>
            </Badge>
          )}
          {/* ENTERPRISE BADGE - BEAUTIFUL GREEN */}
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs md:text-sm">
            <Crown className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Enterprise</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className={`px-2 md:px-4 ${
              isPartnerTechWorkspace
                ? "border-blue-400/60 text-blue-200 hover:bg-blue-500/20 hover:text-blue-100"
                : "border-gold-400/60 text-gold-200 hover:bg-gold-500/20 hover:text-gold-100"
            }`}
          >
            <UserPlus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Invite</span>
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-First Header - BEAUTIFUL BLUE GRADIENTS */}
          <div
            className={`mb-6 md:mb-8 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 tracking-tight">
              <span
                className={
                  isPartnerTechWorkspace
                    ? "bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
                    : "saintvision-gradient-text"
                }
              >
                Team
              </span>
              <br />
              <span
                className={
                  isPartnerTechWorkspace ? "text-blue-300" : "text-green-300"
                }
              >
                Workspace
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              {isPartnerTechWorkspace
                ? "Manage your team's CRM automation and AI agents with PartnerTech.ai's collaborative features, sales analytics, and enterprise controls."
                : "Manage your team's SaintSal™ AI workspace with collaborative features, usage analytics, and enterprise controls."}
            </p>
          </div>

          {/* Mobile-Optimized Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {workspaceStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass-morphism p-3 md:p-6 rounded-xl hover:saintvision-glow transition-all"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <Icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-xs md:text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/50 text-xs">{stat.change}</p>
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
              <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
                {workspaceTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 text-xs md:text-sm ${
                        activeTab === tab.id
                          ? "bg-green-500 text-white saintvision-glow"
                          : "text-white/70 hover:text-green-300"
                      } px-3 md:px-4 h-9 md:h-10`}
                    >
                      <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">
                        {tab.label.split(" ")[0]}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {/* Team Members Overview */}
                  <div className="glass-morphism rounded-xl overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg md:text-xl font-bold">
                          Team Members
                        </h3>
                        <Button
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-400 saintvision-glow"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Member
                        </Button>
                      </div>
                    </div>
                    <div className="divide-y divide-white/10">
                      {teamMembers.slice(0, 4).map((member, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                                <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold text-xs md:text-sm">
                                  {member.name
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm md:text-base">
                                  {member.name}
                                </p>
                                <p className="text-white/60 text-xs md:text-sm">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`${getRoleColor(
                                  member.role,
                                )} text-xs`}
                              >
                                {member.role}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/70 hover:text-white p-1"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Analytics */}
                  <div className="glass-morphism p-4 md:p-6 rounded-xl">
                    <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                      Usage Analytics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">
                          12,847
                        </p>
                        <p className="text-white/70 text-sm">
                          Total Conversations
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-2xl md:text-3xl font-bold text-green-300 mb-1">
                          2.4M
                        </p>
                        <p className="text-white/70 text-sm">Tokens Used</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg col-span-2 md:col-span-1">
                        <p className="text-2xl md:text-3xl font-bold text-gold-300 mb-1">
                          94.2%
                        </p>
                        <p className="text-white/70 text-sm">Success Rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6 md:space-y-8">
                  {/* Recent Activity */}
                  <div className="glass-morphism p-4 md:p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4 md:mb-6">
                      Recent Activity
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                        >
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
                            <Activity className="w-3 h-3 md:w-4 md:h-4 text-gold-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">
                              {activity.user}
                            </p>
                            <p className="text-white/70 text-xs truncate">
                              {activity.action}
                            </p>
                            <p className="text-white/50 text-xs">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass-morphism p-4 md:p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4 md:mb-6">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-green-500 text-white hover:bg-green-400 saintvision-glow h-10 md:h-12">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Team Member
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gold-400/60 text-gold-200 hover:bg-gold-500/20 hover:text-gold-100 h-10 md:h-12"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gold-400/60 text-gold-200 hover:bg-gold-500/20 hover:text-gold-100 h-10 md:h-12"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Workspace Settings
                      </Button>
                    </div>
                  </div>

                  {/* Plan Info */}
                  <div className="glass-morphism p-4 md:p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4">Current Plan</h3>
                    <div className="text-center mb-4">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">
                        Enterprise
                      </Badge>
                      <p className="text-2xl font-bold">$497/month</p>
                      <p className="text-white/70 text-sm">
                        Up to 50 team members
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Parallax Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat workspace-parallax-bg"></div>

      {/* Mobile-First Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-4 md:p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain saintsal-logo-img"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold saintvision-gradient-text">
              {workspaceName}
            </h1>
            <p className="text-xs text-gold-300 -mt-1 hidden sm:block">
              Team Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs md:text-sm">
            <Crown className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Enterprise</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 px-2 md:px-4"
          >
            <UserPlus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Invite</span>
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
              <span className="saintvision-gradient-text">Team</span>
              <br />
              <span className="text-green-300">Workspace</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Manage your team's SaintSal™ AI workspace with collaborative
              features, usage analytics, and enterprise controls.
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
                        className="w-full justify-start border-white/20 text-white hover:bg-white/10 h-10 md:h-12"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/20 text-white hover:bg-white/10 h-10 md:h-12"
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

            {activeTab === "members" && (
              <div className="glass-morphism rounded-xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-white/10">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold">
                      Team Members ({teamMembers.length})
                    </h3>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <div className="relative flex-1 md:flex-none md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                          placeholder="Search members..."
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-10 h-9"
                        />
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-500 text-white hover:bg-green-400 saintvision-glow h-9"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-white/10">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold">
                              {member.name
                                .split(" ")
                                .map(n => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-white/60 text-sm">
                              {member.email}
                            </p>
                            <p className="text-white/50 text-xs">
                              Last active: {member.lastActive}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-right">
                          <div className="hidden md:block">
                            <p className="text-white/80 text-sm">
                              {member.usage}
                            </p>
                          </div>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

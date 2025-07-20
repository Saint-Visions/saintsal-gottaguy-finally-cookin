import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Crown,
  Users,
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Download,
  Settings,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  Globe,
  Shield,
  Zap,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

export default function AdminClients() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const clientMetrics = [
    {
      label: "Total Clients",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Active This Month",
      value: "2,341",
      change: "+8%",
      trend: "up",
      icon: Activity,
    },
    {
      label: "MRR",
      value: "$278,450",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Churn Rate",
      value: "2.1%",
      change: "-0.3%",
      trend: "down",
      icon: TrendingDown,
    },
  ];

  const clients = [
    {
      id: 1,
      name: "Marcus Johnson",
      email: "marcus@techstartup.io",
      company: "TechStartup Inc",
      plan: "Enterprise",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      revenue: "$497",
      usage: "95%",
      avatar: "",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@digitalagency.com",
      company: "Digital Agency Co",
      plan: "Pro",
      status: "active",
      joinDate: "2024-02-03",
      lastActive: "1 day ago",
      revenue: "$97",
      usage: "78%",
      avatar: "",
    },
    {
      id: 3,
      name: "David Rodriguez",
      email: "david@consultingfirm.net",
      company: "Rodriguez Consulting",
      plan: "Pro",
      status: "inactive",
      joinDate: "2023-11-22",
      lastActive: "7 days ago",
      revenue: "$97",
      usage: "12%",
      avatar: "",
    },
    {
      id: 4,
      name: "Lisa Thompson",
      email: "lisa@realestate.biz",
      company: "Thompson Realty",
      plan: "Starter",
      status: "trial",
      joinDate: "2024-03-10",
      lastActive: "3 hours ago",
      revenue: "$27",
      usage: "45%",
      avatar: "",
    },
    {
      id: 5,
      name: "Michael Park",
      email: "mike@ecommerce.store",
      company: "Park E-commerce",
      plan: "Enterprise",
      status: "active",
      joinDate: "2023-09-18",
      lastActive: "30 minutes ago",
      revenue: "$497",
      usage: "89%",
      avatar: "",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "trial":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Pro":
        return "bg-gold-500/20 text-gold-300 border-gold-500/30";
      case "Starter":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat admin-clients-bg"
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-12 h-12 object-contain saintsal-logo"
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Client Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Admin Access
          </Badge>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  <span className="saintvision-gradient-text">Client</span>
                  <br />
                  <span className="text-purple-300">Management</span>
                </h1>
                <p className="text-xl text-white/80 max-w-3xl">
                  Monitor, manage, and analyze your SaintSal™ client base with
                  comprehensive admin tools.
                </p>
              </div>
              <Button className="bg-purple-500 text-white hover:bg-purple-400 saintvision-glow">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>

          {/* Metrics */}
          <div
            className={`grid md:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {clientMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const TrendIcon =
                metric.trend === "up" ? TrendingUp : TrendingDown;
              return (
                <div
                  key={index}
                  className="glass-morphism p-6 rounded-xl hover:saintvision-glow transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-6 h-6 text-purple-300" />
                    <div
                      className={`flex items-center space-x-1 text-sm font-semibold ${
                        metric.trend === "up"
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      <TrendIcon className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-white/70 text-sm">{metric.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filters and Search */}
          <div
            className={`mb-8 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism p-6 rounded-xl">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      placeholder="Search clients..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-white/70" />
                    <select
                      aria-label="Filter clients by status"
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className="bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-gold-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="trial">Trial</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Client Table */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold">Client Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 text-white/70 font-medium">Client</th>
                      <th className="p-4 text-white/70 font-medium">Plan</th>
                      <th className="p-4 text-white/70 font-medium">Status</th>
                      <th className="p-4 text-white/70 font-medium">Revenue</th>
                      <th className="p-4 text-white/70 font-medium">Usage</th>
                      <th className="p-4 text-white/70 font-medium">
                        Last Active
                      </th>
                      <th className="p-4 text-white/70 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map(client => (
                      <tr
                        key={client.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold">
                                {client.name
                                  .split(" ")
                                  .map(n => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">
                                {client.name}
                              </p>
                              <p className="text-white/60 text-sm">
                                {client.email}
                              </p>
                              <p className="text-white/40 text-xs">
                                {client.company}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getPlanColor(client.plan)}>
                            {client.plan}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-green-300">
                            {client.revenue}
                          </span>
                          <span className="text-white/60 text-sm">/month</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold-500 rounded-full"
                                style={{
                                  width: client.usage,
                                }}
                              ></div>
                            </div>
                            <span className="text-white/70 text-sm">
                              {client.usage}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-sm">
                            {client.lastActive}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-gold-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-blue-300"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-green-300"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/70 text-sm">
                  Showing 5 of 2,847 clients
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
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

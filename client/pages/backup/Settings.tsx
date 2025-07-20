import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Settings as SettingsIcon,
  User,
  Key,
  Palette,
  Bell,
  CreditCard,
  Globe,
  Phone,
  Mail,
  Upload,
  Camera,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Mic,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

export default function Settings() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      firstName: "Saint",
      lastName: "Sal",
      email: "sal@saintvisionai.com",
      company: "SaintVision Group",
      phone: "+1 (949) 997-2097",
      timezone: "America/Los_Angeles",
      avatar: "",
    },
    assistant: {
      name: "My GOTTA GUY™",
      personality: "Professional and Helpful",
      responseStyle: "Detailed",
      primaryModel: "gpt4o",
      fallbackModel: "azure",
      voiceEnabled: true,
      autoResponse: true,
    },
    preferences: {
      theme: "dark",
      notifications: true,
      soundEnabled: true,
      autoSave: true,
      betaFeatures: true,
    },
    billing: {
      plan: "PartnerTech Pro",
      status: "Active",
      nextBilling: "Feb 15, 2025",
      amount: "$97.00",
    },
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "assistant", label: "AI Assistant", icon: Brain },
    { id: "api", label: "API & Keys", icon: Key },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Save to backend
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
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
                           url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center saintvision-glow">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F2161a54cab734be28198076b16185a42?format=webp&width=800"
              alt="SaintVisionAI Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              Settings
            </h1>
            <p className="text-xs text-gold-300 -mt-1">SaintSal™ Preferences</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Crown className="w-3 h-3 mr-1" />
            Pro Plan
          </Badge>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold">
              S
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={handleSave}
            className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="saintvision-gradient-text">Account</span>
              <br />
              <span className="text-gold-300">Settings</span>
            </h1>
            <p className="text-xl text-white/80 mb-6 max-w-3xl">
              Customize your SaintSal™ experience, manage your AI assistant, and
              configure integrations.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div
                className={`glass-morphism rounded-2xl p-6 transform transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h3 className="font-bold mb-6 text-gold-300">Categories</h3>
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all flex items-center space-x-3 ${
                          activeTab === tab.id
                            ? "bg-gold-500/20 text-gold-300 saintvision-glow"
                            : "hover:bg-white/5 text-white/80"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="font-semibold mb-4 text-gold-300">
                    Quick Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Account Level</span>
                      <span className="text-gold-300 font-semibold">Pro</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">AI Chats</span>
                      <span className="text-white">12,847</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">API Calls</span>
                      <span className="text-white">2,341</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Storage Used</span>
                      <span className="text-white">2.4 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div
                className={`transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="glass-morphism rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <User className="w-6 h-6 text-gold-300" />
                      <h2 className="text-2xl font-bold">
                        Profile Information
                      </h2>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6 mb-8 p-6 bg-white/5 rounded-xl">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold text-2xl">
                            {settings.profile.firstName[0]}
                            {settings.profile.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 p-0"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {settings.profile.firstName}{" "}
                          {settings.profile.lastName}
                        </h3>
                        <p className="text-white/70 mb-4">
                          {settings.profile.email}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Photo
                        </Button>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-white/90">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={settings.profile.firstName}
                          onChange={e =>
                            handleInputChange(
                              "profile",
                              "firstName",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white/90">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={settings.profile.lastName}
                          onChange={e =>
                            handleInputChange(
                              "profile",
                              "lastName",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white/90">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={e =>
                            handleInputChange(
                              "profile",
                              "email",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white/90">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={settings.profile.phone}
                          onChange={e =>
                            handleInputChange(
                              "profile",
                              "phone",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="company" className="text-white/90">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={settings.profile.company}
                          onChange={e =>
                            handleInputChange(
                              "profile",
                              "company",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Assistant Tab */}
                {activeTab === "assistant" && (
                  <div className="glass-morphism rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <Brain className="w-6 h-6 text-gold-300" />
                      <h2 className="text-2xl font-bold">
                        AI Assistant Configuration
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {/* Assistant Personality */}
                      <div>
                        <Label className="text-white/90 text-lg font-semibold">
                          Assistant Name
                        </Label>
                        <Input
                          value={settings.assistant.name}
                          onChange={e =>
                            handleInputChange(
                              "assistant",
                              "name",
                              e.target.value,
                            )
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                          placeholder="Give your AI assistant a name"
                        />
                      </div>

                      {/* Model Selection */}
                      <div>
                        <Label className="text-white/90 text-lg font-semibold">
                          Primary AI Model
                        </Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              settings.assistant.primaryModel === "gpt4o"
                                ? "border-gold-500 bg-gold-500/10"
                                : "border-white/20 hover:border-white/40"
                            }`}
                            onClick={() =>
                              handleInputChange(
                                "assistant",
                                "primaryModel",
                                "gpt4o",
                              )
                            }
                          >
                            <div className="flex items-center space-x-3">
                              <Sparkles className="w-6 h-6 text-gold-300" />
                              <div>
                                <h4 className="font-semibold">GPT-4o</h4>
                                <p className="text-white/70 text-sm">
                                  Advanced reasoning and creativity
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              settings.assistant.primaryModel === "azure"
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-white/20 hover:border-white/40"
                            }`}
                            onClick={() =>
                              handleInputChange(
                                "assistant",
                                "primaryModel",
                                "azure",
                              )
                            }
                          >
                            <div className="flex items-center space-x-3">
                              <Shield className="w-6 h-6 text-blue-300" />
                              <div>
                                <h4 className="font-semibold">
                                  Azure Cognitive
                                </h4>
                                <p className="text-white/70 text-sm">
                                  Enterprise security and compliance
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voice & Features */}
                      <div>
                        <Label className="text-white/90 text-lg font-semibold">
                          Features
                        </Label>
                        <div className="space-y-4 mt-4">
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Mic className="w-5 h-5 text-gold-300" />
                              <div>
                                <p className="font-medium">Voice Commands</p>
                                <p className="text-white/70 text-sm">
                                  Enable voice interaction with your assistant
                                </p>
                              </div>
                            </div>
                            <Button
                              variant={
                                settings.assistant.voiceEnabled
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleInputChange(
                                  "assistant",
                                  "voiceEnabled",
                                  (!settings.assistant.voiceEnabled).toString(),
                                )
                              }
                              className={
                                settings.assistant.voiceEnabled
                                  ? "bg-gold-500 text-charcoal-900"
                                  : "border-white/20 text-white"
                              }
                            >
                              {settings.assistant.voiceEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <MessageSquare className="w-5 h-5 text-gold-300" />
                              <div>
                                <p className="font-medium">Auto Response</p>
                                <p className="text-white/70 text-sm">
                                  Automatically respond to certain triggers
                                </p>
                              </div>
                            </div>
                            <Button
                              variant={
                                settings.assistant.autoResponse
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleInputChange(
                                  "assistant",
                                  "autoResponse",
                                  (!settings.assistant.autoResponse).toString(),
                                )
                              }
                              className={
                                settings.assistant.autoResponse
                                  ? "bg-gold-500 text-charcoal-900"
                                  : "border-white/20 text-white"
                              }
                            >
                              {settings.assistant.autoResponse
                                ? "Enabled"
                                : "Disabled"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* API Keys Tab */}
                {activeTab === "api" && (
                  <div className="glass-morphism rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <Key className="w-6 h-6 text-gold-300" />
                      <h2 className="text-2xl font-bold">
                        API Keys & Integration
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* API Key Display */}
                      <div className="p-6 bg-white/5 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Your API Key
                          </h3>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Input
                            value={
                              showApiKey
                                ? "sk-saintvision-12345678901234567890"
                                : "sk-saintvision-••••••••••••••••••••"
                            }
                            readOnly
                            className="bg-white/5 border-white/20 text-white font-mono"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            {showApiKey ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>

                      {/* Integration Status */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Integration Status
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            {
                              name: "Azure OpenAI",
                              status: "connected",
                              icon: Brain,
                            },
                            {
                              name: "Supabase",
                              status: "connected",
                              icon: Shield,
                            },
                            {
                              name: "Stripe",
                              status: "connected",
                              icon: CreditCard,
                            },
                            {
                              name: "Twilio",
                              status: "connected",
                              icon: Phone,
                            },
                            {
                              name: "GoHighLevel",
                              status: "connected",
                              icon: Globe,
                            },
                            {
                              name: "Builder.io",
                              status: "connected",
                              icon: Palette,
                            },
                          ].map((integration, index) => {
                            const Icon = integration.icon;
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon className="w-5 h-5 text-gold-300" />
                                  <span className="font-medium">
                                    {integration.name}
                                  </span>
                                </div>
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                  Connected
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <div className="glass-morphism rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <CreditCard className="w-6 h-6 text-gold-300" />
                      <h2 className="text-2xl font-bold">
                        Billing & Subscription
                      </h2>
                    </div>

                    {/* Current Plan */}
                    <div className="p-6 bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-xl mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gold-300">
                            {settings.billing.plan}
                          </h3>
                          <p className="text-white/80">
                            Next billing: {settings.billing.nextBilling}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {settings.billing.amount}
                          </p>
                          <p className="text-white/70">per month</p>
                        </div>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <p className="text-2xl font-bold text-gold-300">
                          12,847
                        </p>
                        <p className="text-white/70">AI Conversations</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-300">
                          2,341
                        </p>
                        <p className="text-white/70">API Calls</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-300">
                          99.9%
                        </p>
                        <p className="text-white/70">Uptime</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Upgrade Plan
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Brain,
  Mic,
  Search,
  FileText,
  Users,
  Calendar,
  DollarSign,
  Shield,
  Upload,
  Sparkles,
  Crown,
  Zap,
  Heart,
  Building,
  Scale,
  Stethoscope,
  Home,
  Settings,
  Play,
  CheckCircle,
  Eye,
  Globe,
  Lock,
  Unlock,
  Star,
  Copy,
  ArrowRight,
  ArrowLeft,
  Camera,
  FileUp,
  Plus,
  Rocket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AgentConfig {
  name: string;
  avatar: string;
  modelType: "gpt-4o" | "azure-cognitive" | "dual-bot";
  skillset: string;
  features: string[];
  permissions: "admin" | "team" | "public";
  customFiles: File[];
  description: string;
}

interface SkillsetTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  tier: "free" | "pro" | "enterprise";
}

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  tier: "free" | "pro" | "enterprise";
  popular?: boolean;
}

const SKILLSET_TEMPLATES: SkillsetTemplate[] = [
  {
    id: "general",
    name: "General Productivity",
    description: "All-purpose assistant for daily tasks and productivity",
    icon: Bot,
    features: ["scheduling", "web_research"],
    tier: "free",
  },
  {
    id: "legal",
    name: "Legal Navigator",
    description: "Legal document review, compliance, and research specialist",
    icon: Scale,
    features: ["document_review", "compliance_tracker", "web_research"],
    tier: "pro",
  },
  {
    id: "crm",
    name: "CRM Agent",
    description: "Customer relationship management and sales automation",
    icon: Users,
    features: ["crm_routing", "quote_builder", "scheduling"],
    tier: "pro",
  },
  {
    id: "realestate",
    name: "Real Estate Dealbot",
    description: "Property analysis, market data, and deal management",
    icon: Home,
    features: ["crm_routing", "quote_builder", "document_review"],
    tier: "pro",
  },
  {
    id: "healthcare",
    name: "Cognitive Healthcare (Athena)",
    description: "Compassionate healthcare assistant with wellness monitoring",
    icon: Stethoscope,
    features: ["scheduling", "compliance_tracker", "document_review"],
    tier: "enterprise",
  },
  {
    id: "finance",
    name: "Finance & Compliance (EbyTech)",
    description: "Financial analysis, compliance tracking, and strategy",
    icon: DollarSign,
    features: ["compliance_tracker", "document_review", "quote_builder"],
    tier: "enterprise",
  },
];

const FEATURE_OPTIONS: FeatureOption[] = [
  {
    id: "voice_enabled",
    name: "Voice Enabled",
    description: "Natural speech conversations with TTS/STT",
    icon: Mic,
    tier: "pro",
    popular: true,
  },
  {
    id: "web_research",
    name: "Web Research + Summarization",
    description: "Real-time web search and intelligent summaries",
    icon: Search,
    tier: "free",
    popular: true,
  },
  {
    id: "crm_routing",
    name: "CRM / GHL Routing",
    description: "GoHighLevel integration for customer management",
    icon: Users,
    tier: "pro",
    popular: true,
  },
  {
    id: "scheduling",
    name: "Scheduling",
    description: "Calendar management and appointment booking",
    icon: Calendar,
    tier: "free",
  },
  {
    id: "quote_builder",
    name: "Pricing / Quote Builder",
    description: "Generate quotes and pricing proposals",
    icon: DollarSign,
    tier: "pro",
  },
  {
    id: "document_review",
    name: "AI Document Review",
    description: "Intelligent document analysis and review",
    icon: FileText,
    tier: "enterprise",
  },
  {
    id: "compliance_tracker",
    name: "Compliance / Regulation Tracker",
    description: "Monitor regulatory requirements and compliance",
    icon: Shield,
    tier: "enterprise",
  },
];

const MODEL_TYPES = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "OpenAI's most advanced model for natural language reasoning",
    icon: Brain,
    tier: "free",
    badge: "Most Popular",
  },
  {
    id: "azure-cognitive",
    name: "Azure Cognitive",
    description:
      "Microsoft's cognitive services with TTS, OCR, and custom search",
    icon: Zap,
    tier: "pro",
    badge: "Enterprise Grade",
  },
  {
    id: "dual-bot",
    name: "DualBot (HACP™)",
    description: "Patented dual-AI system combining GPT-4o + Azure Cognitive",
    icon: Crown,
    tier: "pro",
    badge: "Patent 10,290,222",
  },
];

const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=SaintSal&backgroundColor=FFD700",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Business&backgroundColor=4F46E5",
  "https://api.dicebear.com/7.x/personas/svg?seed=Professional&backgroundColor=059669",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Robot&backgroundColor=DC2626",
  "https://api.dicebear.com/7.x/micah/svg?seed=Assistant&backgroundColor=7C3AED",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Helper&backgroundColor=EA580C",
];

export default function CreateAgent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userPlan, setUserPlan] = useState("free"); // This would come from auth context
  const [isCreating, setIsCreating] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: "",
    avatar: AVATAR_PRESETS[0],
    modelType: "gpt-4o",
    skillset: "",
    features: ["web_research"],
    permissions: "admin",
    customFiles: [],
    description: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const totalSteps = 8;

  const updateConfig = (field: keyof AgentConfig, value: any) => {
    setAgentConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setAgentConfig(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return agentConfig.name.trim().length >= 2;
      case 2:
        return agentConfig.avatar;
      case 3:
        return agentConfig.modelType;
      case 4:
        return agentConfig.skillset;
      case 5:
        return true; // Files are optional
      case 6:
        return agentConfig.features.length > 0;
      case 7:
        return agentConfig.permissions;
      case 8:
        return true;
      default:
        return false;
    }
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).filter(
      file =>
        file.type.includes("pdf") ||
        file.type.includes("text") ||
        file.type.includes("document"),
    );
    updateConfig("customFiles", [...agentConfig.customFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const createAgent = async () => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("config", JSON.stringify(agentConfig));

      agentConfig.customFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await fetch("/api/create-agent", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to the new agent console
        window.location.href = result.accessUrl;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Agent creation failed:", error);
      alert("Failed to create agent. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const requiresUpgrade = (tier: string) => {
    const tierHierarchy = { free: 0, pro: 1, enterprise: 2 };
    return (
      tierHierarchy[userPlan as keyof typeof tierHierarchy] <
      tierHierarchy[tier as keyof typeof tierHierarchy]
    );
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white relative overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_theme(colors.gold.500)_2px,_transparent_2px),radial-gradient(circle_at_75px_75px,_theme(colors.gold.500)_2px,_transparent_2px)] bg-[100px_100px] bg-[0_0,50px_50px] opacity-5" />

        <div className="relative z-10 px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div
              className={`text-center mb-8 md:mb-12 transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="saintvision-gradient-text">SaintSal™</span>{" "}
                Agent Creator
              </h1>
              <p className="text-xl text-white/70 mb-6 max-w-2xl mx-auto">
                Create your own SuperSal™-powered AI companion with cognitive
                abilities, voice interaction, and specialized skills.
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-2 mb-8">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i + 1 === currentStep
                        ? "bg-gold-500 scale-125 saintvision-glow"
                        : i + 1 < currentStep
                        ? "bg-gold-500"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* HACP™ Patent Badge */}
              <div className="inline-flex items-center bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-gold-300 mr-2" />
                <span className="text-sm text-gold-200">
                  Powered by HACP™ Intelligence | US Patent 10,290,222
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="glass-morphism rounded-2xl p-6 md:p-8 mb-8 min-h-[500px]">
              {/* Step 1: Enter Name */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Bot className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      What's your assistant's name?
                    </h2>
                    <p className="text-white/70">
                      Choose a name that reflects your assistant's personality
                      and purpose
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <Input
                      value={agentConfig.name}
                      onChange={e => updateConfig("name", e.target.value)}
                      placeholder="e.g., My Business Buddy, Legal Eagle, Sales Sage..."
                      className="h-14 text-lg text-center bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500"
                    />

                    {agentConfig.name && (
                      <div className="text-center space-y-2">
                        <p className="text-white/60 text-sm">
                          Your agent will be available at:
                        </p>
                        <div className="bg-charcoal-800/50 rounded-lg p-3 font-mono text-gold-300">
                          {agentConfig.name
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-")
                            .replace(/-+/g, "-")}
                          .saintvisionai.com
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Avatar */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Camera className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Choose an Avatar
                    </h2>
                    <p className="text-white/70">
                      Select a visual representation for your assistant
                    </p>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto mb-6">
                    {AVATAR_PRESETS.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => updateConfig("avatar", avatar)}
                        className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                          agentConfig.avatar === avatar
                            ? "border-gold-500 scale-110 saintvision-glow"
                            : "border-white/20 hover:border-gold-400"
                        }`}
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    <label className="inline-flex items-center cursor-pointer bg-white/5 border border-white/20 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Custom Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            updateConfig("avatar", url);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Pick Model Type */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Brain className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Choose AI Model
                    </h2>
                    <p className="text-white/70">
                      Select the intelligence type that best fits your needs
                    </p>
                  </div>

                  <div className="grid gap-4 max-w-3xl mx-auto">
                    {MODEL_TYPES.map(model => {
                      const Icon = model.icon;
                      const isSelected = agentConfig.modelType === model.id;
                      const needsUpgrade = requiresUpgrade(model.tier);

                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            if (!needsUpgrade) {
                              updateConfig("modelType", model.id);
                            }
                          }}
                          disabled={needsUpgrade}
                          className={`p-6 rounded-xl border-2 text-left transition-all duration-200 relative ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : needsUpgrade
                              ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                              : "border-white/20 bg-white/5 hover:border-gold-400 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div
                                className={`p-3 rounded-lg ${
                                  isSelected ? "bg-gold-500/20" : "bg-white/10"
                                }`}
                              >
                                <Icon className="w-6 h-6 text-gold-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold mb-1">
                                  {model.name}
                                </h3>
                                <p className="text-white/70 text-sm">
                                  {model.description}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30">
                                {model.badge}
                              </Badge>
                              {needsUpgrade && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  {model.tier.charAt(0).toUpperCase() +
                                    model.tier.slice(1)}{" "}
                                  Plan
                                </Badge>
                              )}
                            </div>
                          </div>
                          {needsUpgrade && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  window.location.href = "/upgrade";
                                }}
                              >
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Required
                              </Button>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Select Skillset */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Sparkles className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Choose Core Skillset
                    </h2>
                    <p className="text-white/70">
                      Select the primary expertise area for your assistant
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {SKILLSET_TEMPLATES.map(skillset => {
                      const Icon = skillset.icon;
                      const isSelected = agentConfig.skillset === skillset.id;
                      const needsUpgrade = requiresUpgrade(skillset.tier);

                      return (
                        <button
                          key={skillset.id}
                          onClick={() => {
                            if (!needsUpgrade) {
                              updateConfig("skillset", skillset.id);
                              // Auto-select related features
                              updateConfig("features", [
                                ...new Set([
                                  ...agentConfig.features,
                                  ...skillset.features,
                                ]),
                              ]);
                            }
                          }}
                          disabled={needsUpgrade}
                          className={`p-6 rounded-xl border-2 text-left transition-all duration-200 relative ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : needsUpgrade
                              ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                              : "border-white/20 bg-white/5 hover:border-gold-400 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className={`p-3 rounded-lg ${
                                isSelected ? "bg-gold-500/20" : "bg-white/10"
                              }`}
                            >
                              <Icon className="w-6 h-6 text-gold-400" />
                            </div>
                            {needsUpgrade && (
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                {skillset.tier.charAt(0).toUpperCase() +
                                  skillset.tier.slice(1)}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {skillset.name}
                          </h3>
                          <p className="text-white/70 text-sm mb-3">
                            {skillset.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {skillset.features.map(feature => (
                              <Badge
                                key={feature}
                                variant="secondary"
                                className="text-xs"
                              >
                                {FEATURE_OPTIONS.find(f => f.id === feature)
                                  ?.name || feature}
                              </Badge>
                            ))}
                          </div>
                          {needsUpgrade && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  window.location.href = "/upgrade";
                                }}
                              >
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Required
                              </Button>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Add Files */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <FileUp className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Upload Training Files
                    </h2>
                    <p className="text-white/70">
                      Optional: Add documents to give your assistant specialized
                      knowledge
                    </p>
                  </div>

                  <div
                    className={`max-w-2xl mx-auto border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-white/30 hover:border-gold-400"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                    onDragEnter={() => setDragActive(true)}
                    onDragLeave={() => setDragActive(false)}
                  >
                    <Upload className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Drag & Drop Files Here
                    </h3>
                    <p className="text-white/60 mb-4">
                      Supports PDF, DOC, TXT files up to 10MB each
                    </p>
                    <label className="inline-flex items-center cursor-pointer bg-gold-500 text-charcoal-900 rounded-lg px-6 py-3 font-semibold hover:bg-gold-400 transition-colors">
                      Choose Files
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={e =>
                          e.target.files && handleFileUpload(e.target.files)
                        }
                      />
                    </label>
                  </div>

                  {agentConfig.customFiles.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                      <h4 className="font-semibold mb-3">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {agentConfig.customFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                          >
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gold-400 mr-3" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <button
                              onClick={() => {
                                const newFiles = agentConfig.customFiles.filter(
                                  (_, i) => i !== index,
                                );
                                updateConfig("customFiles", newFiles);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Choose Features */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Settings className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Select Features
                    </h2>
                    <p className="text-white/70">
                      Choose the capabilities you want to enable for your
                      assistant
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {FEATURE_OPTIONS.map(feature => {
                      const Icon = feature.icon;
                      const isSelected = agentConfig.features.includes(
                        feature.id,
                      );
                      const needsUpgrade = requiresUpgrade(feature.tier);

                      return (
                        <button
                          key={feature.id}
                          onClick={() => {
                            if (!needsUpgrade) {
                              toggleFeature(feature.id);
                            }
                          }}
                          disabled={needsUpgrade}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : needsUpgrade
                              ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                              : "border-white/20 bg-white/5 hover:border-gold-400 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isSelected ? "bg-gold-500/20" : "bg-white/10"
                                }`}
                              >
                                <Icon className="w-5 h-5 text-gold-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">
                                    {feature.name}
                                  </h3>
                                  {feature.popular && (
                                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-gold-400" />
                              )}
                              {needsUpgrade && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                  {feature.tier.charAt(0).toUpperCase() +
                                    feature.tier.slice(1)}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {needsUpgrade && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  window.location.href = "/upgrade";
                                }}
                              >
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Required
                              </Button>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 7: Set Permissions */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Set Access Permissions
                    </h2>
                    <p className="text-white/70">
                      Choose who can interact with your assistant
                    </p>
                  </div>

                  <div className="grid gap-4 max-w-2xl mx-auto">
                    {[
                      {
                        id: "admin",
                        name: "Admin Only",
                        description:
                          "Only you can access and manage this assistant",
                        icon: Lock,
                        recommended: true,
                      },
                      {
                        id: "team",
                        name: "Team Access",
                        description:
                          "Team members can interact with the assistant",
                        icon: Users,
                        tier: "enterprise",
                      },
                      {
                        id: "public",
                        name: "Public Embed",
                        description:
                          "Anyone with the link can use the assistant",
                        icon: Globe,
                        tier: "pro",
                      },
                    ].map(permission => {
                      const Icon = permission.icon;
                      const isSelected =
                        agentConfig.permissions === permission.id;
                      const needsUpgrade =
                        permission.tier && requiresUpgrade(permission.tier);

                      return (
                        <button
                          key={permission.id}
                          onClick={() => {
                            if (!needsUpgrade) {
                              updateConfig("permissions", permission.id);
                            }
                          }}
                          disabled={needsUpgrade}
                          className={`p-6 rounded-xl border-2 text-left transition-all duration-200 relative ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : needsUpgrade
                              ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                              : "border-white/20 bg-white/5 hover:border-gold-400 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div
                                className={`p-3 rounded-lg ${
                                  isSelected ? "bg-gold-500/20" : "bg-white/10"
                                }`}
                              >
                                <Icon className="w-6 h-6 text-gold-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold">
                                    {permission.name}
                                  </h3>
                                  {permission.recommended && (
                                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                      Recommended
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-white/70">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {isSelected && (
                                <CheckCircle className="w-6 h-6 text-gold-400" />
                              )}
                              {needsUpgrade && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  {permission.tier?.charAt(0).toUpperCase() +
                                    permission.tier?.slice(1)}{" "}
                                  Plan
                                </Badge>
                              )}
                            </div>
                          </div>
                          {needsUpgrade && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  window.location.href = "/upgrade";
                                }}
                              >
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Required
                              </Button>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 8: Review & Launch */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Rocket className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Ready to Launch!
                    </h2>
                    <p className="text-white/70">
                      Review your assistant configuration and deploy to
                      production
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-6">
                    {/* Agent Preview Card */}
                    <div className="bg-gradient-to-r from-gold-500/10 to-purple-500/10 border border-gold-500/30 rounded-xl p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={agentConfig.avatar}
                          alt="Agent Avatar"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold">
                            {agentConfig.name}
                          </h3>
                          <p className="text-gold-300">
                            {
                              SKILLSET_TEMPLATES.find(
                                s => s.id === agentConfig.skillset,
                              )?.name
                            }{" "}
                            •{" "}
                            {
                              MODEL_TYPES.find(
                                m => m.id === agentConfig.modelType,
                              )?.name
                            }
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">
                            Features Enabled:
                          </h4>
                          <div className="space-y-1">
                            {agentConfig.features.map(featureId => (
                              <div
                                key={featureId}
                                className="flex items-center"
                              >
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                {
                                  FEATURE_OPTIONS.find(f => f.id === featureId)
                                    ?.name
                                }
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 mb-2">
                            Details:
                          </h4>
                          <div className="space-y-1 text-white/70">
                            <div>Permission: {agentConfig.permissions}</div>
                            <div>
                              Files: {agentConfig.customFiles.length} uploaded
                            </div>
                            <div>Status: Ready to deploy</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Access URL Preview */}
                    <div className="bg-charcoal-800/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Your Agent Will Be Available At:
                      </h4>
                      <div className="bg-charcoal-900/50 rounded-lg p-3 font-mono text-gold-300 break-all">
                        https://
                        {agentConfig.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")
                          .replace(/-+/g, "-")}
                        .saintvisionai.com/console
                      </div>
                    </div>

                    {/* HACP™ Notice */}
                    <Alert className="border-gold-500/30 bg-gold-500/10">
                      <Crown className="w-4 h-4 text-gold-400" />
                      <AlertDescription className="text-gold-200">
                        Your assistant will be powered by our patented HACP™
                        (Hierarchical Agent Control Protocol) technology. This
                        ensures intelligent escalation routing and maintains the
                        highest standards of AI behavior management.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-gold-400/60 text-gold-200 hover:bg-gold-500/20 hover:text-gold-100 px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="text-center">
                <span className="text-white/60 text-sm">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              {currentStep === totalSteps ? (
                <Button
                  onClick={createAgent}
                  disabled={!isStepValid() || isCreating}
                  className="bg-green-500 text-white hover:bg-green-400 saintvision-glow px-8"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Launch Agent
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow px-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

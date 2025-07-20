import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Brain,
  Globe,
  Shield,
  Zap,
  Users,
  Phone,
  Mail,
  Building,
  Target,
  Calendar,
  Settings,
  Rocket,
} from "lucide-react";

export default function Setup() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    industry: "",
    teamSize: "",
    goals: [],
    integrations: [],
    aiPreferences: {
      primaryModel: "gpt4o",
      responseStyle: "professional",
      voiceEnabled: true,
    },
    notifications: {
      email: true,
      sms: false,
      slack: false,
    },
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const totalSteps = 5;

  const steps = [
    {
      step: 1,
      title: "Welcome to SaintSal™",
      subtitle: "Let's set up your GOTTA GUY™ AI companion",
      icon: Crown,
    },
    {
      step: 2,
      title: "Business Profile",
      subtitle: "Tell us about your business",
      icon: Building,
    },
    {
      step: 3,
      title: "AI Configuration",
      subtitle: "Customize your AI assistant",
      icon: Brain,
    },
    {
      step: 4,
      title: "Integrations",
      subtitle: "Connect your tools",
      icon: Globe,
    },
    {
      step: 5,
      title: "Ready to Launch",
      subtitle: "You're all set to start cookin'!",
      icon: Rocket,
    },
  ];

  const businessTypes = [
    "Solo Entrepreneur",
    "Small Business",
    "Agency",
    "Enterprise",
    "Consultant",
    "Real Estate",
    "E-commerce",
    "Other",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Real Estate",
    "Marketing",
    "Consulting",
    "E-commerce",
    "Education",
    "Other",
  ];

  const teamSizes = ["Just me", "2-5 people", "6-20 people", "21+ people"];

  const goalOptions = [
    "Lead Generation",
    "Customer Support",
    "Content Creation",
    "Sales Automation",
    "Data Analysis",
    "Process Automation",
  ];

  const integrationOptions = [
    { id: "ghl", name: "GoHighLevel", icon: Target },
    { id: "stripe", name: "Stripe", icon: Zap },
    { id: "twilio", name: "Twilio", icon: Phone },
    { id: "slack", name: "Slack", icon: Mail },
  ];

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

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value,
          )
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return formData.businessType && formData.industry && formData.teamSize;
      case 3:
        return formData.aiPreferences.primaryModel;
      case 4:
        return true; // Integrations are optional
      default:
        return true;
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
                           url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
        }}
      ></div>

      {/* Mobile-First Navigation */}
      <nav className="relative z-50 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center saintvision-glow">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F1fad4f7c944249c3a8a02d8e8ae77b26?format=webp&width=800"
                alt="SaintVisionAI Logo"
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold saintvision-gradient-text">
                Setup Wizard
              </h1>
              <p className="text-xs text-gold-300 -mt-1">
                SaintSal™ Onboarding
              </p>
            </div>
          </div>
          <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 text-xs md:text-sm">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
      </nav>

      <div className="relative z-40 px-4 md:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Mobile-Optimized Progress Bar */}
          <div
            className={`mb-6 md:mb-8 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="glass-morphism p-4 md:p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  {steps[currentStep - 1].title}
                </h2>
                <span className="text-gold-300 text-sm md:text-base">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>
              <p className="text-white/80 mb-4">
                {steps[currentStep - 1].subtitle}
              </p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gold-500 h-2 rounded-full transition-all duration-500 saintvision-glow"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="glass-morphism rounded-xl p-6 md:p-8 mb-6">
              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center saintvision-glow-strong">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F66fe1620bff64382adab8967dd63b6ff?format=webp&width=800"
                      alt="SaintVisionAI Logo"
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Welcome to{" "}
                    <span className="saintvision-gradient-text">
                      SaintSal™
                    </span>
                  </h3>
                  <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                    We'll guide you through setting up your GOTTA GUY™ AI
                    companion in just 5 simple steps. This will only take 3-5
                    minutes.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Brain className="w-8 h-8 text-gold-300 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">AI Customization</h4>
                      <p className="text-white/70 text-sm">
                        Configure your AI assistant
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Globe className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Integrations</h4>
                      <p className="text-white/70 text-sm">
                        Connect your business tools
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Rocket className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Launch</h4>
                      <p className="text-white/70 text-sm">
                        Start using your AI companion
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Profile */}
              {currentStep === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Building className="w-6 h-6 text-gold-300 mr-3" />
                    <h3 className="text-xl md:text-2xl font-bold">
                      Tell us about your business
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-white/90 text-base font-semibold">
                        Business Type
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                        {businessTypes.map((type) => (
                          <Button
                            key={type}
                            variant={
                              formData.businessType === type
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleInputChange("businessType", type)
                            }
                            className={`h-auto p-3 text-sm ${
                              formData.businessType === type
                                ? "bg-gold-500 text-charcoal-900 saintvision-glow"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white/90 text-base font-semibold">
                        Industry
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {industries.map((industry) => (
                          <Button
                            key={industry}
                            variant={
                              formData.industry === industry
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleInputChange("industry", industry)
                            }
                            className={`h-auto p-3 text-sm ${
                              formData.industry === industry
                                ? "bg-gold-500 text-charcoal-900 saintvision-glow"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            {industry}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white/90 text-base font-semibold">
                        Team Size
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                        {teamSizes.map((size) => (
                          <Button
                            key={size}
                            variant={
                              formData.teamSize === size ? "default" : "outline"
                            }
                            onClick={() => handleInputChange("teamSize", size)}
                            className={`h-auto p-3 text-sm ${
                              formData.teamSize === size
                                ? "bg-gold-500 text-charcoal-900 saintvision-glow"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: AI Configuration */}
              {currentStep === 3 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Brain className="w-6 h-6 text-gold-300 mr-3" />
                    <h3 className="text-xl md:text-2xl font-bold">
                      Configure your AI assistant
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-white/90 text-base font-semibold mb-4 block">
                        Primary AI Model
                      </Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div
                          onClick={() =>
                            handleInputChange("aiPreferences", {
                              ...formData.aiPreferences,
                              primaryModel: "gpt4o",
                            })
                          }
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            formData.aiPreferences.primaryModel === "gpt4o"
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : "border-white/20 hover:border-white/40"
                          }`}
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
                          onClick={() =>
                            handleInputChange("aiPreferences", {
                              ...formData.aiPreferences,
                              primaryModel: "azure",
                            })
                          }
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            formData.aiPreferences.primaryModel === "azure"
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Shield className="w-6 h-6 text-blue-300" />
                            <div>
                              <h4 className="font-semibold">Azure Cognitive</h4>
                              <p className="text-white/70 text-sm">
                                Enterprise security and compliance
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white/90 text-base font-semibold mb-4 block">
                        What do you want to achieve?
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {goalOptions.map((goal) => (
                          <Button
                            key={goal}
                            variant={
                              formData.goals.includes(goal)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleArrayToggle("goals", goal)}
                            className={`h-auto p-3 text-sm ${
                              formData.goals.includes(goal)
                                ? "bg-gold-500 text-charcoal-900 saintvision-glow"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            {goal}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Integrations */}
              {currentStep === 4 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Globe className="w-6 h-6 text-gold-300 mr-3" />
                    <h3 className="text-xl md:text-2xl font-bold">
                      Connect your tools
                    </h3>
                  </div>
                  <p className="text-white/70 mb-6">
                    Connect your business tools to unlock the full power of
                    SaintSal™. You can skip this step and set up integrations
                    later.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {integrationOptions.map((integration) => {
                      const Icon = integration.icon;
                      const isSelected = formData.integrations.includes(
                        integration.id,
                      );
                      return (
                        <div
                          key={integration.id}
                          onClick={() =>
                            handleArrayToggle("integrations", integration.id)
                          }
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? "border-gold-500 bg-gold-500/10 saintvision-glow"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className="w-6 h-6 text-gold-300" />
                              <span className="font-semibold">
                                {integration.name}
                              </span>
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-gold-300" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Complete */}
              {currentStep === 5 && (
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center saintvision-glow-strong">
                    <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    🎉 You're all set!
                  </h3>
                  <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                    Your SaintSal™ AI companion is configured and ready to help
                    you cook some knowledge. Let's start your first
                    conversation!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <span className="text-2xl mb-2 block">🤖</span>
                      <h4 className="font-semibold mb-1">AI Ready</h4>
                      <p className="text-white/70 text-sm">
                        Your GOTTA GUY™ is configured
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <span className="text-2xl mb-2 block">🔗</span>
                      <h4 className="font-semibold mb-1">Integrations</h4>
                      <p className="text-white/70 text-sm">
                        {formData.integrations.length} tools connected
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <span className="text-2xl mb-2 block">⚡</span>
                      <h4 className="font-semibold mb-1">Ready to Go</h4>
                      <p className="text-white/70 text-sm">
                        Start using your AI companion
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile-Optimized Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-white/20 text-white hover:bg-white/10 px-4 md:px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  className="bg-green-500 text-white hover:bg-green-400 saintvision-glow px-6 md:px-8"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Dashboard
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow px-6 md:px-8"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

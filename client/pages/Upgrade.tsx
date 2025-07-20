import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Check,
  Crown,
  Zap,
  Users,
  Shield,
  Mic,
  Bot,
  Building,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Lock,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  Activity,
  TrendingUp,
  Award,
} from "lucide-react";

interface PlanFeature {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  tier: "free" | "pro" | "enterprise" | "white-label";
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  yearlyPrice?: number;
  popular?: boolean;
  badge?: string;
  color: string;
  icon: React.ComponentType<any>;
  features: string[];
  maxAgents: number;
  monthlyMessages: number | string;
  models: string[];
  cta: string;
  tier: "free" | "pro" | "enterprise" | "white-label";
}

const PLAN_FEATURES: PlanFeature[] = [
  {
    name: "Voice Enabled",
    description: "Natural speech conversations with TTS/STT",
    icon: Mic,
    tier: "pro",
  },
  {
    name: "Web Research + Summarization",
    description: "Real-time web search and intelligent summaries",
    icon: Globe,
    tier: "free",
  },
  {
    name: "CRM / GHL Routing",
    description: "GoHighLevel integration for customer management",
    icon: Users,
    tier: "pro",
  },
  {
    name: "Scheduling",
    description: "Calendar management and appointment booking",
    icon: Calendar,
    tier: "free",
  },
  {
    name: "Pricing / Quote Builder",
    description: "Generate quotes and pricing proposals",
    icon: DollarSign,
    tier: "pro",
  },
  {
    name: "AI Document Review",
    description: "Intelligent document analysis and review",
    icon: FileText,
    tier: "enterprise",
  },
  {
    name: "Compliance / Regulation Tracker",
    description: "Monitor regulatory requirements and compliance",
    icon: Shield,
    tier: "enterprise",
  },
  {
    name: "White Label Branding",
    description: "Remove SaintVision branding, use your own",
    icon: Award,
    tier: "white-label",
  },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free Trial",
    description: "Perfect for exploring SaintSal™ capabilities",
    price: 0,
    popular: false,
    color: "border-blue-500/30 bg-blue-500/10",
    icon: Bot,
    features: [
      "1 GPT-4o Agent",
      "100 messages/month",
      "Web research",
      "Basic scheduling",
      "Community support",
    ],
    maxAgents: 1,
    monthlyMessages: 100,
    models: ["GPT-4o"],
    cta: "Start Free",
    tier: "free",
  },
  {
    id: "pro",
    name: "Core Tools - Pro",
    description: "Everything you need to scale your business",
    price: 97,
    yearlyPrice: 87,
    popular: true,
    badge: "Most Popular",
    color: "border-gold-500/50 bg-gold-500/10",
    icon: Crown,
    features: [
      "1 Pro Agent included",
      "Unlimited messages",
      "Dual AI (GPT-4o + Azure)",
      "Voice & SMS integration",
      "CRM integration (GHL)",
      "Quote builder",
      "Priority support",
      "Add agents: $88/mo each",
    ],
    maxAgents: 1,
    monthlyMessages: "Unlimited",
    models: ["GPT-4o", "Azure Cognitive", "DualBot (HACP™)"],
    cta: "Go Pro",
    tier: "pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced features for growing teams",
    price: 297,
    yearlyPrice: 267,
    badge: "Best Value",
    color: "border-purple-500/30 bg-purple-500/10",
    icon: Building,
    features: [
      "5 Pro Agents included",
      "Everything in Pro",
      "Document review AI",
      "Compliance tracking",
      "Team management",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
    ],
    maxAgents: 5,
    monthlyMessages: "Unlimited",
    models: ["GPT-4o", "Azure Cognitive", "DualBot (HACP™)"],
    cta: "Go Enterprise",
    tier: "enterprise",
  },
  {
    id: "white-label",
    name: "White Label",
    description: "Full platform with your branding",
    price: 497,
    yearlyPrice: 447,
    badge: "Agency Solution",
    color: "border-emerald-500/30 bg-emerald-500/10",
    icon: Award,
    features: [
      "10 Pro Agents included",
      "Everything in Enterprise",
      "White-label branding",
      "Custom domain support",
      "Reseller rights",
      "API access",
      "Account manager",
      "Custom onboarding",
    ],
    maxAgents: 10,
    monthlyMessages: "Unlimited",
    models: ["GPT-4o", "Azure Cognitive", "DualBot (HACP™)"],
    cta: "Contact Sales",
    tier: "white-label",
  },
];

export default function Upgrade() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch("/api/subscription/details");
      if (response.ok) {
        const data = await response.json();
        setCurrentPlan(data.plan.tier);
      }
    } catch (error) {
      console.error("Failed to fetch current plan:", error);
    }
  };

  const handleUpgrade = async (planId: string) => {
    if (planId === "white-label") {
      // Redirect to contact sales
      window.location.href = "/contact";
      return;
    }

    setIsCreatingCheckout(true);
    setSelectedPlan(planId);

    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planTier: planId,
          userId: "current_user", // Would come from auth context
          billingCycle,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Failed to create checkout:", error);
      alert("Failed to start upgrade process. Please try again.");
    } finally {
      setIsCreatingCheckout(false);
      setSelectedPlan(null);
    }
  };

  const getPlanPrice = (plan: PricingPlan) => {
    if (plan.price === 0) return "Free";
    const price =
      billingCycle === "yearly" && plan.yearlyPrice
        ? plan.yearlyPrice
        : plan.price;
    return `$${price}`;
  };

  const getPlanSavings = (plan: PricingPlan) => {
    if (!plan.yearlyPrice || billingCycle === "monthly") return null;
    const monthlySavings = plan.price - plan.yearlyPrice;
    const yearlySavings = monthlySavings * 12;
    return `Save $${yearlySavings}/year`;
  };

  const isCurrentPlan = (planId: string) => currentPlan === planId;
  const isDowngrade = (planId: string) => {
    const tierOrder = ["free", "pro", "enterprise", "white-label"];
    return tierOrder.indexOf(planId) < tierOrder.indexOf(currentPlan);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white relative overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_theme(colors.gold.500)_2px,_transparent_2px),radial-gradient(circle_at_75px_75px,_theme(colors.gold.500)_2px,_transparent_2px)] bg-[100px_100px] bg-[0_0,50px_50px] opacity-5" />

        <div className="relative z-10 px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div
              className={`text-center mb-12 transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="saintvision-gradient-text">SaintSal™</span>{" "}
                Pricing
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
                Choose the perfect plan to unlock the full power of AI-driven
                business automation. All plans include our patented HACP™
                technology.
              </p>

              {/* HACP™ Patent Badge */}
              <div className="inline-flex items-center bg-gold-500/10 border border-gold-500/30 rounded-full px-6 py-3 mb-8">
                <Crown className="w-5 h-5 text-gold-300 mr-2" />
                <span className="text-gold-200 font-medium">
                  All plans include our patented HACP™ technology | US Patent
                  10,290,222
                </span>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span
                  className={`text-sm font-medium ${
                    billingCycle === "monthly" ? "text-white" : "text-white/60"
                  }`}
                >
                  Monthly
                </span>
                <button
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === "monthly" ? "yearly" : "monthly",
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    billingCycle === "yearly" ? "bg-gold-500" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingCycle === "yearly"
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    billingCycle === "yearly" ? "text-white" : "text-white/60"
                  }`}
                >
                  Yearly
                </span>
                {billingCycle === "yearly" && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
                    Save up to 20%
                  </Badge>
                )}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 md:gap-8 mb-16">
              {PRICING_PLANS.map((plan, index) => {
                const Icon = plan.icon;
                const isActive = isCurrentPlan(plan.id);
                const canUpgrade = !isActive && !isDowngrade(plan.id);

                return (
                  <div
                    key={plan.id}
                    className={`relative transform transition-all duration-700 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    } ${plan.popular ? "lg:scale-105" : ""}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gold-500 text-charcoal-900 font-bold px-4 py-1 saintvision-glow">
                          <Star className="w-3 h-3 mr-1" />
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    <div
                      className={`h-full glass-morphism rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                        plan.color
                      } ${
                        plan.popular
                          ? "saintvision-glow"
                          : "hover:border-gold-500/30"
                      } ${isActive ? "ring-2 ring-gold-500" : ""}`}
                    >
                      <div className="p-8">
                        {/* Plan Header */}
                        <div className="text-center mb-6">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                              plan.popular ? "bg-gold-500/20" : "bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 ${
                                plan.popular ? "text-gold-400" : "text-white/80"
                              }`}
                            />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            {plan.name}
                          </h3>
                          <p className="text-white/70 text-sm mb-4">
                            {plan.description}
                          </p>

                          {/* Price */}
                          <div className="mb-4">
                            <div className="flex items-baseline justify-center space-x-1">
                              <span className="text-4xl font-bold">
                                {getPlanPrice(plan)}
                              </span>
                              {plan.price > 0 && (
                                <span className="text-white/60">/month</span>
                              )}
                            </div>
                            {getPlanSavings(plan) && (
                              <p className="text-green-400 text-sm mt-1">
                                {getPlanSavings(plan)}
                              </p>
                            )}
                          </div>

                          {/* Agent Info */}
                          <div className="bg-white/5 rounded-lg p-3 mb-6">
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-white/70">
                                  Max Agents:
                                </span>
                                <span className="font-semibold">
                                  {plan.maxAgents}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Messages:</span>
                                <span className="font-semibold">
                                  {plan.monthlyMessages}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start"
                            >
                              <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white/90">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="space-y-3">
                          {isActive ? (
                            <Button
                              disabled
                              className="w-full bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Current Plan
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleUpgrade(plan.id)}
                              disabled={
                                isCreatingCheckout ||
                                !canUpgrade ||
                                isDowngrade(plan.id)
                              }
                              className={`w-full font-semibold transition-all duration-200 ${
                                plan.popular
                                  ? "bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                                  : canUpgrade
                                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                  : "bg-white/5 text-white/50 cursor-not-allowed"
                              }`}
                            >
                              {isCreatingCheckout &&
                              selectedPlan === plan.id ? (
                                <>
                                  <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
                                  Processing...
                                </>
                              ) : isDowngrade(plan.id) ? (
                                "Downgrade"
                              ) : (
                                <>
                                  {plan.cta}
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                              )}
                            </Button>
                          )}

                          {/* AI Models */}
                          <div className="text-center">
                            <p className="text-xs text-white/50 mb-2">
                              AI Models:
                            </p>
                            <div className="flex flex-wrap justify-center gap-1">
                              {plan.models.map(model => (
                                <Badge
                                  key={model}
                                  variant="secondary"
                                  className="text-xs bg-white/10 text-white/70 border-white/20"
                                >
                                  {model}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Comparison */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                <span className="saintvision-gradient-text">Feature</span>{" "}
                Comparison
              </h2>

              <div className="glass-morphism rounded-2xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                  {PLAN_FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    const availablePlans = PRICING_PLANS.filter(plan =>
                      plan.features.some(f =>
                        f.toLowerCase().includes(feature.name.toLowerCase()),
                      ),
                    );

                    return (
                      <div
                        key={index}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-gold-500/30 transition-colors"
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center mr-3">
                            <Icon className="w-5 h-5 text-gold-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">
                              {feature.name}
                            </h3>
                            <Badge
                              className={`text-xs mt-1 ${
                                feature.tier === "free"
                                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                  : feature.tier === "pro"
                                  ? "bg-gold-500/20 text-gold-300 border-gold-500/30"
                                  : feature.tier === "enterprise"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              }`}
                            >
                              {feature.tier.charAt(0).toUpperCase() +
                                feature.tier.slice(1)}
                              +
                            </Badge>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center mb-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-morphism rounded-xl p-6 border border-white/10">
                  <Shield className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Enterprise Security</h3>
                  <p className="text-white/70 text-sm">
                    Bank-level encryption, SOC 2 compliance, and GDPR ready
                  </p>
                </div>
                <div className="glass-morphism rounded-xl p-6 border border-white/10">
                  <Activity className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">99.9% Uptime SLA</h3>
                  <p className="text-white/70 text-sm">
                    Reliable service with monitoring and instant failover
                  </p>
                </div>
                <div className="glass-morphism rounded-xl p-6 border border-white/10">
                  <Users className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">24/7 Support</h3>
                  <p className="text-white/70 text-sm">
                    Expert support via Supersal AI and human specialists
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="glass-morphism rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">
                    What is HACP™ technology?
                  </h3>
                  <p className="text-white/70 text-sm">
                    HACP™ (Hierarchical Agent Control Protocol) is our patented
                    AI behavior management system (US Patent 10,290,222) that
                    ensures intelligent escalation and maintains the highest
                    standards of AI safety and effectiveness.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Can I add more agents later?
                  </h3>
                  <p className="text-white/70 text-sm">
                    Yes! You can add additional agents at any time. GPT-only
                    agents are $25/month each, and Pro agents with full features
                    are $88/month each.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    What happens if I cancel?
                  </h3>
                  <p className="text-white/70 text-sm">
                    You can cancel anytime. Your agents will remain active until
                    the end of your billing period, then automatically downgrade
                    to the free tier.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Do you offer custom plans?
                  </h3>
                  <p className="text-white/70 text-sm">
                    Yes! Contact our sales team for custom enterprise solutions,
                    volume discounts, and specialized integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

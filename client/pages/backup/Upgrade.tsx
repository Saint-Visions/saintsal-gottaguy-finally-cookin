import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Brain,
  Shield,
  Zap,
  Users,
  Building,
  Check,
  Star,
  ArrowRight,
  CreditCard,
  Globe,
  Phone,
  Mail,
  Sparkles,
  TrendingUp,
  Target,
  Infinity,
  Lock,
  Clock,
} from "lucide-react";

export default function Upgrade() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [currentPlan, setCurrentPlan] = useState("starter");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = [
    {
      id: "unlimited",
      name: "Unlimited",
      subtitle: "AI Chat & Dual System Access",
      price: { monthly: 27, yearly: 270 },
      popular: false,
      current: currentPlan === "unlimited",
      features: [
        "Unlimited AI conversations",
        "Dual AI system (GPT-4o + Azure)",
        "Sticky SaintSal™ companion",
        "Chat history & favorites",
        "Email support",
        "Web dashboard access",
      ],
      limits: ["No CRM access", "No business tools", "No PartnerTech access"],
      stripePriceId: "price_1RLChzFZsXxBWnj0VcveVdDf",
      icon: Zap,
      gradient: "from-blue-500 to-blue-600",
      cta: "Upgrade to Unlimited",
    },
    {
      id: "crm",
      name: "CRM Basic",
      subtitle: "Full CRM + Business Tools",
      price: { monthly: 97, yearly: 970 },
      popular: true,
      current: false,
      features: [
        "Everything in Unlimited",
        "1 GoHighLevel CRM subaccount",
        "PartnerTech.ai business tools",
        "CRM War Room access",
        "Chrome extension",
        "Lead scoring & automation",
        "Priority support",
        "Custom branding",
      ],
      limits: ["1 CRM account only", "No team management"],
      stripePriceId: "price_1RINIMFZsXxBWnjQEYxlyUIy",
      icon: Crown,
      gradient: "from-gold-400 to-gold-600",
      cta: "Upgrade to CRM",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "5 CRM Accounts + Teams",
      price: { monthly: 297, yearly: 2970 },
      popular: false,
      current: false,
      features: [
        "Everything in CRM Basic",
        "5 GoHighLevel CRM subaccounts",
        "Team management tools",
        "Enhanced permissions",
        "Usage analytics",
        "Multi-account dashboard",
        "Dedicated support",
        "Training sessions",
        "Custom integrations",
      ],
      limits: ["Up to 5 CRM accounts", "No white labeling"],
      stripePriceId: "price_1RpqCvFZsXxBWnj0XZJwP296",
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      cta: "Upgrade to Enterprise",
    },
    {
      id: "white_label",
      name: "White Label",
      subtitle: "10 Accounts + Full Branding",
      price: { monthly: 497, yearly: 4970 },
      popular: false,
      current: false,
      features: [
        "Everything in Enterprise",
        "10 GoHighLevel CRM subaccounts",
        "White-label platform",
        "Custom domains & branding",
        "Client management portal",
        "Reseller capabilities",
        "Admin panel access",
        "Priority support",
        "Custom training",
        "Full API access",
      ],
      limits: ["Up to 10 CRM accounts"],
      stripePriceId: "price_1IRg90FZsXxBWnj0H3PHnVc6",
      icon: Building,
      gradient: "from-gold-400 to-gold-600",
      cta: "Upgrade to White Label",
    },
    {
      id: "custom",
      name: "Custom Enterprise",
      subtitle: "Unlimited + Custom Development",
      price: { monthly: "Custom", yearly: "Custom" },
      deposit: 1500,
      popular: false,
      current: false,
      features: [
        "Everything in White Label",
        "Unlimited CRM subaccounts",
        "Custom feature development",
        "Dedicated infrastructure",
        "Your brand, your domain",
        "Revenue share options",
        "24/7 white-glove support",
        "Custom AI model training",
        "Full source code access",
        "Dedicated development team",
      ],
      limits: ["No limits - fully custom solution"],
      stripePriceId: "price_1Rh5yFZsXxBWnj0w6p9KY0j",
      icon: Crown,
      gradient: "from-gold-500 to-yellow-500",
      cta: "Contact Sales",
    },
  ];

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    console.log("Upgrading to:", plan);
    // Redirect to Stripe checkout
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
                           url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-12 h-12 object-contain mr-2"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              Upgrade
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Power Up Your Empire</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            <Zap className="w-3 h-3 mr-1" />
            Current: Start Cookin'
          </Badge>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            View Current Plan
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center saintvision-glow-strong">
                <TrendingUp className="w-10 h-10 text-charcoal-900" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="saintvision-gradient-text">Upgrade Your</span>
              <br />
              <span className="text-gold-300">Empire</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Unlock the full power of SaintSal™ with advanced features,
              unlimited access, and enterprise-grade capabilities.
              <br />
              <span className="text-gold-300 font-semibold">
                Built on patented HACP™ technology.
              </span>
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span
                className={`font-medium ${
                  billingCycle === "monthly" ? "text-gold-300" : "text-white/60"
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
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  billingCycle === "yearly" ? "bg-gold-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    billingCycle === "yearly"
                      ? "translate-x-8"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`font-medium ${
                  billingCycle === "yearly" ? "text-gold-300" : "text-white/60"
                }`}
              >
                Yearly
              </span>
              {billingCycle === "yearly" && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
                  Save 10%
                </Badge>
              )}
            </div>
          </div>

          {/* Current Plan Notice */}
          <div
            className={`mb-12 transform transition-all duration-1000 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-6 max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-blue-300" />
                <h3 className="text-xl font-bold">
                  You're currently on Start Cookin' Plan
                </h3>
              </div>
              <p className="text-white/80 mb-4">
                You've used 8,247 of 500 AI interactions this month. Upgrade to
                unlock unlimited conversations and premium features.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Dual AI Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Basic Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-300" />
                  <span>CRM Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-red-300" />
                  <span>Chrome Extension</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div
            className={`grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16 transform transition-all duration-1000 delay-400 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {plans.map(plan => {
              const Icon = plan.icon;
              const price = plan.price[billingCycle];

              return (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-2xl border transition-all hover:scale-105 ${
                    plan.popular
                      ? "border-gold-500 glass-morphism saintvision-glow-strong"
                      : plan.current
                      ? "border-blue-500 glass-morphism"
                      : "border-white/20 glass-morphism hover:border-white/40"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gold-500 text-charcoal-900 font-bold px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  {plan.current && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white font-bold px-4 py-1">
                        <Check className="w-3 h-3 mr-1" />
                        CURRENT
                      </Badge>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${
                        plan.gradient
                      } rounded-xl flex items-center justify-center mx-auto ${
                        plan.popular ? "saintvision-glow" : ""
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-gold-300 text-sm mb-4">
                      {plan.subtitle}
                    </p>
                    <div className="mb-4">
                      {plan.id === "custom" ? (
                        <>
                          <span className="text-3xl font-bold">Custom</span>
                          <div className="mt-2">
                            <span className="text-lg text-gold-300">
                              ${plan.deposit} deposit
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-bold">${price}</span>
                          <span className="text-white/60 ml-2">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 text-gold-300">
                      Features
                    </h4>
                    <ul className="space-y-3">
                      {plan.features
                        .slice(0, 6)
                        .map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <Check className="w-4 h-4 text-gold-300 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      {plan.features.length > 6 && (
                        <li className="flex items-start space-x-3">
                          <Sparkles className="w-4 h-4 text-gold-300 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">
                            +{plan.features.length - 6} more features
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={plan.current}
                    className={`w-full text-lg py-6 ${
                      plan.current
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : plan.popular
                        ? "bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {plan.current ? (
                      <>
                        <Check className="mr-2 w-5 h-5" />
                        Current Plan
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Features Comparison */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-600 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="saintvision-gradient-text">
                Why Upgrade to PartnerTech Pro?
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Unlimited AI Power",
                  description:
                    "No limits on conversations, advanced GPT-4o access, and custom AI memory",
                },
                {
                  icon: Globe,
                  title: "CRM Integration",
                  description:
                    "Full GoHighLevel integration with pipeline management and lead scoring",
                },
                {
                  icon: Phone,
                  title: "Voice & SMS Alerts",
                  description:
                    "Twilio-powered notifications and voice commands for real-time business updates",
                },
                {
                  icon: Target,
                  title: "Chrome Extension",
                  description:
                    "Browser integration for prospect analysis and content generation",
                },
                {
                  icon: Shield,
                  title: "Priority Support",
                  description:
                    "Dedicated support team with faster response times and expert guidance",
                },
                {
                  icon: Sparkles,
                  title: "Advanced Analytics",
                  description:
                    "Deep insights into AI usage, lead conversion, and business performance",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="glass-morphism p-6 rounded-xl text-center hover:saintvision-glow transition-all"
                  >
                    <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-gold-300" />
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-white/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Urgency Section */}
          <div
            className={`text-center transform transition-all duration-1000 delay-800 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-gold-300" />
                <h3 className="text-2xl font-bold">Limited Time Offer</h3>
              </div>
              <p className="text-white/80 mb-6 text-lg">
                Upgrade to PartnerTech Pro today and get your first month at 50%
                off. Plus, free onboarding and setup assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleUpgrade("pro")}
                  className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow text-lg px-8 py-4"
                >
                  <Crown className="mr-2 w-5 h-5" />
                  Upgrade to Pro - Save 50%
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Talk to Sales
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-4">
                Cancel anytime. No long-term commitments. 30-day money-back
                guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="relative z-40 text-center py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-white/60">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">US Patent 10,290,222</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Secure Stripe Billing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">30-Day Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

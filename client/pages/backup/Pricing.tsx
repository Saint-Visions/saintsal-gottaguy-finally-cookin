import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import {
  Check,
  Crown,
  Zap,
  Shield,
  Brain,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  CreditCard,
  MessageSquare,
  Users,
  Building,
  Infinity,
} from "lucide-react";

export default function Pricing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!priceId) {
      console.error("No price ID provided for plan:", planName);
      return;
    }

    setLoading(planName);

    try {
      // For now, redirect to upgrade page - in production this would call Stripe API
      window.location.href = `/upgrade?plan=${planName.toLowerCase()}&priceId=${priceId}`;
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Free",
      subtitle: "Try the Cookin'",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for exploring SaintSal™ capabilities",
      features: [
        "100 AI conversations/month",
        "Basic GPT-4o access",
        "Community support",
        "Standard response time",
        "Web interface only",
      ],
      cta: "Start Free",
      popular: false,
      stripePriceId: import.meta.env.VITE_STRIPE_FREE_PRICE_ID,
      icon: MessageSquare,
      gradient: "from-gray-600 to-gray-800",
    },
    {
      name: "Unlimited",
      subtitle: "Base Magic",
      price: { monthly: 27, yearly: 270 },
      description: "Where the magic starts flowing",
      features: [
        "Unlimited AI conversations",
        "GPT-4o access",
        "Basic CRM features",
        "Email support",
        "Chrome extension",
        "Standard response time",
      ],
      cta: "Get Unlimited",
      popular: false,
      stripePriceId: import.meta.env.VITE_STRIPE_UNLIMITED_PRICE_ID,
      icon: Zap,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      name: "Pro",
      subtitle: "Your GOTTA GUY™",
      price: { monthly: 97, yearly: 970 },
      description: "🔥 WHERE ALL THE MAGIC UNLOCKS!",
      features: [
        "Everything in Unlimited",
        "Dual AI system (GPT-4o + Azure)",
        "Voice & SMS integration",
        "Full CRM access (GHL)",
        "PartnerTech integration",
        "Priority support",
        "Custom AI memory",
        "API access",
        "🔥 ALL MAGIC UNLOCKED",
      ],
      cta: "Unlock Magic 🔥",
      popular: true,
      stripePriceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
      icon: Crown,
      gradient: "from-gold-500 to-gold-700",
    },
    {
      name: "Enterprise",
      subtitle: "Scale Mode",
      price: { monthly: 297, yearly: 2970 },
      description: "For teams ready to dominate",
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "Multi-user management",
        "Priority deployment",
      ],
      cta: "Scale Up",
      popular: false,
      stripePriceId: import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID,
      icon: Building,
      gradient: "from-purple-600 to-purple-800",
    },
    {
      name: "White Label Elite",
      subtitle: "Empire Mode",
      price: { monthly: 497, yearly: 4970 },
      description: "Your own branded SaintVisionAI empire",
      features: [
        "Everything in Enterprise",
        "Full white-label branding",
        "Custom domain & SSL",
        "Unlimited user accounts",
        "Revenue sharing program",
        "Full source code access",
        "24/7 dedicated support",
        "Custom feature development",
      ],
      cta: "Build Empire",
      popular: false,
      stripePriceId: import.meta.env.VITE_STRIPE_WHITE_LABEL_PRICE_ID,
      icon: Crown,
      gradient: "from-emerald-600 to-emerald-800",
    },
    {
      name: "Custom",
      subtitle: "Ultimate",
      price: { monthly: 1500, yearly: 15000 },
      description: "$1500 deposit for custom solutions",
      features: [
        "Everything in White Label",
        "Custom development team",
        "Dedicated project manager",
        "White-glove onboarding",
        "Custom AI training",
        "Enterprise contracts",
        "Revenue guarantees",
        "Full platform customization",
      ],
      cta: "Custom Build",
      popular: false,
      stripePriceId: import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID,
      icon: Sparkles,
      gradient: "from-indigo-600 to-indigo-900",
    },
  ];

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
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F4f08aaff66374bf3bd72e740c34ecf44')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-200 -mt-1">Pricing Plans</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-white/80 hover:text-gold-200 transition-colors"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="text-white/80 hover:text-gold-200 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/help"
            className="text-white/80 hover:text-gold-200 transition-colors"
          >
            Help
          </a>
          <Button
            variant="outline"
            className="border-gold-400 text-gold-200 hover:bg-gold-400 hover:text-charcoal-900"
          >
            Sign In
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-6 py-12">
        {/* Prominent Clean Logo */}
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=100 100w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=200 200w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=400 400w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=800 800w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=1200 1200w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=1600 1600w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3?width=2000 2000w, https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/the-side-side-transparent-gotem-7887d3"
          className="w-full max-w-[941px] mx-auto block object-cover"
          style={{
            aspectRatio: "4.36",
            objectPosition: "center",
            minHeight: "20px",
            minWidth: "20px",
            overflow: "hidden",
            margin: "-1px 0 0 -2px",
          }}
          alt="SaintVisionAI Logo"
        />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="saintvision-gradient-text">Choose Your</span>
              <br />
              <span className="text-gold-200">GOTTA GUY™</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              From startup to enterprise, SaintSal™ scales with your ambition.
              <br />
              <span className="text-gold-200 font-semibold">
                All plans include our patented HACP™ technology.
              </span>
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span
                className={`font-medium ${
                  billingCycle === "monthly" ? "text-gold-200" : "text-white/60"
                }`}
              >
                Monthly
              </span>
              <button
                aria-label="Toggle billing cycle"
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
                  billingCycle === "yearly" ? "text-gold-200" : "text-white/60"
                }`}
              >
                Yearly
              </span>
              {billingCycle === "yearly" && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div
            className={`grid lg:grid-cols-3 gap-8 mb-16 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = plan.price[billingCycle];

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-2xl border transition-all hover:scale-105 ${
                    plan.popular
                      ? "border-gold-500 glass-morphism saintvision-glow-strong"
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
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gold-300 font-medium mb-4">
                      {plan.subtitle}
                    </p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-white/60 ml-2">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <Check className="w-5 h-5 text-gold-300 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">
                          {feature.includes("GPT-4o") ? (
                            <>
                              Dual AI system (
                              <span className="text-blue-400 font-medium">
                                GPT-4o
                              </span>{" "}
                              +{" "}
                              <span className="text-purple-400 font-medium">
                                Azure
                              </span>
                              )
                            </>
                          ) : feature.includes("CRM") ? (
                            <>
                              <span className="text-green-400 font-medium">
                                CRM
                              </span>{" "}
                              connection (GHL)
                            </>
                          ) : feature.includes("API") ? (
                            <>
                              <span className="text-yellow-400 font-medium">
                                API
                              </span>{" "}
                              access
                            </>
                          ) : feature.includes("Priority") ? (
                            <>
                              <span className="text-blue-400 font-medium">
                                Priority
                              </span>{" "}
                              support
                            </>
                          ) : (
                            feature
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.name === "Starter" ? (
                    <Link to="/dashboard">
                      <Button
                        className={`w-full text-lg py-6 bg-white/10 text-white hover:bg-white/20 border border-white/20`}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  ) : plan.name === "Enterprise" ? (
                    <a href="mailto:support@saintvisionai.com?subject=Enterprise%20Plan%20Inquiry">
                      <Button
                        className={`w-full text-lg py-6 bg-white/10 text-white hover:bg-white/20 border border-white/20`}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className={`w-full text-lg py-6 ${
                        plan.popular
                          ? "bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                      onClick={() =>
                        handleSubscribe(plan.stripePriceId!, plan.name)
                      }
                      disabled={loading === plan.name}
                    >
                      {loading === plan.name ? "Processing..." : plan.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  )}

                  {plan.popular && (
                    <p className="text-center text-xs text-gold-300 mt-4">
                      Most businesses choose this plan
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enterprise Contact */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Need Something Custom?
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                We build white-label solutions, custom integrations, and
                enterprise deployments.
                <br />
                <span className="text-gold-300">
                  Let's talk about your vision.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/saintvisionai/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                  >
                    <Users className="mr-2 w-5 h-5" />
                    Schedule a Call
                  </Button>
                </a>
                <a href="mailto:support@saintvisionai.com?subject=Enterprise%20Sales%20Inquiry">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Chat with Sales
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="saintvision-gradient-text">Why SaintSal™?</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 glass-morphism rounded-xl">
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-gold-300" />
                </div>
                <h4 className="font-semibold mb-2">HACP™ Technology</h4>
                <p className="text-white/70 text-sm">
                  Patented Human-AI Connection Protocol
                </p>
              </div>

              <div className="text-center p-6 glass-morphism rounded-xl">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-300" />
                </div>
                <h4 className="font-semibold mb-2">Enterprise Security</h4>
                <p className="text-white/70 text-sm">
                  Azure-backed with SOC 2 compliance
                </p>
              </div>

              <div className="text-center p-6 glass-morphism rounded-xl">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-300" />
                </div>
                <h4 className="font-semibold mb-2">Real Integrations</h4>
                <p className="text-white/70 text-sm">
                  CRM, billing, voice, and SMS ready
                </p>
              </div>

              <div className="text-center p-6 glass-morphism rounded-xl">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-green-300" />
                </div>
                <h4 className="font-semibold mb-2">Global Scale</h4>
                <p className="text-white/70 text-sm">
                  Multi-region deployment ready
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div
            className={`text-center transform transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-white/80 mb-6">
                Our documentation covers everything, or chat with our support
                team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-gold-400 text-gold-200 hover:bg-gold-400 hover:text-charcoal-900"
                >
                  View Documentation
                </Button>
                <Button className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow">
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Live Support
                </Button>
              </div>
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
              <span className="text-sm">30-Day Money Back</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

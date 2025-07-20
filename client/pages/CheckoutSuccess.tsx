import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Crown,
  Sparkles,
  ArrowRight,
  Download,
  CreditCard,
  Users,
  Brain,
  Zap,
  Globe,
  Phone,
  Mail,
  Calendar,
  Gift,
  Star,
  Trophy,
} from "lucide-react";

export default function CheckoutSuccess() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setConfetti(false), 3000);
  }, []);

  const planFeatures = [
    "Unlimited AI conversations with your GOTTA GUY™",
    "Dual AI system (GPT-4o + Azure Cognitive)",
    "Chrome extension with browser integration",
    "CRM integration with GoHighLevel",
    "Voice & SMS alerts via Twilio",
    "Priority support with faster response times",
    "Advanced analytics and reporting",
    "API access for custom integrations",
  ];

  const quickActions = [
    {
      title: "Access Dashboard",
      description: "Start using your AI companion immediately",
      icon: Crown,
      action: "Open Dashboard",
      href: "/dashboard",
      primary: true,
    },
    {
      title: "Install Extension",
      description: "Get browser integration with Chrome extension",
      icon: Download,
      action: "Install Now",
      href: "/chrome-install",
      primary: false,
    },
    {
      title: "Configure CRM",
      description: "Connect your GoHighLevel CRM for full automation",
      icon: Globe,
      action: "Connect CRM",
      href: "/crm",
      primary: false,
    },
    {
      title: "Customize Settings",
      description: "Personalize your AI assistant and preferences",
      icon: Zap,
      action: "Settings",
      href: "/settings",
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-12 h-12 object-contain"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              Payment Success
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Welcome to SaintSal™</p>
          </div>
        </div>
      </nav>

      {/* Confetti Effect */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
            </div>
          ))}
        </div>
      )}

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.98) 0%, rgba(16, 22, 28, 0.95) 100%), 
                           url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      <div className="relative z-40 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Success Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center saintvision-glow-strong animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-green-300">Welcome to</span>
              <br />
              <span className="saintvision-gradient-text">
                SaintSal™ Empire!
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              🎉 Payment successful! Your GOTTA GUY™ AI companion is ready to
              transform your business.
              <br />
              <span className="text-gold-300 font-semibold">
                Let's start cookin' some knowledge!
              </span>
            </p>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-6 py-2">
                <Trophy className="w-5 h-5 mr-2" />
                Pro Plan Activated
              </Badge>
              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 text-lg px-6 py-2">
                <Star className="w-5 h-5 mr-2" />
                GOTTA GUY™ Ready
              </Badge>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto text-center border border-green-500/30">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <CreditCard className="w-8 h-8 text-green-300" />
                <h2 className="text-3xl font-bold text-green-300">
                  Payment Confirmed
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <p className="text-white/70 text-sm mb-1">Plan</p>
                  <p className="text-xl font-bold">PartnerTech Pro</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Amount</p>
                  <p className="text-xl font-bold">$97.00/month</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Next Billing</p>
                  <p className="text-xl font-bold">
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/80">
                  A confirmation email has been sent to your inbox with your
                  receipt and account details.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="saintvision-gradient-text">
                Get Started in 3 Steps
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className={`glass-morphism p-6 rounded-xl hover:saintvision-glow transition-all group text-center ${
                      action.primary ? "border border-gold-500/30" : ""
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                        action.primary ? "bg-gold-500/20" : "bg-white/10"
                      } group-hover:scale-110 transition-transform`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          action.primary ? "text-gold-300" : "text-white/70"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm mb-4">
                      {action.description}
                    </p>
                    <Button
                      className={`w-full ${
                        action.primary
                          ? "bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {action.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What's Included */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="saintvision-gradient-text">
                What's Included in Your Plan
              </span>
            </h2>

            <div className="glass-morphism rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Crown className="w-6 h-6 text-gold-300 mr-2" />
                    Pro Features Unlocked
                  </h3>
                  <div className="space-y-4">
                    {planFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Gift className="w-6 h-6 text-gold-300 mr-2" />
                    Bonus Resources
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Free Onboarding Call
                      </h4>
                      <p className="text-white/70 text-sm">
                        30-minute session to optimize your setup
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold mb-2">Priority Support</h4>
                      <p className="text-white/70 text-sm">
                        Direct access to our expert team
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Exclusive Community
                      </h4>
                      <p className="text-white/70 text-sm">
                        Join our private Pro user community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Next Steps */}
          <div
            className={`text-center transform transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                Our team is here to ensure you get maximum value from your
                SaintSal™ investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Onboarding Call
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  support@saintvisionai.com
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-6">
                Available 24/7 • Average response time: &lt;2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Chrome,
  Github,
  ArrowRight,
  Shield,
  Sparkles,
  Star,
  CreditCard,
  CheckCircle,
  Zap,
  Brain,
  Users,
} from "lucide-react";

export default function SignUp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "Essential",
      price: 27,
      popular: false,
      features: ["Unlimited AI chats", "Dual AI system", "Email support"],
      stripePriceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
      icon: Zap,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "pro",
      name: "Professional",
      price: 97,
      popular: true,
      features: [
        "Everything in Essential",
        "CRM integration",
        "Chrome extension",
        "Voice & SMS alerts",
        "Priority support",
      ],
      stripePriceId: import.meta.env.VITE_STRIPE_UNLIMITED_PRICE_ID,
      icon: Crown,
      gradient: "from-gold-400 to-gold-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 297,
      popular: false,
      features: [
        "Everything in PartnerTech",
        "White-label branding",
        "Admin dashboard",
        "Custom integrations",
        "Dedicated support",
      ],
      stripePriceId: import.meta.env.VITE_STRIPE_WHITE_LABEL_PRICE_ID,
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    console.log("Sign up with plan:", selectedPlanData, formData);
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
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(16, 22, 28, 0.75) 100%), 
                                              url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F318002d06a1a43ddab311553a42ce777?format=webp&width=800')`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-charcoal-900 font-bold text-lg">Sv.</span>
          </div>
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Join the Empire</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Home
          </a>
          <a
            href="/pricing"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Pricing
          </a>
          <a
            href="/help"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Help
          </a>
          <a
            href="/signin"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Sign In
          </a>
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
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F1fad4f7c944249c3a8a02d8e8ae77b26?format=webp&width=800"
                  alt="SaintVisionAI Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="saintvision-gradient-text font-dialien">
                Enterprise AI
              </span>
              <br />
              <span className="text-gold-300 font-dialien">
                Platform Access
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-8 max-w-2xl mx-auto font-light">
              Select your subscription tier for SaintVisionAI{" "}
              <span className="text-blue-400 font-medium">
                enterprise infrastructure
              </span>
              .
              <br />
              <span className="text-base">
                <span className="text-yellow-400 font-semibold">HACP™</span>{" "}
                compliant •
                <span className="text-blue-400 font-medium"> SOC 2</span>{" "}
                certified •
                <span className="text-purple-400 font-medium">
                  Enterprise SLA
                </span>
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Plan Selection */}
            <div className="lg:col-span-2">
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-8 text-center lg:text-left tracking-tight">
                  <span className="saintvision-gradient-text font-dialien">
                    Subscription Tiers
                  </span>
                </h2>

                <div className="space-y-6">
                  {plans.map(plan => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.id;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-gold-500 glass-morphism saintvision-glow"
                            : "border-white/20 glass-morphism hover:border-white/40"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-6">
                            <Badge className="bg-gold-500 text-charcoal-900 font-bold px-4 py-1">
                              <Star className="w-3 h-3 mr-1" />
                              MOST POPULAR
                            </Badge>
                          </div>
                        )}

                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${
                              plan.gradient
                            } rounded-xl flex items-center justify-center ${
                              isSelected ? "saintvision-glow" : ""
                            }`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-2xl font-bold">
                                {plan.id === "pro" ? (
                                  <span className="text-blue-400">
                                    {plan.name}
                                  </span>
                                ) : (
                                  plan.name
                                )}
                              </h3>
                              <div className="text-right">
                                <span
                                  className={`text-3xl font-bold ${
                                    plan.id === "pro"
                                      ? "text-green-400 saintvision-glow"
                                      : ""
                                  }`}
                                >
                                  ${plan.price}
                                </span>
                                <span className="text-white/60 ml-1">
                                  /month
                                </span>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-2">
                              {plan.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-gold-300 flex-shrink-0" />
                                  <span className="text-white/90 text-sm">
                                    {feature.includes("CRM") ? (
                                      <>
                                        <span className="text-green-400 font-medium">
                                          CRM
                                        </span>{" "}
                                        integration
                                      </>
                                    ) : feature.includes("Priority") ? (
                                      <>
                                        <span className="text-blue-400 font-medium">
                                          Priority
                                        </span>{" "}
                                        support
                                      </>
                                    ) : feature.includes("Chrome") ? (
                                      <>
                                        <span className="text-purple-400 font-medium">
                                          Chrome
                                        </span>{" "}
                                        extension
                                      </>
                                    ) : (
                                      feature
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full border-2 transition-all ${
                                isSelected
                                  ? "border-gold-500 bg-gold-500"
                                  : "border-white/40"
                              }`}
                            >
                              {isSelected && (
                                <CheckCircle className="w-6 h-6 text-charcoal-900" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="lg:col-span-1">
              <div
                className={`transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="glass-morphism p-8 rounded-2xl">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">
                      Start Your Journey
                    </h3>
                    <p className="text-white/70">
                      Create your SaintSal™ account
                    </p>
                  </div>

                  {/* Social Sign Up */}
                  <div className="space-y-3 mb-6">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 h-12"
                    >
                      <Chrome className="w-5 h-5 mr-2" />
                      Continue with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 h-12"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Continue with GitHub
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <Separator className="bg-white/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-charcoal-900 px-4 text-white/60 text-sm">
                        or continue with email
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white/90">
                          First Name
                        </Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={e =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-10"
                            placeholder="First"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white/90">
                          Last Name
                        </Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={e =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-10"
                            placeholder="Last"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white/90">
                        Email Address
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={e =>
                            handleInputChange("email", e.target.value)
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-white/90">
                        Company (Optional)
                      </Label>
                      <div className="relative mt-2">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={e =>
                            handleInputChange("company", e.target.value)
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-white/90">
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={e =>
                            handleInputChange("password", e.target.value)
                          }
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12 pr-12"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleSignUp}
                      className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow h-12 text-lg font-semibold mt-6"
                    >
                      <CreditCard className="mr-2 w-5 h-5" />
                      Start Cookin' - $
                      {plans.find(p => p.id === selectedPlan)?.price}/month
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>

                  {/* Trust Indicators */}
                  <div className="text-center mt-6">
                    <div className="flex items-center justify-center space-x-4 text-white/50 text-xs mb-4">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>256-bit SSL</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-3 h-3" />
                        <span>Stripe Secure</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Cancel Anytime</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/50">
                      By creating an account, you agree to our{" "}
                      <a href="#" className="text-gold-300 hover:text-gold-200">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-gold-300 hover:text-gold-200">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Section */}
          <div
            className={`text-center transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Join 10,000+ Entrepreneurs
              </h3>
              <p className="text-white/80 mb-6">
                Who've found their GOTTA GUY™ and are scaling their businesses
                with SaintSal™ AI technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-gold-300" />
                  <span>HACP™ Patented Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-300" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-purple-300" />
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

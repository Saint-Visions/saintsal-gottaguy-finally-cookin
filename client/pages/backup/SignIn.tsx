import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Github,
  ArrowRight,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

export default function SignIn() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Supabase auth logic here
    console.log("Auth submission:", { isSignUp, formData });
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

      <div className="relative z-40 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
          <div
            className={`transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            {/* Logo */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fbfbbfb24db7e4137a6186e4e6eb541ae?format=webp&width=800"
                    alt="SaintVisionAI Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold saintvision-gradient-text font-dialien">
                    SaintVisionAI™
                  </h1>
                  <p className="text-gold-300 font-medium font-dropline">
                    Cookin' Knowledge
                  </p>
                </div>
              </div>
            </div>

            {/* Enterprise Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                <span className="font-dialien">Enterprise AI</span>
                <br />
                <span className="saintvision-gradient-text font-dialien">
                  Intelligence Platform
                </span>
              </h2>

              <p className="text-lg text-white/85 leading-relaxed font-light">
                Advanced artificial intelligence infrastructure designed for
                <span className="text-blue-400 font-medium">
                  {" "}
                  enterprise deployment
                </span>
                . Secure, scalable, and compliant with institutional
                requirements.
              </p>

              {/* Key Capabilities */}
              <div className="space-y-3">
                <div className="text-white/75 text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  Multi-modal AI processing with{" "}
                  <span className="text-green-400">
                    enterprise-grade security
                  </span>
                </div>
                <div className="text-white/75 text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-yellow-400 font-semibold">HACP™</span>{" "}
                  compliance and{" "}
                  <span className="text-blue-400">SOC 2 Type II</span>{" "}
                  certification
                </div>
                <div className="text-white/75 text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Scalable infrastructure with{" "}
                  <span className="text-green-400 font-semibold">
                    99.9% uptime SLA
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="glass-morphism p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">
                    All systems operational
                  </span>
                </div>
                <div className="text-white/60 text-xs mt-1">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div
            className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {/* Mobile Logo */}
            <div className="lg:hidden mb-12 text-center">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fbfbbfb24db7e4137a6186e4e6eb541ae?format=webp&width=800"
                  alt="SaintVisionAI Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold saintvision-gradient-text font-dialien">
                SaintVisionAI™
              </h1>
              <p className="text-gold-300 font-dropline">Cookin' Knowledge</p>
            </div>

            {/* Auth Card */}
            <div className="glass-morphism p-8 rounded-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2 tracking-tight">
                  {isSignUp ? "Create Account" : "Sign In"}
                </h2>
                <p className="text-white/60 text-sm">
                  {isSignUp
                    ? "Access enterprise AI infrastructure"
                    : "Access your SaintVisionAI platform"}
                </p>
              </div>

              {/* Social Auth */}
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

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white/90">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        placeholder="First"
                        required={isSignUp}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white/90">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 mt-2"
                        placeholder="Last"
                        required={isSignUp}
                      />
                    </div>
                  </div>
                )}

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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12"
                      placeholder="your@email.com"
                      required
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
                      onChange={(e) =>
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

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold-500 focus:ring-gold-500"
                      />
                      <span className="text-white/70">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-gold-300 hover:text-gold-200 text-sm"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow h-12 text-lg font-semibold"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>

              {/* Switch Mode */}
              <div className="text-center mt-6">
                <p className="text-white/70">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-gold-300 hover:text-gold-200 font-semibold"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>

              {/* Terms */}
              {isSignUp && (
                <div className="text-center mt-6">
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
              )}
            </div>

            {/* Trust Indicators */}
            <div className="text-center mt-8">
              <div className="flex items-center justify-center space-x-6 text-white/50 text-xs">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>US Patent Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

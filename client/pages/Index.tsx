import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { useUserPlan } from "@/hooks/use-plan-protection"; // Not exported
import createSupabaseClient from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Crown,
  MessageSquare,
  Sparkles,
  Users,
  Globe,
  Lock,
  CheckCircle,
  Star,
  Database,
  TrendingUp,
  Target,
  Cpu,
  Settings,
  Award,
} from "lucide-react";

// Mock useUserPlan hook since it's not exported
const useUserPlan = () => ({ plan: 'pro' });

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { plan } = useUserPlan();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Check if user is logged in
    const checkAuth = async () => {
      const supabase = createSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Plan-based routing logic for CTA buttons
  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleCRMToolsClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/signin");
    } else if (
      plan === "crm" ||
      plan === "enterprise" ||
      plan === "white_label"
    ) {
      navigate("/partnertech");
    } else {
      navigate("/upgrade");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative">
      {/* Hero Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.8) 0%, rgba(16, 22, 28, 0.6) 100%),
                                                    url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800')`,
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Enhanced Navigation Logo */}
            <div className="flex items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a?format=webp&width=800"
                alt="SaintVisionAI Logo"
                className="w-16 h-16 object-contain transition-all duration-300 hover:scale-105"
                style={{
                  filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
                }}
              />
            </div>
          </div>
          <div className="ml-1">
            <h1 className="text-2xl font-bold text-white tracking-tight font-dialien drop-shadow-lg">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1 font-medium drop-shadow-sm">
              Cookin' Knowledge
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/dashboard"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/pricing"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/why"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Why Us
          </Link>
          <Link
            to="/help"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Help
          </Link>
          <Link to="/signin">
            <Button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              Sign In
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
              Start Cookin'
            </Button>
          </Link>
        </div>

        {/* Mobile menu button - visible on mobile */}
        <div className="md:hidden">
          <Button
            className="text-white hover:text-gold-300 bg-transparent border-none shadow-none cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/dashboard');
            }}
          >
            Menu
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div
          className={`transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Logo/Brand */}
          <div className="mb-8">
            <div className="relative inline-block -mt-1 -mb-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F5af1b2848cdd4695bab7fa0b4affb339"
                alt="SaintVisionAI Logo"
                className="h-60 object-contain mx-auto mb-11"
                style={{
                  width: "367px",
                  filter: "brightness(1.2) contrast(1.1) saturate(1.1)",
                }}
              />
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="saintvision-gradient-text font-dialien">
              SaintSal™
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gold-300 mb-6 font-medium font-dropline">
            Cookin' Knowledge.
          </h2>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl">
            AI doesn't just answer. It{" "}
            <span className="text-blue-400 font-medium">adapts</span>. It{" "}
            <span className="text-purple-400 font-medium">empowers</span>. It
            becomes
            <span className="text-gold-300 font-semibold">
              {" "}
              your enterprise companion
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
            <Button
              size="lg"
              onClick={handleDashboardClick}
              className="text-yellow-400 hover:text-yellow-300 text-xl font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent group hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] cursor-pointer"
            >
              Start Cookin' Knowledge
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={handleCRMToolsClick}
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)] cursor-pointer"
            >
              Try CRM Tools
              <Shield className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Elite Technology Badge */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="glass-morphism rounded-full px-6 py-3 mb-8">
            <p className="text-gold-300 font-semibold text-sm uppercase tracking-wider">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Enterprise Ready
            </p>
          </div>
        </div>
      </div>

      {/* What Separates Us Section */}
      <section className="relative z-40 py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 saintvision-gradient-text">
              What Separates Us?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover why thousands choose SaintSal™ as their enterprise AI companion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Dual AI Power */}
            <div className="glass-morphism p-8 rounded-xl hover:saintvision-glow-soft transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Dual AI Power</h3>
              </div>
              <p className="text-blue-300 font-semibold mb-3">GPT-4o + Azure Cognitive Services</p>
              <p className="text-white/80 mb-4">
                Advanced dual AI architecture combining OpenAI's GPT-4o with Azure Cognitive Services
                for unmatched intelligence and reliability.
              </p>
            </div>

            {/* Enterprise Security */}
            <div className="glass-morphism p-8 rounded-xl hover:saintvision-glow-soft transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise Security</h3>
              </div>
              <p className="text-green-300 font-semibold mb-3">Faith-aligned, private, and secure</p>
              <p className="text-white/80 mb-4">
                Bank-grade encryption meets faith-centered values. Your data protected with military-grade
                security and ethical business practices.
              </p>
            </div>

            {/* Elite Technology */}
            <div className="glass-morphism p-8 rounded-xl hover:saintvision-glow-soft transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mr-4">
                  <Crown className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Elite Technology</h3>
              </div>
              <p className="text-gold-300 font-semibold mb-3">Premium infrastructure & reliability</p>
              <p className="text-white/80 mb-4">
                Enterprise-grade infrastructure with 99.99% uptime, premium support, and cutting-edge
                technology stack designed for scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PartnerTech AI Section */}
      <section className="relative z-40 py-20 px-6 lg:px-12 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              PartnerTech AI
            </h2>
            <p className="text-gold-300 text-xl font-semibold mb-6">Premium Tier</p>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              When you're ready to scale. Advanced CRM integration, Chrome extension automation, AI-triggered workflows,
              and intelligent client routing systems.
            </p>
          </div>

          <div className="glass-morphism p-8 rounded-xl max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Crown className="w-8 h-8 text-gold-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">PartnerTech AI</h3>
              </div>
              <span className="bg-gold-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                PREMIUM
              </span>
            </div>

            <p className="text-white/80 mb-6">
              When you're ready to scale. Advanced CRM integration, Chrome extension automation, AI-triggered workflows,
              and intelligent client routing systems.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/80">Enterprise CRM Integration</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/80">Chrome extension automation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/80">AI workflow triggers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/80">Intelligent client routing</span>
              </div>
            </div>

            <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition-all duration-300 hover:saintvision-glow">
              Unlock Partner Access
            </Button>
          </div>

          {/* Integration Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="glass-morphism p-6 rounded-lg text-center">
              <Database className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">CRM</p>
              <p className="text-white/60 text-sm">PartnerTech</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">Chrome</p>
              <p className="text-white/60 text-sm">Extension Automation</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-medium">Triggers</p>
              <p className="text-white/60 text-sm">AI Workflows</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <Brain className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <p className="text-white font-medium">AI Logic</p>
              <p className="text-white/60 text-sm">Intelligent Routing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Technology Section */}
      <section className="relative z-40 py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Elite Technology
            </h2>
            <p className="text-gold-300 text-xl font-semibold mb-6">ENTERPRISE READY</p>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Dual AI systems handle your business operations while you focus on what matters - growing
              your empire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-morphism p-8 rounded-xl">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Business Strategy</h3>
              <p className="text-white/80">
                AI-driven research, and strategies planning powered by dual AI engines.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">CRM Integration</h3>
              <p className="text-white/80">
                Seamlessly connect with GoHighLevel, Generate leads and intelligent routing.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Growth Analytics</h3>
              <p className="text-white/80">
                Advanced analytics and business intelligence to scale faster with smarter business decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vault & Security Section */}
      <section className="relative z-40 py-20 px-6 lg:px-12 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Vault & Security
            </h2>
            <p className="text-green-300 text-xl font-semibold mb-6">Faith-Aligned Data Protection</p>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Bank-grade security meets faith-centered values. Your data protected with military-grade
              encryption and ethical business practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Faith-Aligned Vault */}
            <div className="glass-morphism p-8 rounded-xl border-2 border-green-500/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Faith-Aligned Vault</h3>
              </div>
              <p className="text-green-300 font-semibold mb-4">End-to-end encryption</p>
              <p className="text-white/80 mb-6">
                Your conversations, billing data, and personal information are protected with ethical encryption
                and faith-based practices.
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80 text-sm">Secure Private Vault</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80 text-sm">End-to-end encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80 text-sm">Secure Stripe billing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80 text-sm">Bank-based encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80 text-sm">Faith-centered data practices</span>
                </div>
              </div>
            </div>

            {/* Protected Data Vault */}
            <div className="glass-morphism p-8 rounded-xl border-2 border-blue-500/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Protected Data Vault</h3>
              </div>
              <p className="text-blue-300 font-semibold mb-4">Military-Grade Protection</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Encryption Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-400 font-semibold">AES-256 Active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Data Location</span>
                  <span className="text-white/80">Private Cloud</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Access Control</span>
                  <span className="text-white/80">Role-Based</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Ethics Compliance</span>
                  <span className="text-white/80">Faith-Aligned</span>
                </div>
              </div>

              <div className="bg-blue-500/10 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-sm">99.99% Uptime SLA</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-morphism p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-bold mb-1">AES-256</h4>
              <p className="text-white/60 text-sm">Military-grade encryption</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-bold mb-1">Zero-Trust</h4>
              <p className="text-white/60 text-sm">Role-based access control</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-white font-bold mb-1">Private Cloud</h4>
              <p className="text-white/60 text-sm">Dedicated infrastructure</p>
            </div>
            <div className="glass-morphism p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-bold mb-1">Faith-Aligned</h4>
              <p className="text-white/60 text-sm">Ethical data practices</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-white/60 text-center">
              Trusted by thousands of faith-based businesses
            </p>
            <div className="flex justify-center items-center mt-4 space-x-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/70">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/70">GDPR Ready</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/70">Faith-Centered</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white/70">99.99% License</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite AI Sanctuary Section */}
      <section className="relative z-40 py-20 px-6 lg:px-12 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <p className="text-gold-300 text-sm font-bold uppercase tracking-wider mb-4">
              THE MOVEMENT
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Elite AI Sanctuary
            </h2>
            <div className="glass-morphism p-8 rounded-xl mb-8">
              <p className="text-xl text-white/90 mb-6">
                Built for those who refuse to compromise on excellence, privacy, or values. Join
                thousands who've discovered their GOTTA GUY®.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="glass-morphism p-8 rounded-xl mb-12 max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a?format=webp&width=800"
                alt="SaintSal Logo"
                className="w-8 h-8 mr-3"
              />
              <div>
                <p className="text-gold-300 font-bold">SAINTSAL® • Cookin' Knowledge</p>
              </div>
            </div>
            <blockquote className="text-lg italic text-white/90 mb-6">
              "We built this for the builders, the believers, the ones who demand more than chatbots. This is
              enterprise AI with a soul, technology with values, innovation with integrity."
            </blockquote>
            <div className="text-center">
              <p className="text-gold-300 font-semibold">● SaintVisionAI™ Access</p>
              <p className="text-white/70 text-sm">Azure Cognitive Services • OpenAI GPT-4o — Premium Infrastructure</p>
            </div>
          </div>

          {/* Final CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleDashboardClick}
              className="bg-gold-500 hover:bg-gold-600 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:saintvision-glow cursor-pointer"
            >
              Join The Movement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/why");
              }}
              className="border border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 cursor-pointer"
            >
              Discover Your Guy
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
              <div>
                <div className="flex items-center mb-3">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a?format=webp&width=800"
                    alt="SaintVisionAI Logo"
                    className="w-6 h-6 mr-2"
                  />
                  <h4 className="text-white font-bold">SaintVisionAI™</h4>
                </div>
                <p className="text-white/60 text-sm">Cookin' Knowledge</p>
                <div className="mt-4 space-y-2">
                  <Link to="/console" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Console
                  </Link>
                  <Link to="/crm" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    CRM
                  </Link>
                  <Link to="/upgrade" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Upgrade
                  </Link>
                  <Link to="/hacp" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    HACP™ Patent
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-3">Platform</h4>
                <div className="space-y-2">
                  <Link to="/dashboard" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/partnertech" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    PartnerTech
                  </Link>
                  <Link to="/pricing" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Pricing
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-3">Legal & Support</h4>
                <div className="space-y-2">
                  <Link to="/help" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Help
                  </Link>
                  <Link to="/terms" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/data-processing" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Data Processing
                  </Link>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Link to="/privacy" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/gdpr" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    GDPR Compliance
                  </Link>
                  <Link to="/security" className="block text-white/70 hover:text-gold-300 text-sm transition-colors">
                    Security Policy
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">
                © 2024 Saint Vision Group LLC. All rights reserved. Powered Limited Partnership.
              </p>
              <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-white/40">
                <span>●GDPR • CCPA • SOC2</span>
                <span>●Enterprise Security</span>
                <span>●US Patent 10,394</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

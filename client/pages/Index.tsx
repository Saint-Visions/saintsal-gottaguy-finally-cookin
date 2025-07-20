import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserPlan } from "@/hooks/use-plan-protection";
import { supabase } from "@/lib/supabase";
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
} from "lucide-react";

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
  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleCRMToolsClick = () => {
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

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative">
      {/* Hero Background Image - Parallax Layer 2 */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.6) 0%, rgba(16, 22, 28, 0.5) 100%), 
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
            className="text-white/80 hover:text-gold-300 transition-colors flex items-center space-x-2"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F4f08aaff66374bf3bd72e740c34ecf44"
              alt="SaintSal + You"
              className="w-6 h-6 object-contain"
            />
            <span>Why Us</span>
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
              className="text-yellow-400 hover:text-yellow-300 text-xl font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent group hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
            >
              {isLoggedIn ? "Go to Dashboard" : "Start Cookin' Knowledge"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={handleCRMToolsClick}
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]"
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

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Crown,
  Users,
  Globe,
  Lock,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
  Building,
} from "lucide-react";

export default function Hacp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Main Background - Same as Homepage */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.85) 0%, rgba(16, 22, 28, 0.75) 100%), 
                           url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
              alt="SaintVisionAI Logo"
              className="w-16 h-16 object-contain mr-2"
            />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-dialien">
                SaintVisionAI™
              </h1>
              <p className="text-xs text-gold-300 -mt-1 font-medium">
                Cookin' Knowledge
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Home
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
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative z-40 py-24 px-6 text-center"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div
          className={`max-w-6xl mx-auto transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Patent Badge */}
          <div className="mb-8">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-6 py-2">
              <Shield className="w-5 h-5 mr-2" />
              U.S. Patent No. 10,290,222
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight font-dialien">
            <span className="saintvision-gradient-text">HACP™</span>
            <br />
            <span className="text-gold-300">
              Intelligent Interface Protocol
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            The patented{" "}
            <strong className="text-gold-300">
              Human-AI Connection Protocol
            </strong>{" "}
            that powers adaptive intelligence across every Saint Vision
            interface — from SaintSal's coaching flows to immersive therapy apps
            and enterprise dashboards.
          </p>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">May 2019</h3>
              <p className="text-white/70">Patent Issued</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gold-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">$10M-$75M</h3>
              <p className="text-white/70">Licensing Value</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Enforceable
              </h3>
              <p className="text-white/70">No PTAB Challenges</p>
            </div>
          </div>
        </div>
      </div>

      {/* What is HACP Section */}
      <div className="relative z-40 py-24">
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
                What is HACP™?
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                More than just a UX philosophy or prompting technique, HACP is a
                structured, adaptive, real-time escalation engine that tunes
                itself based on user behavior and responds with emotional
                intelligence.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Adaptive Intelligence
                    </h4>
                    <p className="text-white/70">
                      Monitors user ability, emotional state, task complexity,
                      and timing in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-gold-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Escalating Prompts
                    </h4>
                    <p className="text-white/70">
                      hint → cue → example → direct intervention based on user
                      needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Context-Aware Personas
                    </h4>
                    <p className="text-white/70">
                      Shifts from Companion → Boss Mode based on user
                      interaction patterns
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="glass-morphism p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-center mb-8 text-gold-300">
                  HACP Behavior Engine
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">User does well</span>
                    <ArrowRight className="w-4 h-4 text-gold-300" />
                    <span className="text-green-300 font-medium">
                      AI backs off
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/80">User hesitates</span>
                    <ArrowRight className="w-4 h-4 text-gold-300" />
                    <span className="text-yellow-300 font-medium">
                      AI ramps up
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/80">User fails</span>
                    <ArrowRight className="w-4 h-4 text-gold-300" />
                    <span className="text-red-300 font-medium">
                      AI transforms
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gold-500/10 border border-gold-500/20 rounded-lg">
                  <p className="text-center text-gold-300 font-medium">
                    💥 This escalation logic is patented, protected, and built
                    into every SaintSal-powered product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-40 py-24">
        <div
          className="max-w-4xl mx-auto px-6 text-center"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
            Experience HACP™ In Action
          </h2>

          <p className="text-xl text-white/80 mb-12">
            You're not running a bot. You're running a patented transformation
            engine that learns as it leads.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 text-xl font-bold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
            >
              Try SaintSal™ Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/pricing")}
              className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              View Enterprise Plans
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

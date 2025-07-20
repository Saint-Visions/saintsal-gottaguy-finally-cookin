import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Crown,
  MessageSquare,
  Sparkles,
  Heart,
  Users,
  Target,
  Award,
  Star,
} from "lucide-react";

export default function Why() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
        {/* Hero Background with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.95) 0%, rgba(16, 22, 28, 0.85) 100%), 
                              url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F9d79e8eee9904d09ad5b795268690be9?format=webp&width=800')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>

        {/* Circuit Pattern Overlay */}
        <div
          className="absolute inset-0 circuit-pattern opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        ></div>

        {/* Logo */}
        <div className="relative z-10 p-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Hero Section */}
        <div className="relative z-40 pt-20 pb-32">
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 saintvision-gradient-text font-dialien">
                Why Us?
              </h1>
              <p className="text-2xl md:text-3xl text-gold-300 mb-8 font-medium">
                The Technology That Sets Us Apart
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative z-40 py-24">
          <div
            className="max-w-6xl mx-auto px-6"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-dialien">
                  Built for Excellence
                </h2>
                <p className="text-xl text-white/90 mb-6 leading-relaxed">
                  We believe AI should elevate human potential, not replace it.
                  SaintSal™ was born from a vision to create enterprise AI that
                  truly understands your business needs.
                </p>
                <p className="text-lg text-white/80 mb-8">
                  Our faith-aligned approach ensures your values remain at the
                  center of every interaction, while our dual-AI architecture
                  delivers unmatched performance and reliability.
                </p>
                <div className="flex items-center gap-4">
                  <Heart className="w-8 h-8 text-red-400" />
                  <span className="text-gold-300 font-semibold text-lg">
                    Technology with Values
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="glass-morphism p-8 rounded-2xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fd3c43d5877f74c16bfeef4e051e328f5?format=webp&width=800"
                    alt="SaintSal Logo"
                    className="w-48 h-48 object-contain mx-auto"
                    style={{
                      filter:
                        "brightness(1.2) contrast(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="relative z-40 py-24 bg-charcoal-800/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
                Our Values
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Every feature, every decision, every line of code reflects our
                commitment to excellence and integrity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-morphism p-8 rounded-xl text-center">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Privacy First
                </h3>
                <p className="text-white/70">
                  Your data is sacred. Enterprise-grade encryption and
                  faith-aligned privacy policies protect what matters most.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-xl text-center">
                <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Innovation
                </h3>
                <p className="text-white/70">
                  Dual AI architecture combining GPT-4o and Azure Cognitive
                  Services for unprecedented performance.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-xl text-center">
                <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Community
                </h3>
                <p className="text-white/70">
                  Join thousands who've discovered their "GOTTA GUY" - the AI
                  companion that truly understands.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-xl text-center">
                <Crown className="w-16 h-16 text-gold-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Excellence
                </h3>
                <p className="text-white/70">
                  Premium infrastructure, 99.9% uptime, and enterprise-scale
                  reliability you can count on.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-xl text-center">
                <Target className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Purpose-Driven
                </h3>
                <p className="text-white/70">
                  Built for those who refuse to compromise on excellence,
                  privacy, or values in their AI solutions.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-xl text-center">
                <Award className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Proven Results
                </h3>
                <p className="text-white/70">
                  Trusted by enterprises worldwide for mission-critical AI
                  integration and CRM automation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Movement Section */}
        <div className="relative z-40 py-24">
          <div
            className="max-w-4xl mx-auto px-6 text-center"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold-300 font-dialien uppercase tracking-wider">
                The Movement
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold mb-8 saintvision-gradient-text font-dialien">
                Elite AI Sanctuary
              </h3>
            </div>

            <div className="glass-morphism p-12 rounded-2xl mb-12">
              <div className="flex justify-center mb-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F8b8e227910c949f0840aff608a3980a6?format=webp&width=800"
                  alt="SaintSal Logo"
                  className="w-20 h-20 object-contain"
                  style={{
                    filter:
                      "brightness(1.3) contrast(1.2) drop-shadow(0 0 16px rgba(255, 215, 0, 0.5))",
                  }}
                />
              </div>

              <h4 className="text-2xl font-bold text-gold-300 mb-6">
                SAINTSAL™ • Cookin' Knowledge
              </h4>

              <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed mb-8">
                "We built this for the builders, the believers, the ones who
                demand more than chatbots. This is enterprise AI with a soul,
                technology with values, innovation with integrity."
              </blockquote>

              <p className="text-lg text-white/80 mb-8">
                Built for those who refuse to compromise on excellence, privacy,
                or values. Join thousands who've discovered their{" "}
                <span className="text-gold-300 font-bold">GOTTA GUY™</span>.
              </p>

              <div className="inline-block glass-morphism px-8 py-4 rounded-full">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-gold-400" />
                  <span className="text-gold-300 font-semibold text-lg">
                    SaintVisionAI™ Access
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-2">
                  Azure Cognitive Services • OpenAI GPT-4o • Premium
                  Infrastructure
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="text-gold-400 hover:text-gold-300 text-xl font-semibold transition-all duration-300 bg-transparent border-2 border-gold-400/30 hover:border-gold-300/50 shadow-none hover:bg-gold-400/10 hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                >
                  Join the Movement
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>

              <Link to="/pricing">
                <Button
                  size="lg"
                  className="text-blue-400 hover:text-blue-300 text-lg font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                >
                  View Plans
                  <Crown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </AppLayout>
  );
}

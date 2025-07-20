import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  CheckCircle,
  Clock,
  Globe,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Rocket,
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
    <div className="w-full overflow-x-hidden">
      {/* Fixed Parallax Background */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.85) 0%, rgba(16, 22, 28, 0.75) 100%), 
                           url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F11ebec658d664a578b11a1525f79c9d3?format=webp&width=800')`,
          transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
        }}
      />

      {/* Circuit Pattern Overlay - Fixed */}
      <div
        className="fixed inset-0 circuit-pattern opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal-900/80 backdrop-blur-md border-b border-gold-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a?format=webp&width=800"
                alt="SaintVisionAI Logo"
                className="w-12 h-12 object-contain"
                style={{
                  filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
                }}
              />
              <div>
                <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
                  SaintVisionAI™
                </h1>
                <p className="text-xs text-gold-300 -mt-1">Cookin' Knowledge</p>
              </div>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div
              className={`transform transition-all duration-1500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-none">
                <span className="saintvision-gradient-text font-dialien">
                  What Separates
                </span>
                <br />
                <span className="text-white font-dialien">SaintVisionAI?</span>
              </h1>

              <p className="text-2xl md:text-3xl text-gold-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Because your business deserves AI that actually{" "}
                <span className="text-gold-300 font-bold">makes sense</span> —
                not another confusing ChatGPT clone
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg font-medium">No Learning Curve</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg font-medium">Instant Results</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg font-medium">Built For You</span>
                </div>
              </div>

              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 font-bold rounded-xl saintvision-glow-strong transform hover:scale-105 transition-all"
                >
                  Experience The Difference
                  <Rocket className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* PartnerTech AI Empire Section */}
        <section className="py-32 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-400/30">
                <span className="text-purple-300 font-semibold text-lg">
                  🚀 NEXT LEVEL UNLOCKED
                </span>
              </div>
              <h2 className="text-6xl font-bold mb-8 leading-tight">
                <span className="text-white">Ready to Build Your</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-dialien">
                  AI Empire?
                </span>
              </h2>
              <p className="text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                SaintVisionAI is just the beginning. For visionaries ready to
                scale,
                <span className="text-purple-300 font-bold">
                  {" "}
                  PartnerTech AI
                </span>{" "}
                awaits.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-purple-300">
                        Build AI-Powered Businesses
                      </h3>
                      <p className="text-white/80 text-lg">
                        Don't just use AI - become an AI entrepreneur. Create,
                        deploy, and monetize custom AI solutions for any
                        industry.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-blue-300">
                        Scale Without Limits
                      </h3>
                      <p className="text-white/80 text-lg">
                        From solopreneurs to enterprise empires. PartnerTech AI
                        grows with your vision, handling complexity while you
                        focus on expansion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Crown className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-purple-300">
                        Own Your Digital Territory
                      </h3>
                      <p className="text-white/80 text-lg">
                        Create proprietary AI ecosystems. Build intellectual
                        property. Establish lasting competitive advantages in
                        the AI economy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-500/20 p-12 rounded-3xl border border-purple-400/30 backdrop-blur-sm relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)] animate-pulse" />

                  <div className="text-center relative z-10">
                    <div className="w-32 h-32 flex items-center justify-center mx-auto mb-8 relative">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Feb193c763f874e969fd31fb75f9b76a5?format=webp&width=800"
                        alt="SaintVisionAI Logo"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                      "From User to AI Mogul"
                    </h3>
                    <p className="text-white/90 text-xl leading-relaxed mb-6">
                      Join the elite tier of entrepreneurs who don't just use AI
                      - they command it, scale with it, and build empires on it.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-purple-300">
                      <span className="text-sm font-semibold">POWERED BY</span>
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        PartnerTech AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action for PartnerTech */}
            <div className="text-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-12 border border-purple-400/20 backdrop-blur-sm">
              <h3 className="text-4xl font-bold mb-6">
                <span className="text-white">Ready to </span>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Think Bigger?
                </span>
              </h3>
              <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
                PartnerTech AI isn't for everyone. It's for the 1% who see AI
                not as a tool, but as the foundation of their digital empire.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/partnertech">
                  <Button
                    size="lg"
                    className="text-xl px-12 py-6 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 hover:from-purple-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold rounded-xl transform hover:scale-105 transition-all shadow-2xl shadow-purple-500/25"
                  >
                    Explore PartnerTech AI
                    <Crown className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                <div className="text-purple-300 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Enterprise-Level Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-8 text-red-400">
                  Tired of This?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Confusing AI Tools
                      </h3>
                      <p className="text-white/80">
                        Spending hours figuring out prompts instead of getting
                        work done
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Generic Responses
                      </h3>
                      <p className="text-white/80">
                        Getting answers that don't understand your business or
                        values
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">✗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Tech Frustration
                      </h3>
                      <p className="text-white/80">
                        Feeling left behind by technology that's supposed to
                        help
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 p-8 rounded-2xl border border-red-500/20 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-300">
                      "AI is too complicated for me..."
                    </h3>
                    <p className="text-white/70 text-lg">
                      Sound familiar? You're not alone. Most AI feels like it
                      was built by engineers, for engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="py-32 bg-gradient-to-r from-gold-900/20 to-gold-800/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8 saintvision-gradient-text font-dialien">
                Here's What We Built Instead
              </h2>
              <p className="text-2xl text-gold-200 max-w-4xl mx-auto">
                AI that feels like having your most trusted advisor right beside
                you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-morphism p-8 rounded-2xl text-center transform hover:scale-105 transition-all hover:saintvision-glow">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">
                  Just Talk Naturally
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  No prompts, no technical jargon. Ask questions like you're
                  talking to your best business partner.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-2xl text-center transform hover:scale-105 transition-all hover:saintvision-glow">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">
                  Knows Your Business
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Understands your industry, values, and goals. Every answer is
                  tailored specifically for you.
                </p>
              </div>

              <div className="glass-morphism p-8 rounded-2xl text-center transform hover:scale-105 transition-all hover:saintvision-glow">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">
                  Instant Clarity
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Get clear, actionable insights that you can implement
                  immediately. No confusion, just results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Life Benefits Section */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-8">
                <span className="saintvision-gradient-text font-dialien">
                  More Than Business
                </span>
                <br />
                <span className="text-white">This Changes Your Life</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-charcoal-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gold-300">
                        Get Your Time Back
                      </h3>
                      <p className="text-white/80 text-lg">
                        Stop wrestling with technology. Spend more time with
                        family, pursuing passions, living life.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-blue-300">
                        Build Real Confidence
                      </h3>
                      <p className="text-white/80 text-lg">
                        Make decisions with clarity. Lead with conviction. Feel
                        equipped for any challenge.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-green-300">
                        Stay True to Your Values
                      </h3>
                      <p className="text-white/80 text-lg">
                        Technology that aligns with your principles. Never
                        compromise who you are for what you need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gold-500/10 to-gold-600/10 p-12 rounded-3xl border border-gold-400/20 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8 saintvision-glow">
                      <Crown className="w-16 h-16 text-charcoal-900" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 saintvision-gradient-text">
                      "Finally, AI That Gets Me"
                    </h3>
                    <p className="text-white/90 text-xl leading-relaxed">
                      Join thousands who've discovered their GOTTA GUY™ - AI
                      that understands not just what you do, but who you are and
                      what matters to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-gradient-to-r from-charcoal-800/50 to-charcoal-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-8">
              <span className="saintvision-gradient-text font-dialien">
                Ready to Experience
              </span>
              <br />
              <span className="text-white">AI That Actually Works?</span>
            </h2>

            <p className="text-2xl text-gold-200 mb-12 leading-relaxed">
              Stop struggling with confusing tools. Start succeeding with AI
              built for real people with real goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 font-bold rounded-xl saintvision-glow-strong transform hover:scale-105 transition-all"
                >
                  Start Your Journey Now
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>

              <Link to="/help">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 border-gold-400 text-gold-300 hover:bg-gold-500/10 rounded-xl"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex justify-center space-x-8 text-white/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

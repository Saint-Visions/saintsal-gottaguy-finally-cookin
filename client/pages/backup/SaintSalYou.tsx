import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Check,
  X,
  Phone,
  Globe,
  Calendar,
  Users,
  Target,
  BarChart3,
  Mic,
  Smartphone,
  Chrome,
  Activity,
} from "lucide-react";

export default function SaintSalYou() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
        {/* Hero Background with Man in Suit */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(16, 22, 28, 0.8) 100%), 
                              url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F8f28786fcc8748078fe87c29c4295c89?format=webp&width=800')`,
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

        {/* Hero Section */}
        <div className="relative z-40 pt-32 pb-20">
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                <span className="saintvision-gradient-text font-dialien">
                  saintsal™
                </span>
                <span className="text-white font-dialien"> + you</span>
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium">
                Where Divine Execution Meets Real-World Results.
              </p>

              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
              >
                I'm Ready to Use Real AI
              </Button>
            </div>
          </div>
        </div>

        {/* What Separates Us Section */}
        <div className="relative z-40 py-24 bg-black/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-dialien">
                What Separates Us?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Heard of ChatGPT? Here's what actually works.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gold-300 mb-6">
                "I've Heart of ChatGPT... but What Do I Do With It?"
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Other platforms throw you in and say "Good luck." <br />
                <span className="text-gold-300 font-semibold">
                  SAINTSAL™
                </span>{" "}
                walks with you like a real assistant. Just talk to it like a
                friend – no prompts, no learning curve.
              </p>
            </div>
          </div>
        </div>

        {/* The Secret Sauce Section */}
        <div className="relative z-40 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
                The Secret Sauce: HACP™
              </h2>
              <p className="text-xl text-white/80 mb-8">
                HACP isn't just tech jargon – it's what makes SaintSal™
                intelligent.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gold-300 mb-6">
                  The Foundation:
                </h3>
                <ul className="space-y-4 text-lg text-white/80">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Two brains (GPT + Azure) work together
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    They verify each other's answers
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    You get clean, confident responses
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Zero hallucinations through dual validation
                  </li>
                </ul>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gold-300 mb-4">
                    But Here's the REAL Magic:
                  </h4>
                  <p className="text-lg text-white/80 leading-relaxed">
                    SaintSal learns what YOU need to build – a business, a
                    resume, a family schedule, or an empire – and actually GETS
                    IT DONE.
                  </p>
                </div>
              </div>

              <div className="glass-morphism p-8 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-6">
                  While you search and learn, your SaintSal cognitive companion
                  adapts with you everywhere you go:
                </h4>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <Brain className="w-4 h-4 text-blue-400 mr-3" />
                    <span className="font-semibold">Desktop</span> - Always in
                    your corner
                  </li>
                  <li className="flex items-center">
                    <Smartphone className="w-4 h-4 text-green-400 mr-3" />
                    <span className="font-semibold">Mobile</span> - Always in
                    your pocket
                  </li>
                  <li className="flex items-center">
                    <Chrome className="w-4 h-4 text-red-400 mr-3" />
                    <span className="font-semibold">Chrome Extension</span> -
                    Sticky, always working
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-gold-400 mr-3" />
                    <span className="font-semibold">Real Action</span> - Not
                    just advice, but execution
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-gold-500/10 rounded-lg border border-gold-500/30">
                  <p className="text-gold-300 font-semibold">
                    Continue to grow your vision without limitation. ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="relative z-40 py-24 bg-black/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
                SaintSal™ vs. The Rest
              </h2>
            </div>

            <div className="glass-morphism rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 gap-0">
                <div className="p-6 border-r border-white/10">
                  <h3 className="text-xl font-bold text-gold-300 mb-4">
                    Feature
                  </h3>
                </div>
                <div className="p-6 border-r border-white/10 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Other AI Bots 🤖
                  </h3>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gold-300 mb-4">
                    SAINTSAL™ 🔥
                  </h3>
                </div>

                {[
                  {
                    feature: "Dual Engine",
                    others: "Single AI",
                    saintsal: "GPT-4 + Azure",
                  },
                  {
                    feature: "Built-in Support",
                    others: "Good luck",
                    saintsal: "24/7 SaintSal™",
                  },
                  {
                    feature: "CRM Tools",
                    others: "None",
                    saintsal: "Lead + task routing",
                  },
                  {
                    feature: "Actions",
                    others: "Just chat",
                    saintsal: "Scheduling, Forms, CRM",
                  },
                  {
                    feature: "Understands You",
                    others: "Generic responses",
                    saintsal: "Learns your biz + goals",
                  },
                ].map((row, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4 border-r border-white/10 border-t border-white/10">
                      <span className="font-medium text-white">
                        {row.feature}
                      </span>
                    </div>
                    <div className="p-4 border-r border-white/10 border-t border-white/10 text-center">
                      <div className="flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-white/70">{row.others}</span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-white/10 text-center">
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-green-300 font-medium">
                          {row.saintsal}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* No Team No Problem Section */}
        <div className="relative z-40 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-dialien">
                No Team? No Problem.
              </h2>
              <p className="text-xl text-white/80 mb-8">
                You don't need to be tech-savvy or learn AI. <br />
                You just need to show up. SAINTSAL™ will handle the rest.
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-2xl text-center max-w-4xl mx-auto">
              <p className="text-lg text-white/80 mb-6">
                Need help? ✉️ support@saintvisionai.com
              </p>

              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
              >
                Now I Get It — Let's Go
              </Button>
            </div>
          </div>
        </div>

        {/* Real Examples Section */}
        <div className="relative z-40 py-24 bg-black/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 saintvision-gradient-text font-dialien">
                Real Examples
              </h2>
              <p className="text-xl text-white/80">
                See SAINTSAL™ in action across different industries
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Athena
                </h3>
                <p className="text-white/70 text-sm">
                  Elder care & medical support automation
                </p>
              </div>

              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-400 mb-4">SVG</h3>
                <p className="text-white/70 text-sm">
                  Finance + real estate automation
                </p>
              </div>

              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-400 mb-4">
                  PartnerTech.ai
                </h3>
                <p className="text-white/70 text-sm">
                  Chrome Extension + CRM outreach
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative z-40 py-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(16, 22, 28, 0.9) 100%), 
                                url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fde8d090603f74e3eb3fa9bc8441dc6b1?format=webp&width=800')`,
            }}
          ></div>

          <div className="relative z-50 max-w-6xl mx-auto px-6 text-center">
            <div className="mb-12">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                <span className="saintvision-gradient-text font-dialien">
                  saintsal™
                </span>
                <span className="text-white font-dialien"> + you</span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-white">
                Ready to Experience Real AI?
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
              >
                Let's Roll
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                See Plans
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AppLayout>
  );
}

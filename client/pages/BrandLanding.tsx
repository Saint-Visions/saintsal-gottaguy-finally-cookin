import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Heart,
  DollarSign,
  Scale,
  Crown,
  Shield,
  Mic,
  FileText,
  Calendar,
  TrendingUp,
  Activity,
  Search,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Building,
  Globe,
  Zap,
  Award,
  Star,
} from "lucide-react";

interface BrandConfig {
  id: string;
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    logo: string;
  };
  specialization: string;
  features: string[];
  complianceRequired?: string[];
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  skillset: string;
  features: string[];
  recommended?: boolean;
  icon: string;
  compliance?: string[];
}

const BRAND_CONTENT = {
  partnertech: {
    hero: {
      title: "PartnerTech.ai",
      subtitle: "CRM + Automation Suite",
      description:
        "Transform your sales process with AI-powered CRM automation. Streamline lead management, automate follow-ups, and close more deals with intelligent sales assistants.",
      cta: "Start Automating Sales",
      features: [
        "Automated Lead Nurturing",
        "Smart Pipeline Management",
        "Voice-Enabled Sales Calls",
        "Quote Generation",
        "Customer Success Automation",
      ],
    },
    benefits: [
      {
        icon: TrendingUp,
        title: "Boost Sales Performance",
        description:
          "AI-driven insights and automation increase close rates by 40%",
      },
      {
        icon: Users,
        title: "Enhanced Customer Experience",
        description:
          "24/7 responsive AI agents provide instant customer support",
      },
      {
        icon: Zap,
        title: "Workflow Automation",
        description:
          "Eliminate manual tasks and focus on high-value activities",
      },
    ],
  },
  athena: {
    hero: {
      title: "Athena",
      subtitle: "Compassionate Cognitive Healthcare Agent",
      description:
        "Experience the future of healthcare assistance with Athena, your AI companion designed for healthcare professionals and patients. HIPAA-compliant and built with compassion.",
      cta: "Meet Athena",
      features: [
        "HIPAA-Compliant Operations",
        "Medical Documentation Review",
        "Appointment Scheduling",
        "Wellness Monitoring",
        "Compassionate Patient Care",
      ],
    },
    benefits: [
      {
        icon: Heart,
        title: "Compassionate Care",
        description:
          "Designed with empathy to support both patients and providers",
      },
      {
        icon: Shield,
        title: "HIPAA Compliant",
        description:
          "Full compliance with healthcare privacy and security standards",
      },
      {
        icon: Activity,
        title: "Wellness Focused",
        description: "Proactive health monitoring and wellness recommendations",
      },
    ],
  },
  ebytech: {
    hero: {
      title: "EbyTech",
      subtitle: "Compliance, Finance & Strategy Agent",
      description:
        "Navigate complex financial regulations and strategic decisions with EbyTech, your AI-powered compliance and finance specialist. SOX and FINRA compliant.",
      cta: "Enhance Compliance",
      features: [
        "SOX & FINRA Compliance",
        "Financial Document Analysis",
        "Risk Assessment",
        "Strategic Planning",
        "Regulatory Reporting",
      ],
    },
    benefits: [
      {
        icon: Shield,
        title: "Regulatory Compliance",
        description:
          "Stay compliant with SOX, FINRA, and financial regulations",
      },
      {
        icon: DollarSign,
        title: "Financial Intelligence",
        description:
          "Advanced financial analysis and strategic recommendations",
      },
      {
        icon: TrendingUp,
        title: "Strategic Insights",
        description: "Data-driven business strategy and market analysis",
      },
    ],
  },
  svtlegal: {
    hero: {
      title: "SVTLegal.ai",
      subtitle: "Legal Navigator Agent",
      description:
        "Revolutionize your legal practice with AI-powered document review, research, and case analysis. Built for lawyers, by legal technology experts.",
      cta: "Navigate Legal Work",
      features: [
        "Legal Document Review",
        "Case Research & Analysis",
        "Contract Compliance",
        "Attorney-Client Privilege",
        "Legal Writing Assistance",
      ],
    },
    benefits: [
      {
        icon: Scale,
        title: "Legal Expertise",
        description:
          "AI trained on legal documents and case law for accurate analysis",
      },
      {
        icon: FileText,
        title: "Document Intelligence",
        description: "Advanced contract and legal document review capabilities",
      },
      {
        icon: Search,
        title: "Research Acceleration",
        description: "Rapid legal research with comprehensive case analysis",
      },
    ],
  },
};

export default function BrandLanding() {
  const [brandConfig, setBrandConfig] = useState<BrandConfig | null>(null);
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadBrandConfig();
  }, []);

  const loadBrandConfig = async () => {
    try {
      const response = await fetch("/api/brand/config");
      const data = await response.json();
      setBrandConfig(data.brand);
      setTemplates(data.templates);
      setIsLoaded(true);
    } catch (error) {
      console.error("Failed to load brand config:", error);
      setIsLoaded(true);
    }
  };

  const getBrandContent = () => {
    if (!brandConfig) return null;
    return BRAND_CONTENT[brandConfig.id as keyof typeof BRAND_CONTENT];
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      Users,
      Heart,
      DollarSign,
      Scale,
      TrendingUp,
      Activity,
      Search,
      FileText,
      Shield,
      Building,
    };
    return icons[iconName as keyof typeof icons] || Users;
  };

  if (!isLoaded || !brandConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4" />
          <p className="text-white/70">Loading platform...</p>
        </div>
      </div>
    );
  }

  const brandContent = getBrandContent();
  const customTheme = {
    primary: brandConfig.theme.primary,
    secondary: brandConfig.theme.secondary,
    accent: brandConfig.theme.accent,
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${customTheme.secondary} 0%, ${customTheme.primary}20 100%)`,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${customTheme.primary} 2px, transparent 2px), radial-gradient(circle at 75px 75px, ${customTheme.primary} 2px, transparent 2px)`,
          backgroundSize: "100px 100px",
          backgroundPosition: "0 0, 50px 50px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={brandConfig.theme.logo}
                alt={brandConfig.name}
                className="w-10 h-10 rounded-lg"
                onError={e => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${
                    brandConfig.name
                  }&backgroundColor=${customTheme.primary.replace("#", "")}`;
                }}
              />
              <div>
                <h1
                  className="text-xl font-bold"
                  style={{ color: customTheme.primary }}
                >
                  {brandConfig.name}
                </h1>
                <p className="text-sm text-white/60">
                  {brandConfig.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/10 text-white border-white/20">
                <Crown className="w-3 h-3 mr-1" />
                HACP™ Powered
              </Badge>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => (window.location.href = "/create-agent")}
              >
                Create Agent
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div
              className={`transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span style={{ color: customTheme.primary }}>
                  {brandContent?.hero.title}
                </span>
              </h1>
              <p
                className="text-2xl md:text-3xl mb-4 font-medium"
                style={{ color: customTheme.accent }}
              >
                {brandContent?.hero.subtitle}
              </p>
              <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                {brandContent?.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: customTheme.primary,
                    color: customTheme.secondary,
                  }}
                  onClick={() => (window.location.href = "/create-agent")}
                >
                  {brandContent?.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
                  onClick={() => (window.location.href = "/console")}
                >
                  View Demo
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-5 gap-6 mb-16">
                {brandContent?.hero.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <CheckCircle
                      className="w-6 h-6 mx-auto mb-2"
                      style={{ color: customTheme.primary }}
                    />
                    <p className="text-sm font-medium text-center">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose{" "}
              <span style={{ color: customTheme.primary }}>
                {brandConfig.name}
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {brandContent?.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{ backgroundColor: `${customTheme.primary}20` }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: customTheme.primary }}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Agent Templates Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Specialized{" "}
              <span style={{ color: customTheme.primary }}>AI Agents</span>
            </h2>
            <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">
              Choose from our curated collection of pre-configured agents
              designed for your industry
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template, index) => {
                const Icon = getIconComponent(template.icon);
                return (
                  <Card
                    key={index}
                    className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105 ${
                      template.recommended ? "ring-2" : "hover:border-white/20"
                    }`}
                    style={{
                      ringColor: template.recommended
                        ? customTheme.primary
                        : "transparent",
                    }}
                    onClick={() =>
                      (window.location.href = `/create-agent?template=${template.id}`)
                    }
                  >
                    <CardContent className="p-8">
                      {template.recommended && (
                        <div className="flex justify-center mb-4">
                          <Badge
                            className="font-semibold"
                            style={{
                              backgroundColor: customTheme.primary,
                              color: customTheme.secondary,
                            }}
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        </div>
                      )}

                      <div
                        className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center"
                        style={{ backgroundColor: `${customTheme.primary}20` }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: customTheme.primary }}
                        />
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-center">
                        {template.name}
                      </h3>
                      <p className="text-white/80 text-center mb-6">
                        {template.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              style={{ color: customTheme.primary }}
                            />
                            <span className="text-white/90">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {template.compliance && (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {template.compliance.map(comp => (
                            <Badge
                              key={comp}
                              variant="secondary"
                              className="text-xs bg-green-500/20 text-green-300 border-green-500/30"
                            >
                              {comp}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* HACP™ Section */}
        <section className="py-20 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-12">
              <Crown
                className="w-16 h-16 mx-auto mb-6"
                style={{ color: customTheme.primary }}
              />
              <h2 className="text-3xl font-bold mb-6">
                Powered by HACP™ Technology
              </h2>
              <p className="text-lg text-white/80 mb-6">
                All {brandConfig.name} agents are built with our patented
                Hierarchical Agent Control Protocol (HACP™), ensuring
                intelligent escalation, compliance, and the highest standards of
                AI behavior management.
              </p>
              <Badge className="bg-white/10 text-white border-white/30 text-sm">
                US Patent 10,290,222
              </Badge>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started with{" "}
              <span style={{ color: customTheme.primary }}>
                {brandConfig.name}
              </span>
              ?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Create your first AI agent in minutes and experience the future of
              {brandConfig.specialization === "healthcare"
                ? " healthcare"
                : brandConfig.specialization === "finance"
                ? " financial services"
                : brandConfig.specialization === "legal"
                ? " legal technology"
                : " business automation"}
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 font-semibold"
                style={{
                  backgroundColor: customTheme.primary,
                  color: customTheme.secondary,
                }}
                onClick={() => (window.location.href = "/create-agent")}
              >
                Create Your Agent Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src={brandConfig.theme.logo}
                alt={brandConfig.name}
                className="w-8 h-8 rounded"
                onError={e => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${brandConfig.name}`;
                }}
              />
              <span className="font-semibold">{brandConfig.name}</span>
            </div>
            <div className="text-sm text-white/60">
              Powered by SaintVision AI • HACP™ Technology • US Patent
              10,290,222
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

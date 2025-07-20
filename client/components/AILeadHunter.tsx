import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Target,
  Brain,
  Zap,
  Users,
  TrendingUp,
  Search,
  Mail,
  Phone,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  MessageSquare,
} from "lucide-react";

interface LeadIntent {
  score: number;
  signals: string[];
  urgency: "low" | "medium" | "high";
  category: string;
}

interface DetectedLead {
  id: string;
  name: string;
  company: string;
  title: string;
  email?: string;
  phone?: string;
  location: string;
  intent: LeadIntent;
  source: string;
  detectedAt: string;
  status: "new" | "contacted" | "qualified" | "converted";
}

export function AILeadHunter() {
  const [isHunting, setIsHunting] = useState(true);
  const [detectedLeads, setDetectedLeads] = useState<DetectedLead[]>([]);
  const [huntingStats, setHuntingStats] = useState({
    totalScanned: 2847,
    leadsFound: 23,
    highIntent: 8,
    qualified: 5,
  });

  // Simulate real-time lead detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHunting && Math.random() > 0.7) {
        const newLead = generateMockLead();
        setDetectedLeads(prev => [newLead, ...prev.slice(0, 9)]);
        setHuntingStats(prev => ({
          ...prev,
          totalScanned: prev.totalScanned + Math.floor(Math.random() * 10 + 1),
          leadsFound: prev.leadsFound + 1,
          highIntent:
            newLead.intent.urgency === "high"
              ? prev.highIntent + 1
              : prev.highIntent,
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isHunting]);

  const generateMockLead = (): DetectedLead => {
    const companies = [
      "TechCorp",
      "DataSystems",
      "CloudVentures",
      "InnovateLabs",
      "ScaleTech",
    ];
    const names = [
      "Sarah Johnson",
      "Mike Chen",
      "Jessica Williams",
      "David Rodriguez",
      "Amanda Davis",
    ];
    const titles = [
      "VP of Sales",
      "Marketing Director",
      "CEO",
      "Operations Manager",
      "Business Development",
    ];
    const locations = [
      "San Francisco, CA",
      "Austin, TX",
      "New York, NY",
      "Seattle, WA",
      "Denver, CO",
    ];
    const sources = [
      "LinkedIn",
      "Company Website",
      "Industry Report",
      "Social Media",
      "Web Scraping",
    ];

    const urgencies: Array<"low" | "medium" | "high"> = [
      "low",
      "medium",
      "high",
    ];
    const urgency = urgencies[Math.floor(Math.random() * urgencies.length)];

    return {
      id: `lead_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      email:
        Math.random() > 0.5
          ? `${names[0]
              .toLowerCase()
              .replace(" ", ".")}@${companies[0].toLowerCase()}.com`
          : undefined,
      phone:
        Math.random() > 0.6
          ? `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
              Math.random() * 9000 + 1000,
            )}`
          : undefined,
      location: locations[Math.floor(Math.random() * locations.length)],
      intent: {
        score: Math.floor(Math.random() * 40 + 60),
        signals: getIntentSignals(urgency),
        urgency,
        category: "B2B Software",
      },
      source: sources[Math.floor(Math.random() * sources.length)],
      detectedAt: new Date().toISOString(),
      status: "new",
    };
  };

  const getIntentSignals = (urgency: "low" | "medium" | "high") => {
    const signals = {
      high: [
        "Visited pricing page 3x",
        "Downloaded whitepaper",
        "Attended webinar",
        "Job posting for similar role",
      ],
      medium: [
        "Company growth 50%+",
        "Recent funding round",
        "Competitor mentions",
      ],
      low: [
        "Industry research",
        "General website visit",
        "Social media engagement",
      ],
    };
    return signals[urgency];
  };

  const addToGHL = async (lead: DetectedLead) => {
    try {
      // Call our GHL integration
      const response = await fetch("/api/crm-actions?action=create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: lead.name.split(" ")[0],
          lastName: lead.name
            .split(" ")
            .slice(1)
            .join(" "),
          email: lead.email,
          phone: lead.phone,
          notes: `Intent Score: ${
            lead.intent.score
          }% | Signals: ${lead.intent.signals.join(", ")} | Source: ${
            lead.source
          }`,
          source: "PartnerTech AI Hunter",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setDetectedLeads(prev =>
          prev.map(l => (l.id === lead.id ? { ...l, status: "contacted" } : l)),
        );
      }
    } catch (error) {
      console.error("Error adding lead to GHL:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hunting Status */}
      <Card className="bg-charcoal-800 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isHunting ? "bg-green-400 animate-pulse" : "bg-gray-400"
              }`}
            />
            <h3 className="text-lg font-semibold text-white">
              🎯 AI Lead Hunter
            </h3>
            <Badge
              variant={isHunting ? "default" : "secondary"}
              className="bg-green-500/20 text-green-300"
            >
              {isHunting ? "Hunting" : "Paused"}
            </Badge>
          </div>

          <Button
            onClick={() => setIsHunting(!isHunting)}
            variant={isHunting ? "destructive" : "default"}
            size="sm"
            className={
              isHunting
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {isHunting ? "Pause Hunt" : "Start Hunting"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">
              {huntingStats.totalScanned.toLocaleString()}
            </div>
            <div className="text-sm text-white/70">Profiles Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">
              {huntingStats.leadsFound}
            </div>
            <div className="text-sm text-white/70">Leads Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-300">
              {huntingStats.highIntent}
            </div>
            <div className="text-sm text-white/70">High Intent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-300">
              {huntingStats.qualified}
            </div>
            <div className="text-sm text-white/70">Qualified</div>
          </div>
        </div>
      </Card>

      {/* Recent Leads */}
      <Card className="bg-charcoal-800 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            Intent Signals Detected
          </h3>
          <Badge className="bg-purple-500/20 text-purple-300">Live Feed</Badge>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {detectedLeads.map(lead => (
            <div
              key={lead.id}
              className="bg-charcoal-700 border border-white/10 rounded-lg p-4 hover:border-gold-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{lead.name}</h4>
                    <Badge
                      variant="outline"
                      className={`${
                        lead.intent.urgency === "high"
                          ? "border-red-500 text-red-300"
                          : lead.intent.urgency === "medium"
                          ? "border-orange-500 text-orange-300"
                          : "border-gray-500 text-gray-300"
                      }`}
                    >
                      {lead.intent.score}% Intent
                    </Badge>
                  </div>

                  <div className="text-sm text-white/70 space-y-1">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {lead.title} at {lead.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {lead.location}
                      </span>
                    </div>

                    {lead.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {lead.email}
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-purple-300 font-medium">
                        Signals:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {lead.intent.signals.slice(0, 2).map((signal, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-purple-500/30 text-purple-300"
                          >
                            {signal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => addToGHL(lead)}
                    disabled={lead.status !== "new"}
                    className="bg-gold-500 hover:bg-gold-400 text-charcoal-900"
                  >
                    {lead.status === "new" ? (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        Add to CRM
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Added
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white/70"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hunt Configuration */}
      <Card className="bg-charcoal-800 border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-400" />
          Hunt Settings
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Target Industries
            </label>
            <div className="flex flex-wrap gap-2">
              {["SaaS", "FinTech", "HealthTech", "E-commerce"].map(industry => (
                <Badge key={industry} className="bg-blue-500/20 text-blue-300">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Company Size
            </label>
            <div className="flex flex-wrap gap-2">
              {["10-50", "51-200", "201-1000"].map(size => (
                <Badge key={size} className="bg-green-500/20 text-green-300">
                  {size} employees
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Intent Threshold
            </label>
            <Badge className="bg-orange-500/20 text-orange-300">
              60%+ Intent Score
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

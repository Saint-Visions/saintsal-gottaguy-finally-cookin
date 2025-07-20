import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  StickyNote,
  Target,
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Eye,
  Plus,
  X,
} from "lucide-react";

interface LeadNote {
  id: string;
  content: string;
  confidence: number;
  source: string;
  timestamp: string;
  status: "new" | "processing" | "qualified" | "dismissed";
  metadata: {
    company?: string;
    person?: string;
    intent?: string;
    urgency?: "low" | "medium" | "high";
  };
}

export function StickyLeadMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [leadNotes, setLeadNotes] = useState<LeadNote[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Simulate real-time lead detection
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNote = generateLeadNote();
        setLeadNotes(prev => [newNote, ...prev.slice(0, 4)]);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const generateLeadNote = (): LeadNote => {
    const leadSources = [
      "LinkedIn Activity",
      "Website Visitor",
      "Email Engagement",
      "Social Media",
      "Search Behavior",
      "Competitor Analysis",
    ];

    const companies = [
      "TechCorp Solutions",
      "DataDriven Inc",
      "CloudScale Systems",
      "InnovateNow Labs",
      "Growth Partners",
    ];

    const intents = [
      "Looking for CRM solution",
      "Researching automation tools",
      "Comparing pricing",
      "Downloading whitepapers",
      "Attending demos",
      "Job posting for sales role",
    ];

    const urgencies: Array<"low" | "medium" | "high"> = [
      "low",
      "medium",
      "high",
    ];

    const source = leadSources[Math.floor(Math.random() * leadSources.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const intent = intents[Math.floor(Math.random() * intents.length)];
    const urgency = urgencies[Math.floor(Math.random() * urgencies.length)];

    return {
      id: `note_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 6)}`,
      content: `${source}: ${company} - ${intent}`,
      confidence: Math.floor(Math.random() * 30 + 70),
      source: source,
      timestamp: new Date().toISOString(),
      status: "new",
      metadata: {
        company,
        intent,
        urgency,
      },
    };
  };

  const handleNoteAction = (noteId: string, action: "qualify" | "dismiss") => {
    setLeadNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? {
              ...note,
              status: action === "qualify" ? "qualified" : "dismissed",
            }
          : note,
      ),
    );

    if (action === "qualify") {
      // Auto-add to GHL CRM
      const note = leadNotes.find(n => n.id === noteId);
      if (note) {
        addToGHL(note);
      }
    }
  };

  const addToGHL = async (note: LeadNote) => {
    try {
      const response = await fetch("/api/crm-actions?action=create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Lead",
          lastName: "Prospect",
          notes: `${note.content} | Confidence: ${note.confidence}% | Source: ${note.source}`,
          source: "StickyNote AI Monitor",
        }),
      });

      if (response.ok) {
        console.log("Lead added to GHL from StickyNote");
      }
    } catch (error) {
      console.error("Error adding lead to GHL:", error);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 shadow-lg"
        >
          <StickyNote className="w-6 h-6" />
        </Button>
        {leadNotes.filter(n => n.status === "new").length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {leadNotes.filter(n => n.status === "new").length}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-charcoal-800/95 border-purple-500/30 backdrop-blur-sm">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <StickyNote className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Lead Monitor</h3>
              <div
                className={`w-2 h-2 rounded-full ${
                  isMonitoring ? "bg-green-400 animate-pulse" : "bg-gray-400"
                }`}
              />
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
                className="w-8 h-8 p-0 text-white/70 hover:text-purple-300"
              >
                {isMonitoring ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 p-0 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <Badge
              variant={isMonitoring ? "default" : "secondary"}
              className={
                isMonitoring
                  ? "bg-green-500/20 text-green-300"
                  : "bg-gray-500/20 text-gray-300"
              }
            >
              {isMonitoring ? "🎯 Monitoring" : "⏸️ Paused"}
            </Badge>
            <span className="text-sm text-white/70 ml-2">
              {leadNotes.filter(n => n.status === "new").length} new signals
            </span>
          </div>

          {/* Lead Notes */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {leadNotes
              .filter(note => note.status !== "dismissed")
              .map(note => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg border transition-all ${
                    note.status === "new"
                      ? "bg-purple-500/10 border-purple-500/30"
                      : note.status === "qualified"
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-gray-500/10 border-gray-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">
                        {note.metadata.company}
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        {note.metadata.intent}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        note.metadata.urgency === "high"
                          ? "border-red-500 text-red-300"
                          : note.metadata.urgency === "medium"
                          ? "border-orange-500 text-orange-300"
                          : "border-gray-500 text-gray-300"
                      }`}
                    >
                      {note.confidence}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-300">
                      {note.source}
                    </span>

                    {note.status === "new" && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          onClick={() => handleNoteAction(note.id, "qualify")}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-6"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleNoteAction(note.id, "dismiss")}
                          className="text-white/50 hover:text-red-300 text-xs px-2 py-1 h-6"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {note.status === "qualified" && (
                      <Badge className="bg-green-500/20 text-green-300 text-xs">
                        ✓ Added to CRM
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

            {leadNotes.length === 0 && isMonitoring && (
              <div className="text-center py-6 text-white/50">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Scanning for leads...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Powered by SaintSal AI</span>
              <span>
                {leadNotes.filter(n => n.status === "qualified").length}{" "}
                qualified today
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

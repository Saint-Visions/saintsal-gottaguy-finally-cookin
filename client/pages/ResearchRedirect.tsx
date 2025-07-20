import React, { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Globe,
  Crown,
} from "lucide-react";

export default function ResearchRedirect() {
  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      window.open("https://saintvisiontech.com", "_blank");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.open("https://saintvisiontech.com", "_blank");
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen bg-charcoal-900 text-white">
        <div className="text-center max-w-lg p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/30">
            <GraduationCap className="w-10 h-10 text-gold-300" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold saintvision-gradient-text mb-2">
              SVT Institute of AI
            </h1>
            <h2 className="text-xl text-white/80 mb-4">
              Research & Development
            </h2>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Globe className="w-3 h-3 mr-1" />
                External Site
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Research Hub
              </Badge>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
            <p className="text-white/70 mb-4">
              You're being redirected to our research and development portal at{" "}
              <span className="text-gold-300 font-semibold">
                saintvisiontech.com
              </span>
            </p>

            <div className="flex items-center justify-center space-x-2 text-sm text-white/50 mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Auto-redirecting in 3 seconds...</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRedirect}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="lg"
            >
              <span>Visit SVT Research Portal</span>
              <ArrowRight className="w-4 h-4 ml-2" />
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full border-white/20 text-white/70 hover:bg-white/5"
            >
              Go Back
            </Button>
          </div>

          <div className="mt-8 text-xs text-white/40">
            <p>SaintVision Technologies Research Division</p>
            <p>Advanced AI Research & Development</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

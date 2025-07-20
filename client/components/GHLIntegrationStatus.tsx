import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Building2,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface GHLLocation {
  id: string;
  name: string;
  domain?: string;
  contactsCount?: number;
  isActive?: boolean;
}

export function GHLIntegrationStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<GHLLocation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Your known locations from the screenshot
  const knownLocations: GHLLocation[] = [
    { id: "saint-vision-eyt", name: "Saint Vision EYT", isActive: true },
    { id: "alpha-realty", name: "Alpha Realty", isActive: true },
    { id: "saltco", name: "SaltCo", isActive: true },
  ];

  const checkConnection = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Test the API connection
      const response = await fetch("/api/crm-actions?action=get-locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setIsConnected(true);
        setLocations(result.locations || knownLocations);
      } else {
        setError(result.error || "Connection failed");
        setLocations(knownLocations); // Fallback to known locations
      }
    } catch (err) {
      setError("Network error");
      setLocations(knownLocations); // Fallback to known locations
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="bg-charcoal-800 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            GoHighLevel Integration
          </h3>
          <p className="text-white/70 text-sm">
            API Key: pit-2f264858-06c7-402c-9ff2-59124bfff8f8
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          ) : isConnected ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}

          <Badge
            variant={isConnected ? "default" : "destructive"}
            className={
              isConnected
                ? "bg-green-500/20 text-green-300 border-green-500/30"
                : "bg-red-500/20 text-red-300 border-red-500/30"
            }
          >
            {isLoading
              ? "Connecting..."
              : isConnected
              ? "Connected"
              : "Disconnected"}
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={checkConnection}
            disabled={isLoading}
            className="text-white/50 hover:text-gold-300"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Locations */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-gold-300" />
          Your GHL Locations
        </h4>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map(location => (
            <div
              key={location.id}
              className="bg-charcoal-700 border border-white/10 rounded-lg p-4 hover:border-gold-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-white">{location.name}</h5>
                <Badge
                  variant={location.isActive ? "default" : "secondary"}
                  className={
                    location.isActive
                      ? "bg-green-500/20 text-green-300"
                      : "bg-gray-500/20 text-gray-300"
                  }
                >
                  {location.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-white/70">
                    <Users className="w-4 h-4 mr-1" />
                    Contacts
                  </div>
                  <span className="text-white">
                    {location.contactsCount || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-white/70">
                    <Calendar className="w-4 h-4 mr-1" />
                    Appointments
                  </div>
                  <span className="text-white">—</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-white/70">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Opportunities
                  </div>
                  <span className="text-white">—</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 border-gold-500/30 text-gold-300 hover:bg-gold-500/10"
                onClick={() =>
                  window.open(
                    `https://app.gohighlevel.com/v2/location/dashboard`,
                    "_blank",
                  )
                }
              >
                Open in GHL
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Features */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">
          🤖 SaintSal AI Integration Features
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">AI can create contacts</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Real-time webhook sync</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Conversation logging</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Follow-up automation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Brain,
  Crown,
  Send,
  Mic,
  Settings,
  Sparkles
} from "lucide-react";

interface SaintSalCompanionProps {
  className?: string;
  contextData?: {
    activeTile?: string;
    metrics?: any;
    suggestions?: string[];
  };
}

const SaintSalCompanion: React.FC<SaintSalCompanionProps> = ({
  className = "",
  contextData
}) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <Card className={`bg-charcoal-800/50 border-gold-500/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gold-500">
          <Crown className="w-5 h-5" />
          SaintSal™ Companion
          <Badge variant="secondary" className="bg-gold-500/20 text-gold-300">
            Elite AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Brain className="w-4 h-4" />
          Your personal AI business strategist
        </div>

        <div className="space-y-3">
          <Textarea
            placeholder="Ask SaintSal anything about your business strategy..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-charcoal-900/50 border-charcoal-600 text-white placeholder-white/40 min-h-[100px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleListening}
              className={`border-gold-500/20 ${
                isListening
                  ? "bg-gold-500/20 text-gold-300"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Mic className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gold-500/20 text-white/60 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="pt-3 border-t border-charcoal-600">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="w-3 h-3" />
            Powered by SaintVisionAI Enterprise Technology
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SaintSalCompanion;

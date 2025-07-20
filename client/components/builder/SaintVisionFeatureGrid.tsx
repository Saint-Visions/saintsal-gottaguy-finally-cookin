'use client';

import React from 'react';
import { Brain, Shield, Crown, Zap, Users, Globe } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface SaintVisionFeatureGridProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
}

const iconMap = {
  brain: Brain,
  shield: Shield,
  crown: Crown,
  zap: Zap,
  users: Users,
  globe: Globe,
};

export const SaintVisionFeatureGrid = ({
  title = "Elite Technology",
  subtitle = "ENTERPRISE READY",
  description = "Dual AI systems handle your business operations while you focus on what matters - growing your empire.",
  features = [
    {
      icon: "brain",
      title: "Business Strategy",
      description: "AI that analyzes market trends, automates research, and strategizes planning powered by dual AI engines."
    },
    {
      icon: "shield",
      title: "CRM Integration",
      description: "Seamlessly connect with GoHighLevel, automate follow-ups, and intelligent lead scoring."
    },
    {
      icon: "zap",
      title: "Growth Analytics",
      description: "Real-time insights with actionable intelligence to scale faster with smarter business decisions."
    }
  ]
}: SaintVisionFeatureGridProps) => {
  return (
    <div className="relative z-40 py-32 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien">
            {title}
          </h2>
          <p className="text-xl text-gold-300 font-medium mb-4">
            {subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Brain;
            const gradientColors = [
              "from-yellow-400/20 to-gold-500/20 text-gold-300",
              "from-blue-400/20 to-purple-500/20 text-blue-300",
              "from-green-400/20 to-emerald-500/20 text-green-300"
            ];
            const gradientColor = gradientColors[index % gradientColors.length];

            return (
              <div 
                key={index}
                className="glass-morphism p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${gradientColor.split(' ')[0]} ${gradientColor.split(' ')[1]} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className={`w-8 h-8 ${gradientColor.split(' ')[2]}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

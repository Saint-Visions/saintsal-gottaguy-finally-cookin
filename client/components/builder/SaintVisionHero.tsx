'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';

interface SaintVisionHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  logoImage?: string;
  badgeText?: string;
}

export const SaintVisionHero = ({
  title = "SaintSal™",
  subtitle = "Cookin' Knowledge.",
  description = "AI doesn't just answer. It adapts. It empowers. It becomes your enterprise companion.",
  ctaText = "Start Cookin' Knowledge",
  ctaLink = "/dashboard",
  secondaryCtaText = "Try CRM Tools",
  secondaryCtaLink = "/partnertech",
  backgroundImage = "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800",
  logoImage = "https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/better-saintsal-transparent-d9c734",
  badgeText = "Enterprise Ready"
}: SaintVisionHeroProps) => {
  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative">
      {/* Hero Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.6) 0%, rgba(16, 22, 28, 0.5) 100%), url('${backgroundImage}')`,
          backgroundAttachment: "fixed",
          zIndex: 1,
        }}
      ></div>

      {/* Hero Section */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="transform transition-all duration-1000">
          {/* Main Logo/Brand */}
          <div className="mb-8">
            <div className="relative inline-block -mt-1 -mb-1">
              <img
                src={logoImage}
                alt="SaintVisionAI Logo"
                className="h-60 object-contain mx-auto mb-11"
                style={{ width: "367px" }}
              />
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="saintvision-gradient-text font-dialien">
              {title}
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gold-300 mb-6 font-medium font-dropline">
            {subtitle}
          </h2>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
            <a href={ctaLink}>
              <Button
                size="lg"
                className="text-yellow-400 hover:text-yellow-300 text-xl font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent group hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={secondaryCtaLink}>
              <Button
                size="lg"
                className="text-blue-400 hover:text-blue-300 text-lg font-semibold transition-all duration-200 bg-transparent border-none shadow-none hover:bg-transparent hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]"
              >
                {secondaryCtaText}
                <Shield className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Elite Technology Badge */}
        {badgeText && (
          <div className="transform transition-all duration-1000 delay-300">
            <div className="glass-morphism rounded-full px-6 py-3 mb-8">
              <p className="text-gold-300 font-semibold text-sm uppercase tracking-wider">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {badgeText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SaintVisionCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  logoImage?: string;
}

export const SaintVisionCTA = ({
  title = "Elite AI Sanctuary",
  subtitle = "THE MOVEMENT",
  description = "Built for those who refuse to compromise on excellence, privacy, or values. Join thousands who've discovered their GOTTA GUY®.",
  backgroundImage = "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F89f844d10b5e4243a2178ad3de7a9f4f",
  ctaText = "Join The Movement",
  ctaLink = "/dashboard",
  secondaryCtaText = "Discover Your Guy",
  secondaryCtaLink = "/why",
  logoImage = "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
}: SaintVisionCTAProps) => {
  return (
    <div className="relative z-40 py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
        }}
      ></div>

      {/* Deep Realistic Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/95 via-charcoal-900/75 to-charcoal-900/95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-transparent to-charcoal-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Movement Header */}
        <div className="mb-12">
          <p className="text-gold-300 font-medium text-sm uppercase tracking-wider mb-4 drop-shadow-2xl">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-dialien drop-shadow-2xl">
            {title}
          </h2>
          <div className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-gold-500/30 max-w-4xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
              {description}
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="glass-morphism p-8 rounded-2xl max-w-4xl mx-auto mb-12 border border-gold-500/20">
          <div className="flex items-center justify-center mb-6">
            <img
              src={logoImage}
              alt="SaintSal Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-xl font-bold text-gold-300">
                SAINTSAL® • Cookin' Knowledge
              </h3>
            </div>
          </div>

          <blockquote className="text-lg md:text-xl text-white/90 italic mb-6 leading-relaxed">
            "We built this for the builders, the believers, the ones who
            demand more than chatbots. This is enterprise AI with a soul,
            technology with values, innovation with integrity."
          </blockquote>

          <div className="text-center">
            <p className="text-gold-300 font-medium mb-2">
              ✦ SaintVisionAI™ Access
            </p>
            <p className="text-white/70 text-sm">
              Azure Cognitive Services • OpenAI GPT-4o ⚊⚊ Premium
              Infrastructure
            </p>
          </div>
        </div>

        {/* Movement CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href={ctaLink}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 text-xl font-bold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 saintvision-glow"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>

          <a href={secondaryCtaLink}>
            <Button
              size="lg"
              variant="outline"
              className="border-gold-400/30 text-gold-300 hover:bg-gold-400/10 text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              {secondaryCtaText}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

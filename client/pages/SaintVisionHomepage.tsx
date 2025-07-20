import React from 'react';
import { SaintVisionHero } from '@/components/builder/SaintVisionHero';
import { SaintVisionNavigation } from '@/components/builder/SaintVisionNavigation';
import { SaintVisionFeatureGrid } from '@/components/builder/SaintVisionFeatureGrid';
import { SaintVisionSecurityVault } from '@/components/builder/SaintVisionSecurityVault';
import { SaintVisionCTA } from '@/components/builder/SaintVisionCTA';
import { Footer } from '@/components/Footer';

export default function SaintVisionHomepage() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Navigation */}
      <SaintVisionNavigation 
        logoImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
        logoText="SaintVisionAI™"
        tagline="Cookin' Knowledge"
        links={[
          { text: 'Dashboard', url: '/dashboard' },
          { text: 'Pricing', url: '/pricing' },
          { text: 'Why Us', url: '/why' },
          { text: 'Help', url: '/help' },
        ]}
        ctaButton1Text="Sign In"
        ctaButton1Link="/signin"
        ctaButton2Text="Start Cookin'"
        ctaButton2Link="/dashboard"
      />

      {/* Hero Section */}
      <SaintVisionHero 
        title="SaintSal™"
        subtitle="Cookin' Knowledge."
        description="AI doesn't just answer. It adapts. It empowers. It becomes your enterprise companion."
        ctaText="Start Cookin' Knowledge"
        ctaLink="/dashboard"
        secondaryCtaText="Try CRM Tools"
        secondaryCtaLink="/partnertech"
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800"
        logoImage="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/better-saintsal-transparent-d9c734"
        badgeText="Enterprise Ready"
      />

      {/* Features Section */}
      <SaintVisionFeatureGrid 
        title="Elite Technology"
        subtitle="ENTERPRISE READY"
        description="Dual AI systems handle your business operations while you focus on what matters - growing your empire."
        features={[
          {
            icon: 'brain',
            title: 'Business Strategy',
            description: 'AI that analyzes market trends, automates research, and strategizes planning powered by dual AI engines.',
          },
          {
            icon: 'shield',
            title: 'CRM Integration',
            description: 'Seamlessly connect with GoHighLevel, automate follow-ups, and intelligent lead scoring.',
          },
          {
            icon: 'zap',
            title: 'Growth Analytics',
            description: 'Real-time insights with actionable intelligence to scale faster with smarter business decisions.',
          },
          {
            icon: 'crown',
            title: 'Elite Support',
            description: 'White-glove onboarding and dedicated success manager for enterprise clients.',
          },
          {
            icon: 'users',
            title: 'Team Collaboration',
            description: 'Multi-user workspaces with role-based permissions and real-time collaboration tools.',
          },
          {
            icon: 'globe',
            title: 'Global Scaling',
            description: 'Multi-language support and global infrastructure for worldwide business operations.',
          },
        ]}
      />

      {/* Security Section */}
      <SaintVisionSecurityVault 
        title="Vault & Security"
        subtitle="Faith-Aligned Data Protection"
        description="Bank-grade security meets faith-centered values. Your data protected with military-grade encryption and ethical business practices."
      />

      {/* CTA Section */}
      <SaintVisionCTA 
        title="Elite AI Sanctuary"
        subtitle="THE MOVEMENT"
        description="Built for those who refuse to compromise on excellence, privacy, or values. Join thousands who've discovered their GOTTA GUY®."
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F89f844d10b5e4243a2178ad3de7a9f4f"
        ctaText="Join The Movement"
        ctaLink="/dashboard"
        secondaryCtaText="Discover Your Guy"
        secondaryCtaLink="/why"
        logoImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

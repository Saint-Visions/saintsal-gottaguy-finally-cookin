'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationLink {
  text: string;
  url: string;
  icon?: string;
}

interface SaintVisionNavigationProps {
  logoImage?: string;
  logoText?: string;
  tagline?: string;
  links?: NavigationLink[];
  ctaButton1Text?: string;
  ctaButton1Link?: string;
  ctaButton2Text?: string;
  ctaButton2Link?: string;
}

export const SaintVisionNavigation = ({
  logoImage = "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d",
  logoText = "SaintVisionAI™",
  tagline = "Cookin' Knowledge",
  links = [
    { text: "Dashboard", url: "/dashboard" },
    { text: "Pricing", url: "/pricing" },
    { text: "Why Us", url: "/why" },
    { text: "Help", url: "/help" }
  ],
  ctaButton1Text = "Sign In",
  ctaButton1Link = "/signin",
  ctaButton2Text = "Start Cookin'",
  ctaButton2Link = "/dashboard"
}: SaintVisionNavigationProps) => {
  return (
    <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="flex items-center">
            <img
              loading="lazy"
              src={logoImage}
              alt="SaintVisionAI Logo"
              className="w-16 h-16 object-contain transition-all duration-300 hover:scale-105"
              style={{
                filter: "brightness(1.05) contrast(1.02)",
              }}
            />
          </div>
        </div>
        <div className="ml-1">
          <h1 className="text-2xl font-bold text-white tracking-tight font-dialien drop-shadow-lg">
            {logoText}
          </h1>
          <p className="text-xs text-gold-300 -mt-1 font-medium drop-shadow-sm">
            {tagline}
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className="text-white/80 hover:text-gold-300 transition-colors flex items-center space-x-2"
          >
            {link.icon && (
              <img
                src={link.icon}
                alt={link.text}
                className="w-6 h-6 object-contain"
              />
            )}
            <span>{link.text}</span>
          </Link>
        ))}
        
        <Link to={ctaButton1Link}>
          <Button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
            {ctaButton1Text}
          </Button>
        </Link>
        
        <Link to={ctaButton2Link}>
          <Button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 bg-transparent border-none shadow-none hover:bg-transparent font-semibold hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
            {ctaButton2Text}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

'use client';

import React from 'react';
import { Shield, Lock, Globe, Sparkles } from 'lucide-react';

interface SaintVisionSecurityVaultProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export const SaintVisionSecurityVault = ({
  title = "Vault & Security",
  subtitle = "Faith-Aligned Data Protection",
  description = "Bank-grade security meets faith-centered values. Your data protected with military-grade encryption and ethical business practices."
}: SaintVisionSecurityVaultProps) => {
  return (
    <div className="relative z-40 py-32 bg-charcoal-800/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
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

        {/* Main Security Display */}
        <div className="flex gap-8 max-lg:flex-col items-start justify-center mb-16">
          {/* Faith-Aligned Vault */}
          <div className="flex flex-col w-[400px] max-lg:w-full">
            <div className="glass-morphism p-8 rounded-2xl border border-green-500/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-8 h-8 text-green-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Faith-Aligned Vault
                  </h3>
                  <p className="text-green-300 text-sm">
                    Secure. Private. Moral.
                  </p>
                </div>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed">
                Your conversations, billing data, and personal information
                protected with ethical encryption and faith-based principles.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Secure Private Vault</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">End-to-end encryption</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Secure Stripe billing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Bank-based encryption</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">
                    Faith-centered data practices
                  </span>
                </li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-medium">
                    Enterprise Security
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Protected Data Vault */}
          <div className="flex flex-col w-[400px] max-lg:w-full">
            <div className="glass-morphism p-8 rounded-2xl border border-blue-500/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Lock className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Protected Data Vault
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Military-Grade Protection
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Encryption Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-300 font-medium">
                      AES-256 Active
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Data Location</span>
                  <span className="text-blue-300 font-medium">
                    Private Cloud
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Access Control</span>
                  <span className="text-purple-300 font-medium">
                    Role-Based
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Ethics Compliance</span>
                  <span className="text-gold-300 font-medium">
                    Faith-Aligned
                  </span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-300 font-medium">
                    99.99% Uptime SLA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="glass-morphism p-6 rounded-xl text-center border border-green-500/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-300" />
            </div>
            <h4 className="font-semibold mb-2 text-green-300">AES-256</h4>
            <p className="text-white/70 text-sm">Military-grade encryption</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl text-center border border-blue-500/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-blue-300" />
            </div>
            <h4 className="font-semibold mb-2 text-blue-300">Zero-Trust</h4>
            <p className="text-white/70 text-sm">Role-based access control</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl text-center border border-purple-500/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-purple-300" />
            </div>
            <h4 className="font-semibold mb-2 text-purple-300">
              Private Cloud
            </h4>
            <p className="text-white/70 text-sm">Dedicated infrastructure</p>
          </div>

          <div className="glass-morphism p-6 rounded-xl text-center border border-gold-500/10">
            <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-gold-300" />
            </div>
            <h4 className="font-semibold mb-2 text-gold-300">
              Faith-Aligned
            </h4>
            <p className="text-white/70 text-sm">Ethical data practices</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-white/60 mb-6">
            Trusted by thousands of faith-based businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Faith-Centered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>99.99% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

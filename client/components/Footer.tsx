import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-40 bg-charcoal-900 border-t border-white/10 overflow-hidden">
      {/* Cookin' Knowledge Background - Like Sidebar */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F6bcc9b199a02406e9e47c34c2b8497cc?format=webp&width=800')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Minimized Company Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
              alt="SaintVisionAI Logo"
              className="w-10 h-10 mr-3"
            />
            <div>
              <h3 className="text-lg font-bold text-white">SaintVisionAI™</h3>
              <p className="text-gold-300 text-xs">Cookin' Knowledge</p>
            </div>
          </div>

          <div className="text-sm text-white/70 text-center md:text-right">
            <p className="mb-1">
              <strong className="text-gold-300">HACP™</strong> | Hierarchical
              Adaptive Cognitive Processing protocol allows LLB to learn 10-20x
              and additional patent pending technologies.
            </p>
            <p className="text-xs text-white/50">
              ✦ Built with enterprise-grade security:{" "}
              <span className="text-green-300">AES-256 encryption</span> |{" "}
              <span className="text-blue-300">SOC 2 compliance</span> |{" "}
              <span className="text-purple-300">Enterprise Architecture</span>
            </p>
          </div>
        </div>

        {/* Two Column Links */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Platform</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/console"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Console
              </Link>
              <Link
                to="/dashboard"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/crm"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                CRM
              </Link>
              <Link
                to="/partnertech"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                PartnerTech
              </Link>
              <Link
                to="/upgrade"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Upgrade
              </Link>
              <Link
                to="/pricing"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/hacp"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                HACP™ Patent
              </Link>
            </div>
          </div>

          {/* Legal & Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">
              Legal & Support
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/help"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Help
              </Link>
              <a
                href="/privacy-policy"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/gdpr-compliance"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                GDPR Compliance
              </a>
              <a
                href="/data-processing"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Data Processing
              </a>
              <a
                href="/security-policy"
                className="text-white/70 hover:text-gold-300 transition-colors"
              >
                Security Policy
              </a>
            </div>
          </div>
        </div>

        {/* Compact Footer Bottom */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-xs">
            <div className="text-white/60">
              © 2025 Saint Vision Group LLC. All rights reserved. Powered
              Limited Partnership.
            </div>

            <div className="flex items-center space-x-4 text-white/60">
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-green-300" />
                <span>GDPR • CCPA • SOC2</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3 text-blue-300" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-gold-300" />
                <span>US Patent 10,290,222</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

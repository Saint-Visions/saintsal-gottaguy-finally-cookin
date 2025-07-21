import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
            alt="SaintVisionAI Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Legal Documents</p>
          </div>
        </div>

        <Link to="/">
          <Button className="text-white hover:text-gold-300 bg-transparent border-none shadow-none">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gold-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4 saintvision-gradient-text">
            Terms of Service
          </h1>
          <p className="text-white/80 text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="glass-morphism p-8 rounded-xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing and using SaintVisionAI™ services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">2. Use License</h2>
            <p className="text-white/80 leading-relaxed">
              Permission is granted to temporarily use SaintVisionAI™ for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">3. Data Protection</h2>
            <p className="text-white/80 leading-relaxed">
              We are committed to protecting your privacy and data. All interactions are encrypted with AES-256 military-grade encryption and stored in secure, faith-aligned data centers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">4. Service Availability</h2>
            <p className="text-white/80 leading-relaxed">
              We strive to maintain 99.99% uptime. However, services may be temporarily unavailable for maintenance, updates, or unforeseen technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">5. Contact Information</h2>
            <p className="text-white/80 leading-relaxed">
              For questions about these Terms of Service, please contact us at legal@saintvisionai.com
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link to="/">
            <Button className="bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-semibold">
              Return to SaintVisionAI™
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

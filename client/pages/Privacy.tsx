import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, Lock } from "lucide-react";

export default function Privacy() {
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
            <p className="text-xs text-gold-300 -mt-1">Privacy Policy</p>
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
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-green-300">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-lg">
            Faith-Aligned Data Protection • Last updated: January 2025
          </p>
        </div>

        <div className="glass-morphism p-8 rounded-xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-4">Data Collection</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We collect only the information necessary to provide you with the best AI experience:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Account information (email, name)</li>
              <li>Chat conversations with your AI companion</li>
              <li>Usage patterns to improve service quality</li>
              <li>Billing information processed securely through Stripe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-4">Faith-Aligned Protection</h2>
            <p className="text-white/80 leading-relaxed">
              Your data is protected with military-grade AES-256 encryption and stored in faith-centered, ethically-operated data centers. We never sell your personal information and maintain the highest standards of privacy protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-4">Data Usage</h2>
            <p className="text-white/80 leading-relaxed">
              Your data is used exclusively to provide and improve SaintVisionAI™ services. We do not share personal information with third parties except as required by law or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-4">Your Rights</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of certain data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-300 mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              For privacy questions or to exercise your rights, contact us at privacy@saintvisionai.com
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link to="/">
            <Button className="bg-green-500 hover:bg-green-600 text-charcoal-900 font-semibold">
              <Lock className="mr-2 w-4 h-4" />
              Your Data is Protected
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import React from "react";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      {/* Header */}
      <div className="bg-charcoal-800 border-b border-charcoal-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-gold-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold saintvision-gradient-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/70">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gold-300 mb-4">
                  Information We Collect
                </h2>
                <p className="text-white/80 leading-relaxed">
                  At SaintVisionAI, we collect information that you provide
                  directly to us, such as when you create an account, use our
                  services, or contact us for support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gold-300 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-white/80 leading-relaxed">
                  We use the information we collect to provide, maintain, and
                  improve our AI services, process transactions, and communicate
                  with you about your account and our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gold-300 mb-4">
                  Data Security
                </h2>
                <p className="text-white/80 leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gold-300 mb-4">
                  Contact Us
                </h2>
                <p className="text-white/80 leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:support@saintvisionai.com"
                    className="text-gold-300 hover:text-gold-200"
                  >
                    support@saintvisionai.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

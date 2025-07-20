import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Chrome,
  Download,
  Settings,
  Shield,
  Zap,
  Crown,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  RefreshCw,
  Globe,
  Brain,
  Users,
  Target,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export default function ChromeInstall() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [installStep, setInstallStep] = useState(1);
  const [extensionDetected, setExtensionDetected] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Check if extension is already installed
    setTimeout(() => {
      setExtensionDetected(Math.random() > 0.7);
    }, 1000);
  }, []);

  const installSteps = [
    {
      step: 1,
      title: "Download Extension",
      description:
        "Get the SaintSal™ Chrome Extension from the Chrome Web Store",
      action: "Download Now",
      icon: Download,
    },
    {
      step: 2,
      title: "Add to Chrome",
      description: "Click 'Add to Chrome' and confirm the installation",
      action: "Add Extension",
      icon: Chrome,
    },
    {
      step: 3,
      title: "Sign In",
      description: "Sign in with your SaintSal™ account to activate features",
      action: "Authenticate",
      icon: Shield,
    },
    {
      step: 4,
      title: "Start Using",
      description: "Begin using AI-powered features on any website",
      action: "Launch AI",
      icon: Sparkles,
    },
  ];

  const features = [
    {
      title: "LinkedIn Prospect Analysis",
      description: "Instantly analyze LinkedIn profiles with AI insights",
      icon: Users,
      demo: "Hover over any LinkedIn profile for instant AI analysis",
    },
    {
      title: "Email Generation",
      description: "Generate personalized emails with one click",
      icon: Target,
      demo: "Right-click and select 'Generate with SaintSal™'",
    },
    {
      title: "CRM Data Overlay",
      description: "See CRM data overlayed on web pages",
      icon: Globe,
      demo: "Automatic data sync with your GoHighLevel CRM",
    },
    {
      title: "AI Content Assistant",
      description: "Get writing help and content suggestions anywhere",
      icon: Brain,
      demo: "Highlight text and get AI-powered improvements",
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.98) 0%, rgba(16, 22, 28, 0.95) 100%), 
                           url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-12 h-12 object-contain"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text">
              Chrome Extension
            </h1>
            <p className="text-xs text-gold-300 -mt-1">
              SaintSal™ Browser Power
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {extensionDetected ? (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Extension Detected
            </Badge>
          ) : (
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              <AlertCircle className="w-3 h-3 mr-1" />
              Not Installed
            </Badge>
          )}
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center saintvision-glow-strong">
                <Chrome className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="saintvision-gradient-text">SaintSal™</span>
              <br />
              <span className="text-blue-300">Chrome Extension</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Transform any website into your AI-powered business command
              center. Analyze prospects, generate content, and manage leads
              directly from your browser.
              <br />
              <span className="text-gold-300 font-semibold">
                Your GOTTA GUY™ everywhere you browse.
              </span>
            </p>

            {!extensionDetected && (
              <Button className="bg-blue-500 text-white hover:bg-blue-400 text-lg px-8 py-4 saintvision-glow">
                <Download className="mr-2 w-6 h-6" />
                Install Extension Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Extension Status */}
          {extensionDetected ? (
            <div
              className={`mb-16 transform transition-all duration-1000 delay-200 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto text-center border border-green-500/30">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                  <h2 className="text-3xl font-bold text-green-300">
                    Extension Installed!
                  </h2>
                </div>
                <p className="text-white/80 mb-6 text-lg">
                  Great! SaintSal™ Chrome Extension is detected and ready to
                  use. Start browsing and experience AI-powered assistance on
                  any website.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-green-500 text-white hover:bg-green-400 saintvision-glow">
                    <Play className="mr-2 w-5 h-5" />
                    Test Extension
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Settings className="mr-2 w-5 h-5" />
                    Configure Settings
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Installation Steps */
            <div
              className={`mb-16 transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="saintvision-gradient-text">
                  Installation Guide
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {installSteps.map(step => {
                  const Icon = step.icon;
                  const isCompleted = installStep > step.step;
                  const isCurrent = installStep === step.step;

                  return (
                    <div
                      key={step.step}
                      className={`relative p-6 rounded-xl border transition-all ${
                        isCompleted
                          ? "border-green-500/30 bg-green-500/10"
                          : isCurrent
                          ? "border-blue-500/30 bg-blue-500/10 saintvision-glow"
                          : "border-white/20 glass-morphism"
                      }`}
                    >
                      {/* Step Number */}
                      <div className="absolute -top-4 left-6">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-blue-500 text-white"
                              : "bg-white/20 text-white/70"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.step
                          )}
                        </div>
                      </div>

                      {/* Step Icon */}
                      <div className="mb-6 mt-4">
                        <div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto ${
                            isCompleted
                              ? "bg-green-500/20"
                              : isCurrent
                              ? "bg-blue-500/20"
                              : "bg-white/10"
                          }`}
                        >
                          <Icon
                            className={`w-8 h-8 ${
                              isCompleted
                                ? "text-green-300"
                                : isCurrent
                                ? "text-blue-300"
                                : "text-white/70"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="text-center">
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-white/70 text-sm mb-4">
                          {step.description}
                        </p>
                        <Button
                          size="sm"
                          disabled={!isCurrent}
                          onClick={() => setInstallStep(step.step + 1)}
                          className={
                            isCurrent
                              ? "bg-blue-500 text-white hover:bg-blue-400"
                              : "bg-gray-500 text-gray-300 cursor-not-allowed"
                          }
                        >
                          {step.action}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Link */}
              <div className="text-center mt-12">
                <Button className="bg-blue-500 text-white hover:bg-blue-400 text-xl px-12 py-6 saintvision-glow">
                  <Chrome className="mr-3 w-6 h-6" />
                  Get SaintSal™ Extension
                  <ExternalLink className="ml-3 w-5 h-5" />
                </Button>
                <p className="text-white/60 text-sm mt-4">
                  Available in the Chrome Web Store • Free for SaintSal™ users
                </p>
              </div>
            </div>
          )}

          {/* Features Showcase */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="saintvision-gradient-text">
                Extension Features
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="glass-morphism p-8 rounded-xl hover:saintvision-glow transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gold-500/20 rounded-xl flex items-center justify-center group-hover:bg-gold-500/30 transition-colors flex-shrink-0">
                        <Icon className="w-8 h-8 text-gold-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/80 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gold-300">
                          <Play className="w-4 h-4" />
                          <span>{feature.demo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demo Video Section */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="saintvision-gradient-text">
                  See It In Action
                </span>
              </h2>
              <p className="text-white/80 mb-8 text-lg max-w-3xl mx-auto">
                Watch how SaintSal™ Chrome Extension transforms your browsing
                experience with AI-powered features.
              </p>

              {/* Video Placeholder */}
              <div className="relative bg-charcoal-800 rounded-xl p-16 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-400 transition-colors">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      SaintSal™ Extension Demo
                    </h3>
                    <p className="text-white/70">
                      See how to install and use all features
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 text-white hover:bg-blue-400 saintvision-glow">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ExternalLink className="mr-2 w-5 h-5" />
                  View Documentation
                </Button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div
            className={`text-center transform transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-white/80 mb-6">
                Our support team is here to help you get the most out of your
                SaintSal™ Chrome Extension.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Installation Guide
                </Button>
                <Button className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow">
                  <Crown className="mr-2 w-4 h-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

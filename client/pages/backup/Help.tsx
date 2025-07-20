import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  Search,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  Crown,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  HelpCircle,
  FileText,
  Video,
  Download,
  ExternalLink,
} from "lucide-react";

export default function Help() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: Crown,
      count: 12,
    },
    {
      id: "ai-features",
      name: "AI Features",
      icon: Brain,
      count: 18,
    },
    {
      id: "integrations",
      name: "Integrations",
      icon: Zap,
      count: 15,
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: Shield,
      count: 8,
    },
    {
      id: "billing",
      name: "Billing & Plans",
      icon: Star,
      count: 10,
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: HelpCircle,
      count: 14,
    },
  ];

  const popularArticles = [
    {
      title: "How to Set Up Your First AI Chat",
      category: "Getting Started",
      readTime: "3 min",
      views: "2.1k",
    },
    {
      title: "Understanding Dual AI System",
      category: "AI Features",
      readTime: "5 min",
      views: "1.8k",
    },
    {
      title: "Connecting Your CRM (GoHighLevel)",
      category: "Integrations",
      readTime: "7 min",
      views: "1.5k",
    },
    {
      title: "HACP™ Technology Explained",
      category: "AI Features",
      readTime: "4 min",
      views: "1.3k",
    },
    {
      title: "Upgrading Your Plan",
      category: "Billing & Plans",
      readTime: "2 min",
      views: "1.1k",
    },
  ];

  const quickActions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      icon: MessageSquare,
      action: "Start Chat",
      available: true,
    },
    {
      title: "Schedule a Call",
      description: "Book a 1-on-1 session with our experts",
      icon: Phone,
      action: "Book Now",
      available: true,
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      action: "Send Email",
      available: true,
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Video,
      action: "Watch Now",
      available: true,
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
                           url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-charcoal-900 font-bold text-lg">Sv.</span>
          </div>
          <div>
            <h1 className="text-xl font-bold saintvision-gradient-text font-dialien">
              SaintVisionAI™
            </h1>
            <p className="text-xs text-gold-300 -mt-1">Help Center</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/pricing"
            className="text-white/80 hover:text-gold-300 transition-colors"
          >
            Pricing
          </a>
          <Button
            variant="outline"
            className="border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900"
          >
            Sign In
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
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center saintvision-glow-strong">
                <BookOpen className="w-10 h-10 text-charcoal-900" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="saintvision-gradient-text">How Can We</span>
              <br />
              <span className="text-gold-300">Help You?</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Everything you need to master SaintSal™ and unlock the full power
              of your GOTTA GUY™ AI companion.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 pl-12 pr-4 text-lg glass-morphism"
                placeholder="Search for help articles, guides, or features..."
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className={`mb-16 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="saintvision-gradient-text">Get Help Now</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className="glass-morphism p-6 rounded-xl text-center hover:saintvision-glow transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/30 transition-colors">
                      <Icon className="w-8 h-8 text-gold-300" />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm mb-4">
                      {action.description}
                    </p>
                    <Button
                      size="sm"
                      className="bg-gold-500 text-charcoal-900 hover:bg-gold-400"
                    >
                      {action.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid */}
          <div
            className={`grid lg:grid-cols-4 gap-8 mb-16 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="glass-morphism p-6 rounded-xl">
                <h3 className="font-bold mb-6 text-gold-300">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeCategory === category.id
                            ? "bg-gold-500/20 text-gold-300"
                            : "hover:bg-white/5 text-white/80"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-white/10 text-white/70"
                          >
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Card */}
              <div className="glass-morphism p-6 rounded-xl mt-6">
                <h3 className="font-bold mb-4 text-gold-300">
                  Still Need Help?
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Our support team is available 24/7 to help you succeed with
                  SaintSal™.
                </p>
                <div className="space-y-3">
                  <Button
                    size="sm"
                    className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400"
                  >
                    <MessageSquare className="mr-2 w-4 h-4" />
                    Live Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Popular Articles */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Popular Articles</h3>
                  <Button
                    variant="ghost"
                    className="text-gold-300 hover:text-gold-200"
                  >
                    View All
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div
                      key={index}
                      className="glass-morphism p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge
                              variant="secondary"
                              className="bg-gold-500/20 text-gold-300 border-gold-500/30"
                            >
                              {article.category}
                            </Badge>
                            <div className="flex items-center space-x-4 text-white/50 text-sm">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>{article.views} views</span>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors">
                            {article.title}
                          </h4>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-gold-300 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Getting Started Guide */}
              <div className="glass-morphism p-8 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Quick Start Guide</h3>
                    <p className="text-white/70">
                      Get up and running with SaintSal™ in 5 minutes
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">1. Create Your Account</h4>
                      <p className="text-white/70 text-sm">
                        Sign up with your email or social accounts
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-charcoal-900 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">2. Choose Your AI Model</h4>
                      <p className="text-white/70 text-sm">
                        Select between GPT-4o or Azure Cognitive Services
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-charcoal-900 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        3. Start Your First Chat
                      </h4>
                      <p className="text-white/70 text-sm">
                        Begin conversing with your GOTTA GUY™ AI companion
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button className="bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow">
                    <ArrowRight className="mr-2 w-4 h-4" />
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Contact Form */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-white/80 text-lg">
                  Send us a message and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-gold-300">
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gold-300" />
                      <span>support@saintvisionai.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-gold-300" />
                      <span>Live Chat (24/7)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gold-300" />
                      <span>+1 (949) 997-2097</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-4 text-gold-300">
                      Response Times
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Live Chat:</span>
                        <span className="text-green-300">&lt; 2 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Email Support:</span>
                        <span className="text-gold-300">&lt; 24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Phone Support:</span>
                        <span className="text-blue-300">Same day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500"
                      />
                      <Input
                        placeholder="Last Name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500"
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500"
                    />
                    <Input
                      placeholder="Subject"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500"
                    />
                    <Textarea
                      placeholder="How can we help you?"
                      rows={4}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 resize-none"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                    >
                      Send Message
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

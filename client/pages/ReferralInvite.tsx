import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Gift,
  Share2,
  Copy,
  Mail,
  MessageSquare,
  Crown,
  Star,
  DollarSign,
  TrendingUp,
  CheckCircle,
  UserPlus,
  Sparkles,
  Trophy,
  Target,
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ReferralInvite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [referralCode, setReferralCode] = useState("SAINTSAL-SAL123");
  const [inviteEmails, setInviteEmails] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const referralStats = [
    {
      label: "Total Referrals",
      value: "47",
      change: "+12 this month",
      icon: Users,
      color: "text-blue-300",
    },
    {
      label: "Earnings",
      value: "$1,410",
      change: "+$340 this month",
      icon: DollarSign,
      color: "text-green-300",
    },
    {
      label: "Conversion Rate",
      value: "23%",
      change: "+5% vs last month",
      icon: TrendingUp,
      color: "text-gold-300",
    },
    {
      label: "Pending Rewards",
      value: "$280",
      change: "Available Dec 15",
      icon: Gift,
      color: "text-purple-300",
    },
  ];

  const recentReferrals = [
    {
      name: "Marcus Johnson",
      email: "marcus@example.com",
      status: "Active",
      plan: "Pro",
      reward: "$30",
      date: "2024-03-10",
    },
    {
      name: "Sarah Chen",
      email: "sarah@example.com",
      status: "Active",
      plan: "Enterprise",
      reward: "$50",
      date: "2024-03-08",
    },
    {
      name: "David Rodriguez",
      email: "david@example.com",
      status: "Pending",
      plan: "Trial",
      reward: "$0",
      date: "2024-03-05",
    },
  ];

  const rewardTiers = [
    {
      tier: "Starter Referral",
      plan: "Start Cookin'",
      reward: "$10",
      icon: Star,
      color: "blue",
    },
    {
      tier: "Pro Referral",
      plan: "PartnerTech Pro",
      reward: "$30",
      icon: Crown,
      color: "gold",
    },
    {
      tier: "Enterprise Referral",
      plan: "Pro Suite",
      reward: "$50",
      icon: Trophy,
      color: "purple",
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const referralLink = `https://saintvisionai.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvites = () => {
    console.log("Sending invites to:", inviteEmails);
    // Handle email invites
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 22, 28, 0.98) 0%, rgba(16, 22, 28, 0.95) 100%), 
                           url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')`,
        }}
      ></div>

      {/* Mobile-First Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-4 md:p-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center space-x-3 md:space-x-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
            alt="SaintSal Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            style={{
              filter:
                "brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))",
              opacity: "0.95",
            }}
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold saintvision-gradient-text">
              Referral Program
            </h1>
            <p className="text-xs text-gold-300 -mt-1 hidden sm:block">
              Earn with SaintSal™
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs md:text-sm">
            <Trophy className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">VIP</span>
          </Badge>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-2 md:px-4"
          >
            <ExternalLink className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Rules</span>
          </Button>
        </div>
      </nav>

      <div className="relative z-40 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-First Header */}
          <div
            className={`mb-6 md:mb-8 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 tracking-tight">
              <span className="saintvision-gradient-text">Earn with</span>
              <br />
              <span className="text-purple-300">SaintSal™</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Share SaintSal™ with your network and earn up to $50 for every
              successful referral. Build your passive income empire!
            </p>
          </div>

          {/* Mobile-Optimized Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {referralStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass-morphism p-3 md:p-6 rounded-xl hover:saintvision-glow transition-all"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <Icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-xs md:text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/50 text-xs">{stat.change}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Invite Section */}
            <div className="lg:col-span-2">
              <div
                className={`space-y-6 md:space-y-8 transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Referral Code Section */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4 md:mb-6">
                    <Share2 className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />
                    <h3 className="text-lg md:text-xl font-bold">
                      Your Referral Code
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={referralCode}
                        readOnly
                        className="bg-white/5 border-white/20 text-white font-mono text-center text-lg md:text-xl font-bold"
                      />
                      <Button
                        onClick={handleCopyCode}
                        className="bg-purple-500 text-white hover:bg-purple-400 saintvision-glow px-3 md:px-4"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 h-10 md:h-12"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 h-10 md:h-12"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Email Invites */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4 md:mb-6">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-gold-300" />
                    <h3 className="text-lg md:text-xl font-bold">
                      Send Email Invites
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      placeholder="Enter email addresses (one per line)"
                      value={inviteEmails}
                      onChange={e => setInviteEmails(e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:border-gold-500 rounded-lg p-3 resize-none"
                    />
                    <Button
                      onClick={handleSendInvites}
                      className="w-full md:w-auto bg-gold-500 text-charcoal-900 hover:bg-gold-400 saintvision-glow"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invites
                    </Button>
                  </div>
                </div>

                {/* Reward Tiers */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl">
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                    Referral Rewards
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {rewardTiers.map((tier, index) => {
                      const Icon = tier.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                                tier.color === "gold"
                                  ? "bg-gold-500/20"
                                  : tier.color === "purple"
                                  ? "bg-purple-500/20"
                                  : "bg-blue-500/20"
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 md:w-5 md:h-5 ${
                                  tier.color === "gold"
                                    ? "text-gold-300"
                                    : tier.color === "purple"
                                    ? "text-purple-300"
                                    : "text-blue-300"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm md:text-base">
                                {tier.tier}
                              </p>
                              <p className="text-white/70 text-xs md:text-sm">
                                {tier.plan} signup
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-300 text-sm md:text-base">
                              {tier.reward}
                            </p>
                            <p className="text-white/50 text-xs">
                              per referral
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div
                className={`space-y-6 md:space-y-8 transform transition-all duration-1000 delay-700 ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                {/* Recent Referrals */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg font-bold">Recent Referrals</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gold-300 hover:text-gold-200"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {recentReferrals.map((referral, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                      >
                        <Avatar className="w-8 h-8 md:w-10 md:h-10">
                          <AvatarFallback className="bg-gold-500 text-charcoal-900 font-bold text-xs md:text-sm">
                            {referral.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm md:text-base truncate">
                            {referral.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${getStatusColor(
                                referral.status,
                              )} text-xs`}
                            >
                              {referral.status}
                            </Badge>
                            <span className="text-green-300 font-bold text-xs md:text-sm">
                              {referral.reward}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 md:mb-6">
                    Program Benefits
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                      <span className="text-white/90 text-sm md:text-base">
                        Instant payouts
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                      <span className="text-white/90 text-sm md:text-base">
                        Lifetime commissions
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                      <span className="text-white/90 text-sm md:text-base">
                        Real-time tracking
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                      <span className="text-white/90 text-sm md:text-base">
                        Marketing materials
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="glass-morphism p-4 md:p-6 rounded-xl text-center">
                  <h3 className="text-lg font-bold mb-2">
                    Start Earning Today
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Share your referral code and start building passive income
                    with SaintSal™.
                  </p>
                  <Button className="w-full bg-purple-500 text-white hover:bg-purple-400 saintvision-glow">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

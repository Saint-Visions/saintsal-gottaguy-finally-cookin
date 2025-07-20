// 🔥 PERFECT PRICING STRUCTURE - Copy this to your actual Pricing.tsx

const plans = [
  {
    name: "Free",
    subtitle: "Try the Cookin'",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for exploring SaintSal™ capabilities",
    features: [
      "100 AI conversations/month",
      "Basic GPT-4o access",
      "Community support",
      "Standard response time",
      "Web interface only",
    ],
    cta: "Start Free",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_FREE_PRICE_ID, // price_1RLChzFZsXxBWnj0VcveVdDf
    icon: MessageSquare,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Unlimited",
    subtitle: "Base Magic",
    price: { monthly: 27, yearly: 270 },
    description: "Where the magic starts flowing",
    features: [
      "Unlimited AI conversations",
      "GPT-4o access",
      "Basic CRM features",
      "Email support",
      "Chrome extension",
      "Standard response time",
    ],
    cta: "Get Unlimited",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_UNLIMITED_PRICE_ID, // price_1RINIMFZsXxBWnjQEYxlyUIy
    icon: Zap,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Pro",
    subtitle: "Your GOTTA GUY™",
    price: { monthly: 97, yearly: 970 },
    description: "🔥 WHERE ALL THE MAGIC UNLOCKS!",
    features: [
      "Everything in Unlimited",
      "Dual AI system (GPT-4o + Azure)",
      "Voice & SMS integration",
      "Full CRM access (GHL)",
      "PartnerTech integration",
      "Priority support",
      "Custom AI memory",
      "API access",
      "🔥 ALL MAGIC UNLOCKED",
    ],
    cta: "Unlock Magic 🔥",
    popular: true,
    stripePriceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID, // price_1IRNqvFZsXxBWnj0RlB9d1cP
    icon: Crown,
    gradient: "from-gold-400 to-gold-600",
  },
  {
    name: "Enterprise",
    subtitle: "Scale Mode",
    price: { monthly: 297, yearly: 2970 },
    description: "For teams ready to dominate",
    features: [
      "Everything in Pro",
      "Team management",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantees",
      "Multi-user management",
      "Priority deployment",
    ],
    cta: "Scale Up",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID, // price_1Rh5yFZsXxBWnj0w6p9KY0j
    icon: Building,
    gradient: "from-purple-500 to-purple-700",
  },
  {
    name: "White Label Elite",
    subtitle: "Empire Mode",
    price: { monthly: 497, yearly: 4970 },
    description: "Your own branded SaintVisionAI empire",
    features: [
      "Everything in Enterprise",
      "Full white-label branding",
      "Custom domain & SSL",
      "Unlimited user accounts",
      "Revenue sharing program",
      "Full source code access",
      "24/7 dedicated support",
      "Custom feature development",
    ],
    cta: "Build Empire",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_WHITE_LABEL_PRICE_ID, // price_1IRg90FZsXxBWnj0H3PHnVc6
    icon: Crown,
    gradient: "from-gold-500 to-gold-700",
  },
  {
    name: "Custom",
    subtitle: "Ultimate",
    price: { monthly: 1500, yearly: 15000 },
    description: "$1500 deposit for custom solutions",
    features: [
      "Everything in White Label",
      "Custom development",
      "Dedicated team",
      "White-glove onboarding",
      "Custom AI training",
      "Enterprise contracts",
      "Revenue guarantees",
      "Full customization",
    ],
    cta: "Custom Build",
    popular: false,
    stripePriceId: import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID,
    icon: Sparkles,
    gradient: "from-emerald-500 to-emerald-700",
  },
];

// ✅ STRIPE PRICE IDS MAPPED:
// Free: price_1RLChzFZsXxBWnj0VcveVdDf
// Unlimited ($27): price_1RINIMFZsXxBWnjQEYxlyUIy
// Pro ($97): price_1IRNqvFZsXxBWnj0RlB9d1cP
// Enterprise ($297): price_1Rh5yFZsXxBWnj0w6p9KY0j
// White Label ($497): price_1IRg90FZsXxBWnj0H3PHnVc6
// Custom ($1500): price_1Rh5yFZsXxBWnj0w6p9KY0j

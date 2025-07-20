# SaintVisionAI™ - Cookin' Knowledge

A production-ready full-stack React application with integrated Express server, featuring enterprise AI capabilities, CRM integration, and premium business tools.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Vercel Deployment

### Environment Variables Required:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# GoHighLevel Configuration
GHL_API_KEY=your_ghl_api_key
GHL_LOCATION_ID=your_ghl_location_id
```

### Deployment Steps:

1. Connect your GitHub repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Deploy! The `vercel.json` is already configured

## 🛠 Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server with Vercel serverless functions
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o + Azure Cognitive Services
- **CRM**: GoHighLevel Integration
- **UI**: Radix UI + Custom Components
- **Testing**: Vitest
- **Deployment**: Vercel

## 📁 Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components
├── components/ui/        # UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and integrations
├── App.tsx              # App entry point with routing
└── global.css           # TailwindCSS theming

server/                   # Express API backend
├── routes/               # API route handlers
├── lib/                  # Server utilities
└── index.ts              # Server configuration

api/                      # Vercel serverless functions
└── index.js              # API entry point for Vercel

shared/                   # Shared types and interfaces
└── api.ts                # API type definitions
```

## 🔐 Security Features

- AES-256 encryption
- SOC 2 compliance
- GDPR ready
- Faith-aligned data practices
- Enterprise security headers
- Rate limiting and DDoS protection

## 🎯 Key Features

### Core Platform

- AI Chat Console with dual AI engines
- Dashboard with analytics
- User authentication and authorization
- Plan-based access control

### Business Tools

- CRM integration with GoHighLevel
- Chrome extension automation
- AI-triggered workflows
- Client management system

### Enterprise Features

- White-label capabilities
- Team management
- Admin controls
- Advanced analytics

## 📊 Available Plans

- **Free**: Basic access
- **Unlimited** (\$27/mo): Full AI access
- **CRM Basic** (\$97/mo): Business tools + CRM
- **Enterprise** (\$297/mo): Team features + 5 CRM accounts
- **White Label** (\$497/mo): Full platform access + client management

## 🧪 Development

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Development with hot reload
npm run dev
```

## 📝 API Documentation

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint
- `POST /api/chat` - AI chat endpoint
- `POST /api/ghl-webhook` - GoHighLevel webhook
- `POST /api/subscription` - Stripe subscription management

## 🌟 HACP™ Technology

Built with patented HACP™ (Hierarchical Adaptive Cognitive Processing) protocol that allows Large Language Blocks to learn 10-20x faster with additional patent-pending technologies.

## 📞 Support

- Help documentation: `/help`
- Technical support: Built-in chat system
- Enterprise support: Contact for dedicated support

---

© 2025 Saint Vision Group LLC. All rights reserved.
**US Patent 10,290,222** | Enterprise Security | Faith-Aligned

# 🚨 CRITICAL FILES TO UPDATE ON YOUR LOCAL COMPUTER

## **MOST IMPORTANT FILES TO COPY:**

### 1. **Environment Configuration**

- `.env` (NEW - contains live Stripe keys)
- `.env.example` (UPDATED - with all Stripe price IDs)

### 2. **Stripe Integration**

- `client/lib/stripe.ts` (UPDATED - live price IDs)
- `api/stripe-webhook.ts` (UPDATED - price mapping)

### 3. **Components with Branding Fixes**

- `client/components/AppSidebar.tsx` (FIXED - removed duplicate imports)
- `client/components/ui/button.tsx` (FIXED - button visibility)
- `client/pages/Workspace.tsx` (UPDATED - centered logo + branding)
- `client/pages/CRM.tsx` (UPDATED - PartnerTech branding)
- `client/pages/Dashboard.tsx` (UPDATED - dynamic branding)

### 4. **Core System Files**

- `client/pages/CreateAgent.tsx` (COMPLETE - 8-step wizard)
- `api/create-agent.ts` (COMPLETE - agent provisioning)
- `api/supersal-escalation.ts` (NEW - HACP™ system)

## 📦 **QUICK FIX OPTIONS:**

**Option A: Download & Replace** (Fastest)
I'll create a zip with all updated files

**Option B: Copy Key Files** (Manual)
I'll give you the exact content to copy/paste

**Option C: Git Force Sync** (If possible)
Try to pull the cloud changes

Which option do you want? Without these updates, your deployment won't work with live Stripe payments! 🚨

# 🚀 GoHighLevel Setup Guide - Complete Client Provisioning System

## ✅ What You Need to Do in GHL (Step by Step)

### 1. 🔑 API Configuration in Your GHL Agency Account

**Go to Agency Settings → Integrations → API**

```
✅ Enable API Access
✅ Generate Agency API Key: pit-2f264858-06c7-402c-9ff2-59124bfff8f8 (Your current key)
✅ Set API Permissions:
   - Create/Manage Locations ✅
   - Manage Contacts ✅
   - Manage Opportunities ✅
   - Manage Pipelines ✅
   - Trigger Workflows ✅
   - Access Calendars ✅
   - Send Messages ✅
```

### 2. 🪝 Webhook Configuration

**Settings → Integrations → Webhooks**

**Add Webhook URL:**

```
https://yourdomain.com/api/ghl-webhook
```

**Enable These Events:**

- ✅ contact.created
- ✅ contact.updated
- ✅ opportunity.created
- ✅ opportunity.status_changed
- ✅ appointment.booked
- ✅ appointment.cancelled
- ✅ workflow.completed
- ✅ payment.received

**Authentication Header:**

```
Authorization: Bearer YOUR_WEBHOOK_SECRET_KEY
```

### 3. 💳 Payment Integration (Stripe → GHL → Auto-Provisioning)

**Stripe Webhook Configuration:**

```
Endpoint: https://yourdomain.com/api/payment-webhook
Events to Listen:
- payment_intent.succeeded
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

**Required Metadata in Stripe:**

```javascript
// When creating payment intent or subscription
metadata: {
  planType: "starter|pro|enterprise|white_label",
  clientName: "Client Business Name",
  customDomain: "client.yourdomain.com" // Optional
}
```

### 4. 🏗️ Automatic Client Provisioning Flow

```mermaid
graph TD
    A[Customer Pays] --> B[Stripe Webhook Triggered]
    B --> C[Payment Verification]
    C --> D[Create GHL Sub-Account]
    D --> E[Generate Client API Key]
    E --> F[Create Subdomain]
    F --> G[Configure DNS]
    G --> H[Generate SSL Certificate]
    H --> I[Send Welcome Email]
    I --> J[Client Gets Access]
```

### 5. 🎯 Your Single GHL API Key Handles Everything

**With API Key: `pit-2f264858-06c7-402c-9ff2-59124bfff8f8`**

| Feature                                          | Status |
| ------------------------------------------------ | ------ |
| Dual-AI pushing leads into CRM                   | ✅     |
| Triggering GHL workflows                         | ✅     |
| Booking automations                              | ✅     |
| Pipeline stage updates                           | ✅     |
| Escalation tags via Supersal™                    | ✅     |
| Contact logging from /help or /console           | ✅     |
| Voice/SMS fallback to CRM                        | ✅     |
| Training Supersal with CRM-aware logic           | ✅     |
| Handling Athena, Eby, SVT, PartnerTech pipelines | ✅     |

### 6. 🛡️ Plan Limits & Access Control

**Starter Plan (\$47/mo):**

- 1,000 contacts
- 2 users
- 5 funnels
- 10 campaigns
- Basic CRM features

**Pro Plan (\$97/mo):**

- 10,000 contacts
- 5 users
- 25 funnels
- 50 campaigns
- Full CRM + AI features

**Enterprise (\$297/mo):**

- 100,000 contacts
- 25 users
- 100 funnels
- 200 campaigns
- Priority support

**White Label (\$997/mo):**

- Unlimited everything
- Custom branding
- Reseller portal

### 7. 🔧 Implementation Checklist

```bash
# 1. Environment Variables
GHL_API_KEY=pit-2f264858-06c7-402c-9ff2-59124bfff8f8
GHL_WEBHOOK_SECRET=your_webhook_secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDFLARE_API_TOKEN=your_cloudflare_token
CLOUDFLARE_ZONE_ID=your_zone_id

# 2. Database Tables Needed
- clients (id, name, email, plan_type, ghl_location_id, subdomain, status)
- client_usage (client_id, contacts, users, funnels, campaigns, updated_at)
- access_logs (client_id, feature, timestamp, ip, user_agent)

# 3. DNS Configuration
- Wildcard CNAME: *.saintvision.ai → saintvision.ai
- SSL Certificate: Let's Encrypt or Cloudflare
```

### 8. 🎬 What Happens When Client Pays

**Automatic Flow:**

1. **Payment Success** → Stripe webhook fires
2. **Client Creation** → GHL sub-account created with your API key
3. **Subdomain Setup** → `clientname.saintvision.ai` configured
4. **Access Control** → Plan limits enforced
5. **Welcome Email** → Login details sent
6. **Live Access** → Client can immediately use their portal

### 9. 🚨 Monitoring & Management

**Real-time Monitoring:**

- Payment status tracking
- Usage limit enforcement
- GHL API rate limiting
- Client access logs
- Error notifications

**Admin Dashboard Features:**

- View all clients
- Suspend/reactivate accounts
- Monitor usage metrics
- GHL integration status
- Billing management

### 10. 🧪 Testing Checklist

```bash
# Test Payment Flow
✅ Create test payment in Stripe
✅ Verify webhook triggers
✅ Check GHL sub-account creation
✅ Test subdomain access
✅ Verify plan limits work

# Test GHL Integration
✅ Create contact via API
✅ Trigger workflow
✅ Update pipeline stage
✅ Test webhook events
✅ Verify data sync

# Test Access Control
✅ Try accessing with suspended account
✅ Test plan limit enforcement
✅ Verify rate limiting
✅ Test custom domain setup
```

---

## 🎯 Ready to Deploy!

Your system is now configured to:

1. **Accept payments** → Automatically provision GHL accounts
2. **Create subdomains** → Instant client access
3. **Enforce limits** → Plan-based restrictions
4. **Monitor usage** → Real-time tracking
5. **Scale infinitely** → One API key, unlimited clients

**Next:** Let's set up the AI training system with OpenAI and Azure! 🤖

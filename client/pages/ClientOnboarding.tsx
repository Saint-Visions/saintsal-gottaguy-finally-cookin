import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Crown,
  Users,
  Globe,
  Mail,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Copy,
  Settings,
  Zap,
  Shield,
} from "lucide-react";

interface ClientData {
  id: string;
  name: string;
  email: string;
  planType: string;
  subdomain: string;
  ghlLocationId?: string;
  ghlApiKey?: string;
  status: "pending" | "provisioning" | "active" | "suspended";
  limits: any;
  usage: any;
  createdAt: string;
}

export default function ClientOnboarding() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    planType: "starter",
    customDomain: "",
    stripeCustomerId: "",
  });
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  // Load clients on mount
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await fetch("/api/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error("Failed to load clients:", error);
    }
  };

  const handleProvisionClient = async () => {
    if (!newClient.name || !newClient.email) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProvisioning(true);
    try {
      const response = await fetch("/api/client-provisioning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Client provisioned:", result);

        // Reset form
        setNewClient({
          name: "",
          email: "",
          planType: "starter",
          customDomain: "",
          stripeCustomerId: "",
        });

        // Reload clients
        loadClients();
      } else {
        const error = await response.text();
        alert(`Failed to provision client: ${error}`);
      }
    } catch (error) {
      console.error("Provisioning error:", error);
      alert("Failed to provision client");
    } finally {
      setIsProvisioning(false);
    }
  };

  const handleSuspendClient = async (clientId: string) => {
    try {
      const response = await fetch(
        `/api/client-provisioning/${clientId}/suspend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: "Manual suspension" }),
        },
      );

      if (response.ok) {
        loadClients();
      }
    } catch (error) {
      console.error("Suspension error:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const planLimits = {
    starter: { contacts: 1000, users: 2, price: "$47/mo" },
    pro: { contacts: 10000, users: 5, price: "$97/mo" },
    enterprise: { contacts: 100000, users: 25, price: "$297/mo" },
    white_label: {
      contacts: "Unlimited",
      users: "Unlimited",
      price: "$997/mo",
    },
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold saintvision-gradient-text mb-2">
                Client Onboarding Hub
              </h1>
              <p className="text-white/70">
                Provision GHL accounts and manage client access with payment
                verification
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                GHL Connected
              </Badge>
              <Button
                variant="outline"
                onClick={loadClients}
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* GHL Setup Instructions */}
        <Alert className="mb-8 border-gold-500/30 bg-gold-500/10">
          <AlertCircle className="h-4 w-4 text-gold-300" />
          <AlertDescription className="text-gold-200">
            <strong>GHL Setup Required:</strong> Configure webhooks in your GHL
            agency account:
            <br />• Contact Events:{" "}
            <code className="bg-black/30 px-1 rounded">
              https://yourdomain.com/api/ghl-webhook
            </code>
            <br />• Pipeline Events:{" "}
            <code className="bg-black/30 px-1 rounded">
              https://yourdomain.com/api/payment-webhook
            </code>
            <br />• Payment Events: Connect Stripe webhooks to auto-provision
            accounts
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Client Form */}
          <div className="lg:col-span-1">
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-300" />
                Provision New Client
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Client Name *
                  </label>
                  <Input
                    value={newClient.name}
                    onChange={e =>
                      setNewClient({ ...newClient, name: e.target.value })
                    }
                    placeholder="Acme Corporation"
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={newClient.email}
                    onChange={e =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                    placeholder="contact@acme.com"
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Plan Type
                  </label>
                  <select
                    value={newClient.planType}
                    onChange={e =>
                      setNewClient({ ...newClient, planType: e.target.value })
                    }
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white"
                  >
                    <option value="starter">Starter - $47/mo</option>
                    <option value="pro">Pro - $97/mo</option>
                    <option value="enterprise">Enterprise - $297/mo</option>
                    <option value="white_label">White Label - $997/mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Custom Domain (Optional)
                  </label>
                  <Input
                    value={newClient.customDomain}
                    onChange={e =>
                      setNewClient({
                        ...newClient,
                        customDomain: e.target.value,
                      })
                    }
                    placeholder="client.yourdomain.com"
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Stripe Customer ID
                  </label>
                  <Input
                    value={newClient.stripeCustomerId}
                    onChange={e =>
                      setNewClient({
                        ...newClient,
                        stripeCustomerId: e.target.value,
                      })
                    }
                    placeholder="cus_..."
                    className="bg-white/5 border-white/20"
                  />
                </div>

                <Button
                  onClick={handleProvisionClient}
                  disabled={isProvisioning}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isProvisioning ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Provisioning...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Provision Client
                    </>
                  )}
                </Button>
              </div>

              {/* Plan Limits Display */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-sm font-medium text-white/70 mb-3">
                  {newClient.planType.charAt(0).toUpperCase() +
                    newClient.planType.slice(1)}{" "}
                  Plan Limits
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contacts:</span>
                    <span className="text-gold-300">
                      {
                        planLimits[
                          newClient.planType as keyof typeof planLimits
                        ]?.contacts
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Users:</span>
                    <span className="text-gold-300">
                      {
                        planLimits[
                          newClient.planType as keyof typeof planLimits
                        ]?.users
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="text-green-300">
                      {
                        planLimits[
                          newClient.planType as keyof typeof planLimits
                        ]?.price
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client List */}
          <div className="lg:col-span-2">
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-green-300" />
                Active Clients ({clients.length})
              </h2>

              <div className="space-y-4">
                {clients.length === 0 ? (
                  <div className="text-center py-12 text-white/50">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No clients provisioned yet</p>
                    <p className="text-sm">
                      Start by provisioning your first client account
                    </p>
                  </div>
                ) : (
                  clients.map(client => (
                    <div
                      key={client.id}
                      className="glass-morphism p-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold">{client.name}</h3>
                            <Badge
                              className={
                                client.status === "active"
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : client.status === "provisioning"
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-300 border-red-500/30"
                              }
                            >
                              <span
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  client.status === "active"
                                    ? "bg-green-400"
                                    : client.status === "provisioning"
                                    ? "bg-yellow-400 animate-pulse"
                                    : "bg-red-400"
                                }`}
                              ></span>
                              {client.status}
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {client.planType}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {client.email}
                            </div>
                            <div className="flex items-center">
                              <Globe className="w-3 h-3 mr-1" />
                              {client.subdomain}
                            </div>
                            {client.ghlLocationId && (
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                                GHL ID: {client.ghlLocationId.slice(0, 8)}...
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(client.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(`https://${client.subdomain}`)
                            }
                            className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(
                                `https://${client.subdomain}`,
                                "_blank",
                              )
                            }
                            className="border-green-500/50 text-green-300 hover:bg-green-500/10"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedClient(client)}
                            className="border-gold-500/50 text-gold-300 hover:bg-gold-500/10"
                          >
                            <Settings className="w-3 h-3" />
                          </Button>
                          {client.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspendClient(client.id)}
                              className="border-red-500/50 text-red-300 hover:bg-red-500/10"
                            >
                              <Shield className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Usage Stats */}
                      {client.usage && (
                        <div className="mt-4 grid grid-cols-4 gap-4 text-xs">
                          <div className="text-center">
                            <div className="text-white/50">Contacts</div>
                            <div className="font-medium">
                              {client.usage.contacts} /{" "}
                              {client.limits?.contacts || "∞"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-white/50">Users</div>
                            <div className="font-medium">
                              {client.usage.users} /{" "}
                              {client.limits?.users || "∞"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-white/50">Funnels</div>
                            <div className="font-medium">
                              {client.usage.funnels} /{" "}
                              {client.limits?.funnels || "∞"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-white/50">Campaigns</div>
                            <div className="font-medium">
                              {client.usage.campaigns} /{" "}
                              {client.limits?.campaigns || "∞"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* GHL Setup Guide */}
        <div className="mt-8 glass-morphism rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-300" />
            GoHighLevel Setup Instructions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-300 mb-3">
                1. Webhook Configuration
              </h3>
              <div className="space-y-2 text-sm">
                <p>In your GHL Agency Dashboard:</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Go to Settings → Integrations → Webhooks</li>
                  <li>
                    Add webhook URL:{" "}
                    <code className="bg-black/30 px-1 rounded">
                      https://yourdomain.com/api/ghl-webhook
                    </code>
                  </li>
                  <li>
                    Enable: Contact Created, Opportunity Created, Appointment
                    Booked
                  </li>
                  <li>
                    Set Authentication Header:{" "}
                    <code className="bg-black/30 px-1 rounded">
                      Bearer YOUR_WEBHOOK_SECRET
                    </code>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-300 mb-3">
                2. Payment Integration
              </h3>
              <div className="space-y-2 text-sm">
                <p>Stripe Configuration:</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>
                    Add webhook endpoint:{" "}
                    <code className="bg-black/30 px-1 rounded">
                      https://yourdomain.com/api/payment-webhook
                    </code>
                  </li>
                  <li>
                    Select events: payment_intent.succeeded,
                    customer.subscription.created
                  </li>
                  <li>Include metadata: planType, clientName, customDomain</li>
                  <li>Test with Stripe CLI for verification</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-purple-300 mb-3">
                3. API Key Management
              </h3>
              <div className="space-y-2 text-sm">
                <p>Your single GHL API key handles:</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>✅ Sub-account creation & management</li>
                  <li>✅ Contact/opportunity sync</li>
                  <li>✅ Pipeline stage updates</li>
                  <li>✅ Automation triggers</li>
                  <li>✅ Multi-workspace support</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gold-300 mb-3">
                4. Access Control
              </h3>
              <div className="space-y-2 text-sm">
                <p>Automatic provisioning flow:</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>💳 Payment succeeds → Client account created</li>
                  <li>��️ GHL sub-account provisioned automatically</li>
                  <li>🌐 Custom subdomain configured</li>
                  <li>📧 Welcome email with access details</li>
                  <li>🚫 Usage limits enforced in real-time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

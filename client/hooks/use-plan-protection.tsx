import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export type UserPlan =
  | "free"
  | "unlimited"
  | "crm"
  | "enterprise"
  | "white_label";

interface PlanProtectionOptions {
  requiredPlan: UserPlan[];
  redirectTo?: string;
  fallbackComponent?: React.ComponentType;
}

interface UserPlanData {
  plan: UserPlan;
  isLoading: boolean;
  hasAccess: boolean;
}

// Route access mapping for Phase 2
const ROUTE_PLAN_MAP: Record<string, UserPlan[]> = {
  "/partnertech": ["crm", "enterprise", "white_label"],
  "/crm": ["crm", "enterprise", "white_label"],
  "/admin": ["white_label"],
  "/teams": ["enterprise", "white_label"],
  "/dashboard": ["unlimited", "crm", "enterprise", "white_label"],
  "/settings": ["unlimited", "crm", "enterprise", "white_label"],
  "/help": ["unlimited", "crm", "enterprise", "white_label"],
};

export function usePlanProtection(
  options: PlanProtectionOptions,
): UserPlanData {
  const [plan, setPlan] = useState<UserPlan>("free");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const hasAccess = options.requiredPlan.includes(plan);

  useEffect(() => {
    async function checkUserPlan() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setPlan("free");
          setIsLoading(false);
          return;
        }

        // Check subscription status
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan_role, status")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        const userPlan =
          subscription?.plan_role || user.user_metadata?.plan || "free";
        setPlan(userPlan as UserPlan);

        // Redirect if user doesn't have access
        if (!options.requiredPlan.includes(userPlan as UserPlan)) {
          console.log(
            `🔒 Access denied: User has '${userPlan}' plan, needs one of: [${options.requiredPlan.join(
              ", ",
            )}]`,
          );
          navigate(options.redirectTo || "/upgrade");
        }
      } catch (error) {
        console.error("Error checking user plan:", error);
        setPlan("free");
      } finally {
        setIsLoading(false);
      }
    }

    checkUserPlan();
  }, [options.requiredPlan, options.redirectTo, navigate]);

  return { plan, isLoading, hasAccess };
}

// Hook for getting current user plan without protection
export function useUserPlan(): UserPlanData {
  const [plan, setPlan] = useState<UserPlan>("free");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserPlan() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setPlan("free");
          setIsLoading(false);
          return;
        }

        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan_role, status")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        const userPlan =
          subscription?.plan_role || user.user_metadata?.plan || "free";
        setPlan(userPlan as UserPlan);
      } catch (error) {
        console.error("Error getting user plan:", error);
        setPlan("free");
      } finally {
        setIsLoading(false);
      }
    }

    getUserPlan();
  }, []);

  return { plan, isLoading, hasAccess: true };
}

// Route protection component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPlan: UserPlan[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredPlan,
  fallback,
}: ProtectedRouteProps) {
  const { hasAccess, isLoading } = usePlanProtection({
    requiredPlan,
    redirectTo: "/upgrade",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return fallback || null;
  }

  return <>{children}</>;
}

// Helper to check if user can access a specific route
export function canAccessRoute(route: string, userPlan: UserPlan): boolean {
  const requiredPlans = ROUTE_PLAN_MAP[route];
  if (!requiredPlans) return true; // Route not protected
  return requiredPlans.includes(userPlan);
}

// Plan upgrade prompts
export function getUpgradePrompt(
  currentPlan: UserPlan,
  targetRoute: string,
): string {
  const requiredPlans = ROUTE_PLAN_MAP[targetRoute];
  if (!requiredPlans) return "";

  if (targetRoute.includes("partnertech") || targetRoute.includes("crm")) {
    return currentPlan === "free"
      ? "Upgrade to Unlimited ($27/mo) first, then CRM Basic ($97/mo) to access business tools"
      : currentPlan === "unlimited"
      ? "Upgrade to CRM Basic Plan ($97/mo) to access PartnerTech and CRM features"
      : "Upgrade your plan to access advanced business features";
  }

  if (targetRoute.includes("teams")) {
    return "Enterprise Plan ($297/mo) required for team management and 5 CRM accounts";
  }

  if (targetRoute.includes("admin")) {
    return "White Label Plan ($497/mo) required for admin access and client management";
  }

  return "Upgrade your plan to access this feature";
}

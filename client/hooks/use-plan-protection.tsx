"use client";

import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase"; // ✅ ensure correct named export

// 🧠 Hook: Retrieve current user plan
export function useUserPlan() {
  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("free");

  useEffect(() => {
    const fetchPlan = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) console.warn("❗️Supabase user error:", error);
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

      if (data?.plan) setPlan(data.plan);
    };

    fetchPlan();
  }, []);

  return { plan };
}

// 🔐 Wrapper for protected routes
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { plan } = useUserPlan();

  if (plan !== "pro" && plan !== "enterprise") {
    return (
      <div className="p-6 text-center text-red-500">
        🔒 You must upgrade to access this feature.
      </div>
    );
  }

  return <>{children}</>;
}

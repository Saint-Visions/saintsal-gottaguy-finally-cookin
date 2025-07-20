import React from "react";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
}

export function AppLayout({
  children,
  className,
  showSidebar = true,
}: AppLayoutProps) {
  if (!showSidebar) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className={cn("flex-1 flex flex-col overflow-hidden", className)}>
        {children}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { builder, Builder } from "@builder.io/react";

import BuilderContent from "@components/BuilderContent";
import { Footer } from "@components/Footer";
import { customComponents } from "@lib/builder-registry";

// ✅ Initialize Builder.io
builder.init(
  process.env.NEXT_PUBLIC_BUILDER_API_KEY || "065997bd13e4442e888a06652fcd61ba"
);

// ✅ Register components once on mount
customComponents.forEach((component) => {
  Builder.registerComponent(component.component, component);
});
=======
import BuilderContent from "@/components/BuilderContent";
import { Footer } from "@/components/Footer";

// Component registration is now handled in the root builder-registry.ts
// and integrated with Next.js app routes

interface PageProps {
  params?: {
    slug?: string[];
  };
}
>>>>>>> cb54c0e5 (🚀 BUILD 556: FINAL VICTORY! Builder.io integration complete - 17 months of work READY! 🎉)

export default function BuilderPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    builder
      .get("page", {
        url: location.pathname,
        prerender: false,
      })
      .promise()
      .then((res) => {
        setContent(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching Builder.io content:", err);
        setLoading(false);
      });
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full mx-auto mb-4"></div>
          </div>
          <p className="text-gold-300">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-gold-300">404</h1>
          <p className="text-white/80 mb-6">
            Page not found. Make sure it's published in Builder.io.
          </p>
          <a
            href="/"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </a>
        </div>
=======
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // For SPA routes, we'll use a simple approach
        // The main Builder.io integration is now in app/page.tsx
        // This component is mainly for compatibility with existing React Router setup
        
        const pathname = location.pathname;
        
        // If this is a Builder.io managed page, redirect to the main homepage
        // which has proper Builder.io integration
        if (pathname === '/builder' || pathname.startsWith('/builder/')) {
          window.location.href = '/';
          return;
        }
        
        // For other cases, show a fallback
        setContent(null);
      } catch (error) {
        console.error("Error fetching Builder content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-800 flex items-center justify-center">
        <div className="text-gold-500 text-xl">Loading Builder content...</div>
>>>>>>> cb54c0e5 (🚀 BUILD 556: FINAL VICTORY! Builder.io integration complete - 17 months of work READY! 🎉)
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-800">
      {content ? (
        <BuilderContent
          model="page"
          content={content}
        />
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gold-500 mb-4">
            SaintVisionAI Builder
          </h1>
          <p className="text-white/80 mb-8">
            Content management is now integrated with the main homepage.
          </p>
          <a 
            href="/"
            className="inline-block bg-gold-500 text-charcoal-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
}

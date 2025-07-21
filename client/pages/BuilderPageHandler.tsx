import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BuilderContent from '@/components/BuilderContent';
import { Footer } from '@/components/Footer';

// This component is for React Router compatibility
// Main Builder.io integration is now in app/page.tsx with Next.js App Router

export default function BuilderPageHandler() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to main homepage which has proper Builder.io integration
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 2000);

    setLoading(false);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
              alt="SaintVisionAI Logo"
              className="w-16 h-16 object-contain mx-auto mb-4 opacity-50"
            />
          </div>
          <p className="text-gold-300 font-medium">Loading SaintVisionAI...</p>
          <p className="text-white/60 text-sm mt-2">Powered by Builder.io</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
          alt="SaintVisionAI Logo"
          className="w-16 h-16 object-contain mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4 text-gold-300">Redirecting...</h1>
        <p className="text-white/80 mb-6">
          Builder.io content is now managed through the main homepage.
        </p>
        <p className="text-white/60 text-sm mb-6">
          You will be redirected automatically...
        </p>
        <a 
          href="/" 
          className="inline-block bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go to Homepage Now
        </a>
      </div>
      <Footer />
    </div>
  );
}

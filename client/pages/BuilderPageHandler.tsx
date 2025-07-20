import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { builder } from '@builder.io/react';
import BuilderContent from '@/components/BuilderContent';
import { Footer } from '@/components/Footer';

// Initialize Builder
builder.init(import.meta.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba');

export default function BuilderPageHandler() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlPath = location.pathname;
    
    setLoading(true);
    setError(false);
    
    builder
      .get('page', {
        url: urlPath,
        prerender: false,
        cacheSeconds: 1, // Fresh content
      })
      .promise()
      .then((content) => {
        setContent(content);
        setLoading(false);
        
        // Update page title if Builder.io provides one
        if (content?.data?.title) {
          document.title = content.data.title;
        }
      })
      .catch((error) => {
        console.error('Error fetching Builder content for:', urlPath, error);
        setError(true);
        setLoading(false);
      });
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

  if (error || !content) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
            alt="SaintVisionAI Logo"
            className="w-16 h-16 object-contain mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-4 text-gold-300">Page Not Found</h1>
          <p className="text-white/80 mb-6">
            This page isn't available in Builder.io yet.
          </p>
          <p className="text-white/60 text-sm mb-6">
            Path: {location.pathname}
          </p>
          <a 
            href="/" 
            className="inline-block bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      <BuilderContent 
        model="page" 
        content={content}
        data={{
          // Pass any additional data to Builder.io content
          pathname: location.pathname,
          search: location.search,
        }}
      />
      <Footer />
    </div>
  );
}

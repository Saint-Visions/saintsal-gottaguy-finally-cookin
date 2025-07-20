import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { builder } from '@builder.io/react';
import BuilderContent from '@/components/BuilderContent';
import { Footer } from '@/components/Footer';
import { customComponents } from '../../builder-registry';

// Initialize Builder
builder.init(process.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06652fcd61ba');

// Register custom components
customComponents.forEach((component) => {
  builder.registerComponent(component.component, component);
});

export default function BuilderPage() {
  const { '*': slug } = useParams();
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlPath = location.pathname;

    builder
      .get('page', {
        url: urlPath,
        prerender: false,
      })
      .promise()
      .then((content) => {
        setContent(content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Builder content:', error);
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
            Page not found. Make sure you have your content published at Builder.io.
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
      <BuilderContent model="page" content={content} />
      <Footer />
    </div>
  );
}

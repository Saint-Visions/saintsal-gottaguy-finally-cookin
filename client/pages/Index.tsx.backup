import React, { useState, useEffect } from 'react';
import { builder } from '@builder.io/react';
import BuilderContent from '@/components/BuilderContent';
import { Footer } from '@/components/Footer';

// Initialize Builder
builder.init(import.meta.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba');

export default function Index() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    builder
      .get('page', {
        url: '/',
        prerender: false,
      })
      .promise()
      .then((content) => {
        setContent(content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Builder homepage content:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full mx-auto mb-4"></div>
          </div>
          <p className="text-gold-300">Loading SaintVisionAI...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-gold-300">Content Not Found</h1>
          <p className="text-white/80 mb-6">
            Make sure your homepage content is published in Builder.io.
          </p>
          <p className="text-white/60 text-sm">
            Your original homepage has been backed up to Index.tsx.backup
          </p>
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

import { builder } from '@builder.io/react';
import { customComponents } from '../../builder-registry';

// Initialize Builder.io with API key
const BUILDER_API_KEY = import.meta.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba';

export const initializeBuilder = () => {
  // Initialize Builder
  builder.init(BUILDER_API_KEY);
  
  // Register custom components
  customComponents.forEach((component) => {
    builder.registerComponent(component.component, component);
  });
  
  // Set up any additional Builder.io configuration
  builder.canTrack = true; // Enable analytics
  
  return builder;
};

export { builder };
export default builder;

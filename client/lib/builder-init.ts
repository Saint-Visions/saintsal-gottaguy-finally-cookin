import { builder } from "@builder.io/react";
import { customComponents } from "../../builder-registry";

let isInitialized = false;

// Initialize Builder.io with comprehensive settings
export const initializeBuilderComprehensive = () => {
  if (isInitialized) {
    console.log("Builder.io already initialized, skipping...");
    return builder;
  }

  const BUILDER_API_KEY =
    import.meta.env.VITE_BUILDER_API_KEY || "065997bd13e4442e888a06852fcd61ba";

  try {
    // Initialize Builder
    builder.init(BUILDER_API_KEY);

    // Wait a tick to ensure builder is ready
    setTimeout(() => {
      // Register all custom components
      customComponents.forEach(component => {
        try {
          builder.registerComponent(component.component, component);
          console.log(`Registered component: ${component.name}`);
        } catch (error) {
          console.error(
            `Failed to register component ${component.name}:`,
            error,
          );
        }
      });
    }, 0);

    // Enable analytics and tracking
    builder.canTrack = true;

    // Set up Builder.io environment
    if (import.meta.env.BUILDER_ENVIRONMENT) {
      builder.env = import.meta.env.BUILDER_ENVIRONMENT;
    }

    // Configure Builder.io settings for your SaintVisionAI project
    builder.setUserAgent("SaintVisionAI/1.0");

    // Enable preview mode for development
    if (import.meta.env.DEV) {
      builder.prerender = false;
      builder.cachebust = true;
    }

    isInitialized = true;
    console.log(
      "Builder.io initialized for SaintVisionAI with API key:",
      BUILDER_API_KEY,
    );

    return builder;
  } catch (error) {
    console.error("Failed to initialize Builder.io:", error);
    return builder;
  }
};

export { builder };

import { type RegisteredComponent } from "@builder.io/react";

// Static imports for custom components
import { SaintVisionHero } from "./client/components/builder/SaintVisionHero";
import { SaintVisionFeatureGrid } from "./client/components/builder/SaintVisionFeatureGrid";
import { SaintVisionSecurityVault } from "./client/components/builder/SaintVisionSecurityVault";
import { SaintVisionNavigation } from "./client/components/builder/SaintVisionNavigation";
import { SaintVisionCTA } from "./client/components/builder/SaintVisionCTA";

export const customComponents: RegisteredComponent[] = [
  {
    component: SaintVisionHero,
    name: "SaintVisionHero",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "SaintSal™",
        required: false,
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "Cookin' Knowledge.",
        required: false,
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "AI doesn't just answer. It adapts. It empowers. It becomes your enterprise companion.",
        required: false,
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Start Cookin' Knowledge",
        required: false,
      },
      {
        name: "ctaLink",
        type: "string",
        defaultValue: "/dashboard",
        required: false,
      },
      {
        name: "secondaryCtaText",
        type: "string",
        defaultValue: "Try CRM Tools",
        required: false,
      },
      {
        name: "secondaryCtaLink",
        type: "string",
        defaultValue: "/partnertech",
        required: false,
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        required: false,
      },
      {
        name: "logoImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "svg"],
        required: false,
      },
      {
        name: "badgeText",
        type: "string",
        defaultValue: "Enterprise Ready",
        required: false,
      },
    ],
  },
  {
    component: SaintVisionFeatureGrid,
    name: "SaintVisionFeatureGrid",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Elite Technology",
        required: false,
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "ENTERPRISE READY",
        required: false,
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Dual AI systems handle your business operations while you focus on what matters - growing your empire.",
        required: false,
      },
    ],
  },
  {
    component: SaintVisionSecurityVault,
    name: "SaintVisionSecurityVault",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Vault & Security",
        required: false,
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "Faith-Aligned Data Protection",
        required: false,
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Bank-grade security meets faith-centered values. Your data protected with military-grade encryption and ethical business practices.",
        required: false,
      },
    ],
  },
  {
    component: SaintVisionNavigation,
    name: "SaintVisionNavigation",
    inputs: [
      {
        name: "brandName",
        type: "string",
        defaultValue: "SaintVisionAI™",
        required: false,
      },
      {
        name: "tagline",
        type: "string",
        defaultValue: "Cookin' Knowledge",
        required: false,
      },
      {
        name: "logoUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp", "svg"],
        required: false,
      },
    ],
  },
  {
    component: SaintVisionCTA,
    name: "SaintVisionCTA",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Elite AI Sanctuary",
        required: false,
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "THE MOVEMENT",
        required: false,
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Built for those who refuse to compromise on excellence, privacy, or values. Join thousands who've discovered their GOTTA GUY®.",
        required: false,
      },
      {
        name: "primaryCtaText",
        type: "string",
        defaultValue: "Join The Movement",
        required: false,
      },
      {
        name: "primaryCtaLink",
        type: "string",
        defaultValue: "/dashboard",
        required: false,
      },
      {
        name: "secondaryCtaText",
        type: "string",
        defaultValue: "Discover Your Guy",
        required: false,
      },
      {
        name: "secondaryCtaLink",
        type: "string",
        defaultValue: "/why",
        required: false,
      },
    ],
  },
];

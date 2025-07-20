import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY!,
);

export default stripePromise;

// Stripe price IDs - LIVE PRODUCTION
export const STRIPE_PRICE_IDS = {
  FREE:
    import.meta.env.VITE_STRIPE_FREE_PRICE_ID ||
    "price_1RLChzFZsXxBWnj0VcveVdDf",
  UNLIMITED:
    import.meta.env.VITE_STRIPE_UNLIMITED_PRICE_ID ||
    "price_1RINIMFZsXxBWnjQEYxlyUIy",
  PRO:
    import.meta.env.VITE_STRIPE_PRO_PRICE_ID ||
    "price_1IRNqvFZsXxBWnj0RlB9d1cP",
  WHITE_LABEL:
    import.meta.env.VITE_STRIPE_WHITE_LABEL_PRICE_ID ||
    "price_1IRg90FZsXxBWnj0H3PHnVc6",
  CUSTOM:
    import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID ||
    "price_1Rh5yFZsXxBWnj0w6p9KY0j",
};

// Plan tier mappings for consistency
export const PLAN_TIERS = {
  free: { name: "Free", priceId: STRIPE_PRICE_IDS.FREE, price: 0 },
  unlimited: {
    name: "Unlimited",
    priceId: STRIPE_PRICE_IDS.UNLIMITED,
    price: 97,
  },
  pro: { name: "Pro", priceId: STRIPE_PRICE_IDS.PRO, price: 297 },
  "white-label": {
    name: "White Label",
    priceId: STRIPE_PRICE_IDS.WHITE_LABEL,
    price: 497,
  },
  custom: { name: "Custom", priceId: STRIPE_PRICE_IDS.CUSTOM, price: 997 },
};

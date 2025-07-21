import { loadStripe } from "@stripe/stripe-js";

// ✅ Use NEXT_PUBLIC_ for client-safe keys (Next.js requirement)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default stripePromise;

// ✅ Stripe Price IDs — pulled from env or fallback
export const STRIPE_PRICE_IDS = {
  FREE: process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID || "price_1RLChzFZsXxBWnj0VcveVdDf",
  UNLIMITED: process.env.NEXT_PUBLIC_STRIPE_UNLIMITED_PRICE_ID || "price_1RINIMFZsXxBWnjQEYxlyUIy",
  PRO: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_1IRNqvFZsXxBWnj0RlB9d1cP",
  WHITE_LABEL: process.env.NEXT_PUBLIC_STRIPE_WHITE_LABEL_PRICE_ID || "price_1IRg90FZsXxBWnj0H3PHnVc6",
  CUSTOM: process.env.NEXT_PUBLIC_STRIPE_CUSTOM_PRICE_ID || "price_1Rh5yFZsXxBWnj0w6p9KY0j",
};

// ✅ Plan mappings
export const PLAN_TIERS = {
  free: { name: "Free", priceId: STRIPE_PRICE_IDS.FREE, price: 0 },
  unlimited: { name: "Unlimited", priceId: STRIPE_PRICE_IDS.UNLIMITED, price: 97 },
  pro: { name: "Pro", priceId: STRIPE_PRICE_IDS.PRO, price: 297 },
  "white-label": { name: "White Label", priceId: STRIPE_PRICE_IDS.WHITE_LABEL, price: 497 },
  custom: { name: "Custom", priceId: STRIPE_PRICE_IDS.CUSTOM, price: 997 },
};

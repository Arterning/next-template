import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const STRIPE_PLANS = {
  pro: {
    name: "Pro Plan",
    price: 9900, // in cents ($99.00)
    interval: "month" as Stripe.Price.Recurring.Interval,
  },
  enterprise: {
    name: "Enterprise Plan",
    price: 29900, // in cents ($299.00)
    interval: "month" as Stripe.Price.Recurring.Interval,
  },
};

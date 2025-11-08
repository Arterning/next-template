import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { user as userTable, subscription as subscriptionTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (userId && session.customer) {
          // Update user with Stripe customer ID
          await db
            .update(userTable)
            .set({
              stripeCustomerId: session.customer as string,
            })
            .where(eq(userTable.id, userId));
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find user by Stripe customer ID
        const users = await db
          .select()
          .from(userTable)
          .where(eq(userTable.stripeCustomerId, subscription.customer as string))
          .limit(1);

        if (users.length === 0) {
          console.error("User not found for customer:", subscription.customer);
          break;
        }

        const user = users[0];

        // Update user subscription status
        await db
          .update(userTable)
          .set({
            subscriptionStatus: subscription.status,
            subscriptionPlan: subscription.metadata?.planId || "pro",
          })
          .where(eq(userTable.id, user.id));

        // Upsert subscription record
        const existingSubscriptions = await db
          .select()
          .from(subscriptionTable)
          .where(eq(subscriptionTable.id, subscription.id))
          .limit(1);

        const subscriptionData = {
          id: subscription.id,
          userId: user.id,
          status: subscription.status,
          priceId: subscription.items.data[0]?.price.id || "",
          quantity: subscription.items.data[0]?.quantity || 1,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
          endedAt: subscription.ended_at
            ? new Date(subscription.ended_at * 1000)
            : null,
        };

        if (existingSubscriptions.length > 0) {
          await db
            .update(subscriptionTable)
            .set(subscriptionData)
            .where(eq(subscriptionTable.id, subscription.id));
        } else {
          await db.insert(subscriptionTable).values(subscriptionData);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find user by Stripe customer ID
        const users = await db
          .select()
          .from(userTable)
          .where(eq(userTable.stripeCustomerId, subscription.customer as string))
          .limit(1);

        if (users.length === 0) {
          console.error("User not found for customer:", subscription.customer);
          break;
        }

        const user = users[0];

        // Update user to free plan
        await db
          .update(userTable)
          .set({
            subscriptionStatus: "canceled",
            subscriptionPlan: "free",
          })
          .where(eq(userTable.id, user.id));

        // Update subscription record
        await db
          .update(subscriptionTable)
          .set({
            status: "canceled",
            endedAt: new Date(),
          })
          .where(eq(subscriptionTable.id, subscription.id));

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

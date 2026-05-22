import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { confirmPaidOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook configuration missing." }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });
  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const existing = await prisma.webhookEvent.findUnique({ where: { provider_eventId: { provider: "stripe", eventId: event.id } } });
  if (existing) return NextResponse.json({ received: true, duplicate: true });

  await prisma.webhookEvent.create({
    data: { provider: "stripe", eventId: event.id, eventType: event.type, payload: event as object },
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      await confirmPaidOrder({
        checkoutSessionId: session.id,
        paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        amountTotal: session.amount_total,
        currency: session.currency,
        rawPayload: event,
      });
    }
  }

  return NextResponse.json({ received: true });
}

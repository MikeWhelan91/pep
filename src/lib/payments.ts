import Stripe from "stripe";
import { prisma } from "@/lib/db";

export type CheckoutInput = {
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  lineItems: Array<{ name: string; quantity: number; unitAmountCents: number }>;
};

export interface PaymentProviderClient {
  createCheckout(input: CheckoutInput): Promise<{ url: string; providerReference: string }>;
}

export class StripePaymentProvider implements PaymentProviderClient {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is required for Stripe checkout.");
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    });
  }

  async createCheckout(input: CheckoutInput) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.customerEmail,
      line_items: input.lineItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: "For laboratory research use only.",
          },
          unit_amount: item.unitAmountCents,
        },
      })),
      metadata: {
        orderId: input.orderId,
        orderNumber: input.orderNumber,
      },
      success_url: `${appUrl}/order-success?order=${input.orderNumber}`,
      cancel_url: `${appUrl}/cart?cancelled=1`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    await prisma.order.update({
      where: { id: input.orderId },
      data: { stripeCheckoutSessionId: session.id, paymentProvider: "STRIPE" },
    });
    return { url: session.url, providerReference: session.id };
  }
}

export function paymentProvider() {
  return new StripePaymentProvider();
}

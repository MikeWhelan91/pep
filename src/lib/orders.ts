import { PaymentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sendOrderConfirmation, sendPaymentReceived } from "@/lib/email";

export async function confirmPaidOrder(input: {
  checkoutSessionId: string;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  rawPayload?: unknown;
}) {
  const order = await prisma.order.findUnique({
    where: { stripeCheckoutSessionId: input.checkoutSessionId },
    include: { lineItems: true },
  });
  if (!order || order.paymentStatus === PaymentStatus.PAID) return order;

  const updated = await prisma.$transaction(async (tx) => {
    for (const item of order.lineItems) {
      if (item.productId) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }
    }

    const paid = await tx.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        paymentStatus: "PAID",
        stripePaymentIntentId: input.paymentIntentId ?? undefined,
        payments: {
          upsert: {
            where: { provider_providerReference: { provider: "STRIPE", providerReference: input.checkoutSessionId } },
            create: {
              provider: "STRIPE",
              providerReference: input.checkoutSessionId,
              status: "PAID",
              amountCents: input.amountTotal ?? order.totalCents,
              currency: input.currency ?? order.currency,
              rawWebhookPayload: input.rawPayload as object,
            },
            update: {
              status: "PAID",
              rawWebhookPayload: input.rawPayload as object,
            },
          },
        },
        events: {
          create: {
            type: "payment_confirmed",
            message: "Payment confirmed by provider webhook.",
          },
        },
      },
      include: { lineItems: true },
    });

    return paid;
  });

  await sendPaymentReceived(updated);
  await sendOrderConfirmation(updated);
  return updated;
}

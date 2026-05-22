import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { orderNumber } from "@/lib/format";
import { paymentProvider } from "@/lib/payments";
import { checkoutSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Check the checkout form and try again." }, { status: 400 });

  const input = parsed.data;
  const ids = input.cart.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } });
  if (products.length !== ids.length) return NextResponse.json({ error: "One or more cart items are unavailable." }, { status: 400 });

  const lines = input.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) throw new Error("Product unavailable.");
    if (item.quantity > product.stockQuantity) throw new Error(`${product.name} has insufficient stock.`);
    return { product, quantity: item.quantity, total: product.priceCents * item.quantity };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const threshold = await prisma.siteSetting.findUnique({ where: { key: "free_shipping_threshold_cents" } });
  const shipping = subtotal >= Number(threshold?.value ?? 25000) ? 0 : 1500;
  const discount = input.couponCode
    ? await prisma.discountCode.findUnique({ where: { code: input.couponCode.toUpperCase() } })
    : null;
  const discountCents = discount?.active
    ? discount.percentOff
      ? Math.round(subtotal * (discount.percentOff / 100))
      : discount.amountOffCents ?? 0
    : 0;
  const total = Math.max(0, subtotal + shipping - discountCents);
  const session = await auth();

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        userId: session?.user?.id,
        customerEmail: input.customerEmail.toLowerCase(),
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        shippingAddress: input.shippingAddress,
        billingAddress: input.billingSameAsShipping ? input.shippingAddress : input.billingAddress,
        subtotalCents: subtotal,
        shippingCents: shipping,
        discountCents,
        totalCents: total,
        discountCode: input.couponCode?.toUpperCase(),
        events: { create: { type: "order_created", message: "Pending order created before checkout redirect." } },
        lineItems: {
          create: lines.map(({ product, quantity, total: lineTotal }) => ({
            productId: product.id,
            productName: product.name,
            productSku: product.sku,
            quantity,
            unitPriceCents: product.priceCents,
            totalCents: lineTotal,
          })),
        },
      },
      include: { lineItems: true },
    });

    const checkout = await paymentProvider().createCheckout({
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail,
      lineItems: discountCents
        ? [{ name: `Research supply order ${order.orderNumber}`, quantity: 1, unitAmountCents: total }]
        : [
            ...order.lineItems.map((item) => ({ name: item.productName, quantity: item.quantity, unitAmountCents: item.unitPriceCents })),
            ...(shipping ? [{ name: "Shipping", quantity: 1, unitAmountCents: shipping }] : []),
          ],
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout could not be started." }, { status: 400 });
  }
}

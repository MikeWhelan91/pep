import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Cart" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const [products, setting] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, select: { id: true, name: true, priceCents: true, stockQuantity: true, sku: true } }),
    prisma.siteSetting.findUnique({ where: { key: "free_shipping_threshold_cents" } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Cart</h1>
      <div className="mt-6">
        <CartView products={products} freeShippingThresholdCents={Number(setting?.value ?? 25000)} />
      </div>
    </div>
  );
}

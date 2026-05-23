import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Cart" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const [products, setting] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, select: { id: true, name: true, priceCents: true, stockQuantity: true, sku: true } }),
    prisma.siteSetting.findUnique({ where: { key: "free_shipping_threshold_cents" } }),
  ]);

  return (
    <div className="relative overflow-hidden bg-slate-950 px-4 py-14 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <StatusChip>Cart review</StatusChip>
          <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl">Procurement cart</h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">Review product quantities and availability before creating a pending order for checkout.</p>
        </div>
        <div className="mt-10">
          <CartView products={products} freeShippingThresholdCents={Number(setting?.value ?? 25000)} />
        </div>
      </div>
    </div>
  );
}

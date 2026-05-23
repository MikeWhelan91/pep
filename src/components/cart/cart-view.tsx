"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { ComplianceNote } from "@/components/ui/compliance-note";
import { formatMoney } from "@/lib/format";

type ProductSummary = {
  id: string;
  name: string;
  priceCents: number;
  stockQuantity: number;
  sku: string;
};

type CartItem = { productId: string; quantity: number };

export function CartView({ products, freeShippingThresholdCents }: { products: ProductSummary[]; freeShippingThresholdCents: number }) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[];
  });

  function save(next: CartItem[]) {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  const lines = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { ...item, product, lineTotal: product.priceCents * item.quantity } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: ProductSummary; lineTotal: number }>;

  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.lineTotal, 0), [lines]);
  const shipping = subtotal > 0 && subtotal < freeShippingThresholdCents ? 1500 : 0;
  const outOfStock = lines.some((line) => line.quantity > line.product.stockQuantity);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-3xl border border-slate-200">
        {lines.length === 0 ? (
          <div className="p-8">
            <p className="font-semibold text-slate-950">Your cart is empty.</p>
            <ButtonLink href="/shop" className="mt-4">Browse catalogue</ButtonLink>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.productId} className="border-t border-slate-200">
                  <td className="p-4">
                    <p className="font-semibold text-slate-950">{line.product.name}</p>
                    <p className="text-xs text-slate-500">{line.product.sku} · {line.product.stockQuantity} in stock</p>
                    {line.quantity > line.product.stockQuantity ? <p className="mt-1 text-xs font-semibold text-red-700">Reduce quantity before checkout.</p> : null}
                  </td>
                  <td className="p-4">
                    <input
                      className="h-10 w-20 border border-slate-300 px-3"
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(event) =>
                        save(cart.map((item) => (item.productId === line.productId ? { ...item, quantity: Number(event.target.value) } : item)))
                      }
                    />
                    <button className="ml-3 text-sm font-semibold text-red-700" onClick={() => save(cart.filter((item) => item.productId !== line.productId))}>
                      Remove
                    </button>
                  </td>
                  <td className="p-4 text-right font-semibold">{formatMoney(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <aside className="h-fit rounded-3xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-950">Order summary</h2>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Estimated shipping</dt><dd>{formatMoney(shipping)}</dd></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold"><dt>Total before discounts</dt><dd>{formatMoney(subtotal + shipping)}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-slate-500">Free shipping starts at {formatMoney(freeShippingThresholdCents)}.</p>
        <Button className="mt-5 w-full" disabled={!lines.length || outOfStock} onClick={() => router.push("/checkout")}>
          Continue to checkout
        </Button>
        <div className="mt-5"><ComplianceNote compact /></div>
      </aside>
    </div>
  );
}

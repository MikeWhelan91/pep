"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
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
    try {
      return JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[];
    } catch {
      return [];
    }
  });

  function save(next: CartItem[]) {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    window.dispatchEvent(new Event("cart-updated"));
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
      <div className="glass-panel min-h-80 overflow-hidden">
        {lines.length === 0 ? (
          <div className="grid min-h-80 place-items-center p-8 text-center">
            <div>
              <p className="text-xl font-semibold text-white">Your cart is empty.</p>
              <p className="mt-2 text-sm text-slate-400">Add catalogue items and they will appear here and in the header cart drawer.</p>
              <ButtonLink href="/shop" className="mt-5">
                Browse catalogue
              </ButtonLink>
            </div>
          </div>
        ) : (
          <table className="w-full text-sm text-slate-200">
            <thead className="bg-cyan-300/5 text-left text-xs uppercase tracking-[.16em] text-cyan-100">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.productId} className="border-t border-cyan-300/12">
                  <td className="p-4">
                    <p className="font-semibold text-white">{line.product.name}</p>
                    <p className="text-xs text-slate-500">
                      {line.product.sku} · {line.product.stockQuantity} in stock
                    </p>
                    {line.quantity > line.product.stockQuantity ? <p className="mt-1 text-xs font-semibold text-red-300">Reduce quantity before checkout.</p> : null}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-cyan-300/20">
                        <button
                          className="p-2 text-slate-300 hover:bg-cyan-300/10"
                          aria-label="Decrease quantity"
                          onClick={() => save(cart.map((item) => (item.productId === line.productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)))}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-10 text-center font-semibold text-white">{line.quantity}</span>
                        <button
                          className="p-2 text-slate-300 hover:bg-cyan-300/10"
                          aria-label="Increase quantity"
                          onClick={() => save(cart.map((item) => (item.productId === line.productId ? { ...item, quantity: item.quantity + 1 } : item)))}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10" onClick={() => save(cart.filter((item) => item.productId !== line.productId))}>
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold text-cyan-100">{formatMoney(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <aside className="glass-panel h-fit p-5">
        <h2 className="text-lg font-semibold text-white">Order summary</h2>
        <dl className="mt-4 grid gap-3 text-sm text-slate-300">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Estimated shipping</dt>
            <dd>{formatMoney(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-cyan-300/15 pt-3 text-base font-semibold text-white">
            <dt>Total before discounts</dt>
            <dd>{formatMoney(subtotal + shipping)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-slate-500">Free shipping starts at {formatMoney(freeShippingThresholdCents)}.</p>
        <Button className="mt-5 w-full" disabled={!lines.length || outOfStock} onClick={() => router.push("/checkout")}>
          Continue to checkout
        </Button>
        <div className="mt-5">
          <ComplianceNote compact />
        </div>
      </aside>
    </div>
  );
}

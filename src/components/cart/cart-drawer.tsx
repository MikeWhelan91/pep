"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";

type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  stockQuantity: number;
  sku: string;
  imageUrls: string[];
};

type CartItem = { productId: string; quantity: number };

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const cartSnapshot = useSyncExternalStore(
    (listener) => {
      window.addEventListener("cart-updated", listener);
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener("cart-updated", listener);
        window.removeEventListener("storage", listener);
      };
    },
    () => localStorage.getItem("cart") ?? "[]",
    () => "[]",
  );
  const cart = useMemo(() => {
    try {
      return JSON.parse(cartSnapshot) as CartItem[];
    } catch {
      return [];
    }
  }, [cartSnapshot]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json() as Promise<{ products: ProductSummary[] }>)
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, []);

  function save(next: CartItem[]) {
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
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <>
      <button
        type="button"
        aria-label="Open cart"
        onClick={() => setOpen(true)}
        className="relative inline-flex h-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-slate-950/60 px-3 text-slate-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
      >
        <ShoppingCart size={18} />
        {count > 0 ? (
          <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-cyan-300 px-1.5 text-[11px] font-bold text-slate-950">
            {count}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button aria-label="Close cart overlay" className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col rounded-l-[2rem] border-l border-cyan-300/20 bg-slate-950 text-slate-100 shadow-[-28px_0_80px_rgba(0,0,0,.55)]">
            <div className="flex items-center justify-between border-b border-cyan-300/15 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-200">Procurement cart</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{count ? `${count} item${count === 1 ? "" : "s"}` : "Cart is empty"}</h2>
              </div>
              <button aria-label="Close cart" className="rounded-full border border-cyan-300/20 p-2 text-slate-300 hover:bg-cyan-300/10 hover:text-white" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <div className="grid min-h-80 place-items-center rounded-3xl border border-cyan-300/15 bg-slate-900/55 p-8 text-center">
                  <div>
                    <ShoppingCart className="mx-auto text-cyan-200" size={34} />
                    <p className="mt-4 font-semibold text-white">No items selected.</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Add research catalogue items to review quantity, availability, and checkout totals here.</p>
                    <ButtonLink href="/shop" className="mt-5" onClick={() => setOpen(false)}>
                      Browse catalogue
                    </ButtonLink>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {lines.map((line) => (
                    <div key={line.productId} className="rounded-3xl border border-cyan-300/15 bg-slate-900/60 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <Link href={`/product/${line.product.slug}`} onClick={() => setOpen(false)} className="font-semibold text-white hover:text-cyan-100">
                          {line.product.name}
                        </Link>
                        <button
                          aria-label={`Remove ${line.product.name}`}
                          className="rounded-full p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-200"
                          onClick={() => save(cart.filter((item) => item.productId !== line.productId))}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{line.product.sku} · {line.product.stockQuantity} available</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-cyan-300/20">
                          <button
                            className="p-2 text-slate-300 hover:bg-cyan-300/10"
                            aria-label="Decrease quantity"
                            onClick={() => save(cart.map((item) => (item.productId === line.productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)))}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-white">{line.quantity}</span>
                          <button
                            className="p-2 text-slate-300 hover:bg-cyan-300/10"
                            aria-label="Increase quantity"
                            onClick={() => save(cart.map((item) => (item.productId === line.productId ? { ...item, quantity: item.quantity + 1 } : item)))}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-semibold text-cyan-100">{formatMoney(line.lineTotal)}</p>
                      </div>
                      {line.quantity > line.product.stockQuantity ? (
                        <p className="mt-3 rounded-2xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">Reduce quantity before checkout.</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-cyan-300/15 p-5">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal</span>
                <span className="text-lg font-semibold text-white">{formatMoney(subtotal)}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ButtonLink href="/cart" variant="secondary" onClick={() => setOpen(false)}>
                  View cart
                </ButtonLink>
                <Button disabled={!lines.length} onClick={() => (window.location.href = "/checkout")}>
                  Checkout
                </Button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

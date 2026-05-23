"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkoutSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { ComplianceNote } from "@/components/ui/compliance-note";

type CheckoutValues = z.input<typeof checkoutSchema>;

export function CheckoutForm() {
  const [error, setError] = useState("");
  const [cart] = useState<Array<{ productId: string; quantity: number }>>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") ?? "[]") as Array<{ productId: string; quantity: number }>;
  });
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billingSameAsShipping: true,
      shippingAddress: { country: "US" },
      cart: [],
    },
  });

  async function onSubmit(values: CheckoutValues) {
    setError("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, cart }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Checkout could not be started.");
      return;
    }
    globalThis.location.assign(payload.url);
  }

  const input = "h-10 w-full border border-slate-300 px-3 text-sm";
  const label = "grid gap-1 text-sm font-medium text-slate-700";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <section className="rounded-3xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-950">Customer details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className={label}>Name<input className={input} {...form.register("customerName")} /></label>
            <label className={label}>Email<input className={input} type="email" {...form.register("customerEmail")} /></label>
            <label className={label}>Phone<input className={input} {...form.register("customerPhone")} /></label>
            <label className={label}>Coupon code<input className={input} {...form.register("couponCode")} /></label>
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-950">Shipping address</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className={label}>Address line 1<input className={input} {...form.register("shippingAddress.line1")} /></label>
            <label className={label}>Address line 2<input className={input} {...form.register("shippingAddress.line2")} /></label>
            <label className={label}>City<input className={input} {...form.register("shippingAddress.city")} /></label>
            <label className={label}>State / region<input className={input} {...form.register("shippingAddress.region")} /></label>
            <label className={label}>Postal code<input className={input} {...form.register("shippingAddress.postalCode")} /></label>
            <label className={label}>Country<input className={input} {...form.register("shippingAddress.country")} /></label>
          </div>
        </section>
      </div>
      <aside className="h-fit rounded-3xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-950">Checkout</h2>
        <p className="mt-2 text-sm text-slate-600">An internal pending order is created before redirecting to Stripe Checkout. Fulfilment only begins after webhook confirmation.</p>
        {error ? <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <Button className="mt-5 w-full" disabled={!cart.length}>Pay with Stripe</Button>
        <div className="mt-5"><ComplianceNote compact /></div>
      </aside>
    </form>
  );
}

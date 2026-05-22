import type { Metadata } from "next";
import { CheckoutForm } from "@/components/forms/checkout-form";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Checkout</h1>
      <div className="mt-6">
        <CheckoutForm />
      </div>
    </div>
  );
}

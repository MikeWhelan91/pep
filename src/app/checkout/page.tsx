import type { Metadata } from "next";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 px-4 py-14 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <StatusChip>Secure checkout</StatusChip>
          <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl">Checkout</h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">Confirm contact and shipping details before redirecting to Stripe Checkout.</p>
        </div>
        <div className="mt-10">
        <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

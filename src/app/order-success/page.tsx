import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order success" };

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Checkout submitted</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {params.order ? `Order ${params.order} has returned from Stripe.` : "Your checkout returned from Stripe."} Payment and fulfilment status are finalized only after Stripe webhook confirmation.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/account/orders">View orders</ButtonLink>
        <ButtonLink href="/shop" variant="secondary">Continue shopping</ButtonLink>
      </div>
    </div>
  );
}

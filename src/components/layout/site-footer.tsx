import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-cyan-300/15 bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm md:grid-cols-[2fr_1fr_1fr] lg:px-6">
        <div>
          <p className="font-semibold text-white">Meridian Research Supply</p>
          <p className="mt-3 max-w-xl">
            Original research-supplier ecommerce platform for qualified laboratory buyers. Products are for laboratory research use only and are not intended for human or animal consumption.
          </p>
        </div>
        <div className="grid gap-2 [&_a:hover]:text-cyan-200">
          <Link href="/shop">Catalogue</Link>
          <Link href="/research">Research information</Link>
          <Link href="/coa">COA sample</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="grid gap-2 [&_a:hover]:text-cyan-200">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refunds">Refunds and returns</Link>
          <Link href="/legal/shipping">Shipping</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

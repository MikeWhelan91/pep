import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">About Meridian Research Supply</h1>
      <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">
        <p>Meridian Research Supply is an original ecommerce platform for qualified laboratory buyers who need clear catalogue records, inventory visibility, order documentation, and COA access.</p>
        <p>Every ordering flow is framed for laboratory research use only. Products are not represented for human or animal consumption, therapeutic use, diagnostic use, clinical use, or any consumer wellness purpose.</p>
      </div>
    </div>
  );
}

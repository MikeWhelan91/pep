import type { Metadata } from "next";
import { ComplianceNote } from "@/components/ui/compliance-note";

export const metadata: Metadata = { title: "Research information" };

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Research information</h1>
      <div className="mt-5"><ComplianceNote /></div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          ["Qualified access", "Orders are intended for researchers, laboratory buyers, clinics, educational institutions, and research professionals."],
          ["Documentation", "Product records may include purity, SKU, batch, storage condition, form, and COA links for procurement review."],
          ["Boundaries", "No application, preparation, dosing, therapeutic, diagnostic, or clinical guidance is provided through this website."],
        ].map(([title, text]) => (
          <section key={title} className="rounded-3xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

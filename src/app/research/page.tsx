import type { Metadata } from "next";
import { ComplianceNote } from "@/components/ui/compliance-note";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";

export const metadata: Metadata = { title: "Research information" };

export default function ResearchPage() {
  const cards = [
    ["Qualified access", "Orders are intended for researchers, laboratory buyers, clinics, educational institutions, and research professionals."],
    ["Documentation", "Product records may include purity, SKU, batch, storage condition, form, and COA links for procurement review."],
    ["Boundaries", "No application, preparation, dosing, therapeutic, diagnostic, or clinical guidance is provided through this website."],
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 px-4 py-14 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <StatusChip>Research-only access</StatusChip>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">Research information</h1>
          <p className="mt-4 text-base leading-8 text-slate-400">This store is framed for qualified laboratory procurement and documentation review. Product content remains limited to research supply records.</p>
        </div>
        <div className="mx-auto mt-9 max-w-5xl">
          <ComplianceNote />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map(([title, text]) => (
            <section key={title} className="rounded-3xl border border-cyan-300/15 bg-slate-900/60 p-6 shadow-[0_18px_50px_rgba(0,0,0,.22)]">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">0{cards.findIndex(([entry]) => entry === title) + 1}</p>
              <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

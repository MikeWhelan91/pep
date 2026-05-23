import type { Metadata } from "next";
import { ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";

export const metadata: Metadata = { title: "Sample COA" };

export default function CoaPage() {
  const rows = [
    ["Product", "Reference Material C"],
    ["Batch", "B-RMC-2603"],
    ["Purity", "97.90%"],
    ["Appearance", "White to off-white powder"],
    ["Storage", "Controlled room temperature, sealed"],
    ["Review status", "Sample document for catalogue demonstration"],
  ];
  return (
    <div className="relative overflow-hidden bg-slate-950 px-4 py-14 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <StatusChip>Documentation sample</StatusChip>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">Sample certificate of analysis</h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">A representative record layout for procurement review. This sample is original, generic, and not tied to any competitor document or real third-party product.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <aside className="glass-panel p-6">
            <FileText className="text-cyan-200" size={30} />
            <h2 className="mt-5 text-2xl font-semibold text-white">What buyers should see</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">COA links can be attached to product records and batch data, giving qualified researchers a clear documentation path before checkout.</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Batch identity", "Product and batch references"],
                ["Quality markers", "Purity, appearance, and storage"],
                ["Review boundary", "Research documentation only"],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-cyan-300/15 bg-slate-950/65 p-4">
                  <p className="font-semibold text-cyan-100">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </aside>
          <section className="glass-panel overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-cyan-300/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="text-cyan-200" size={22} />
                <p className="font-semibold text-white">Sample COA record</p>
              </div>
              <ShieldCheck className="text-cyan-200" size={20} />
            </div>
            <div className="divide-y divide-cyan-300/12">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-[180px_1fr]">
                  <p className="font-semibold uppercase tracking-[.16em] text-cyan-200/80">{label}</p>
                  <p className="text-slate-200">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

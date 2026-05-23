import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 px-4 py-14 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-[.85fr_1.15fr]">
        <div className="flex flex-col justify-center">
          <StatusChip>Procurement support</StatusChip>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">Contact Meridian Research Supply</h1>
          <p className="mt-4 text-base leading-8 text-slate-400">Send procurement, documentation, account, or order questions. We do not provide application, dosing, therapeutic, diagnostic, or clinical guidance.</p>
          <div className="mt-8 grid gap-3">
            {[
              ["Documentation", "COA links, batch records, and product data."],
              ["Orders", "Checkout, payment, tracking, and account support."],
              ["Boundary", "Research procurement questions only."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-cyan-300/15 bg-slate-900/55 p-4">
                <p className="font-semibold text-cyan-100">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

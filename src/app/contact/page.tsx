import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[.8fr_1.2fr] lg:px-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Contact</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Send procurement, documentation, or account questions. We do not provide application, dosing, therapeutic, diagnostic, or clinical guidance.</p>
      </div>
      <ContactForm />
    </div>
  );
}

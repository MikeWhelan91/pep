import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/auth-forms";
import { ButtonLink } from "@/components/ui/button";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-70" />
      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-[.85fr_1.15fr]">
        <Reveal className="flex flex-col justify-center">
          <StatusChip>New customer account</StatusChip>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">Create a research procurement account</h1>
          <p className="mt-4 text-base leading-8 text-slate-400">Use this account for cart checkout, order history, and purchasing records. Access remains subject to the research-only confirmation gate.</p>
          <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-slate-900/55 p-5">
            <p className="font-semibold text-white">Already registered?</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Return to the login page to access your existing customer or admin account.</p>
            <ButtonLink href="/login" variant="secondary" className="mt-5">
              Back to login
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="flex items-center">
          <div className="w-full">
            <RegisterForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

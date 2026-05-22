import type { Metadata } from "next";
import { LoginForm, RegisterForm } from "@/components/forms/auth-forms";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Login or register" };

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-70" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <StatusChip>Secure access</StatusChip>
          <h1 className="mt-4 text-4xl font-semibold text-white">Customer and admin access</h1>
          <p className="mt-2 text-sm text-slate-400">Create an account to view order history and manage research supply purchasing records.</p>
        </Reveal>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <Reveal><LoginForm /></Reveal>
          <Reveal delay={0.08}><RegisterForm /></Reveal>
        </div>
      </div>
    </div>
  );
}

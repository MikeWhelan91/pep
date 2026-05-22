import type { Metadata } from "next";
import { LoginForm, RegisterForm } from "@/components/forms/auth-forms";

export const metadata: Metadata = { title: "Login or register" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Customer access</h1>
      <p className="mt-2 text-sm text-slate-600">Create an account to view order history and manage research supply purchasing records.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}

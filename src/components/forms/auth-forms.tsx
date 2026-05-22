"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/server/actions/auth-actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  return (
    <form action={action} className="grid gap-4 border border-slate-200 p-5">
      <h2 className="text-lg font-semibold text-slate-950">Customer login</h2>
      {state.error ? <p className="bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p> : null}
      <input className="h-10 border border-slate-300 px-3" name="email" type="email" placeholder="Email" required />
      <input className="h-10 border border-slate-300 px-3" name="password" type="password" placeholder="Password" required />
      <Button disabled={pending}>Login</Button>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, { error: "" });
  return (
    <form action={action} className="grid gap-4 border border-slate-200 p-5">
      <h2 className="text-lg font-semibold text-slate-950">Create account</h2>
      {state.error ? <p className="bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p> : null}
      <input className="h-10 border border-slate-300 px-3" name="name" placeholder="Name" required />
      <input className="h-10 border border-slate-300 px-3" name="email" type="email" placeholder="Email" required />
      <input className="h-10 border border-slate-300 px-3" name="password" type="password" placeholder="Password" required minLength={10} />
      <Button disabled={pending}>Register</Button>
    </form>
  );
}

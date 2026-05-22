"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/server/actions/auth-actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  return (
    <form action={action} className="glass-panel grid gap-4 p-5">
      <h2 className="text-lg font-semibold text-white">Customer login</h2>
      {state.error ? <p className="bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p> : null}
      <input className="h-10 border border-cyan-300/20 bg-slate-950/70 px-3 text-slate-100 placeholder:text-slate-500" name="email" type="email" placeholder="Email" required />
      <input className="h-10 border border-cyan-300/20 bg-slate-950/70 px-3 text-slate-100 placeholder:text-slate-500" name="password" type="password" placeholder="Password" required />
      <Button disabled={pending}>Login</Button>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, { error: "" });
  return (
    <form action={action} className="glass-panel grid gap-4 p-5">
      <h2 className="text-lg font-semibold text-white">Create account</h2>
      {state.error ? <p className="bg-red-50 p-3 text-sm font-semibold text-red-700">{state.error}</p> : null}
      <input className="h-10 border border-cyan-300/20 bg-slate-950/70 px-3 text-slate-100 placeholder:text-slate-500" name="name" placeholder="Name" required />
      <input className="h-10 border border-cyan-300/20 bg-slate-950/70 px-3 text-slate-100 placeholder:text-slate-500" name="email" type="email" placeholder="Email" required />
      <input className="h-10 border border-cyan-300/20 bg-slate-950/70 px-3 text-slate-100 placeholder:text-slate-500" name="password" type="password" placeholder="Password" required minLength={10} />
      <Button disabled={pending}>Register</Button>
    </form>
  );
}

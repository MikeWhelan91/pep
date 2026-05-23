"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState("");
  async function submit(formData: FormData) {
    setStatus("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    setStatus(response.ok ? "Message sent." : "Message could not be sent.");
  }
  return (
    <form action={submit} className="grid gap-4 rounded-3xl border border-slate-200 p-5">
      <input className="h-10 rounded-xl border border-slate-300 px-3" name="name" placeholder="Name" required />
      <input className="h-10 rounded-xl border border-slate-300 px-3" name="email" type="email" placeholder="Email" required />
      <input className="h-10 rounded-xl border border-slate-300 px-3" name="institution" placeholder="Institution" required />
      <textarea className="min-h-36 rounded-xl border border-slate-300 p-3" name="message" placeholder="Message" required />
      {status ? <p className="text-sm font-semibold text-slate-700">{status}</p> : null}
      <Button className="w-fit">Send message</Button>
    </form>
  );
}

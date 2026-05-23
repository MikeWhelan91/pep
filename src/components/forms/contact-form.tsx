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
    <form action={submit} className="glass-panel grid gap-4 p-5 md:p-7">
      <input className="field-dark h-12 px-4" name="name" placeholder="Name" required />
      <input className="field-dark h-12 px-4" name="email" type="email" placeholder="Email" required />
      <input className="field-dark h-12 px-4" name="institution" placeholder="Institution" required />
      <textarea className="field-dark min-h-40 p-4" name="message" placeholder="Message" required />
      {status ? <p className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100">{status}</p> : null}
      <Button className="w-fit">Send message</Button>
    </form>
  );
}

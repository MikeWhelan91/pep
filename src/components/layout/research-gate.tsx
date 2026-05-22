"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const statements = [
  "I am at least 21 years old.",
  "I understand all products are intended solely for laboratory research use.",
  "I understand products are not intended for human or animal consumption.",
  "I understand no dosage, usage, therapeutic, diagnostic, or application advice is provided.",
  "I confirm I am a qualified researcher, laboratory buyer, clinic, educational institution, or research professional.",
];

export function ResearchGate() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("research-access-accepted") !== "true";
  });
  const [checked, setChecked] = useState<boolean[]>(statements.map(() => false));

  if (!open) return null;

  const canEnter = checked.every(Boolean);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-950">Research access confirmation</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Access is limited to qualified research purchasers. Confirm each statement to continue.
        </p>
        <div className="mt-5 grid gap-3">
          {statements.map((statement, index) => (
            <label key={statement} className="flex gap-3 text-sm leading-5 text-slate-800">
              <input
                type="checkbox"
                className="mt-1 size-4 rounded border-slate-300 text-teal-700"
                checked={checked[index]}
                onChange={(event) => {
                  const next = [...checked];
                  next[index] = event.target.checked;
                  setChecked(next);
                }}
              />
              <span>{statement}</span>
            </label>
          ))}
        </div>
        <Button
          className="mt-6 w-full"
          disabled={!canEnter}
          onClick={() => {
            localStorage.setItem("research-access-accepted", "true");
            document.cookie = "research_access=accepted; path=/; max-age=31536000; SameSite=Lax";
            setOpen(false);
          }}
        >
          Enter catalogue
        </Button>
      </div>
    </div>
  );
}

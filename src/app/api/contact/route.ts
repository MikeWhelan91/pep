import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

const hits = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Please wait before sending another message." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Check the contact form and try again." }, { status: 400 });
  await sendContactNotification(parsed.data);
  return NextResponse.json({ ok: true });
}

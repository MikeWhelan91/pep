export function CyberGrid({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,.18),transparent_30%),linear-gradient(135deg,rgba(8,13,28,.96),rgba(1,9,18,.98))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(103,232,249,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.14)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="scanline absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-300/10 to-transparent" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full border border-cyan-300/20" />
      <div className="absolute right-10 top-20 h-56 w-56 rotate-45 border border-violet-400/20" />
    </div>
  );
}

export function StatusChip({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "violet" | "slate" }) {
  const tones = {
    cyan: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,.12)]",
    violet: "border-violet-300/40 bg-violet-300/10 text-violet-100 shadow-[0_0_24px_rgba(124,58,237,.12)]",
    slate: "border-slate-500/40 bg-slate-900/70 text-slate-200",
  };
  return <span className={`inline-flex items-center border px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] ${tones[tone]}`}>{children}</span>;
}

export function ComplianceNote({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-3xl border border-cyan-300/15 border-l-4 border-l-cyan-300 bg-cyan-300/10 text-slate-100 ${compact ? "p-3 text-xs" : "p-4 text-sm"}`}>
      <p className="font-semibold text-cyan-100">For laboratory research use only.</p>
      <p className="mt-1 text-slate-300">
        Not for human or animal consumption. Not for therapeutic, diagnostic, or clinical use. No usage or dosing guidance is provided.
      </p>
    </div>
  );
}

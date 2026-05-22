export function ComplianceNote({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`border-l-4 border-teal-700 bg-teal-50 text-slate-800 ${compact ? "p-3 text-xs" : "p-4 text-sm"}`}>
      <p className="font-semibold">For laboratory research use only.</p>
      <p className="mt-1">
        Not for human or animal consumption. Not for therapeutic, diagnostic, or clinical use. No usage or dosing guidance is provided.
      </p>
    </div>
  );
}

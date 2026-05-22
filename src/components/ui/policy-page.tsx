export function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">{children}</div>
    </div>
  );
}

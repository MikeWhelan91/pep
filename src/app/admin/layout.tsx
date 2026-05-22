import { AdminNav } from "@/components/admin/admin-nav";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <Reveal>
          <StatusChip tone="violet">Operations console</StatusChip>
          <h1 className="mt-4 text-4xl font-semibold text-white">Admin command center</h1>
          <p className="mb-6 mt-2 text-sm text-slate-400">Manage catalogue, stock, orders, customers, and discounts.</p>
        </Reveal>
        <AdminNav />
        {children}
      </div>
    </div>
  );
}

import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="mb-2 text-3xl font-semibold text-slate-950">Admin</h1>
      <p className="mb-6 text-sm text-slate-600">Manage catalogue, stock, orders, customers, and discounts.</p>
      <AdminNav />
      {children}
    </div>
  );
}

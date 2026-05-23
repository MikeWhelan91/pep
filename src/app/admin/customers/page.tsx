import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({ include: { orders: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-slate-300">
        <thead className="bg-cyan-300/8 text-left text-xs uppercase tracking-[.16em] text-cyan-100">
          <tr><th className="p-4">Customer</th><th className="p-4">Role</th><th className="p-4">Orders</th><th className="p-4">Revenue</th><th className="p-4">Created</th></tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-cyan-300/12">
              <td className="p-4"><span className="font-semibold text-white">{user.name ?? "Unnamed"}</span><br /><span className="text-xs text-slate-500">{user.email}</span></td>
              <td className="p-4"><span className="rounded-full border border-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-100">{user.role}</span></td>
              <td className="p-4">{user.orders.length}</td>
              <td className="p-4">{formatMoney(user.orders.reduce((sum, order) => sum + order.totalCents, 0))}</td>
              <td className="p-4">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

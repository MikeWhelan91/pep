import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({ include: { orders: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left"><tr><th className="p-3">Customer</th><th className="p-3">Role</th><th className="p-3">Orders</th><th className="p-3">Revenue</th><th className="p-3">Created</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-200">
              <td className="p-3"><span className="font-semibold">{user.name ?? "Unnamed"}</span><br /><span className="text-xs text-slate-500">{user.email}</span></td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.orders.length}</td>
              <td className="p-3">{formatMoney(user.orders.reduce((sum, order) => sum + order.totalCents, 0))}</td>
              <td className="p-3">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

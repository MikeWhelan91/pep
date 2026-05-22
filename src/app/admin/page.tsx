import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [orders, products, customers] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.product.findMany(),
    prisma.user.count(),
  ]);
  const revenue = orders.filter((order) => order.paymentStatus === "PAID").reduce((sum, order) => sum + order.totalCents, 0);
  const lowStock = products.filter((product) => product.stockQuantity < 10).length;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[["Revenue", formatMoney(revenue)], ["Orders", orders.length], ["Products", products.length], ["Low stock", lowStock], ["Customers", customers]].map(([label, value]) => (
          <div key={label} className="glass-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel overflow-hidden">
        <h2 className="border-b border-cyan-300/15 p-4 font-semibold text-white">Recent orders</h2>
        <table className="w-full text-sm text-slate-300">
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-cyan-300/10">
                <td className="p-4 font-semibold text-cyan-100">{order.orderNumber}</td>
                <td className="p-4">{order.customerEmail}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4 text-right">{formatMoney(order.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

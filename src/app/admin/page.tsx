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
  const metrics = [["Revenue", formatMoney(revenue)], ["Orders", orders.length], ["Products", products.length], ["Low stock", lowStock], ["Customers", customers]];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map(([label, value]) => (
          <div key={label} className="glass-panel flex min-h-32 flex-col items-center justify-center p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel overflow-hidden">
        <h2 className="border-b border-cyan-300/15 p-4 font-semibold text-white">Recent orders</h2>
        <table className="w-full text-sm text-slate-300">
          <tbody>
            {orders.length ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-cyan-300/10">
                  <td className="p-4 font-semibold text-cyan-100">{order.orderNumber}</td>
                  <td className="p-4">{order.customerEmail}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4 text-right">{formatMoney(order.totalCents)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-5 text-center text-slate-500">No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

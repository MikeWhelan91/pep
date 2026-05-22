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
          <div key={label} className="border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="border border-slate-200">
        <h2 className="border-b border-slate-200 p-4 font-semibold">Recent orders</h2>
        <table className="w-full text-sm">
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-200">
                <td className="p-4 font-semibold">{order.orderNumber}</td>
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

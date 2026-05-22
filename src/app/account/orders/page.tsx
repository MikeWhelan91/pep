import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const orders = await prisma.order.findMany({ where: { userId: session.user.id }, include: { lineItems: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Customer orders</h1>
      <div className="mt-6 grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="border border-slate-200 p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div><p className="font-semibold">{order.orderNumber}</p><p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p></div>
              <div className="text-right"><p className="font-semibold">{formatMoney(order.totalCents)}</p><p className="text-sm text-slate-500">{order.status}</p></div>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700">
              {order.lineItems.map((item) => <li key={item.id}>{item.quantity} x {item.productName}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

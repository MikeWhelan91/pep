import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/server/actions/auth-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const orders = await prisma.order.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 5 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Account</h1>
          <p className="mt-2 text-sm text-slate-600">{session.user.email}</p>
        </div>
        <form action={logoutAction}><Button variant="secondary">Sign out</Button></form>
      </div>
      <div className="mt-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="font-semibold text-slate-950">Recent orders</h2>
          <Link className="text-sm font-semibold text-teal-800" href="/account/orders">View all</Link>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-200">
                <td className="p-4 font-semibold">{order.orderNumber}</td>
                <td className="p-4">{formatDate(order.createdAt)}</td>
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

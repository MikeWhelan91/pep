import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/server/actions/auth-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/button";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const orders = await prisma.order.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 5 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100 lg:px-6">
      <CyberGrid className="opacity-55" />
      <div className="relative mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <StatusChip>Account</StatusChip>
          <h1 className="mt-4 text-3xl font-semibold text-white">Account</h1>
          <p className="mt-2 text-sm text-slate-400">{session.user.email}</p>
        </div>
        <div className="flex gap-2">
          {session.user.role === "ADMIN" ? <ButtonLink href="/admin">Admin dashboard</ButtonLink> : null}
          <form action={logoutAction}><Button variant="secondary">Sign out</Button></form>
        </div>
      </div>
      <div className="glass-panel mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-300/15 p-4">
          <h2 className="font-semibold text-white">Recent orders</h2>
          <Link className="text-sm font-semibold text-cyan-200" href="/account/orders">View all</Link>
        </div>
        <table className="w-full text-sm text-slate-300">
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-cyan-300/10">
                <td className="p-4 font-semibold text-cyan-100">{order.orderNumber}</td>
                <td className="p-4">{formatDate(order.createdAt)}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4 text-right">{formatMoney(order.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

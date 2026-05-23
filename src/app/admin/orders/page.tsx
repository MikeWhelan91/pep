import { resendConfirmationAction, updateOrderAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { formatDate, formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const statuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED", "REFUNDED"];

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ include: { lineItems: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <article key={order.id} className="glass-panel p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
            <div>
              <div className="flex flex-wrap justify-between gap-3">
                <div><p className="font-semibold text-white">{order.orderNumber}</p><p className="text-sm text-slate-500">{order.customerName} · {order.customerEmail} · {formatDate(order.createdAt)}</p></div>
                <p className="font-semibold text-cyan-100">{formatMoney(order.totalCents)}</p>
              </div>
              <ul className="mt-4 grid gap-1 text-sm text-slate-300">
                {order.lineItems.map((item) => <li key={item.id}>{item.quantity} x {item.productName} ({item.productSku})</li>)}
              </ul>
            </div>
            <div className="grid gap-3">
              <form action={updateOrderAction} className="grid gap-3">
                <input type="hidden" name="orderId" value={order.id} />
                <label className="grid gap-1 text-xs font-semibold uppercase tracking-[.12em] text-cyan-100">Status<select className="field-dark h-11 px-3" name="status" defaultValue={order.status}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select></label>
                <label className="grid gap-1 text-xs font-semibold uppercase tracking-[.12em] text-cyan-100">Tracking number<input className="field-dark h-11 px-3" name="trackingNumber" defaultValue={order.trackingNumber ?? ""} /></label>
                <label className="grid gap-1 text-xs font-semibold uppercase tracking-[.12em] text-cyan-100">Admin notes<textarea className="field-dark min-h-20 p-3" name="adminNotes" defaultValue={order.adminNotes ?? ""} /></label>
                <Button>Update order</Button>
              </form>
              <form action={resendConfirmationAction}>
                <input type="hidden" name="id" value={order.id} />
                <Button variant="secondary" className="w-full">Resend confirmation email</Button>
              </form>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

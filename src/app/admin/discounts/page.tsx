import { upsertDiscountAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  const discounts = await prisma.discountCode.findMany({ orderBy: { createdAt: "desc" } });
  const input = "field-dark h-11 px-3 text-sm";
  const label = "grid gap-1 text-xs font-semibold uppercase tracking-[.12em] text-cyan-100";
  return (
    <div className="grid gap-6">
      <form action={upsertDiscountAction} className="glass-panel grid gap-4 p-5 md:grid-cols-6">
        <label className={label}>Code<input className={input} name="code" required /></label>
        <label className={`${label} md:col-span-2`}>Description<input className={input} name="description" /></label>
        <label className={label}>Percent off<input className={input} name="percentOff" type="number" /></label>
        <label className={label}>Amount cents<input className={input} name="amountOffCents" type="number" /></label>
        <label className={label}>Max uses<input className={input} name="maxUses" type="number" /></label>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-200"><input name="active" type="checkbox" defaultChecked /> Active</label>
        <Button className="w-fit md:col-span-5">Save discount</Button>
      </form>
      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm text-slate-300">
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id} className="border-b border-cyan-300/12">
                <td className="p-4 font-semibold text-white">{discount.code}</td>
                <td className="p-4">{discount.description}</td>
                <td className="p-4">{discount.percentOff ? `${discount.percentOff}%` : discount.amountOffCents ? `$${discount.amountOffCents / 100}` : "No value"}</td>
                <td className="p-4">{discount.usedCount}/{discount.maxUses ?? "unlimited"}</td>
                <td className="p-4"><span className="rounded-full border border-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-100">{discount.active ? "Active" : "Inactive"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { upsertDiscountAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  const discounts = await prisma.discountCode.findMany({ orderBy: { createdAt: "desc" } });
  const input = "h-10 border border-slate-300 px-3 text-sm";
  return (
    <div className="grid gap-6">
      <form action={upsertDiscountAction} className="grid gap-3 border border-slate-200 p-5 md:grid-cols-6">
        <input className={input} name="code" placeholder="Code" required />
        <input className={input} name="description" placeholder="Description" />
        <input className={input} name="percentOff" type="number" placeholder="Percent off" />
        <input className={input} name="amountOffCents" type="number" placeholder="Amount cents" />
        <input className={input} name="maxUses" type="number" placeholder="Max uses" />
        <label className="flex items-center gap-2 text-sm"><input name="active" type="checkbox" defaultChecked /> Active</label>
        <Button className="w-fit">Save discount</Button>
      </form>
      <div className="border border-slate-200">
        <table className="w-full text-sm">
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id} className="border-b border-slate-200">
                <td className="p-3 font-semibold">{discount.code}</td>
                <td className="p-3">{discount.description}</td>
                <td className="p-3">{discount.percentOff ? `${discount.percentOff}%` : discount.amountOffCents ? `$${discount.amountOffCents / 100}` : "No value"}</td>
                <td className="p-3">{discount.usedCount}/{discount.maxUses ?? "unlimited"}</td>
                <td className="p-3">{discount.active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

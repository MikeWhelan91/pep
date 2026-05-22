import { updateInventoryAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left"><tr><th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Stock</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-slate-200">
              <td className="p-3 font-semibold">{product.name}</td>
              <td className="p-3">{product.sku}</td>
              <td className="p-3">
                <form id={`stock-${product.id}`} action={updateInventoryAction} className="flex gap-2">
                  <input type="hidden" name="id" value={product.id} />
                  <input className="h-10 w-24 border border-slate-300 px-3" name="stockQuantity" type="number" defaultValue={product.stockQuantity} min={0} />
                </form>
              </td>
              <td className="p-3">{product.stockQuantity < 10 ? "Low stock" : "Available"}</td>
              <td className="p-3 text-right"><Button form={`stock-${product.id}`} variant="secondary">Update</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

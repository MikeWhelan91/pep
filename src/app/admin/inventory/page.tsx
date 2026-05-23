import { updateInventoryAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-slate-300">
        <thead className="bg-cyan-300/8 text-left text-xs uppercase tracking-[.16em] text-cyan-100">
          <tr><th className="p-4">Product</th><th className="p-4">SKU</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4"></th></tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-cyan-300/12">
              <td className="p-4 font-semibold text-white">{product.name}</td>
              <td className="p-4">{product.sku}</td>
              <td className="p-4">
                <form id={`stock-${product.id}`} action={updateInventoryAction} className="flex gap-2">
                  <input type="hidden" name="id" value={product.id} />
                  <label className="sr-only" htmlFor={`stock-${product.id}-input`}>Stock quantity for {product.name}</label>
                  <input id={`stock-${product.id}-input`} className="field-dark h-10 w-24 px-3" name="stockQuantity" type="number" defaultValue={product.stockQuantity} min={0} />
                </form>
              </td>
              <td className="p-4">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stockQuantity < 10 ? "bg-red-500/10 text-red-200" : "bg-cyan-300/10 text-cyan-100"}`}>
                  {product.stockQuantity < 10 ? "Low stock" : "Available"}
                </span>
              </td>
              <td className="p-4 text-right"><Button form={`stock-${product.id}`} variant="secondary">Update</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { deleteProductAction, upsertProductAction } from "@/server/actions/admin-actions";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const input = "h-10 border border-slate-300 px-3 text-sm";

  return (
    <div className="grid gap-6">
      <form action={upsertProductAction} className="grid gap-4 border border-slate-200 p-5">
        <h2 className="font-semibold text-slate-950">Create product</h2>
        <div className="grid gap-3 md:grid-cols-4">
          <input className={input} name="name" placeholder="Name" required />
          <input className={input} name="slug" placeholder="slug" required />
          <input className={input} name="category" placeholder="Category" required />
          <input className={input} name="sku" placeholder="SKU" required />
          <input className={input} name="priceCents" type="number" placeholder="Price cents" required />
          <input className={input} name="compareAtCents" type="number" placeholder="Compare cents" />
          <input className={input} name="stockQuantity" type="number" placeholder="Stock" required />
          <input className={input} name="purityPercent" type="number" step="0.01" placeholder="Purity" required />
          <input className={input} name="molecularWeight" placeholder="Molecular weight" />
          <input className={input} name="casNumber" placeholder="CAS" />
          <input className={input} name="storageCondition" placeholder="Storage" required />
          <input className={input} name="form" placeholder="Form" required />
          <input className={input} name="batchNumber" placeholder="Batch" />
          <input className={input} name="coaFileUrl" placeholder="COA URL" />
          <input className={input} name="imageUrls" placeholder="Image URL" />
          <label className="grid gap-1 text-xs font-semibold text-slate-600">
            Upload image
            <input className="text-sm" name="imageFile" type="file" accept="image/*" />
          </label>
          <label className="flex items-center gap-2 text-sm"><input name="active" type="checkbox" defaultChecked /> Active</label>
        </div>
        <textarea className="min-h-20 border border-slate-300 p-3 text-sm" name="shortDescription" placeholder="Short description" required />
        <textarea className="min-h-28 border border-slate-300 p-3 text-sm" name="fullDescription" placeholder="Full description" required />
        <Button className="w-fit">Save product</Button>
      </form>
      <div className="border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr><th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3"></th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-200">
                <td className="p-3"><span className="font-semibold">{product.name}</span><br /><span className="text-xs text-slate-500">{product.category}</span></td>
                <td className="p-3">{product.sku}</td>
                <td className="p-3">{formatMoney(product.priceCents)}</td>
                <td className="p-3">{product.stockQuantity}</td>
                <td className="p-3 text-right">
                  <details className="text-left">
                    <summary className="cursor-pointer font-semibold text-teal-800">Edit</summary>
                    <form action={upsertProductAction} className="mt-3 grid gap-3 border border-slate-200 p-3 md:grid-cols-3">
                      <input type="hidden" name="id" value={product.id} />
                      <input className={input} name="name" defaultValue={product.name} required />
                      <input className={input} name="slug" defaultValue={product.slug} required />
                      <input className={input} name="category" defaultValue={product.category} required />
                      <input className={input} name="sku" defaultValue={product.sku} required />
                      <input className={input} name="priceCents" type="number" defaultValue={product.priceCents} required />
                      <input className={input} name="compareAtCents" type="number" defaultValue={product.compareAtCents ?? ""} />
                      <input className={input} name="stockQuantity" type="number" defaultValue={product.stockQuantity} required />
                      <input className={input} name="purityPercent" type="number" step="0.01" defaultValue={String(product.purityPercent)} required />
                      <input className={input} name="molecularWeight" defaultValue={product.molecularWeight ?? ""} />
                      <input className={input} name="casNumber" defaultValue={product.casNumber ?? ""} />
                      <input className={input} name="storageCondition" defaultValue={product.storageCondition} required />
                      <input className={input} name="form" defaultValue={product.form} required />
                      <input className={input} name="batchNumber" defaultValue={product.batchNumber ?? ""} />
                      <input className={input} name="coaFileUrl" defaultValue={product.coaFileUrl ?? ""} />
                      <input className={input} name="imageUrls" defaultValue={product.imageUrls.join("\n")} />
                      <label className="grid gap-1 text-xs font-semibold text-slate-600">
                        Upload replacement image
                        <input className="text-sm" name="imageFile" type="file" accept="image/*" />
                      </label>
                      <label className="flex items-center gap-2 text-sm"><input name="active" type="checkbox" defaultChecked={product.active} /> Active</label>
                      <textarea className="min-h-20 border border-slate-300 p-3 text-sm md:col-span-3" name="shortDescription" defaultValue={product.shortDescription} required />
                      <textarea className="min-h-24 border border-slate-300 p-3 text-sm md:col-span-3" name="fullDescription" defaultValue={product.fullDescription} required />
                      <Button className="w-fit">Save edits</Button>
                    </form>
                  </details>
                  <form action={deleteProductAction} className="mt-2"><input type="hidden" name="id" value={product.id} /><Button variant="secondary">Deactivate</Button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

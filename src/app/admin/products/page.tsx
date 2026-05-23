import { deleteProductAction, upsertProductAction } from "@/server/actions/admin-actions";
import type { ReactNode } from "react";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const fieldClass = "field-dark h-11 px-3 text-sm";
const areaClass = "field-dark p-3 text-sm";
const labelClass = "grid gap-1.5 text-xs font-semibold uppercase tracking-[.12em] text-cyan-100";

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`${labelClass} ${wide ? "md:col-span-2 xl:col-span-4" : ""}`}>{label}{children}</label>;
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="grid gap-6">
      <form action={upsertProductAction} className="glass-panel grid gap-5 p-5">
        <div>
          <h2 className="text-xl font-semibold text-white">Create product</h2>
          <p className="mt-1 text-sm text-slate-500">Add catalogue, documentation, stock, and product imagery.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Name"><input className={fieldClass} name="name" required /></Field>
          <Field label="Slug"><input className={fieldClass} name="slug" required /></Field>
          <Field label="Category"><input className={fieldClass} name="category" required /></Field>
          <Field label="SKU"><input className={fieldClass} name="sku" required /></Field>
          <Field label="Price cents"><input className={fieldClass} name="priceCents" type="number" required /></Field>
          <Field label="Compare cents"><input className={fieldClass} name="compareAtCents" type="number" /></Field>
          <Field label="Stock"><input className={fieldClass} name="stockQuantity" type="number" required /></Field>
          <Field label="Purity"><input className={fieldClass} name="purityPercent" type="number" step="0.01" required /></Field>
          <Field label="Molecular weight"><input className={fieldClass} name="molecularWeight" /></Field>
          <Field label="CAS"><input className={fieldClass} name="casNumber" /></Field>
          <Field label="Storage"><input className={fieldClass} name="storageCondition" required /></Field>
          <Field label="Form"><input className={fieldClass} name="form" required /></Field>
          <Field label="Batch"><input className={fieldClass} name="batchNumber" /></Field>
          <Field label="COA URL"><input className={fieldClass} name="coaFileUrl" /></Field>
          <Field label="Image URL"><input className={fieldClass} name="imageUrls" /></Field>
          <Field label="Upload image">
            <input className="rounded-2xl border border-cyan-300/20 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-3 file:py-1.5 file:font-semibold file:text-slate-950" name="imageFile" type="file" accept="image/*" />
          </Field>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-200"><input name="active" type="checkbox" defaultChecked /> Active</label>
          <Field label="Short description" wide><textarea className={`${areaClass} min-h-24`} name="shortDescription" required /></Field>
          <Field label="Full description" wide><textarea className={`${areaClass} min-h-32`} name="fullDescription" required /></Field>
        </div>
        <Button className="w-fit">Save product</Button>
      </form>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-cyan-300/8 text-left text-xs uppercase tracking-[.16em] text-cyan-100">
            <tr><th className="p-4">Product</th><th className="p-4">SKU</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4"></th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-cyan-300/12 align-top">
                <td className="p-4"><span className="font-semibold text-white">{product.name}</span><br /><span className="text-xs text-slate-500">{product.category}</span></td>
                <td className="p-4">{product.sku}</td>
                <td className="p-4">{formatMoney(product.priceCents)}</td>
                <td className="p-4">{product.stockQuantity}</td>
                <td className="p-4 text-right">
                  <details className="text-left">
                    <summary className="cursor-pointer rounded-full border border-cyan-300/25 px-4 py-2 text-center font-semibold text-cyan-100">Edit</summary>
                    <form action={upsertProductAction} className="mt-4 grid gap-4 rounded-3xl border border-cyan-300/15 bg-slate-950/70 p-4 md:grid-cols-2 xl:grid-cols-4">
                      <input type="hidden" name="id" value={product.id} />
                      <Field label="Name"><input className={fieldClass} name="name" defaultValue={product.name} required /></Field>
                      <Field label="Slug"><input className={fieldClass} name="slug" defaultValue={product.slug} required /></Field>
                      <Field label="Category"><input className={fieldClass} name="category" defaultValue={product.category} required /></Field>
                      <Field label="SKU"><input className={fieldClass} name="sku" defaultValue={product.sku} required /></Field>
                      <Field label="Price cents"><input className={fieldClass} name="priceCents" type="number" defaultValue={product.priceCents} required /></Field>
                      <Field label="Compare cents"><input className={fieldClass} name="compareAtCents" type="number" defaultValue={product.compareAtCents ?? ""} /></Field>
                      <Field label="Stock"><input className={fieldClass} name="stockQuantity" type="number" defaultValue={product.stockQuantity} required /></Field>
                      <Field label="Purity"><input className={fieldClass} name="purityPercent" type="number" step="0.01" defaultValue={String(product.purityPercent)} required /></Field>
                      <Field label="Molecular weight"><input className={fieldClass} name="molecularWeight" defaultValue={product.molecularWeight ?? ""} /></Field>
                      <Field label="CAS"><input className={fieldClass} name="casNumber" defaultValue={product.casNumber ?? ""} /></Field>
                      <Field label="Storage"><input className={fieldClass} name="storageCondition" defaultValue={product.storageCondition} required /></Field>
                      <Field label="Form"><input className={fieldClass} name="form" defaultValue={product.form} required /></Field>
                      <Field label="Batch"><input className={fieldClass} name="batchNumber" defaultValue={product.batchNumber ?? ""} /></Field>
                      <Field label="COA URL"><input className={fieldClass} name="coaFileUrl" defaultValue={product.coaFileUrl ?? ""} /></Field>
                      <Field label="Image URLs"><input className={fieldClass} name="imageUrls" defaultValue={product.imageUrls.join("\n")} /></Field>
                      <Field label="Upload image">
                        <input className="rounded-2xl border border-cyan-300/20 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-xl file:border-0 file:bg-cyan-300 file:px-3 file:py-1.5 file:font-semibold file:text-slate-950" name="imageFile" type="file" accept="image/*" />
                      </Field>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-200"><input name="active" type="checkbox" defaultChecked={product.active} /> Active</label>
                      <Field label="Short description" wide><textarea className={`${areaClass} min-h-24`} name="shortDescription" defaultValue={product.shortDescription} required /></Field>
                      <Field label="Full description" wide><textarea className={`${areaClass} min-h-28`} name="fullDescription" defaultValue={product.fullDescription} required /></Field>
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

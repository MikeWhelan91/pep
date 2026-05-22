import type { Product } from "@prisma/client";

export function ProductSpecs({ product }: { product: Product }) {
  const rows = [
    ["SKU", product.sku],
    ["Purity", `${product.purityPercent}%`],
    ["Molecular weight", product.molecularWeight ?? "Available on request"],
    ["CAS number", product.casNumber ?? "N/A"],
    ["Storage", product.storageCondition],
    ["Form", product.form],
    ["Batch", product.batchNumber ?? "Assigned by lot"],
  ];

  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([label, value]) => (
        <tr key={label} className="border-b border-cyan-300/10">
            <th className="w-44 py-3 pr-4 text-left font-semibold text-slate-300">{label}</th>
            <td className="py-3 text-cyan-50">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

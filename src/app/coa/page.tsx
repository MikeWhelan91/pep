import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sample COA" };

export default function CoaPage() {
  const rows = [
    ["Product", "Reference Material C"],
    ["Batch", "B-RMC-2603"],
    ["Purity", "97.90%"],
    ["Appearance", "White to off-white powder"],
    ["Storage", "Controlled room temperature, sealed"],
    ["Review status", "Sample document for catalogue demonstration"],
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-semibold text-slate-950">Sample certificate of analysis</h1>
      <p className="mt-3 text-sm text-slate-600">This sample shows the documentation structure used by the store. It is not a competitor document and is not tied to a real third-party product.</p>
      <table className="mt-6 w-full border border-slate-200 text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-200">
              <th className="w-52 bg-slate-50 p-4 text-left font-semibold">{label}</th>
              <td className="p-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

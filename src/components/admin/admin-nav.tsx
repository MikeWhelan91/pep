import Link from "next/link";

const items = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Inventory", "/admin/inventory"],
  ["Orders", "/admin/orders"],
  ["Customers", "/admin/customers"],
  ["Discounts", "/admin/discounts"],
];

export function AdminNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-cyan-300/15 pb-4 text-sm">
      {items.map(([label, href]) => (
        <Link key={href} href={href} className="rounded-full border border-cyan-300/20 bg-slate-950/70 px-3 py-2 font-semibold text-slate-300 hover:border-cyan-200 hover:bg-cyan-300/10 hover:text-cyan-100">
          {label}
        </Link>
      ))}
    </nav>
  );
}

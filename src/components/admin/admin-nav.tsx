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
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4 text-sm">
      {items.map(([label, href]) => (
        <Link key={href} href={href} className="border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50">
          {label}
        </Link>
      ))}
    </nav>
  );
}

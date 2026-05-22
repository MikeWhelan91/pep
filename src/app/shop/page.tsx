import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Shop" };
export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { active: true, category: params.category || undefined },
      orderBy: { name: "asc" },
    }),
    prisma.product.findMany({ where: { active: true }, distinct: ["category"], select: { category: true }, orderBy: { category: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Product catalogue</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Research-only products for qualified laboratory purchasing programs.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <a className="border border-slate-300 px-3 py-2 hover:bg-slate-50" href="/shop">All</a>
          {categories.map((item) => (
            <a key={item.category} className="border border-slate-300 px-3 py-2 hover:bg-slate-50" href={`/shop?category=${encodeURIComponent(item.category)}`}>
              {item.category}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

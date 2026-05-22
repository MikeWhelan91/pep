import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <CyberGrid className="opacity-80" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <Reveal className="flex flex-col gap-4 border-b border-cyan-300/15 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <StatusChip>Catalogue</StatusChip>
            <h1 className="mt-4 text-4xl font-semibold text-white">Research inventory grid</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Research-only products for qualified laboratory purchasing programs.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a className="border border-cyan-300/25 bg-slate-950/70 px-3 py-2 text-cyan-100 hover:bg-cyan-300/10" href="/shop">All</a>
            {categories.map((item) => (
              <a key={item.category} className="border border-cyan-300/25 bg-slate-950/70 px-3 py-2 text-slate-200 hover:bg-cyan-300/10 hover:text-cyan-100" href={`/shop?category=${encodeURIComponent(item.category)}`}>
                {item.category}
              </a>
            ))}
          </div>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

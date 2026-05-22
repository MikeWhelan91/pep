import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";
import { ComplianceNote } from "@/components/ui/compliance-note";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({ where: { active: true }, take: 4, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_.95fr] lg:px-6">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Research supply ordering for qualified laboratory buyers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Browse a controlled catalogue with batch documentation fields, stock visibility, COA access, account ordering, and research-only compliance framing across checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Browse catalogue</ButtonLink>
              <ButtonLink href="/research" variant="secondary">Research information</ButtonLink>
            </div>
          </div>
          <div className="border border-slate-200 bg-slate-50 p-5">
            <ComplianceNote />
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {["Verified checkout", "Inventory tracking", "COA records", "Order events"].map((item) => (
                <div key={item} className="border border-slate-200 bg-white p-4 font-semibold text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Current catalogue</h2>
            <p className="mt-2 text-sm text-slate-600">Generic research materials with traceability-oriented product records.</p>
          </div>
          <ButtonLink href="/shop" variant="secondary">View all</ButtonLink>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

import { Atom, Boxes, ClipboardCheck, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { ProductImage } from "@/components/product/product-image";
import { ButtonLink } from "@/components/ui/button";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";
import { formatMoney } from "@/lib/format";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const proofPoints = [
  { Icon: Atom, title: "Research-only", copy: "No therapeutic, diagnostic, usage, or dosing guidance." },
  { Icon: ClipboardCheck, title: "COA records", copy: "Batch fields, purity, storage, and documentation links." },
  { Icon: Truck, title: "Tracked fulfilment", copy: "Order status, tracking numbers, and event history." },
  { Icon: ShieldCheck, title: "Webhook confirmed", copy: "Inventory changes only after provider confirmation." },
];

export default async function Home() {
  const products = await prisma.product.findMany({ where: { active: true }, take: 4, orderBy: { createdAt: "desc" } });
  const heroProducts = products.slice(0, 3);
  const totalStock = products.reduce((sum, product) => sum + product.stockQuantity, 0);

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-cyan-300/15">
        <CyberGrid />
        <div className="relative mx-auto min-h-[720px] max-w-7xl px-4 py-16 lg:px-6">
          <Reveal className="mx-auto max-w-5xl text-center">
            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Future-grade lab supply without clinical noise.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A controlled research-only catalogue with batch records, inventory visibility, COA access, webhook-confirmed payments, and admin-grade order operations.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/shop">Browse catalogue</ButtonLink>
              <ButtonLink href="/coa" variant="secondary">View COA sample</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <div className="glass-panel neon-border mx-auto max-w-6xl p-4 md:p-6">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,.22),rgba(2,6,23,.94)_58%)] p-5 md:p-8">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="relative grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                  <div className="flex flex-col justify-between rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/72 p-5">
                    <div>
                      <StatusChip tone="violet">Live procurement console</StatusChip>
                      <h2 className="mt-5 text-2xl font-semibold text-white">Batch records, stock, and purchase flow in one operating surface.</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-400">The storefront presents only research-use materials with clear documentation, stock visibility, and payment confirmation before inventory changes.</p>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                      {[
                        ["Active SKUs", products.length.toString()],
                        ["Units", totalStock.toString()],
                        ["Checkout", "Webhook"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-4">
                          <p className="text-lg font-semibold text-cyan-100">{value}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[.16em] text-slate-500">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {heroProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.slug}`} className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/78 p-3 transition hover:border-cyan-200/60 hover:bg-slate-900/90">
                        <div className="overflow-hidden rounded-2xl border border-cyan-300/10 bg-slate-900">
                          <div className="relative aspect-square">
                            <ProductImage src={product.imageUrls[0] ?? "/product-vial.svg"} alt="" className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105" />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{product.sku} · {product.purityPercent.toString()}% purity · {product.stockQuantity} units</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-cyan-100">{formatMoney(product.priceCents)}</p>
                          <p className="mt-1 text-xs text-slate-500">View record</p>
                        </div>
                      </Link>
                    ))}
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { title: "COA verified", Icon: ClipboardCheck },
                        { title: "Stock synced", Icon: Boxes },
                        { title: "Order gated", Icon: PackageCheck },
                      ].map(({ title, Icon }) => (
                        <div key={title} className="rounded-2xl border border-cyan-300/15 bg-slate-950/68 p-4 text-center">
                          <Icon className="mx-auto text-cyan-200" size={22} />
                          <p className="mt-2 text-xs font-semibold text-slate-200">{title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-cyan-300/15 bg-slate-950 px-4 py-8 lg:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {proofPoints.map(({ Icon, title, copy }) => (
            <Reveal key={title} className="rounded-3xl border border-cyan-300/15 bg-slate-900/60 p-5">
              <Icon className="text-cyan-200" size={24} />
              <h2 className="mt-4 font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <StatusChip>Current catalogue</StatusChip>
            <h2 className="mt-4 text-3xl font-semibold text-white">Controlled research inventory</h2>
            <p className="mt-2 text-sm text-slate-400">Generic materials with traceability-oriented records and clear procurement boundaries.</p>
          </div>
          <ButtonLink href="/shop" variant="secondary">View all</ButtonLink>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

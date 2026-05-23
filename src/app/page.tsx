import { Atom, Boxes, ClipboardCheck, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const heroSignals = [
  { title: "COA verified", value: "Batch B-RMC-2603", Icon: ClipboardCheck },
  { title: "Inventory synced", value: "225 units across active SKUs", Icon: Boxes },
  { title: "Research-only gate", value: "Access confirmations stored", Icon: ShieldCheck },
];

const proofPoints = [
  { Icon: Atom, title: "Research-only", copy: "No therapeutic, diagnostic, usage, or dosing guidance." },
  { Icon: ClipboardCheck, title: "COA records", copy: "Batch fields, purity, storage, and documentation links." },
  { Icon: Truck, title: "Tracked fulfilment", copy: "Order status, tracking numbers, and event history." },
  { Icon: ShieldCheck, title: "Webhook confirmed", copy: "Inventory changes only after provider confirmation." },
];

export default async function Home() {
  const products = await prisma.product.findMany({ where: { active: true }, take: 4, orderBy: { createdAt: "desc" } });

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-cyan-300/15">
        <CyberGrid />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-6">
          <Reveal className="flex flex-col justify-center">
            <StatusChip>Qualified research procurement</StatusChip>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Future-grade lab supply without clinical noise.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A controlled research-only catalogue with batch records, inventory visibility, COA access, webhook-confirmed payments, and admin-grade order operations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Browse catalogue</ButtonLink>
              <ButtonLink href="/coa" variant="secondary">View COA sample</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex items-center">
            <div className="glass-panel neon-border w-full p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,.2),rgba(2,6,23,.94)_65%)]">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="absolute left-8 top-8">
                  <StatusChip tone="violet">Live batch matrix</StatusChip>
                </div>
                <div className="absolute inset-x-8 bottom-8 grid gap-3">
                  {heroSignals.map(({ title, value, Icon }) => (
                    <div key={title} className="flex items-center gap-4 rounded-2xl border border-cyan-300/15 bg-slate-950/75 p-4 backdrop-blur">
                      <Icon className="text-cyan-200" size={22} />
                      <div>
                        <p className="text-sm font-semibold text-white">{title}</p>
                        <p className="text-xs text-slate-400">{value}</p>
                      </div>
                    </div>
                  ))}
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

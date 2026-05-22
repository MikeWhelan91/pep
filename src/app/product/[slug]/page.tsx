import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCart } from "@/components/cart/add-to-cart";
import { ProductImage } from "@/components/product/product-image";
import { ProductSpecs } from "@/components/product/product-specs";
import { ComplianceNote } from "@/components/ui/compliance-note";
import { CyberGrid, StatusChip } from "@/components/ui/cyber";
import { Reveal } from "@/components/ui/reveal";
import { formatMoney } from "@/lib/format";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  return { title: product?.name ?? "Product", description: product?.shortDescription };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.active) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <CyberGrid className="opacity-70" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="glass-panel neon-border relative aspect-square overflow-hidden">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.12)_1px,transparent_1px)] [background-size:36px_36px]" />
            <ProductImage src={product.imageUrls[0] ?? "/product-vial.svg"} alt="" className="relative h-full w-full object-contain p-12" priority />
          </Reveal>
          <Reveal delay={0.08}>
            <StatusChip>{product.category}</StatusChip>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-base leading-7 text-slate-300">{product.fullDescription}</p>
            <div className="mt-7 flex items-center justify-between border-y border-cyan-300/15 py-5">
              <div>
                <p className="text-3xl font-semibold text-cyan-100">{formatMoney(product.priceCents)}</p>
                <p className="text-sm text-slate-400">{product.stockQuantity} available</p>
              </div>
              <AddToCart productId={product.id} disabled={product.stockQuantity < 1} />
            </div>
            <div className="mt-6">
              <ComplianceNote />
            </div>
          </Reveal>
        </div>
        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-xl font-semibold text-white">Specifications</h2>
            <div className="glass-panel mt-4 px-4">
              <ProductSpecs product={product} />
            </div>
          </div>
          <div className="glass-panel p-5">
            <h2 className="text-lg font-semibold text-white">Documentation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Batch documentation can be reviewed before procurement when available.</p>
            {product.coaFileUrl ? (
              <a className="mt-4 inline-flex text-sm font-semibold text-cyan-200 hover:underline" href={product.coaFileUrl}>
                View COA record
              </a>
            ) : (
              <p className="mt-4 text-sm text-slate-500">COA pending for this batch.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

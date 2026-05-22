import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCart } from "@/components/cart/add-to-cart";
import { ProductSpecs } from "@/components/product/product-specs";
import { ComplianceNote } from "@/components/ui/compliance-note";
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
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative aspect-square border border-slate-200 bg-slate-50">
          <Image src={product.imageUrls[0] ?? "/product-vial.svg"} alt="" fill className="object-contain p-12" priority />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{product.fullDescription}</p>
          <div className="mt-6 flex items-center justify-between border-y border-slate-200 py-5">
            <div>
              <p className="text-2xl font-semibold text-slate-950">{formatMoney(product.priceCents)}</p>
              <p className="text-sm text-slate-500">{product.stockQuantity} available</p>
            </div>
            <AddToCart productId={product.id} disabled={product.stockQuantity < 1} />
          </div>
          <div className="mt-6">
            <ComplianceNote />
          </div>
        </div>
      </div>
      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Specifications</h2>
          <div className="mt-4 border border-slate-200 px-4">
            <ProductSpecs product={product} />
          </div>
        </div>
        <div className="border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-950">Documentation</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Batch documentation can be reviewed before procurement when available.</p>
          {product.coaFileUrl ? (
            <a className="mt-4 inline-flex text-sm font-semibold text-teal-800 hover:underline" href={product.coaFileUrl}>
              View COA record
            </a>
          ) : (
            <p className="mt-4 text-sm text-slate-500">COA pending for this batch.</p>
          )}
        </div>
      </section>
    </div>
  );
}

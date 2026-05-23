import Link from "next/link";
import type { Product } from "@prisma/client";
import { AddToCart } from "@/components/cart/add-to-cart";
import { ProductImage } from "@/components/product/product-image";
import { HoverLift } from "@/components/ui/reveal";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <HoverLift>
      <article className="group grid h-full gap-4 overflow-hidden rounded-3xl border border-cyan-300/15 bg-slate-950/72 p-4 text-slate-100 shadow-[0_24px_70px_rgba(0,0,0,.22)] backdrop-blur transition hover:border-cyan-300/45 hover:shadow-[0_24px_90px_rgba(34,211,238,.12)]">
        <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,.14),rgba(15,23,42,.92)_62%)]">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.16)_1px,transparent_1px)] [background-size:28px_28px]" />
          <ProductImage src={product.imageUrls[0] ?? "/product-vial.svg"} alt="" className="relative h-full w-full object-contain p-8 transition duration-500 group-hover:scale-105" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">{product.category}</p>
          <Link href={`/product/${product.slug}`} className="mt-2 block text-base font-semibold text-white hover:text-cyan-200">
            {product.name}
          </Link>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{product.shortDescription}</p>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-cyan-300/10 pt-4">
          <div>
            <p className="font-semibold text-cyan-100">{formatMoney(product.priceCents)}</p>
            <p className="text-xs text-slate-500">{product.stockQuantity} in stock</p>
          </div>
          <AddToCart productId={product.id} disabled={product.stockQuantity < 1} />
        </div>
      </article>
    </HoverLift>
  );
}

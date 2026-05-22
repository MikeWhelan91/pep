import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";
import { AddToCart } from "@/components/cart/add-to-cart";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="grid gap-4 border border-slate-200 bg-white p-4">
      <Link href={`/product/${product.slug}`} className="relative aspect-square bg-slate-50">
        <Image src={product.imageUrls[0] ?? "/product-vial.svg"} alt="" fill className="object-contain p-8" />
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="mt-1 block text-base font-semibold text-slate-950 hover:text-teal-800">
          {product.name}
        </Link>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-950">{formatMoney(product.priceCents)}</p>
          <p className="text-xs text-slate-500">{product.stockQuantity} in stock</p>
        </div>
        <AddToCart productId={product.id} disabled={product.stockQuantity < 1} />
      </div>
    </article>
  );
}

import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/shop", "/about", "/contact", "/research", "/coa", "/legal/terms", "/legal/privacy", "/legal/refunds", "/legal/shipping", "/legal/cookies"];
  const products = await prisma.product.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } });
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: product.updatedAt })),
  ];
}

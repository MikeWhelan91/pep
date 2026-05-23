import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      priceCents: true,
      stockQuantity: true,
      sku: true,
      imageUrls: true,
    },
  });

  return NextResponse.json({ products });
}

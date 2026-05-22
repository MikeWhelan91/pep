"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { sendOrderCancelled, sendOrderConfirmation, sendOrderShipped } from "@/lib/email";
import { discountSchema, orderUpdateSchema, productSchema } from "@/lib/validation";

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

async function productImagesFromForm(formData: FormData) {
  const urls = String(formData.get("imageUrls") ?? "")
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);
  const uploaded = formData.get("imageFile");

  if (uploaded instanceof File && uploaded.size > 0) {
    if (!uploaded.type.startsWith("image/")) {
      throw new Error("Uploaded product image must be an image file.");
    }
    if (uploaded.size > 1_500_000) {
      throw new Error("Uploaded product image must be smaller than 1.5 MB.");
    }
    const buffer = Buffer.from(await uploaded.arrayBuffer());
    urls.unshift(`data:${uploaded.type};base64,${buffer.toString("base64")}`);
  }

  return urls.length ? urls : ["/product-vial.svg"];
}

export async function upsertProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = productSchema.parse(formObject(formData));
  const data = {
    ...parsed,
    purityPercent: parsed.purityPercent,
    imageUrls: await productImagesFromForm(formData),
  };
  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  await prisma.product.update({ where: { id: String(formData.get("id")) }, data: { active: false } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function updateInventoryAction(formData: FormData) {
  await requireAdmin();
  await prisma.product.update({
    where: { id: String(formData.get("id")) },
    data: { stockQuantity: Number(formData.get("stockQuantity")) },
  });
  revalidatePath("/admin/inventory");
}

export async function updateOrderAction(formData: FormData) {
  await requireAdmin();
  const parsed = orderUpdateSchema.parse(formObject(formData));
  const order = await prisma.order.update({
    where: { id: parsed.orderId },
    data: {
      status: parsed.status,
      trackingNumber: parsed.trackingNumber || null,
      adminNotes: parsed.adminNotes || null,
      events: { create: { type: "admin_status_update", message: `Order marked ${parsed.status}.` } },
    },
    include: { lineItems: true },
  });
  if (parsed.status === "SHIPPED") await sendOrderShipped(order);
  if (parsed.status === "CANCELLED" || parsed.status === "REFUNDED") await sendOrderCancelled(order);
  revalidatePath("/admin/orders");
}

export async function resendConfirmationAction(formData: FormData) {
  await requireAdmin();
  const order = await prisma.order.findUnique({ where: { id: String(formData.get("id")) }, include: { lineItems: true } });
  if (order) await sendOrderConfirmation(order);
}

export async function upsertDiscountAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = discountSchema.parse(formObject(formData));
  if (id) await prisma.discountCode.update({ where: { id }, data: parsed });
  else await prisma.discountCode.create({ data: parsed });
  revalidatePath("/admin/discounts");
}

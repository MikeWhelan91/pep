import { z } from "zod";

export const addressSchema = z.object({
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2).default("US"),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(10),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  shippingAddress: addressSchema,
  billingSameAsShipping: z.boolean().default(true),
  billingAddress: addressSchema.optional(),
  cart: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(99),
      }),
    )
    .min(1),
  couponCode: z.string().trim().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  institution: z.string().min(2),
  message: z.string().min(10).max(4000),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(20),
  category: z.string().min(2),
  priceCents: z.coerce.number().int().nonnegative(),
  compareAtCents: z.coerce.number().int().nonnegative().optional().nullable(),
  stockQuantity: z.coerce.number().int().nonnegative(),
  sku: z.string().min(2),
  purityPercent: z.coerce.number().min(0).max(100),
  molecularWeight: z.string().optional().nullable(),
  casNumber: z.string().optional().nullable(),
  storageCondition: z.string().min(2),
  form: z.string().min(2),
  batchNumber: z.string().optional().nullable(),
  coaFileUrl: z.string().url().or(z.string().startsWith("/")).optional().nullable(),
  imageUrls: z.string().optional(),
  active: z.coerce.boolean().default(true),
});

export const orderUpdateSchema = z.object({
  orderId: z.string(),
  status: z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED", "REFUNDED"]),
  trackingNumber: z.string().optional(),
  adminNotes: z.string().optional(),
});

export const discountSchema = z.object({
  code: z.string().min(2).transform((value) => value.toUpperCase()),
  description: z.string().optional(),
  percentOff: z.coerce.number().int().min(0).max(100).optional().nullable(),
  amountOffCents: z.coerce.number().int().min(0).optional().nullable(),
  active: z.coerce.boolean().default(true),
  maxUses: z.coerce.number().int().positive().optional().nullable(),
});

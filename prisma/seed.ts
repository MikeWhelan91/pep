import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    name: "Research Peptide A",
    slug: "research-peptide-a",
    shortDescription: "High-purity reference peptide for controlled laboratory workflows.",
    fullDescription:
      "Research Peptide A is supplied for qualified laboratory research purchasing programs. Documentation fields support batch traceability, storage review, and internal procurement records. No application, dosing, therapeutic, diagnostic, or clinical guidance is provided.",
    category: "Research Peptides",
    priceCents: 12900,
    compareAtCents: 14900,
    stockQuantity: 48,
    sku: "RPA-010",
    purityPercent: "99.10",
    molecularWeight: "1296.5 g/mol",
    casNumber: "N/A",
    storageCondition: "Store frozen at -20 C. Protect from light.",
    form: "Lyophilised powder",
    batchNumber: "B-RPA-2601",
    coaFileUrl: "/coa/sample",
    imageUrls: ["/product-vial.svg"],
  },
  {
    name: "Analytical Compound B",
    slug: "analytical-compound-b",
    shortDescription: "Analytical reference material prepared for research inventory programs.",
    fullDescription:
      "Analytical Compound B is listed for laboratory research procurement and analytical reference workflows. Product records include purity, stock, batch, storage, and COA fields to support internal review by qualified buyers.",
    category: "Analytical Compounds",
    priceCents: 18400,
    stockQuantity: 22,
    sku: "ACB-025",
    purityPercent: "98.70",
    molecularWeight: "842.2 g/mol",
    casNumber: "N/A",
    storageCondition: "Store refrigerated at 2-8 C in a dry environment.",
    form: "Crystalline powder",
    batchNumber: "B-ACB-2602",
    coaFileUrl: "/coa/sample",
    imageUrls: ["/product-vial.svg"],
  },
  {
    name: "Reference Material C",
    slug: "reference-material-c",
    shortDescription: "Traceable reference material for laboratory documentation needs.",
    fullDescription:
      "Reference Material C is intended solely for research supply ordering by laboratories, educational institutions, clinics, and qualified research professionals. It is not intended for human or animal consumption.",
    category: "Reference Materials",
    priceCents: 9400,
    stockQuantity: 65,
    sku: "RMC-005",
    purityPercent: "97.90",
    storageCondition: "Store at controlled room temperature. Keep sealed when not under review.",
    form: "Powder",
    batchNumber: "B-RMC-2603",
    coaFileUrl: "/coa/sample",
    imageUrls: ["/product-vial.svg"],
  },
  {
    name: "Lab Reagent D",
    slug: "lab-reagent-d",
    shortDescription: "General laboratory reagent for qualified research procurement.",
    fullDescription:
      "Lab Reagent D is supplied for research-only institutional purchasing. The catalogue record is structured for procurement, inventory tracking, and order documentation without usage or application advice.",
    category: "Lab Reagents",
    priceCents: 7600,
    stockQuantity: 90,
    sku: "LRD-100",
    purityPercent: "99.30",
    storageCondition: "Store in a cool, dry location away from direct light.",
    form: "Lyophilised powder",
    batchNumber: "B-LRD-2604",
    coaFileUrl: "/coa/sample",
    imageUrls: ["/product-vial.svg"],
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin-password-change-me";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN },
    create: {
      email: adminEmail,
      name: "Research Supply Admin",
      role: Role.ADMIN,
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  await prisma.discountCode.upsert({
    where: { code: "LAB10" },
    update: {},
    create: {
      code: "LAB10",
      description: "Institutional account opening discount",
      percentOff: 10,
      active: true,
      maxUses: 100,
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "free_shipping_threshold_cents" },
    update: { value: "25000" },
    create: { key: "free_shipping_threshold_cents", value: "25000" },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

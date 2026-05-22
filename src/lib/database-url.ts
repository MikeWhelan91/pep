export function databaseUrl() {
  return (
    process.env.DATABASE_URL ??
    process.env.DATABASE_URL_POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL_UNPOOLED ??
    "postgresql://postgres:postgres@localhost:5432/research_supply"
  );
}

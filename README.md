# Meridian Research Supply

Production-oriented research-only ecommerce site built with Next.js App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Auth.js, Stripe Checkout, Stripe webhooks, Resend, Zod, and React Hook Form.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` with real values:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/research_supply"
AUTH_SECRET="use-a-long-random-secret"
NEXTAUTH_SECRET="use-a-long-random-secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="change-this-password"
```

Create the database, run migrations, seed products/admin, and start:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

The app also accepts Vercel/Neon generated database variable names such as `DATABASE_URL_POSTGRES_PRISMA_URL`, `DATABASE_URL_DATABASE_URL`, `POSTGRES_PRISMA_URL`, and `DATABASE_URL_UNPOOLED`.

Open `http://localhost:3000`.

## Stripe Webhook

The app creates an internal pending order before redirecting to Stripe Checkout. Fulfilment logic runs only from the verified webhook at:

```text
POST /api/stripe/webhook
```

For local testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the emitted webhook secret into `STRIPE_WEBHOOK_SECRET`.

## Admin Access

The seed script creates an admin user from:

```text
ADMIN_EMAIL
SEED_ADMIN_PASSWORD
```

Admin routes are under `/admin`.

## Included

- Research access gate with required confirmations stored in localStorage and a cookie
- Product catalogue, product detail pages, persistent cart, checkout, and order success page
- Pending order creation before Stripe redirect
- Stripe webhook signature verification and idempotent webhook event storage
- Inventory decrement only after webhook-confirmed payment
- Payment provider abstraction and internal payments table
- Customer login/register, account, and order history
- Admin dashboard, product editing, inventory, orders, customers, and discounts
- Resend transactional email templates for order/payment/shipping/cancel/contact workflows
- Zod validation for forms and API inputs
- Research-only compliance copy across product and checkout surfaces
- Metadata, structured product data, sitemap, and robots.txt

## Quality Checks

```bash
npm run lint
npm run build
```

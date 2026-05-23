import Link from "next/link";
import { Beaker, CircuitBoard, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import { ButtonLink } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";

const nav = [
  ["Shop", "/shop"],
  ["Research information", "/research"],
  ["COA", "/coa"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export async function SiteHeader() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-30 border-b border-cyan-300/20 bg-slate-950/88 text-slate-100 shadow-[0_8px_40px_rgba(0,0,0,.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="group flex items-center gap-3 text-sm font-bold tracking-tight text-white">
          <span className="flex size-10 items-center justify-center rounded-2xl border border-cyan-300/50 bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,.18)] transition group-hover:scale-105">
            <Beaker size={19} />
          </span>
          <span>
            Meridian <span className="text-cyan-200">Research</span> Supply
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="relative hover:text-cyan-100 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-cyan-300 after:transition-all hover:after:w-full">
              {label}
            </Link>
          ))}
          {session?.user?.role === "ADMIN" ? (
            <Link href="/admin" className="inline-flex items-center gap-1 font-semibold text-cyan-200 hover:text-cyan-100">
              <CircuitBoard size={15} />
              Admin
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">
          <CartDrawer />
          <ButtonLink href={session ? "/account" : "/login"} variant="secondary" className="gap-2">
            <UserRound size={16} />
            <span className="hidden sm:inline">{session ? "Account" : "Login"}</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

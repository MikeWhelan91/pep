import Link from "next/link";
import { Beaker, ShoppingCart, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import { ButtonLink } from "@/components/ui/button";

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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-950">
          <span className="flex size-9 items-center justify-center rounded-md border border-teal-700 text-teal-800">
            <Beaker size={19} />
          </span>
          Meridian Research Supply
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-teal-800">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/cart" variant="ghost" className="px-3" aria-label="Cart">
            <ShoppingCart size={18} />
          </ButtonLink>
          <ButtonLink href={session ? "/account" : "/login"} variant="secondary" className="gap-2">
            <UserRound size={16} />
            <span className="hidden sm:inline">{session ? "Account" : "Login"}</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

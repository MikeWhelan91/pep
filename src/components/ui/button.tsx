import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.22)] hover:bg-cyan-200 hover:shadow-[0_0_42px_rgba(34,211,238,.34)]",
  secondary: "border border-cyan-300/30 bg-slate-950/60 text-cyan-50 hover:border-cyan-200 hover:bg-cyan-300/10",
  ghost: "text-slate-200 hover:bg-cyan-300/10 hover:text-cyan-100",
  danger: "bg-red-700 text-white hover:bg-red-800",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: keyof typeof variants; children: ReactNode }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

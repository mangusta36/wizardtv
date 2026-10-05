import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

export function ButtonLink({ href, children, variant = "primary", className = "", ...props }: Props) {
  const classes = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] border-[var(--accent)]",
    secondary:
      "bg-white/90 text-[var(--ink)] hover:bg-white border-white/70",
    dark: "bg-[var(--ink)] text-white hover:bg-black border-[var(--ink)]",
  };

  const base =
    "inline-flex min-h-11 max-w-full items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={`${base} ${classes[variant]} ${className}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={`${base} ${classes[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

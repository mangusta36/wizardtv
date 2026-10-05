"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const trialUrl = createWhatsAppUrl(whatsappMessages.freeTrial);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(253,252,249,0.92)] backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-[var(--accent)] ${
                pathname === item.href ? "text-[var(--accent)]" : "text-[var(--muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href={trialUrl} target="_blank" rel="noopener noreferrer">
            Free Trial
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-[var(--line)] text-[var(--ink)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-[var(--ink)] hover:bg-[var(--soft)]"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full"
            >
              Free Trial
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

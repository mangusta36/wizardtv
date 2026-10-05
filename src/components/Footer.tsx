import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">
            Wizard TV keeps subscriptions, setup, and support straightforward with direct
            WhatsApp help when you need it.
          </p>
          <ButtonLink
            href={createWhatsAppUrl(whatsappMessages.support)}
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            className="mt-6"
          >
            Contact Support
          </ButtonLink>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--ink)]">Navigation</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link className="text-[var(--muted)] hover:text-[var(--accent)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--ink)]">Legal</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {legal.map((item) => (
              <li key={item.href}>
                <Link className="text-[var(--muted)] hover:text-[var(--accent)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-5 py-5 text-center text-xs text-[var(--muted)]">
        © 2026 Wizard TV. Production domain to be configured.
      </div>
    </footer>
  );
}

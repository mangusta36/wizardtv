import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Wizard TV",
  description: "Learn what the Wizard TV website offers, including plan information, device guidance, troubleshooting resources, and direct support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Wizard TV",
    description: "Wizard TV plan information, device guidance, troubleshooting resources, and direct support.",
    url: "/about",
  },
  twitter: {
    title: "About Wizard TV",
    description: "Wizard TV plan information, device guidance, troubleshooting resources, and direct support.",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white py-16">
      <div className="container">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="font-semibold text-[var(--accent)]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">About Wizard TV</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Wizard TV is a subscription-service brand whose website presents plan durations and device counts, explains common setup paths, and connects visitors with direct assistance through WhatsApp.
          </p>
        </div>
        <div className="mt-12 grid gap-10 border-y border-[var(--line)] py-10 md:grid-cols-3">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink)]">Compare plans</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">The Pricing page shows the published price for each duration and supported device count without changing the selection during contact.</p>
            <Link href="/pricing" className="mt-4 inline-block font-semibold text-[var(--accent)]">View Wizard TV pricing</Link>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink)]">Prepare a device</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">The device and setup guide helps visitors identify a practical first screen and the information to gather before asking for help.</p>
            <Link href="/channels" className="mt-4 inline-block font-semibold text-[var(--accent)]">Read the device guide</Link>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--ink)]">Find useful guidance</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">The FAQ and blog cover plan questions, setup, and troubleshooting while marking external schedules and availability as facts to verify.</p>
            <Link href="/blog" className="mt-4 inline-block font-semibold text-[var(--accent)]">Browse practical guides</Link>
          </section>
        </div>
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--ink)]">How to reach Wizard TV</h2>
          <p className="mt-4 leading-8 text-[var(--muted)]">
            WhatsApp is the only contact channel verified by this website. Use it for trial requests, plan questions, setup support, and reseller inquiries. The site does not publish a physical office, company registration, support email, or broadcaster partnership, so none is implied here.
          </p>
          <ButtonLink href={createWhatsAppUrl(whatsappMessages.support)} target="_blank" rel="noopener noreferrer" className="mt-6">
            Contact Wizard TV
          </ButtonLink>
        </section>
      </div>
    </main>
  );
}

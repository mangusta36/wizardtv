import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Wizard TV Support",
  description: "Contact Wizard TV on WhatsApp for plan questions, trial requests, setup support, and reseller inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Wizard TV Support",
    description: "Use the verified Wizard TV WhatsApp routes for plans, trials, setup support, and reseller inquiries.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Wizard TV Support",
    description: "Use the verified Wizard TV WhatsApp routes for plans, trials, setup support, and reseller inquiries.",
  },
};

const contactOptions = [
  { title: "General support", body: "Ask for help with a device, setup path, playback symptom, or an existing conversation.", message: whatsappMessages.support, label: "Open support chat" },
  { title: "Free Trial request", body: "Ask whether a trial is available for the device and setup you plan to use.", message: whatsappMessages.freeTrial, label: "Request a Free Trial" },
  { title: "Pricing question", body: "Confirm a plan duration, device count, published price, or terms before paying.", message: whatsappMessages.pricingQuestion, label: "Ask about pricing" },
  { title: "Reseller inquiry", body: "Start a conversation about current reseller availability without assuming prices or earnings.", message: whatsappMessages.reseller, label: "Discuss reseller availability" },
];

export default function ContactPage() {
  return (
    <main className="bg-white py-16">
      <div className="container">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="font-semibold text-[var(--accent)]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">Contact Wizard TV</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            WhatsApp is the verified contact method published by this website. Choose the closest topic below so your message opens with useful context.
          </p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-8 border-y border-[var(--line)] py-10 md:grid-cols-2">
          {contactOptions.map((option) => (
            <section key={option.title} className="border-t border-[var(--line)] pt-5 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
              <h2 className="text-xl font-semibold text-[var(--ink)]">{option.title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{option.body}</p>
              <ButtonLink href={createWhatsAppUrl(option.message)} target="_blank" rel="noopener noreferrer" variant="dark" className="mt-5">
                {option.label}
              </ButtonLink>
            </section>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-7 text-[var(--muted)]">
          Do not send passwords, full payment-card details, or account credentials. For faster technical help, include the device, player, connection type, exact symptom, and the checks you already tried.
        </p>
      </div>
    </main>
  );
}

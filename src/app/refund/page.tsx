import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Wizard TV refund policy placeholder pending final business review.",
  alternates: { canonical: "/refund" },
  openGraph: {
    title: "Wizard TV Refund Policy",
    description: "Wizard TV refund policy placeholder pending final business review.",
    url: "/refund",
  },
  twitter: {
    title: "Wizard TV Refund Policy",
    description: "Wizard TV refund policy placeholder pending final business review.",
  },
};

export default function RefundPage() {
  return <section className="bg-white py-16"><div className="container max-w-3xl"><h1 className="text-4xl font-semibold text-[var(--ink)]">Refund Policy</h1><p className="mt-6 leading-8 text-[var(--muted)]">Wizard TV refund rules must be finalized by the business owner before production launch. Customers should contact Wizard TV directly on WhatsApp for current support and subscription questions.</p></div></section>;
}

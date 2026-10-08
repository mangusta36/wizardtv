import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Wizard TV website terms and customer communication notes.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Wizard TV Terms",
    description: "Wizard TV website terms and customer communication notes.",
    url: "/terms",
  },
  twitter: {
    title: "Wizard TV Terms",
    description: "Wizard TV website terms and customer communication notes.",
  },
};

export default function TermsPage() {
  return <section className="bg-white py-16"><div className="container max-w-3xl"><h1 className="text-4xl font-semibold text-[var(--ink)]">Terms</h1><p className="mt-6 leading-8 text-[var(--muted)]">Wizard TV plan details, device counts, and support expectations should be confirmed through the official WhatsApp flow before purchase. These starter terms should be reviewed and replaced with final legal language before launch.</p></div></section>;
}

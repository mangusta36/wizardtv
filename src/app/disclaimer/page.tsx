import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Wizard TV disclaimer for service information and device guidance.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Wizard TV Disclaimer",
    description: "Wizard TV disclaimer for service information and device guidance.",
  },
  twitter: {
    title: "Wizard TV Disclaimer",
    description: "Wizard TV disclaimer for service information and device guidance.",
  },
};

export default function DisclaimerPage() {
  return <section className="bg-white py-16"><div className="container max-w-3xl"><h1 className="text-4xl font-semibold text-[var(--ink)]">Disclaimer</h1><p className="mt-6 leading-8 text-[var(--muted)]">Device guidance on this website is general and should be confirmed with Wizard TV support when your setup is unusual. This website does not claim broadcaster partnerships, uptime guarantees, or unsupported technical guarantees.</p></div></section>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Wizard TV privacy policy and customer communication overview.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Wizard TV Privacy Policy",
    description: "Wizard TV privacy policy and customer communication overview.",
  },
  twitter: {
    title: "Wizard TV Privacy Policy",
    description: "Wizard TV privacy policy and customer communication overview.",
  },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" body="Wizard TV uses direct customer communication for trial, support, order, and reseller inquiries. Do not send sensitive payment credentials through website forms. A final production privacy policy should be reviewed when the production domain and operating details are supplied." />;
}

function LegalPage({ title, body }: { title: string; body: string }) {
  return <section className="bg-white py-16"><div className="container max-w-3xl"><h1 className="text-4xl font-semibold text-[var(--ink)]">{title}</h1><p className="mt-6 leading-8 text-[var(--muted)]">{body}</p></div></section>;
}

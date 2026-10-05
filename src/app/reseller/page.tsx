import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Wizard TV IPTV Reseller Information",
  description:
    "Ask about becoming a Wizard TV IPTV reseller, review what to discuss, and contact Wizard TV through WhatsApp for current reseller details.",
  alternates: { canonical: "/reseller" },
  openGraph: {
    title: "Wizard TV IPTV Reseller Information",
    description:
      "Review Wizard TV reseller inquiry details and contact Wizard TV through WhatsApp for current commercial information.",
  },
  twitter: {
    title: "Wizard TV IPTV Reseller Information",
    description:
      "Ask about Wizard TV IPTV reseller availability through the official WhatsApp inquiry path.",
  },
};

const resellerFaqs: FaqItem[] = [
  {
    question: "What is the Wizard TV reseller option?",
    answer:
      "The Wizard TV reseller option is an inquiry path for people who want to discuss offering Wizard TV service to their own customers. Current reseller details should be confirmed directly with Wizard TV through WhatsApp.",
  },
  {
    question: "How do I ask about becoming a Wizard TV IPTV reseller?",
    answer:
      "Use the reseller inquiry button on this page. It opens WhatsApp with the message, \"Hi Wizard TV, I'm interested in becoming a reseller.\"",
  },
  {
    question: "Are reseller prices listed publicly?",
    answer:
      "No. This website does not publish reseller prices, credits, margins, commissions, minimum purchases, or account limits. Ask Wizard TV directly for the current reseller structure.",
  },
  {
    question: "Does the normal Wizard TV pricing page show reseller pricing?",
    answer:
      "No. The pricing page shows customer subscription plans only. It should not be treated as a reseller price list.",
  },
  {
    question: "Where can I ask about current Wizard IPTV reseller terms?",
    answer:
      "Use the reseller WhatsApp inquiry on this page to ask Wizard TV about any current reseller availability, structure, setup process, and commercial terms.",
  },
  {
    question: "Can I review Wizard TV devices and plans before contacting the reseller team?",
    answer:
      "Yes. Review the Wizard TV IPTV customer plans, device compatibility page, and FAQ so your reseller questions can be specific and practical.",
  },
];

export default function ResellerPage() {
  const resellerUrl = createWhatsAppUrl(whatsappMessages.reseller);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Reseller", item: "/reseller" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: resellerFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <section className="bg-white py-16">
        <div className="container max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Reseller inquiries</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
            Become a Wizard TV IPTV Reseller
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Wizard TV provides a direct inquiry path for people who want to ask about
            reseller opportunities. This page explains what to review before contacting
            Wizard TV, how the reseller inquiry works, and where to confirm current
            Wizard IPTV business details without unverified promises.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={resellerUrl} target="_blank" rel="noopener noreferrer">
              Ask About Reselling
            </ButtonLink>
            <ButtonLink href="/pricing" variant="dark">
              View Wizard TV Plans
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Who This Wizard TV Reseller Page Is For</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              This page is for visitors who want to discuss whether they can offer
              Wizard TV service to their own customers. It is also useful for anyone
              comparing the customer-facing Wizard TV IPTV experience before asking
              about reseller availability.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              [
                "Customer-facing service context",
                "Review plans, devices, and support expectations before asking about the reseller option.",
              ],
              [
                "Direct commercial questions",
                "Use WhatsApp to ask Wizard TV about the current reseller structure and available options.",
              ],
              [
                "Clear expectations",
                "The website does not publish reseller pricing, earnings, margins, or approval guarantees.",
              ],
              [
                "Practical preparation",
                "Specific questions help the reseller conversation stay focused on real service details.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-[var(--line)] pt-5">
                <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How the Wizard TV Reseller Inquiry Works</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV keeps reseller interest on a direct WhatsApp path. The website
              gives you the context to prepare, while current reseller details should
              be discussed with Wizard TV directly.
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {[
              ["1", "Review this page", "Understand what is published and what must be confirmed directly."],
              ["2", "Open the reseller CTA", "The button opens WhatsApp with the official reseller inquiry message."],
              ["3", "Discuss current details", "Ask Wizard TV about reseller availability, process, and commercial terms."],
            ].map(([step, title, body]) => (
              <div key={step} className="grid grid-cols-[3rem_1fr] gap-4 md:block">
                <span className="grid size-11 place-items-center rounded-md bg-[var(--accent)] font-semibold text-white">
                  {step}
                </span>
                <div className="md:mt-4">
                  <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">What to Discuss Before Reselling Wizard IPTV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Because reseller business terms are not published on this website, use
              the WhatsApp conversation to confirm any current details Wizard TV
              provides at that time.
            </p>
            <ul className="mt-6 space-y-3 leading-7 text-[var(--muted)]">
              <li>Current reseller structure and available reseller options.</li>
              <li>Account or setup process for someone approved to resell Wizard TV.</li>
              <li>Support expectations for reseller questions and customer setup.</li>
              <li>Commercial terms that are current and verified directly by Wizard TV.</li>
            </ul>
          </div>
          <div className="border-y border-[var(--line)] py-6">
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Customer Pricing Is Separate</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              The public{" "}
              <Link href="/pricing" className="font-semibold text-[var(--accent)]">
                Wizard TV IPTV plans
              </Link>{" "}
              page shows customer subscription pricing. It is not a reseller price
              list and should not be used to infer reseller costs, margins, or terms.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Review Wizard TV IPTV Before You Ask</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              A reseller conversation is easier when you already understand the
              customer-facing service. Use these pages to review plans, common device
              considerations, support questions, and Wizard IPTV guides before you
              send a reseller inquiry.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Wizard TV plans", "/pricing", "Review customer subscription durations and device-count options."],
              ["Wizard TV device compatibility", "/channels", "Check common devices and setup considerations."],
              ["Wizard TV FAQ", "/faq", "Read support, trial, ordering, setup, and reseller answers."],
              ["Wizard IPTV guides", "/blog", "Browse practical service and setup guidance."],
            ].map(([title, href, body]) => (
              <Link key={href} href={href} className="border-t border-[var(--line)] pt-5">
                <h3 className="font-semibold text-[var(--accent)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-semibold text-[var(--ink)]">Questions About the Wizard TV Reseller Option</h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            These answers cover what is known from the website. Any unpublished
            reseller details should be confirmed directly with Wizard TV through the
            reseller WhatsApp inquiry.
          </p>
          <div className="mt-8">
            <FaqAccordion items={resellerFaqs} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--soft)] py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Ready to Ask About Wizard TV Reseller Availability?</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              Send the reseller inquiry on WhatsApp and discuss current Wizard TV
              reseller details directly.
            </p>
          </div>
          <ButtonLink href={resellerUrl} target="_blank" rel="noopener noreferrer">
            Become a Reseller
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

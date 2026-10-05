import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PricingSelector } from "@/components/PricingSelector";
import { ButtonLink } from "@/components/ButtonLink";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Wizard TV IPTV Pricing and Subscription Plans",
  description:
    "Compare Wizard TV IPTV pricing for 1 to 5 devices, review Wizard IPTV subscription durations, request a Free Trial, and order through WhatsApp.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Wizard TV IPTV Pricing and Subscription Plans",
    description:
      "Compare Wizard TV IPTV prices for 1 to 5 devices and choose 1 Month, 3 Months, 6 Months, or 12 Months.",
  },
  twitter: {
    title: "Wizard TV IPTV Pricing and Subscription Plans",
    description:
      "Compare Wizard TV IPTV prices for 1 to 5 devices and choose 1 Month, 3 Months, 6 Months, or 12 Months.",
  },
};

const pricingFaqs: FaqItem[] = [
  {
    question: "How much does Wizard TV cost?",
    answer:
      "Wizard TV pricing depends on the subscription duration and the number of devices selected. Use the device selector to see the final price for each plan.",
  },
  {
    question: "What Wizard TV IPTV subscription durations are available?",
    answer:
      "Wizard TV IPTV plans are available for 1 Month, 3 Months, 6 Months, and 12 Months.",
  },
  {
    question: "Can I use Wizard TV on more than one device?",
    answer:
      "Yes. The pricing selector supports 1, 2, 3, 4, or 5 devices, and the displayed prices update for the selected device count.",
  },
  {
    question: "How does Wizard IPTV multi-device pricing work?",
    answer:
      "Select the number of devices first, then compare the four subscription durations. The price shown on each card is the final listed price for that device count and duration.",
  },
  {
    question: "How do I order a Wizard TV plan?",
    answer:
      "Choose your device count, pick a duration, and click Order Now. WhatsApp opens with the exact selected plan, device count, and price.",
  },
  {
    question: "Can I request a Free Trial before ordering?",
    answer:
      "Yes. The Free Trial button opens WhatsApp with the existing Wizard TV trial request message.",
  },
  {
    question: "Where can I check device compatibility?",
    answer:
      "Use the Wizard TV IPTV device guide to review common setup paths before ordering.",
  },
  {
    question: "How can I get help choosing a plan?",
    answer:
      "Use the support action on this page to contact Wizard TV through WhatsApp for help choosing a plan or confirming your setup.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Pricing", item: "/pricing" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pricingFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
              Wizard TV IPTV Pricing and Subscription Plans
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Compare Wizard TV IPTV plans by duration and device count. Select 1 to
              5 devices, review the final whole-dollar price, and use Order Now to
              open WhatsApp with the exact plan, device count, and price.
            </p>
          </div>
          <div className="mt-10">
            <PricingSelector />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How Wizard IPTV Multi-Device Pricing Works</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              The device selector changes the four visible plan prices. Choose the
              number of devices you want covered first, then compare 1 Month, 3 Months,
              6 Months, and 12 Months.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Select 1 to 5 devices", "Use the selector above the plan cards to choose the device count you need."],
              ["Review final listed prices", "The displayed amount is the final customer-facing price for that selection."],
              ["Choose a plan duration", "Shorter and longer durations are shown side by side without savings claims or labels."],
              ["Order through WhatsApp", "Order Now carries the selected duration, device count, and price into WhatsApp."],
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
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How to Choose Your Wizard TV IPTV Plan</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Start with the practical details: how many devices you want to use, how
              long you want the subscription to run, whether you want to request a Free
              Trial first, and whether your device setup is clear.
            </p>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              If you need to confirm compatibility before ordering, review the{" "}
              <Link href="/channels" className="font-semibold text-[var(--accent)]">
                Wizard TV IPTV device guide
              </Link>{" "}
              or ask support directly through WhatsApp.
            </p>
          </div>
          <div className="space-y-5">
            {[
              ["1 Month", "Useful when you want a shorter subscription period."],
              ["3 Months", "A middle option when you want more time than a monthly plan."],
              ["6 Months", "A longer plan duration for customers who know their setup."],
              ["12 Months", "The longest available Wizard TV subscription duration on this page."],
            ].map(([title, body]) => (
              <div key={title} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-[var(--line)] pb-4">
                <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                <p className="text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How to Order a Wizard TV Subscription</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV uses a direct WhatsApp order flow instead of a shopping cart or
              checkout dashboard. The message stays short and includes only the selected
              duration, number of devices, and price.
            </p>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-4">
            {[
              ["1", "Select your devices", "Choose 1, 2, 3, 4, or 5 devices."],
              ["2", "Pick a duration", "Compare the four Wizard IPTV subscription options."],
              ["3", "Click Order Now", "WhatsApp opens with the exact selected plan."],
              ["4", "Continue on WhatsApp", "Ask questions or complete the order conversation there."],
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

      <section className="bg-[var(--soft)] py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Want to Try Wizard TV Before Choosing a Plan?</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              If you want to ask for a Free Trial before selecting a paid plan, use the
              button below. It opens WhatsApp with the existing Wizard TV trial request.
            </p>
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.freeTrial)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6"
            >
              Free Trial
            </ButtonLink>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Need Help Choosing a Wizard TV Plan?</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              Contact support if you need help choosing a duration, confirming device
              compatibility, or deciding how many devices to select.
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
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Check Your Device Before Ordering Wizard TV IPTV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Pricing visitors often need to confirm whether their preferred device is
              a good fit before ordering. Review common setup paths before choosing a
              subscription, especially if your TV or app setup is unfamiliar.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/channels">Wizard IPTV Device Guide</ButtonLink>
              <ButtonLink href="/faq" variant="dark">Wizard TV FAQ</ButtonLink>
            </div>
          </div>
          <div className="border-y border-[var(--line)] py-6">
            <h3 className="text-xl font-semibold text-[var(--ink)]">Other Wizard TV resources</h3>
            <div className="mt-5 grid gap-3 text-sm">
              <Link href="/blog" className="font-semibold text-[var(--accent)]">
                Wizard IPTV guides
              </Link>
              <Link href="/reseller" className="font-semibold text-[var(--accent)]">
                Wizard TV reseller information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Questions About Wizard TV IPTV Pricing</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              These answers focus on pricing, subscriptions, device counts, ordering,
              Free Trial requests, and support.
            </p>
          </div>
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>
    </>
  );
}

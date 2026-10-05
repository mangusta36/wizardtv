import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Wizard TV IPTV FAQ, Plans, Devices and Support",
  description:
    "Find answers about Wizard TV IPTV plans, pricing, devices, setup, IPTV players, Free Trial requests, ordering, support, and reseller inquiries.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Wizard TV IPTV FAQ, Plans, Devices and Support",
    description:
      "Answers about Wizard TV IPTV pricing, devices, setup, Free Trial requests, support, and reseller inquiries.",
  },
  twitter: {
    title: "Wizard TV IPTV FAQ, Plans, Devices and Support",
    description:
      "Answers about Wizard TV IPTV pricing, devices, setup, Free Trial requests, support, and reseller inquiries.",
  },
};

type FaqGroup = {
  title: string;
  intro: string;
  items: FaqItem[];
};

const faqGroups: FaqGroup[] = [
  {
    title: "About Wizard TV",
    intro: "Brand and service basics for new visitors.",
    items: [
      {
        question: "What is Wizard TV?",
        answer:
          "Wizard TV is an IPTV subscription service with plans organized by duration and device count. The website helps you compare pricing, review device setup considerations, request a Free Trial, and contact support through WhatsApp.",
      },
      {
        question: "What is Wizard TV IPTV?",
        answer:
          "Wizard TV IPTV refers to the Wizard TV service and its IPTV plan experience. The visible brand remains Wizard TV, while Wizard TV IPTV is a natural way customers may describe the service when looking for plans, devices, setup, and support.",
      },
      {
        question: "Is Wizard IPTV the same Wizard TV service?",
        answer:
          "Wizard IPTV is used on this website as a shorter way to refer to the same Wizard TV service context. It is not presented as a separate company or a separate brand.",
      },
      {
        question: "How do I get started with Wizard TV?",
        answer:
          "Start by checking the device you want to use, choosing a device count, and comparing plan durations. You can then use the pricing page to order through WhatsApp or request a Free Trial first.",
      },
    ],
  },
  {
    title: "Plans & Pricing",
    intro: "Questions about subscriptions, durations, and multi-device plan selection.",
    items: [
      {
        question: "How much does Wizard TV cost?",
        answer:
          "Wizard TV pricing depends on both subscription duration and device count. The pricing page shows final whole-dollar prices for 1 to 5 devices across 1 Month, 3 Months, 6 Months, and 12 Months.",
      },
      {
        question: "Which Wizard TV subscription durations are available?",
        answer:
          "Current Wizard TV subscription durations are 1 Month, 3 Months, 6 Months, and 12 Months. Each duration has a different price depending on whether you choose 1, 2, 3, 4, or 5 devices.",
      },
      {
        question: "Does Wizard TV support multiple devices?",
        answer:
          "Yes. Wizard TV customer-facing pricing supports selections from 1 to 5 devices. Choose the device count that matches how many devices you want covered.",
      },
      {
        question: "How does Wizard IPTV multi-device pricing work?",
        answer:
          "Select the number of devices first, then compare the available subscription durations. The displayed price on the pricing page is the final listed price for the selected device count and duration.",
      },
      {
        question: "Where can I see all Wizard TV IPTV prices?",
        answer:
          "Use the Wizard TV IPTV pricing page for the complete current pricing table and Order Now actions. The FAQ summarizes the model, while the pricing page is the best place to compare every option.",
      },
    ],
  },
  {
    title: "Devices & Compatibility",
    intro: "Device paths and compatibility expectations before setup.",
    items: [
      {
        question: "Can I use Wizard TV on Fire TV?",
        answer:
          "Fire TV and Fire TV Stick are common IPTV viewing devices. Setup may require a compatible IPTV player or setup method based on the account details provided.",
      },
      {
        question: "Does Wizard TV IPTV work with Android TV or Google TV?",
        answer:
          "Android TV and Google TV are common IPTV setup paths. Compatibility can depend on the device, available player options, and the setup information provided for your account.",
      },
      {
        question: "Can I use Wizard IPTV on Samsung or LG Smart TVs?",
        answer:
          "Samsung and LG Smart TV setup can depend on TV platform, model, region, and app-store availability. Wizard TV does not claim that one specific app is available on every Smart TV.",
      },
      {
        question: "Can Wizard TV be used on Apple TV?",
        answer:
          "Apple TV may work through a compatible IPTV player or setup method. The website does not claim a proprietary Wizard TV tvOS app.",
      },
      {
        question: "Can I use Wizard TV on a phone or tablet?",
        answer:
          "Phones and tablets can be useful viewing devices when a compatible IPTV player or setup path is available. This includes iPhone, iPad, and Android phones or tablets.",
      },
      {
        question: "Can I use Wizard TV on a computer?",
        answer:
          "Windows and macOS use depends on the account details and compatible viewing method provided. The website does not promise browser playback unless that is confirmed through support.",
      },
      {
        question: "Where can I review Wizard TV device compatibility?",
        answer:
          "Use the Wizard TV device compatibility page for more detail about Fire TV, Android TV, Smart TVs, Apple TV, phones, tablets, and computers.",
      },
    ],
  },
  {
    title: "Setup & IPTV Players",
    intro: "Careful setup guidance without unsupported app or partnership claims.",
    items: [
      {
        question: "Does Wizard TV require an IPTV player?",
        answer:
          "Wizard TV may require a compatible IPTV player or setup method depending on your device and account details. The correct setup path can vary by platform, model, region, and available apps.",
      },
      {
        question: "Which IPTV player should I use with Wizard TV?",
        answer:
          "The website does not define one required third-party player for every customer. Ask support if you need help matching your device to a suitable setup method.",
      },
      {
        question: "Does Wizard TV have its own app?",
        answer:
          "This website does not claim a proprietary Wizard TV app for every platform. Depending on your device, setup may involve a compatible third-party IPTV player or another setup method.",
      },
      {
        question: "What should I check before asking for setup help?",
        answer:
          "Know the device you want to use, the device model if relevant, your preferred screen, and whether you need one or multiple devices covered. This helps support understand your setup question more quickly.",
      },
    ],
  },
  {
    title: "Free Trial & Ordering",
    intro: "How trial requests and orders work through WhatsApp.",
    items: [
      {
        question: "Can I request a Wizard TV Free Trial?",
        answer:
          "Yes. The Free Trial action opens WhatsApp with the message, \"Hi Wizard TV, I'd like to request a free trial.\" No trial duration or approval guarantee is stated on the website.",
      },
      {
        question: "How do I request a Wizard TV IPTV trial?",
        answer:
          "Use a Free Trial button on the website. It opens WhatsApp directly, so you can send the prepared request to Wizard TV.",
      },
      {
        question: "How do I order Wizard TV?",
        answer:
          "Open the pricing page, select your device count, choose a subscription duration, and click Order Now. WhatsApp opens with the exact selected plan, device count, and price.",
      },
      {
        question: "How do I choose a Wizard TV IPTV plan?",
        answer:
          "Choose based on subscription duration, number of devices, device compatibility, and whether you want to request a Free Trial first. If you are unsure, contact support before ordering.",
      },
      {
        question: "What information is included when I click Order Now?",
        answer:
          "The Order Now message includes the selected duration, device count, and price. It does not add long website-browsing language or create an automated checkout account.",
      },
    ],
  },
  {
    title: "Support",
    intro: "Direct help for setup, plan selection, and account questions.",
    items: [
      {
        question: "How can I contact Wizard TV support?",
        answer:
          "Use the support actions on the website to open WhatsApp with the message, \"Hi Wizard TV, I need some help.\" No separate email, phone, ticketing, or live-chat support channel is claimed.",
      },
      {
        question: "Can Wizard TV help with setup?",
        answer:
          "Wizard TV can help you understand the setup path for your device through WhatsApp support. Be ready to share the device type and any relevant model or platform details.",
      },
      {
        question: "Can support help me choose a plan?",
        answer:
          "Yes. If you are not sure which duration or device count to choose, contact support before ordering. The pricing page remains the source for final plan prices.",
      },
    ],
  },
  {
    title: "Reseller",
    intro: "Questions for people interested in offering Wizard TV to customers.",
    items: [
      {
        question: "Does Wizard TV have a reseller option?",
        answer:
          "Wizard TV has a reseller inquiry path for people who want to ask about availability. The website does not publish earnings, margins, reseller prices, or guaranteed outcomes.",
      },
      {
        question: "How can I ask about becoming a Wizard TV reseller?",
        answer:
          "Use the reseller page or reseller inquiry action to contact Wizard TV through WhatsApp. The message says, \"Hi Wizard TV, I'm interested in becoming a reseller.\"",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((group) => group.items);

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "FAQ", item: "/faq" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
              Frequently Asked Questions About Wizard TV IPTV
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Find clear answers about Wizard TV plans, devices, setup, ordering,
              Free Trial requests, support, and reseller inquiries. The page also
              explains how Wizard IPTV wording relates to the same Wizard TV service.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pricing">View Pricing</ButtonLink>
              <ButtonLink
                href={createWhatsAppUrl(whatsappMessages.support)}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
              >
                Get Help
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/pricing" className="border-t border-[var(--line)] py-4 font-semibold text-[var(--accent)]">
              Wizard TV IPTV pricing
            </Link>
            <Link href="/channels" className="border-t border-[var(--line)] py-4 font-semibold text-[var(--accent)]">
              Wizard TV device compatibility
            </Link>
            <Link href="/blog" className="border-t border-[var(--line)] py-4 font-semibold text-[var(--accent)]">
              Wizard IPTV guides
            </Link>
            <Link href="/reseller" className="border-t border-[var(--line)] py-4 font-semibold text-[var(--accent)]">
              Wizard TV reseller information
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-14">
          {faqGroups.map((group) => (
            <section key={group.title} className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)]">{group.title}</h2>
                <p className="mt-3 leading-7 text-[var(--muted)]">{group.intro}</p>
              </div>
              <FaqAccordion items={group.items} />
            </section>
          ))}
        </div>
      </section>

      <section className="bg-[var(--soft)] py-16">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Still Have Wizard TV Questions?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              Contact Wizard TV on WhatsApp if you need help choosing a plan, checking
              device setup, requesting a Free Trial, or asking about reseller inquiries.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.freeTrial)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Free Trial
            </ButtonLink>
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.reseller)}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
            >
              Reseller Inquiry
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

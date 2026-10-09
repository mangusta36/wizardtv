import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PricingSelector } from "@/components/PricingSelector";
import { absoluteUrl } from "@/lib/site";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Wizard TV IPTV Plans, Device Setup and Free Trial",
  description:
    "Learn how Wizard TV IPTV works, compare Wizard IPTV plans for 1 to 5 devices, request a Free Trial, and contact support on WhatsApp.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Wizard TV IPTV Plans, Devices and Free Trial",
    description:
      "Compare Wizard TV IPTV plans, review supported devices, request a Free Trial, and get direct WhatsApp support.",
    url: absoluteUrl("/"),
  },
  twitter: {
    title: "Wizard TV IPTV Plans, Devices and Free Trial",
    description:
      "Compare Wizard TV IPTV plans, review supported devices, request a Free Trial, and get direct WhatsApp support.",
  },
};

const homeFaqs = [
  {
    question: "What is Wizard TV?",
    answer:
      "Wizard TV is an IPTV subscription service with plan options based on duration and the number of devices you want to use.",
  },
  {
    question: "Which devices can I use with Wizard TV?",
    answer:
      "Common Wizard TV setup paths include Fire TV, Android TV, Google TV, Samsung and LG Smart TVs, Apple TV, phones, tablets, and computers.",
  },
  {
    question: "How do Wizard TV multi-device plans work?",
    answer:
      "Choose 1 to 5 devices, then compare Wizard TV IPTV plans for 1 Month, 3 Months, 6 Months, and 12 Months. The displayed price updates for the selected device count.",
  },
  {
    question: "Can I request a Wizard TV Free Trial?",
    answer:
      "Yes. Use the Free Trial button to open WhatsApp with a short prepared message for Wizard TV.",
  },
  {
    question: "How can I get Wizard TV support?",
    answer:
      "Wizard TV support actions open WhatsApp directly so you can ask for setup help or plan guidance.",
  },
];

const deviceGroups = [
  {
    title: "Use Wizard TV on Fire TV and Android TV",
    body: "Fire TV, Android TV, and Google TV are common choices for the main television because they are built around streaming apps and remote-control viewing.",
  },
  {
    title: "Watch Wizard TV IPTV on Samsung and LG Smart TVs",
    body: "Smart TV users can review compatible app paths before ordering. If your TV model or app setup is unclear, Wizard TV support can help you confirm the best next step.",
  },
  {
    title: "Access Wizard IPTV on Apple TV, Phones and Computers",
    body: "Apple TV, mobile devices, tablets, and computers can be useful for secondary screens or households that want more than one viewing option.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Choose the Right Wizard TV IPTV Plan",
    body: "Start with the number of devices you expect to use, then compare the available Wizard IPTV plan durations.",
  },
  {
    step: "2",
    title: "Order Your Wizard TV Subscription",
    body: "Use Order Now from the pricing section to open WhatsApp with the selected duration, device count, and price.",
  },
  {
    step: "3",
    title: "Receive Your Wizard TV Setup Details",
    body: "Follow the setup information provided for your device category and ask support if your setup needs clarification.",
  },
  {
    step: "4",
    title: "Start Watching With Wizard TV",
    body: "Once your device is ready, use your selected plan on the screens covered by your subscription.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Wizard TV",
          url: absoluteUrl("/"),
          description: "Wizard TV IPTV pricing, devices, Free Trial requests, and support.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section className="relative min-h-[620px] overflow-hidden bg-[var(--ink)]">
        <Image
          src="/images/wizard-tv-living-room.jpg"
          alt="Modern living room with television for home entertainment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,21,29,.86),rgba(24,21,29,.55),rgba(24,21,29,.18))]" />
        <div className="container relative flex min-h-[620px] items-center py-20">
          <div className="w-full max-w-2xl text-white">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Wizard TV IPTV Plans for Simple TV Viewing Across Your Devices
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/86">
              Wizard TV IPTV helps you compare plans by duration and device count,
              request a Free Trial on WhatsApp, and get direct support for common
              streaming devices.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pricing">View Wizard TV Pricing</ButtonLink>
              <ButtonLink
                href={createWhatsAppUrl(whatsappMessages.freeTrial)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Free Trial
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--soft)] py-16">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--ink)]">Compare Wizard IPTV Subscription Options</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">
                Select 1 to 5 devices to see final Wizard TV IPTV prices for 1 Month,
                3 Months, 6 Months, and 12 Months. Each Order Now button opens
                WhatsApp with the exact selected plan and price.
              </p>
            </div>
            <Link href="/pricing" className="font-semibold text-[var(--accent)]">
              Open full Wizard TV IPTV pricing
            </Link>
          </div>
          <PricingSelector compact />
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--ink)]">
              What to Expect From Wizard TV
            </h2>
          </div>
          <div className="grid gap-6 text-base leading-8 text-[var(--muted)] sm:grid-cols-2">
            <p>
              Wizard TV keeps the subscription decision focused on practical details:
              how long you want the plan to run, how many devices you need, and which
              screen you plan to use first.
            </p>
            <p>
              You can compare <Link href="/pricing" className="font-semibold text-[var(--accent)]">Wizard TV pricing</Link>,
              review the <Link href="/channels" className="font-semibold text-[var(--accent)]">Wizard IPTV device guide</Link>,
              and contact support without creating a checkout account or dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Why Choose Wizard TV for Your IPTV Setup?</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV is built around clear plan choices, device flexibility, simple
              ordering, setup guidance, and direct WhatsApp support. The goal is to
              help you understand what you are selecting before you send an order.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Clear Wizard TV IPTV plan choices", "Compare plan durations and device counts without sorting through a complicated checkout flow."],
              ["Wizard TV Free Trial requests", "Open WhatsApp with a short trial request before deciding which paid plan fits your setup."],
              ["Wizard TV setup guidance", "Ask for help when you need to confirm a device path or understand how to get started."],
              ["Direct Wizard TV customer support", "Use WhatsApp for ordering questions, support, and reseller inquiries."],
            ].map(([title, body]) => (
              <div key={title} className="border-l-2 border-[var(--accent)] bg-[var(--background)] p-5">
                <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src="/images/wizard-tv-living-room.jpg"
              alt="Clean television setup in a modern living room"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Devices You Can Use With Wizard TV IPTV</h2>
            <p className="mt-5 leading-7 text-[var(--muted)]">
              Wizard TV IPTV is positioned around common viewing paths. Start with the
              device you use most often, then choose a plan that covers the number of
              screens your household expects to use.
            </p>
            <div className="mt-6 grid gap-5">
              {deviceGroups.map((group) => (
                <div key={group.title} className="border-t border-[var(--line)] pt-4">
                  <h3 className="font-semibold text-[var(--ink)]">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{group.body}</p>
                </div>
              ))}
            </div>
            <Link href="/channels" className="mt-6 inline-block font-semibold text-[var(--accent)]">
              Read the Wizard IPTV device guide
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How to Get Started With Wizard TV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              The Wizard IPTV process is intentionally direct. Pick the plan, confirm the
              device path if needed, then use WhatsApp for the customer action.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
          {processSteps.map(({ step, title, body }) => (
            <div key={step} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="grid size-12 place-items-center rounded-md bg-[var(--accent)] font-semibold text-white">
                {step}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                <p className="mt-2 leading-7 text-[var(--muted)]">{body}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Get Setup Help and Support From Wizard TV IPTV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Before ordering, think about the device you want to use first, whether
              you need more than one active device, and whether you want to request a
                trial. If you need help, Wizard TV support opens directly in WhatsApp.
            </p>
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.support)}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              className="mt-7"
            >
              Contact Wizard TV Support
            </ButtonLink>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border-t border-[var(--line)] pt-5">
              <h3 className="font-semibold text-[var(--ink)]">Prepare Your Device for Wizard TV IPTV</h3>
              <p className="mt-2 leading-7 text-[var(--muted)]">
                Choose a compatible screen or streaming device and ask support if your
                setup path is not obvious.
              </p>
            </div>
            <div className="border-t border-[var(--line)] pt-5">
              <h3 className="font-semibold text-[var(--ink)]">Ask Wizard IPTV Questions Before You Order</h3>
              <p className="mt-2 leading-7 text-[var(--muted)]">
                Use WhatsApp to ask plan, setup, Free Trial, or multi-device questions
                before selecting a subscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Try Wizard TV Before Choosing Your Plan</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              If you want to ask for a trial before choosing a paid plan, use the Free
              Trial action. It opens WhatsApp with a short message to Wizard TV.
            </p>
          </div>
          <ButtonLink
            href={createWhatsAppUrl(whatsappMessages.freeTrial)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Free Trial
          </ButtonLink>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Common Questions About Wizard IPTV</h2>
            <p className="mt-4 text-[var(--muted)]">
              A short preview of the questions visitors usually need answered before
              ordering. The full <Link href="/faq" className="font-semibold text-[var(--accent)]">Wizard TV FAQ</Link> covers
              pricing, devices, support, and reseller inquiries.
            </p>
            <Link href="/faq" className="mt-6 inline-block font-semibold text-[var(--accent)]">
              Read the Wizard TV FAQ
            </Link>
          </div>
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 border-y border-[var(--line)] py-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Interested in Offering Wizard TV to Your Customers?</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV has a reseller inquiry path for people who want to discuss
              availability. The website does not publish reseller earnings, margins,
              or guaranteed outcomes.
            </p>
          </div>
          <div className="md:text-right">
            <Link href="/reseller" className="font-semibold text-[var(--accent)]">
              View Wizard IPTV reseller information
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Know Who You Are Contacting</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Learn what this website publishes, how Wizard TV support works, and which
              business details are not claimed. The <Link href="/about" className="font-semibold text-[var(--accent)]">About Wizard TV page</Link> explains
              the service-information and guidance available here.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Check Terms Before You Start</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Review the <Link href="/privacy" className="font-semibold text-[var(--accent)]">Privacy Policy</Link>, <Link href="/terms" className="font-semibold text-[var(--accent)]">Website Terms</Link>, and <Link href="/refund" className="font-semibold text-[var(--accent)]">current refund information</Link> before
              paying. For plan or setup questions, use the verified options on the <Link href="/contact" className="font-semibold text-[var(--accent)]">Contact page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--soft)] py-16">
        <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Ready to Choose Your Wizard TV Plan?</h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Compare the device count and duration that fits your household, or ask
              for a Free Trial before you decide.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/pricing">View Wizard TV Pricing</ButtonLink>
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.freeTrial)}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
            >
              Free Trial
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

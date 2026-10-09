import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Wizard TV IPTV Devices and Setup Guide",
  description:
    "Review Wizard TV IPTV device compatibility for Fire TV, Android TV, Smart TVs, Apple TV, phones, tablets, and computers before choosing a plan.",
  alternates: { canonical: "/channels" },
  openGraph: {
    title: "Wizard TV IPTV Devices and Setup Guide",
    description:
      "Check common Wizard IPTV device paths, setup considerations, multi-device plans, Free Trial requests, and WhatsApp support.",
    url: "/channels",
  },
  twitter: {
    title: "Wizard TV IPTV Devices and Setup Guide",
    description:
      "Check common Wizard IPTV device paths, setup considerations, multi-device plans, Free Trial requests, and WhatsApp support.",
  },
};

const deviceRows = [
  ["Amazon Fire TV / Fire TV Stick", "Common television setup path using a compatible IPTV player or setup method."],
  ["Android TV / Google TV", "Useful for TV boxes and televisions built around Android-based streaming apps."],
  ["Samsung / LG Smart TV", "Depends on TV platform, model, region, and available compatible player apps."],
  ["Apple TV", "May require a compatible tvOS IPTV player or setup method rather than a proprietary Wizard TV app."],
  ["Phones and tablets", "Can be used on iPhone, iPad, and Android devices when a suitable setup path is available."],
  ["Windows / macOS computers", "Desktop or laptop use depends on the setup details provided and a compatible viewing method."],
];

const deviceFaqs: FaqItem[] = [
  {
    question: "Which devices work with Wizard TV?",
    answer:
      "Wizard TV can be used through common IPTV setup paths on Fire TV, Android TV, Google TV, Samsung and LG Smart TVs, Apple TV, phones, tablets, and computers when a compatible player or setup method is available.",
  },
  {
    question: "Can I use Wizard TV IPTV on Fire TV?",
    answer:
      "Fire TV and Fire TV Stick are common IPTV viewing devices. Setup may require a compatible IPTV player or setup method based on the account details provided.",
  },
  {
    question: "Can Wizard IPTV be used on Samsung or LG Smart TVs?",
    answer:
      "Samsung and LG Smart TV setup can depend on the TV platform, model, region, and app-store availability. Ask support if you are unsure about your specific TV.",
  },
  {
    question: "Can I use Wizard TV on Apple TV?",
    answer:
      "Apple TV may work through a compatible IPTV player or setup method. The page does not claim a proprietary Wizard TV tvOS application.",
  },
  {
    question: "Can I use Wizard TV on a phone or tablet?",
    answer:
      "Phones and tablets can be useful viewing devices when a compatible IPTV player or setup path is available for iPhone, iPad, or Android devices.",
  },
  {
    question: "Does Wizard TV require a specific IPTV player?",
    answer:
      "Wizard TV may require a compatible IPTV player or setup method depending on the device and account details. No single third-party player requirement is claimed on this page.",
  },
  {
    question: "Can I use Wizard TV on multiple devices?",
    answer:
      "Wizard TV pricing supports plan selections from 1 to 5 devices. Choose the device count that matches how many devices you want covered.",
  },
  {
    question: "Where can I get setup help?",
    answer:
      "Use the setup support action on this page to open WhatsApp and ask Wizard TV for help with your device path.",
  },
];

export default function ChannelsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Devices", item: absoluteUrl("/channels") },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: deviceFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--muted)]">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="font-semibold text-[var(--accent)]">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Devices and setup</li>
              </ol>
            </nav>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
              Devices That Work With Wizard TV IPTV
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Review common Wizard TV device paths before choosing a plan. Device setup
              can depend on your platform, region, available compatible player apps,
              and the account details provided after ordering.
            </p>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              This is the device compatibility and setup guide. It does not publish or
              guarantee a list of channels, networks, or sports availability.
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
          <div className="border-y border-[var(--line)]">
            {deviceRows.map(([device, note]) => (
              <div key={device} className="grid gap-2 border-b border-[var(--line)] py-4 last:border-b-0 sm:grid-cols-[14rem_1fr]">
                <h2 className="text-base font-semibold text-[var(--ink)]">{device}</h2>
                <p className="text-sm leading-6 text-[var(--muted)]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">How Wizard TV Device Compatibility Works</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV is a service, not a guarantee that every device has the same
              setup path. Depending on the screen you use, viewing may involve a
              compatible IPTV player or another setup method matched to your account
              details.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Use a compatible device", "Start with the screen or streaming device you expect to use most often."],
              ["Confirm the setup method", "Compatible player options can vary by platform, model, region, and availability."],
              ["Keep account details ready", "After ordering, follow the setup information provided for your device path."],
              ["Ask before ordering", "If your device is unusual, contact Wizard TV support before choosing a plan."],
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
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Use Wizard TV on Fire TV and Android TV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Amazon Fire TV, Fire TV Stick, Android TV, and Google TV are common IPTV
              device choices because they are designed for remote-control streaming.
              Wizard TV setup on these devices may involve a compatible IPTV player or
              setup method based on the details provided for your subscription.
            </p>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              This page does not provide sideload links, downloader codes, or a full
              installation tutorial. If you need a device-specific path, ask support
              before ordering.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Set Up Wizard IPTV on Samsung and LG Smart TVs</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Samsung and LG Smart TV setup can vary. Compatible player app availability
              may depend on your TV platform, model, region, and app-store access.
              Wizard TV does not claim a proprietary Smart TV application on this page.
            </p>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              If you are unsure whether your Samsung or LG TV has a suitable option,
              contact support with your TV model before choosing a subscription.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Use Wizard TV IPTV on Apple TV</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              Apple TV use may involve a compatible tvOS IPTV player or setup method.
              The site does not claim a separate official Wizard TV Apple TV app.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Access Wizard TV on Phones and Tablets</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              iPhone, iPad, and Android phones or tablets can be useful for flexible
              viewing when a compatible player or setup path is available.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Use Wizard TV From a Computer</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              Windows and macOS setup depends on the account details and compatible
              viewing method provided. This page does not promise browser playback.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--soft)] py-16">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">What You Need Before Setting Up Wizard TV</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Before setup, make sure you have a compatible device, a stable internet
              connection, a suitable player or setup method, and the account/setup
              details supplied after ordering. No specific minimum speed or activation
              timing is claimed here.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Using Wizard TV on More Than One Device</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Wizard TV pricing supports selections from 1 to 5 devices. Choose the
              device count that matches the screens you want covered, then compare{" "}
              <Link href="/pricing" className="font-semibold text-[var(--accent)]">
                Wizard TV IPTV pricing
              </Link>{" "}
              before ordering.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Choose Your Wizard TV Plan</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              Once you know which device path you want to use, compare the device count
              and duration that fit your household.
            </p>
          </div>
          <ButtonLink href="/pricing">View Pricing</ButtonLink>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Try Wizard TV on Your Device</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              If you want to request a Free Trial before choosing a plan, use the trial
              action. It opens WhatsApp with the existing Wizard TV trial request.
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
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Need Help Setting Up Wizard IPTV?</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              Contact Wizard TV through WhatsApp if you need help confirming a device
              path, understanding setup information, or choosing a plan.
            </p>
            <ButtonLink
              href={createWhatsAppUrl(whatsappMessages.support)}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              className="mt-6"
            >
              Get Help
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--ink)]">Common Questions About Wizard TV Devices</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              These device-specific answers cover setup intent, player expectations,
              multi-device plans, and support.
            </p>
            <div className="mt-6 grid gap-3 text-sm">
              <Link href="/faq" className="font-semibold text-[var(--accent)]">
                Wizard TV FAQ
              </Link>
              <Link href="/blog" className="font-semibold text-[var(--accent)]">
                Wizard IPTV guides
              </Link>
              <Link href="/reseller" className="font-semibold text-[var(--accent)]">
                Wizard TV reseller information
              </Link>
            </div>
          </div>
          <FaqAccordion items={deviceFaqs} />
        </div>
      </section>
    </>
  );
}

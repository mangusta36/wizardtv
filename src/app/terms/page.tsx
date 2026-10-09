import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

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
  return (
    <PolicyPage
      title="Website Terms"
      intro="These terms describe use of the Wizard TV website and the limits of the information published here. They do not invent purchase terms that the business owner has not approved."
      reviewNote="Service-specific payment, renewal, cancellation, and refund terms are not established on this page. Ask Wizard TV support for the terms that apply before making a payment."
      sections={[
        {
          heading: "Website information",
          paragraphs: [
            "The website provides plan prices, device guidance, troubleshooting articles, policy information, and links to direct support. Content is general information and may be updated as plans, software, devices, schedules, or support processes change.",
            "Plan duration, price, and device count should match the selection shown on the Pricing page and should be confirmed in the official WhatsApp conversation before purchase. The website does not currently provide an account dashboard or on-site checkout.",
          ],
        },
        {
          heading: "Device and setup guidance",
          paragraphs: [
            "Compatibility and troubleshooting guidance depends on the device, operating system, player, network, and account configuration. General guidance is not a guarantee that every device, application, stream, or network will work in every location. Contact support when your setup differs from the examples on the site.",
          ],
        },
        {
          heading: "Third-party services and content",
          paragraphs: [
            "Links to WhatsApp, device documentation, league websites, and other external resources are provided for convenience and verification. Those services have their own terms. Wizard TV does not claim an official partnership with sports leagues, broadcasters, device manufacturers, or the external sites cited in editorial content.",
          ],
        },
        {
          heading: "Responsible website use",
          paragraphs: [
            "Do not misuse the website, attempt to interfere with its operation, submit another person's private information without authority, or use support channels for unlawful activity. Nothing on this site authorizes access to content in violation of applicable rights or third-party terms.",
          ],
        },
        {
          heading: "Changes and questions",
          paragraphs: [
            "Website information and these terms may change when the service or site changes. For current plan or service questions, use the verified contact route on the Contact page before relying on older screenshots, copied prices, or third-party descriptions.",
          ],
        },
      ]}
    />
  );
}

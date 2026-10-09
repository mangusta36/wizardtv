import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Wizard TV privacy policy and customer communication overview.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Wizard TV Privacy Policy",
    description: "Wizard TV privacy policy and customer communication overview.",
    url: "/privacy",
  },
  twitter: {
    title: "Wizard TV Privacy Policy",
    description: "Wizard TV privacy policy and customer communication overview.",
  },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="This page explains the information paths that are currently visible on the Wizard TV website and how visitors can make privacy-related requests."
      reviewNote="Last reviewed October 9, 2026. The business owner should review this policy whenever contact, payment, analytics, account, or advertising tools change."
      sections={[
        {
          heading: "Information you choose to provide",
          paragraphs: [
            "Wizard TV currently directs trial, order, support, pricing, and reseller inquiries to WhatsApp. The website does not provide a customer account area, contact form, or on-site payment form. Information you choose to send in WhatsApp may include your name, phone number, device details, questions, and the contents of your messages.",
            "Send only the information needed for your inquiry. Do not send passwords, full payment-card details, account credentials, or other sensitive information through a support conversation.",
          ],
        },
        {
          heading: "Website and hosting data",
          paragraphs: [
            "Like most websites, the hosting infrastructure may process technical request data needed to deliver and protect the site, such as an IP address, browser information, requested URL, time of request, and diagnostic logs. This website's current source does not include advertising trackers, analytics scripts, or a marketing-cookie banner.",
            "If analytics, advertising, accounts, forms, or checkout features are added later, this policy and any consent controls should be updated before those tools are used.",
          ],
        },
        {
          heading: "WhatsApp and external services",
          paragraphs: [
            "Selecting a WhatsApp link leaves this website and opens a service operated by a third party. WhatsApp and its operator process information under their own terms and privacy policy. Wizard TV does not control those external policies or the technical data those services collect.",
          ],
        },
        {
          heading: "How inquiry information is used",
          paragraphs: [
            "Information sent to Wizard TV may be used to answer questions, discuss a trial, provide setup or support guidance, confirm a requested plan, or respond to a reseller inquiry. This page does not claim a fixed retention period or data-sharing arrangement that has not been approved by the business owner.",
          ],
        },
        {
          heading: "Privacy questions and requests",
          paragraphs: [
            "Use the Contact page and the verified Wizard TV WhatsApp channel to ask what information was provided in your conversation or to request a correction or deletion. Whether a request can be completed may depend on legal, fraud-prevention, transaction-record, or platform requirements that apply to the specific interaction.",
          ],
        },
      ]}
    />
  );
}

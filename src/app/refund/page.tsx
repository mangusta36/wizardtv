import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Current Wizard TV refund information and the questions customers should confirm before payment.",
  alternates: { canonical: "/refund" },
  openGraph: {
    title: "Wizard TV Refund Policy",
    description: "Current Wizard TV refund information and the questions customers should confirm before payment.",
    url: "/refund",
  },
  twitter: {
    title: "Wizard TV Refund Policy",
    description: "Current Wizard TV refund information and the questions customers should confirm before payment.",
  },
};

export default function RefundPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      intro="Wizard TV does not currently publish an owner-approved refund window, eligibility rule, cancellation right, or refund guarantee on this website."
      reviewNote="Before paying, ask Wizard TV support to provide the refund and cancellation terms that apply to the proposed purchase. Do not assume eligibility from an advertisement, a third-party website, or the absence of a rule on this page."
      sections={[
        {
          heading: "Before purchase",
          paragraphs: [
            "Confirm the selected plan duration, device count, total price, service details, and applicable refund or cancellation terms in the official WhatsApp conversation. Keep the relevant confirmation for your records. A Free Trial request may help with device and setup questions, but this page does not state that a trial is guaranteed or that it creates a refund right.",
          ],
        },
        {
          heading: "If you have a service or billing concern",
          paragraphs: [
            "Contact Wizard TV through the verified Contact page and provide the phone number used for the conversation, the selected plan, the date of the transaction, and a concise description of the issue. Do not post payment details, credentials, or private account information publicly.",
            "Support can review the specific transaction and explain the terms that were presented. This page does not promise an outcome, processing time, payment method, exception, or reimbursement where the business owner has not supplied an approved policy.",
          ],
        },
        {
          heading: "Owner action still required",
          paragraphs: [
            "The business owner must approve final refund and cancellation rules, including eligibility, time limits, exclusions, request handling, and any relationship between a trial and a paid subscription. Once approved, those rules should replace this limited notice and be presented to customers before payment.",
          ],
        },
      ]}
    />
  );
}

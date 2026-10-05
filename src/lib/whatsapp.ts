import { siteConfig } from "./site";

export const whatsappMessages = {
  freeTrial: "Hi Wizard TV, I'd like to request a free trial.",
  support: "Hi Wizard TV, I need some help.",
  reseller: "Hi Wizard TV, I'm interested in becoming a reseller.",
  pricingQuestion: "Hi Wizard TV, I have a question about your plans.",
};

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

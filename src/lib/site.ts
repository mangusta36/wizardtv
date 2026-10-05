export const siteConfig = {
  name: "Wizard TV",
  brandKeyword: "wizard tv",
  description:
    "Wizard TV is a simple IPTV subscription service with clear pricing, multi-device options, free trial requests, and direct WhatsApp support.",
  whatsappNumber: "212753936672",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://wizard-tv-domain-unset.invalid",
  nav: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Devices", href: "/channels" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Reseller", href: "/reseller" },
  ],
};

export function siteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return siteConfig.domain ? `${siteConfig.domain}${cleanPath}` : cleanPath;
}

export function absoluteUrl(path = "/") {
  return siteUrl(path);
}

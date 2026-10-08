export const siteConfig = {
  name: "Wizard TV",
  brandKeyword: "wizard tv",
  description:
    "Wizard TV is a simple IPTV subscription service with clear pricing, multi-device options, free trial requests, and direct WhatsApp support.",
  whatsappNumber: "212753936672",
  domain: "https://www.wizardtv.vip",
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
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${cleanPath}`;
}

export function absoluteUrl(path = "/") {
  return siteUrl(path);
}

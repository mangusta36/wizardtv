import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteConfig.domain ? new URL(siteConfig.domain) : undefined,
  title: {
    default: "Wizard TV | IPTV Plans, Devices, Free Trial and Support",
    template: "%s | Wizard TV",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Wizard TV",
    description: siteConfig.description,
    siteName: "Wizard TV",
    images: [{ url: "/images/wizard-tv-living-room.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wizard TV",
    description: siteConfig.description,
    images: ["/images/wizard-tv-living-room.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Wizard TV",
            url: absoluteUrl("/"),
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: "+212753936672",
            },
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

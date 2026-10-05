import type { MetadataRoute } from "next";
import { articles } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = ["/", "/pricing", "/channels", "/faq", "/blog", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-05");
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route), lastModified: now })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updatedAt),
    })),
  ];
}

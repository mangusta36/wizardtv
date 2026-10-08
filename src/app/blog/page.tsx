import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Wizard TV Blog",
  description:
    "Practical Wizard TV articles about IPTV plans, device setup, Free Trial requests, and customer support.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Wizard TV Blog",
    description:
      "Practical Wizard TV articles about IPTV plans, device setup, Free Trial requests, and customer support.",
    url: "/blog",
  },
  twitter: {
    title: "Wizard TV Blog",
    description:
      "Practical Wizard TV articles about IPTV plans, device setup, Free Trial requests, and customer support.",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
            Wizard TV blog
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Useful setup and buying guidance. The blog system is ready for deeper
            articles without filling the site with thin content.
          </p>
        </div>
        {featured ? (
          <Link href={`/blog/${featured.slug}`} className="mt-12 grid gap-8 border-y border-[var(--line)] py-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={featured.heroImage} alt={featured.heroAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--accent)]">{featured.category}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)]">{featured.title}</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">{featured.excerpt}</p>
              <p className="mt-5 text-sm text-[var(--muted)]">Published {featured.publishedAt}</p>
            </div>
          </Link>
        ) : null}
        <div className="mt-8 grid gap-5">
          {rest.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="grid gap-2 border-b border-[var(--line)] py-5 md:grid-cols-[10rem_1fr]">
              <p className="text-sm font-semibold text-[var(--accent)]">{article.category}</p>
              <div>
                <h2 className="text-xl font-semibold text-[var(--ink)]">{article.title}</h2>
                <p className="mt-2 leading-7 text-[var(--muted)]">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, articles, getArticle, headingId } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return part;
        const [, label, href] = match;
        return (
          <Link key={`${label}-${href}`} href={href} className="font-semibold text-[var(--accent)]">
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `/blog/${article.slug}`,
      images: [article.heroImage],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      title: article.title,
      description: article.metaDescription,
      images: [article.heroImage],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = article.related.map(getArticle).filter(Boolean);
  const toc = article.sections.map((section) => ({
    id: headingId(section.heading),
    label: section.heading,
  }));

  return (
    <article className="bg-white py-16">
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/blog/${article.slug}`) },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="font-semibold text-[var(--accent)]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="font-semibold text-[var(--accent)]">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="max-w-full truncate">{article.title}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{article.excerpt}</p>
          <p className="mt-5 text-sm text-[var(--muted)]">
            Published {article.publishedAt} · Updated {article.updatedAt}
          </p>
        </div>
        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-lg">
          <Image src={article.heroImage} alt={article.heroAlt} fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <nav className="border-y border-[var(--line)] py-6" aria-label="Table of contents">
            <h2 className="text-xl font-semibold text-[var(--ink)]">In this guide</h2>
            <ol className="mt-4 grid gap-2 text-sm leading-6">
              {toc.map((item) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`} className="font-semibold text-[var(--accent)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {article.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 id={headingId(section.heading)} className="scroll-mt-24 text-2xl font-semibold text-[var(--ink)]">
                {section.heading}
              </h2>
              {section.image ? (
                <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-[var(--muted)]">
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.table ? (
                <div className="mt-6 overflow-x-auto border border-[var(--line)]">
                  <table className="min-w-[42rem] w-full border-collapse text-left text-sm">
                    <thead className="bg-[var(--soft)] text-[var(--ink)]">
                      <tr>
                        {section.table.columns.map((column) => (
                          <th key={column} scope="col" className="border-b border-[var(--line)] px-4 py-3 font-semibold">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-[var(--muted)]">
                      {section.table.rows.map((row) => (
                        <tr key={row.join("-")} className="border-b border-[var(--line)] last:border-b-0">
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3 align-top leading-6">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
          {article.sources.length ? (
            <section className="mt-12 border-t border-[var(--line)] pt-8">
              <h2 className="text-2xl font-semibold text-[var(--ink)]">Sources checked</h2>
              <ul className="mt-4 grid gap-3 leading-7">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} className="font-semibold text-[var(--accent)]" target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Quick answers</h2>
            <div className="mt-4">
              <FaqAccordion items={article.faqs} />
            </div>
          </section>
          {related.length ? (
            <section className="mt-12 border-t border-[var(--line)] pt-8">
              <h2 className="text-2xl font-semibold text-[var(--ink)]">Related articles</h2>
              <div className="mt-4 grid gap-3">
                {related.map((item) =>
                  item ? (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="font-semibold text-[var(--accent)]">
                      {item.title}
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}

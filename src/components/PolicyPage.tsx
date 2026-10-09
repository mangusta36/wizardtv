import Link from "next/link";

type PolicySection = {
  heading: string;
  paragraphs: string[];
};

type PolicyPageProps = {
  title: string;
  intro: string;
  sections: PolicySection[];
  reviewNote?: string;
};

export function PolicyPage({ title, intro, sections, reviewNote }: PolicyPageProps) {
  return (
    <section className="bg-white py-16">
      <div className="container max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="font-semibold text-[var(--accent)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--ink)] sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{intro}</p>
        {reviewNote ? (
          <p className="mt-6 border-l-2 border-[var(--accent)] bg-[var(--soft)] px-5 py-4 leading-7 text-[var(--ink)]">
            {reviewNote}
          </p>
        ) : null}
        <div className="mt-10 grid gap-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-[var(--ink)]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-[var(--muted)]">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

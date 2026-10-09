import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-white py-24">
      <div className="container max-w-3xl text-center">
        <p className="text-sm font-semibold text-[var(--accent)]">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--ink)] sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
          The address may be outdated or incomplete. Continue with the Wizard TV homepage, plan information, or practical guides.
        </p>
        <nav aria-label="Not found navigation" className="mt-8 flex flex-wrap justify-center gap-5">
          <Link href="/" className="font-semibold text-[var(--accent)]">Go to homepage</Link>
          <Link href="/pricing" className="font-semibold text-[var(--accent)]">View pricing</Link>
          <Link href="/blog" className="font-semibold text-[var(--accent)]">Browse the blog</Link>
        </nav>
      </div>
    </main>
  );
}

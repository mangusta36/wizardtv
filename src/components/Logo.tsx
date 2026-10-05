import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Wizard TV home">
      <span className="grid size-10 place-items-center rounded-lg bg-[var(--accent)] text-lg font-black text-white shadow-sm">
        W
      </span>
      <span className="text-lg font-semibold tracking-tight text-[var(--ink)]">Wizard TV</span>
    </Link>
  );
}

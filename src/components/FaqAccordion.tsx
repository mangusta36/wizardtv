"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, index) => (
        <div key={item.question}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-expanded={open === index}
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            <span>{item.question}</span>
            <span aria-hidden="true" className="text-xl text-[var(--accent)]">
              {open === index ? "−" : "+"}
            </span>
          </button>
          {open === index ? <p className="pb-5 leading-7 text-[var(--muted)]">{item.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}

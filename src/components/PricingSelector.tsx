"use client";

import { useState } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import {
  type DeviceCount,
  deviceOptions,
  formatPrice,
  getPlanPrice,
  orderMessage,
  planDurations,
} from "@/lib/pricing";
import { ButtonLink } from "./ButtonLink";

export function PricingSelector({ compact = false }: { compact?: boolean }) {
  const [devices, setDevices] = useState<DeviceCount>(1);

  return (
    <section className="space-y-7">
      <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap" aria-label="Choose number of devices">
        {deviceOptions.map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => setDevices(count)}
            className={`min-h-11 rounded-md border px-3 text-sm font-semibold transition ${
              devices === count
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)]"
            }`}
          >
            {count} {count === 1 ? "Device" : "Devices"}
          </button>
        ))}
      </div>
      <div className={`grid min-w-0 gap-4 ${compact ? "md:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4"}`}>
        {planDurations.map((duration) => {
          const price = getPlanPrice(duration, devices);
          return (
            <article key={duration} className="min-w-0 rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--ink)]">{duration}</h3>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--ink)]">
                {formatPrice(price)}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Final price for {devices} {devices === 1 ? "device" : "devices"}.
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--muted)]">
                <li>Direct WhatsApp order</li>
                <li>Setup guidance included</li>
                <li>Support for common TV devices</li>
              </ul>
              <ButtonLink
                href={createWhatsAppUrl(orderMessage(duration, devices))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full"
              >
                Order Now
              </ButtonLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}

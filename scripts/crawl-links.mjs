const pages = [
  "/",
  "/pricing",
  "/channels",
  "/faq",
  "/blog",
  "/blog/choose-iptv-plan-devices",
  "/blog/wizard-tv-device-setup",
  "/reseller",
  "/privacy",
  "/terms",
  "/refund",
  "/disclaimer",
];

const base = "http://localhost:3000";
const rows = [];
const failures = [];

for (const page of pages) {
  const html = await fetch(`${base}${page}`).then((response) => response.text());
  const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis)];
  for (const [, href, rawLabel] of hrefs) {
    const label = rawLabel.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "(icon)";
    let type = "external";
    let status = "OK";
    if (
      href === "#" ||
      href.includes(["example", "com"].join(".")) ||
      href.toLowerCase().includes(["mo", "atv"].join(""))
    ) {
      status = "FAIL";
    }
    if (href.startsWith("/")) {
      type = "internal";
      const response = await fetch(`${base}${href}`);
      status = response.ok ? "OK" : `FAIL ${response.status}`;
    } else if (href.startsWith("https://wa.me/212753936672")) {
      type = "whatsapp";
    } else if (href.includes("localhost")) {
      status = "FAIL localhost";
    }
    rows.push({ page, label, type, destination: href, status });
    if (status !== "OK") failures.push(`${page} | ${label} | ${href} | ${status}`);
  }
}

if (process.env.VERBOSE_LINK_CRAWL === "1") {
  console.table(rows);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`CTA crawl PASS: ${rows.length} rendered links checked.`);

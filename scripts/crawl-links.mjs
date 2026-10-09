const base = process.env.LINK_CRAWL_BASE ?? "http://localhost:3000";
const canonicalOrigin = "https://www.wizardtv.vip";
const obsoleteRoutes = new Set([
  "/blog/choose-iptv-plan-devices",
  "/blog/wizard-tv-device-setup",
]);
const requiredRoutes = new Set([
  "/",
  "/pricing",
  "/channels",
  "/faq",
  "/blog",
  "/reseller",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refund",
  "/disclaimer",
]);
const failures = [];
const rows = [];
const responseCache = new Map();

function fail(kind, message) {
  failures.push(`${kind}: ${message}`);
}

async function request(path, redirect = "manual") {
  const key = `${path}|${redirect}`;
  if (responseCache.has(key)) return responseCache.get(key);
  const promise = fetch(new URL(path, base), {
    redirect,
    signal: AbortSignal.timeout(10000),
  }).catch((error) => ({ networkError: error }));
  responseCache.set(key, promise);
  return promise;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function labelFrom(rawLabel) {
  return rawLabel.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "(icon)";
}

const sitemapResponse = await request("/sitemap.xml", "follow");
if (sitemapResponse?.networkError) {
  fail("NETWORK", `could not reach ${base}: ${sitemapResponse.networkError.message}`);
} else if (!sitemapResponse?.ok) {
  fail("INTERNAL", `/sitemap.xml returned ${sitemapResponse?.status ?? "no response"}`);
}

let pages = [];
if (sitemapResponse?.ok) {
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));
  if (!locations.length) fail("INTERNAL", "sitemap contains no URLs");
  if (new Set(locations).size !== locations.length) fail("INTERNAL", "sitemap contains duplicate URLs");

  for (const location of locations) {
    let url;
    try {
      url = new URL(location);
    } catch {
      fail("MALFORMED", `invalid sitemap URL ${location}`);
      continue;
    }
    if (url.origin !== canonicalOrigin) fail("HOST", `sitemap URL uses ${url.origin}: ${location}`);
    if (url.search || url.hash) fail("MALFORMED", `sitemap URL contains query or fragment: ${location}`);
    pages.push(url.pathname);
  }
}

for (const route of requiredRoutes) {
  if (!pages.includes(route)) fail("COVERAGE", `${route} is missing from sitemap`);
}
for (const route of obsoleteRoutes) {
  if (pages.includes(route)) fail("OBSOLETE", `${route} remains in sitemap`);
}

for (const page of pages) {
  const pageResponse = await request(page);
  if (pageResponse?.networkError) {
    fail("NETWORK", `${page} could not be fetched: ${pageResponse.networkError.message}`);
    continue;
  }
  if (pageResponse.status >= 300 && pageResponse.status < 400) {
    fail("REDIRECT", `sitemap page ${page} redirects to ${pageResponse.headers.get("location") ?? "unknown"}`);
    continue;
  }
  if (pageResponse.status !== 200) {
    fail("INTERNAL", `${page} returned ${pageResponse.status}`);
    continue;
  }

  const html = await pageResponse.text();
  const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis)];
  for (const [, encodedHref, rawLabel] of hrefs) {
    const href = decodeHtml(encodedHref);
    const label = labelFrom(rawLabel);
    let parsed;
    try {
      parsed = new URL(href, base);
    } catch {
      fail("MALFORMED", `${page} links ${label} to ${href}`);
      continue;
    }

    if (href === "#" || href.trim() !== href || /[\u0000-\u001f]/.test(href)) {
      fail("MALFORMED", `${page} links ${label} to ${JSON.stringify(href)}`);
      continue;
    }
    if (obsoleteRoutes.has(parsed.pathname)) fail("OBSOLETE", `${page} links to ${parsed.pathname}`);
    if (parsed.hostname === "wizardtv.vip") fail("HOST", `${page} links to noncanonical host ${href}`);
    if (parsed.hostname === "www.wizardtv.vip" && parsed.origin !== canonicalOrigin) {
      fail("HOST", `${page} links to wrong canonical scheme or port ${href}`);
    }

    const isLocal = parsed.origin === new URL(base).origin;
    const isCanonicalInternal = parsed.origin === canonicalOrigin;
    let status = "OK";
    if (isLocal || isCanonicalInternal || href.startsWith("/")) {
      const destination = `${parsed.pathname}${parsed.search}`;
      const linked = await request(destination);
      if (linked?.networkError) {
        status = `NETWORK ${linked.networkError.message}`;
        fail("NETWORK", `${page} -> ${destination}: ${linked.networkError.message}`);
      } else if (linked.status >= 300 && linked.status < 400) {
        status = `REDIRECT ${linked.status}`;
        fail("REDIRECT", `${page} -> ${destination} -> ${linked.headers.get("location") ?? "unknown"}`);
      } else if (!linked.ok) {
        status = `FAIL ${linked.status}`;
        fail("INTERNAL", `${page} -> ${destination} returned ${linked.status}`);
      }
    } else if (parsed.protocol === "https:" && parsed.hostname === "wa.me") {
      if (!href.startsWith("https://wa.me/212753936672")) {
        status = "FAIL unexpected WhatsApp destination";
        fail("CONTACT", `${page} uses unexpected WhatsApp destination ${href}`);
      }
    } else if (!["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)) {
      status = `FAIL unsupported protocol ${parsed.protocol}`;
      fail("MALFORMED", `${page} links ${label} with unsupported protocol ${href}`);
    }
    rows.push({ page, label, destination: href, status });
  }
}

if (process.env.VERBOSE_LINK_CRAWL === "1") console.table(rows);

if (failures.length) {
  console.error(`Link crawl FAIL: ${failures.length} issue(s)`);
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Link crawl PASS: ${pages.length} sitemap pages and ${rows.length} rendered links checked.`);

import { readFileSync, readdirSync, statSync } from "node:fs";
import { request } from "node:http";
import { join, relative } from "node:path";

const OFFICIAL_ORIGIN = "https://www.wizardtv.vip";
const CANONICAL_HOST = "www.wizardtv.vip";
const SECONDARY_HOST = "wizardtv.vip";
const root = process.cwd();
const staticRoutes = ["/", "/pricing", "/channels", "/faq", "/blog", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];
const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function expectedUrl(path) {
  return `${OFFICIAL_ORIGIN}${path === "/" ? "/" : path}`;
}

function expectedCanonical(path) {
  return path === "/" ? OFFICIAL_ORIGIN : expectedUrl(path);
}

function extractAll(pattern, text) {
  return [...text.matchAll(pattern)].map((match) => match[1]);
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(root, full);
    if (["node_modules", ".next", ".git"].some((skip) => rel === skip || rel.startsWith(`${skip}/`))) continue;
    if (statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function assertNoDuplicate(name, values) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) fail(`${name} has duplicates: ${[...new Set(duplicates)].join(", ")}`);
  else pass(`${name} has no duplicates`);
}

function checkSource() {
  const site = read("src/lib/site.ts");
  if (!site.includes(`domain: "${OFFICIAL_ORIGIN}"`)) fail("siteConfig.domain is not the official origin");
  else pass("official origin is centralized");

  if (site.includes("NEXT_PUBLIC_SITE_URL")) fail("NEXT_PUBLIC_SITE_URL can override the production SEO origin");
  else pass("environment variables cannot override the production SEO origin");

  const nextConfig = read("next.config.ts");
  if (!nextConfig.includes(`value: "${SECONDARY_HOST}"`) || !nextConfig.includes(`destination: "${OFFICIAL_ORIGIN}/:path*"`)) {
    fail("apex host redirect is not configured in next.config.ts");
  } else {
    pass("apex to www redirect is configured");
  }

  const blog = read("src/data/blog.ts");
  const slugs = extractAll(/slug: "([^"]+)"/g, blog);
  assertNoDuplicate("published blog slugs", slugs);
  if (!slugs.length) fail("no published blog slugs found");
  else pass(`${slugs.length} published blog URLs discovered`);

  const files = walk(root).filter((file) => {
    const rel = relative(root, file);
    return /\.(ts|tsx|js|mjs|json)$/.test(file) && !rel.startsWith("scripts/capture-screens.") && !rel.startsWith("scripts/crawl-links.") && rel !== "scripts/qa-domain.mjs";
  });
  const stalePatterns = [
    /wizard-tv-domain-unset\.invalid/,
    /https?:\/\/wizardtv\.vip(?![/:])/,
    /https?:\/\/[^/\s"'`)]*vercel\.app/,
    /https?:\/\/localhost(?::\d+)?(?![^"'`)\s]*example)/,
    /DOMAIN_UNSET|example\.com|your-domain/i,
  ];
  for (const file of files) {
    const rel = relative(root, file);
    const text = readFileSync(file, "utf8");
    for (const pattern of stalePatterns) {
      if (pattern.test(text)) fail(`stale production domain reference in ${rel}`);
    }
  }
  pass("source stale-domain scan completed");

  return slugs;
}

function htmlValue(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = selector === "canonical"
    ? /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    : new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i");
  return html.match(pattern)?.[1];
}

async function fetchText(base, path, init) {
  const response = await fetch(`${base}${path}`, { redirect: "manual", ...init });
  const text = await response.text();
  return { response, text };
}

function requestWithHost(base, path, host) {
  const target = new URL(path, base);
  return new Promise((resolve, reject) => {
    const req = request({
      hostname: target.hostname,
      port: target.port,
      path: `${target.pathname}${target.search}`,
      method: "GET",
      headers: { Host: host },
    }, (res) => {
      res.resume();
      res.on("end", () => resolve(res));
    });
    req.on("error", reject);
    req.end();
  });
}

async function checkRendered(slugs) {
  const base = process.env.QA_DOMAIN_BASE;
  if (!base) {
    fail("QA_DOMAIN_BASE is required for rendered domain verification");
    return;
  }

  const routes = [...staticRoutes, ...slugs.map((slug) => `/blog/${slug}`)];
  const sitemapUrls = [];
  const { response: robotsResponse, text: robots } = await fetchText(base, "/robots.txt");
  if (robotsResponse.status !== 200) fail(`/robots.txt returned ${robotsResponse.status}`);
  else pass("/robots.txt returns 200");
  if (!robots.includes(`Sitemap: ${OFFICIAL_ORIGIN}/sitemap.xml`)) fail("robots sitemap directive is wrong");
  else pass("robots sitemap directive is correct");
  if (/Disallow:\s*\/\s*$/m.test(robots)) fail("robots blocks the full site");
  else pass("robots does not block the full site");

  const { response: sitemapResponse, text: sitemap } = await fetchText(base, "/sitemap.xml");
  if (sitemapResponse.status !== 200) fail(`/sitemap.xml returned ${sitemapResponse.status}`);
  else pass("/sitemap.xml returns 200");
  sitemapUrls.push(...extractAll(/<loc>([^<]+)<\/loc>/g, sitemap));
  assertNoDuplicate("sitemap URLs", sitemapUrls);
  for (const url of sitemapUrls) {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== CANONICAL_HOST) fail(`wrong-host sitemap URL: ${url}`);
  }

  for (const route of routes) {
    const sitemapExpected = expectedUrl(route);
    const canonicalExpected = expectedCanonical(route);
    if (!sitemapUrls.includes(sitemapExpected)) fail(`${route} missing from sitemap`);
    const { response, text } = await fetchText(base, route);
    if (response.status !== 200) fail(`${route} returned ${response.status}`);
    const canonical = htmlValue(text, "canonical");
    const ogUrl = htmlValue(text, "og:url");
    if (canonical !== canonicalExpected) fail(`${route} canonical expected ${canonicalExpected}, got ${canonical || "missing"}`);
    if (ogUrl !== canonicalExpected) fail(`${route} og:url expected ${canonicalExpected}, got ${ogUrl || "missing"}`);
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(text)) fail(`${route} has noindex robots meta`);
    if (/wizard-tv-domain-unset\.invalid|http:\/\/www\.wizardtv\.vip|https:\/\/wizardtv\.vip|localhost|vercel\.app/.test(text)) {
      fail(`${route} rendered stale or noncanonical first-party URL`);
    }
  }
  pass(`${routes.length} rendered indexable routes checked`);

  const redirect = await requestWithHost(base, "/pricing?trial=1", SECONDARY_HOST);
  const location = redirect.headers.location;
  if (![301, 308].includes(redirect.statusCode)) fail(`apex redirect status expected 301/308, got ${redirect.statusCode}`);
  else pass("apex redirect uses a permanent status");
  if (location !== `${OFFICIAL_ORIGIN}/pricing?trial=1`) fail(`apex redirect location expected ${OFFICIAL_ORIGIN}/pricing?trial=1, got ${location || "missing"}`);
  else pass("apex redirect preserves path and query");
}

const slugs = checkSource();
await checkRendered(slugs);

if (failures.length) {
  console.error(`\nDomain QA failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log("\nDomain QA passed.");

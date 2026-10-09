const base = process.env.SEO_QA_BASE ?? "http://localhost:3000";
const canonicalOrigin = "https://www.wizardtv.vip";
const failures = [];

function fail(message) {
  failures.push(message);
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function tagValue(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1]?.trim());
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`/sitemap.xml returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));
if (urls.length !== 22) fail(`expected 22 sitemap URLs, found ${urls.length}`);
if (new Set(urls).size !== urls.length) fail("sitemap has duplicate URLs");

const titles = new Map();
const descriptions = new Map();

for (const canonicalUrl of urls) {
  const parsed = new URL(canonicalUrl);
  if (parsed.origin !== canonicalOrigin) fail(`${canonicalUrl} uses the wrong canonical origin`);
  const route = `${parsed.pathname}${parsed.search}`;
  const expectedCanonical = parsed.pathname === "/" ? canonicalOrigin : canonicalUrl;
  const response = await fetch(`${base}${route}`, { redirect: "manual" });
  if (response.status !== 200) {
    fail(`${route} returned ${response.status}`);
    continue;
  }
  const html = await response.text();
  const title = tagValue(html, /<title>([^<]*)<\/title>/i);
  const description = tagValue(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = tagValue(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogUrl = tagValue(html, /<meta[^>]+property="og:url"[^>]+content="([^"]*)"/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) fail(`${route} has no title`);
  if (!description) fail(`${route} has no meta description`);
  if (canonical !== expectedCanonical) fail(`${route} canonical is ${canonical || "missing"}`);
  if (ogUrl !== expectedCanonical) fail(`${route} og:url is ${ogUrl || "missing"}`);
  if (h1Count !== 1) fail(`${route} has ${h1Count} H1 elements`);
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) fail(`${route} is noindex`);

  if (titles.has(title)) fail(`${route} duplicates title with ${titles.get(title)}`);
  else titles.set(title, route);
  if (descriptions.has(description)) fail(`${route} duplicates description with ${descriptions.get(description)}`);
  else descriptions.set(description, route);

  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const [, raw] of scripts) {
    try {
      const schema = JSON.parse(raw);
      schemas.push(schema);
      if (schema["@context"] !== "https://schema.org") fail(`${route} has invalid JSON-LD context`);
      if (!schema["@type"]) fail(`${route} has JSON-LD without @type`);
    } catch (error) {
      fail(`${route} has invalid JSON-LD: ${error.message}`);
    }
  }
  if (!schemas.length) fail(`${route} has no JSON-LD`);

  const breadcrumbs = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
  if (breadcrumbs) {
    const items = breadcrumbs.itemListElement ?? [];
    const positions = items.map((item) => item.position);
    if (positions.some((position, index) => position !== index + 1)) fail(`${route} breadcrumb positions are invalid`);
    if (items.at(-1)?.item !== canonicalUrl) fail(`${route} breadcrumb destination does not match canonical`);
  }

  if (route.startsWith("/blog/")) {
    const posting = schemas.find((schema) => schema["@type"] === "BlogPosting");
    if (!posting) {
      fail(`${route} has no BlogPosting schema`);
    } else {
      if (posting.mainEntityOfPage !== canonicalUrl) fail(`${route} BlogPosting mainEntityOfPage is wrong`);
      if (!posting.headline || !posting.description || !posting.image) fail(`${route} BlogPosting is missing required editorial fields`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(posting.datePublished) || !/^\d{4}-\d{2}-\d{2}$/.test(posting.dateModified)) {
        fail(`${route} BlogPosting dates are malformed`);
      }
      if (posting.dateModified < posting.datePublished) fail(`${route} dateModified predates datePublished`);
      if (posting.author?.name !== "Wizard TV" || posting.publisher?.name !== "Wizard TV") fail(`${route} has inconsistent article attribution`);
    }
    if (!breadcrumbs) fail(`${route} has no BreadcrumbList schema`);
  }
}

if (failures.length) {
  console.error(`Rendered SEO QA FAIL: ${failures.length} issue(s)`);
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Rendered SEO QA PASS: ${urls.length} unique pages, metadata, canonicals, H1s, and JSON-LD validated.`);

# WizardTV WWW Production Domain Report

## 1. Project root

Actual project root: `/home/mangusta/Projects/wizardtv`

Framework: Next.js App Router, Next `16.3.8`, hosted on Vercel.

## 2. Original domain configuration

The site previously used `process.env.NEXT_PUBLIC_SITE_URL || "https://wizard-tv-domain-unset.invalid"` in `src/lib/site.ts`. That placeholder flowed into `metadataBase`, JSON-LD, `/robots.txt`, and `/sitemap.xml` when the environment variable was not set.

## 3. Problems discovered

- Production SEO origin could fall back to `https://wizard-tv-domain-unset.invalid`.
- `NEXT_PUBLIC_SITE_URL` could silently override the canonical SEO origin.
- Page-level `og:url` values were missing for static and dynamic pages.
- Breadcrumb JSON-LD used relative `item` URLs.
- Static sitemap entries used a fixed date for every static route without genuine per-page modification data.
- No application-level apex-to-www redirect existed.
- Existing blog content QA script still stubbed `absoluteUrl` with the old `.invalid` placeholder.

## 4. Centralized canonical origin

Canonical origin is now hardcoded in `src/lib/site.ts`:

`https://www.wizardtv.vip`

The origin is HTTPS, uses `www`, and has no trailing slash in the constant.

## 5. Files changed and reasons

- `src/lib/site.ts`: set canonical origin, removed environment override, made `siteUrl` preserve already-absolute URLs.
- `src/app/layout.tsx`: set `metadataBase`, root `og:url`, and Organization JSON-LD `@id`.
- `src/app/page.tsx`: set absolute homepage canonical/OG URL and WebSite JSON-LD URL.
- `src/app/*/page.tsx`: added route-specific `og:url` values.
- `src/app/blog/[slug]/page.tsx`: added article-specific `og:url`.
- `src/app/pricing/page.tsx`, `src/app/channels/page.tsx`, `src/app/faq/page.tsx`, `src/app/reseller/page.tsx`: converted breadcrumb JSON-LD items to absolute production URLs.
- `src/data/blog.ts`: added absolute author and publisher URLs to BlogPosting JSON-LD.
- `src/app/sitemap.ts`: removed fabricated static `lastModified` dates.
- `src/app/robots.ts`: fixed sitemap directive to the canonical production sitemap.
- `next.config.ts`: added permanent host redirect from `wizardtv.vip` to `www.wizardtv.vip`.
- `scripts/qa-domain.mjs`: added rendered domain verification.
- `scripts/check-blog-content.mjs`: removed legacy placeholder URL stub.
- `package.json`: added `npm run qa:domain`.

## 6. Route verification

Rendered locally with `next start` at `http://127.0.0.1:3000`.

| Route | Canonical | og:url | Status |
|---|---|---|---|
| `/` | `https://www.wizardtv.vip` | `https://www.wizardtv.vip` | PASS |
| `/pricing` | `https://www.wizardtv.vip/pricing` | `https://www.wizardtv.vip/pricing` | PASS |
| `/channels` | `https://www.wizardtv.vip/channels` | `https://www.wizardtv.vip/channels` | PASS |
| `/faq` | `https://www.wizardtv.vip/faq` | `https://www.wizardtv.vip/faq` | PASS |
| `/blog` | `https://www.wizardtv.vip/blog` | `https://www.wizardtv.vip/blog` | PASS |
| `/reseller` | `https://www.wizardtv.vip/reseller` | `https://www.wizardtv.vip/reseller` | PASS |
| `/privacy` | `https://www.wizardtv.vip/privacy` | `https://www.wizardtv.vip/privacy` | PASS |
| `/terms` | `https://www.wizardtv.vip/terms` | `https://www.wizardtv.vip/terms` | PASS |
| `/refund` | `https://www.wizardtv.vip/refund` | `https://www.wizardtv.vip/refund` | PASS |
| `/disclaimer` | `https://www.wizardtv.vip/disclaimer` | `https://www.wizardtv.vip/disclaimer` | PASS |
| 10 `/blog/[slug]` articles | page-specific article URL | page-specific article URL | PASS |

Note: Next renders the homepage canonical/OG URL as the origin without a trailing slash. The sitemap root URL renders as `https://www.wizardtv.vip/`; both represent the same root resource.

## 7. Sitemap verification

Rendered `/sitemap.xml`: 20 URLs total.

- Static URLs: 10
- Published blog URLs: 10
- Duplicate sitemap URLs: 0
- Wrong-host sitemap URLs: 0
- HTTP first-party sitemap URLs: 0
- Missing published blog URLs: 0
- No intentionally noindex, 404, localhost, preview, or apex URLs were included.

## 8. Robots verification

Rendered `/robots.txt`:

```txt
User-Agent: *
Allow: /

Sitemap: https://www.wizardtv.vip/sitemap.xml
```

Production crawling is not blocked.

## 9. Structured data verification

- Organization URL and `@id` use `https://www.wizardtv.vip`.
- WebSite URL uses `https://www.wizardtv.vip/`.
- BreadcrumbList item URLs use absolute production URLs.
- BlogPosting `image`, `mainEntityOfPage`, `author.url`, and `publisher.url` use the canonical production origin.
- FAQPage data was preserved and contains no first-party stale URLs.

## 10. Legacy-domain scan

Runtime code and rendered output: PASS, no stale first-party production URLs.

Historical Markdown audit/report files still mention `https://wizard-tv-domain-unset.invalid` as past findings. Those records were intentionally preserved and are not runtime SEO output.

## 11. Redirect verification

Application-level redirect was implemented in `next.config.ts`.

Local verification:

`Host: wizardtv.vip` with `/pricing?trial=1` returns `308 Permanent Redirect` to `https://www.wizardtv.vip/pricing?trial=1`.

No local redirect loop was observed. The `www` host is not redirected back to apex.

## 12. Environment-variable requirements

No environment variable is required for production SEO origin.

If Vercel environment variables include `NEXT_PUBLIC_SITE_URL`, it no longer controls canonical URLs. For operational clarity, remove stale values or set the documented value:

`NEXT_PUBLIC_SITE_URL=https://www.wizardtv.vip`

Do not add secrets to public environment variables.

## 13. QA commands

| Command | Exit | Status |
|---|---:|---|
| `npm run lint` | 0 | PASS |
| `npm run build` | 0 | PASS |
| `QA_DOMAIN_BASE=http://127.0.0.1:3000 npm run qa:domain` | 0 | PASS |
| `npm run check:pricing` | 0 | PASS |
| `npm run check:brand` | 0 | PASS |
| `npm run check:links` | 0 | PASS |
| `node scripts/check-blog-content.mjs` | 0 | PASS |

TypeScript was run by `next build` and passed.

## 14. Regression verification

Design, CSS, article content, article slugs, pricing, WhatsApp number/messages, reseller behavior, checkout-related WhatsApp flow, navigation, and business logic were not intentionally changed.

Published blog slugs are unchanged:

- `iptv-buffering-freezing-fixes-2026`
- `wizard-tv-not-working-black-screen`
- `xtream-codes-not-working-login-server-url`
- `iptv-epg-not-working-guide-time`
- `why-iptv-keeps-freezing-causes-fixes`
- `wizard-tv-no-sound-audio-sync`
- `mlb-playoffs-2026-schedule-wizard-tv`
- `world-series-2026-schedule-wizard-tv`
- `nba-2026-27-schedule-wizard-tv`
- `uefa-champions-league-2026-27-fixtures-wizard-tv`

## 15. Compliance matrix

| Check | Expected | Actual | Status |
|---|---|---|---|
| Official origin | `https://www.wizardtv.vip` | `https://www.wizardtv.vip` | PASS |
| Canonical hostname | `www.wizardtv.vip` | `www.wizardtv.vip` | PASS |
| Secondary hostname | `wizardtv.vip` | `wizardtv.vip` | PASS |
| Host redirect | Permanent 301/308 | Local 308 | PASS |
| Sitemap | `https://www.wizardtv.vip/sitemap.xml` | `https://www.wizardtv.vip/sitemap.xml` | PASS |
| Robots sitemap | `https://www.wizardtv.vip/sitemap.xml` | `https://www.wizardtv.vip/sitemap.xml` | PASS |
| Wrong-host canonicals | 0 | 0 | PASS |
| Duplicate canonicals | 0 | 0 | PASS |
| Wrong-host sitemap URLs | 0 | 0 | PASS |
| Duplicate sitemap URLs | 0 | 0 | PASS |
| Broken internal links | 0 | 0 | PASS |
| Production-domain placeholders | 0 | 0 in runtime code/rendered output; historical reports preserved | PASS |
| Published blog slugs | Unchanged | Unchanged | PASS |
| Article content | Unchanged | Unchanged | PASS |
| Pricing | Unchanged | Verified unchanged | PASS |
| Design | Unchanged | Unchanged | PASS |
| TypeScript | PASS | PASS via `next build` | PASS |
| Lint | PASS | PASS | PASS |
| Build | PASS | PASS | PASS |
| Domain QA | PASS | PASS | PASS |

## 16. Outstanding Vercel/DNS/SSL steps

- Add/verify both domains in Vercel: `www.wizardtv.vip` and `wizardtv.vip`.
- Ensure DNS points to Vercel according to the project dashboard.
- Ensure SSL certificates are issued for both hostnames.
- Confirm Vercel production deployment uses the latest code.
- After deployment, test live:
  - `https://www.wizardtv.vip/`
  - `https://www.wizardtv.vip/robots.txt`
  - `https://www.wizardtv.vip/sitemap.xml`
  - `https://wizardtv.vip/pricing?trial=1`
- Verify the live apex redirect is permanent and preserves path/query.

LOCAL DOMAIN SEO IMPLEMENTATION: PASS

LIVE VERCEL DOMAIN CONFIGURATION: NOT VERIFIED

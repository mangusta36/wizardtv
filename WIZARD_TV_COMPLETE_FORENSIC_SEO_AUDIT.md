# Wizard TV Complete Forensic SEO Audit

Read-only audit date: 2026-10-09  
Repository: `/home/mangusta/Projects/wizardtv`  
Production origin configured in source: `https://www.wizardtv.vip`

## 1. Executive Summary

Wizard TV is a small Next.js App Router site with 20 intended indexable URLs: 10 static pages and 10 static blog articles. The repository has a coherent SEO foundation: centralized production domain, route-level metadata, self-referencing canonicals, generated robots and sitemap routes, HTML navigation, static article generation, and JSON-LD for Organization, WebSite, BreadcrumbList, FAQPage, and BlogPosting.

The main confirmed blocker is production availability. Live HTTPS requests to both `https://www.wizardtv.vip/` and `https://wizardtv.vip/` failed during this audit with `curl: (35) TLS connect error: unexpected eof while reading`. That means Googlebot and users may be unable to fetch the site even though the local implementation is structured for indexing.

Principal risks:

- **P0:** live HTTPS/TLS failure prevents verification of homepage, robots, sitemap, canonicals, and all rendered pages on production.
- **P1:** legal/trust pages are visibly placeholders or starter language, especially Privacy, Terms, and Refund.
- **P1:** no Contact/About page exists, despite service, support, trial, reseller, and payment-adjacent flows relying entirely on WhatsApp.
- **P1:** time-sensitive sports blog articles require continuous revalidation against official sources; as of 2026-10-09, MLB postseason content is already date-sensitive.
- **P2:** blog targeting has cannibalization risk across IPTV buffering/freezing articles and across sports schedule articles.
- **P2:** security/reliability headers are not configured in `next.config.ts`; live header verification was blocked by TLS failure.
- **P2:** internal link QA script is stale and still checks old blog slugs that no longer exist.

Final verdict: **NEEDS MAJOR REMEDIATION**. The codebase is mostly index-ready, but production HTTPS failure and incomplete trust/legal coverage are too material for a stronger verdict.

## 2. Website Architecture

Framework and version:

- Next.js `16.3.8`, React `19.2.8`, App Router, TypeScript. Evidence: `package.json`.
- Local Next guidance was read from `node_modules/next/dist/docs/01-app/index.md`; this project uses App Router file-system routes.

Rendering architecture:

- Static/server-rendered App Router pages. No route uses `fetch`, dynamic server data, ISR config, or route handlers.
- Blog article pages use `generateStaticParams()` from `articles` in `src/data/blog.ts`, so the 10 article slugs are statically enumerable.
- Client components are limited to interactive UI: `Header`, `FaqAccordion`, and `PricingSelector`.

Public route inventory:

| URL | Route file | Intended purpose | Search intent | Indexable intent |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Homepage/service overview | Wizard TV brand, IPTV plans, devices, trial | Yes |
| `/pricing` | `src/app/pricing/page.tsx` | Customer pricing matrix | Wizard TV pricing / IPTV subscription plans | Yes |
| `/channels` | `src/app/channels/page.tsx` | Device/setup compatibility | Wizard TV devices, IPTV setup | Yes |
| `/faq` | `src/app/faq/page.tsx` | FAQ hub | branded service questions | Yes |
| `/blog` | `src/app/blog/page.tsx` | Blog listing | guides and troubleshooting hub | Yes |
| `/blog/iptv-buffering-freezing-fixes-2026` | `src/app/blog/[slug]/page.tsx` | IPTV buffering fixes | practical troubleshooting | Yes |
| `/blog/wizard-tv-not-working-black-screen` | same | Wizard TV playback troubleshooting | branded support | Yes |
| `/blog/xtream-codes-not-working-login-server-url` | same | Xtream Codes login troubleshooting | setup/authentication help | Yes |
| `/blog/iptv-epg-not-working-guide-time` | same | EPG troubleshooting | guide/time fixes | Yes |
| `/blog/why-iptv-keeps-freezing-causes-fixes` | same | IPTV freezing causes | diagnosis and fixes | Yes, but cannibalization risk |
| `/blog/wizard-tv-no-sound-audio-sync` | same | audio troubleshooting | branded support | Yes |
| `/blog/mlb-playoffs-2026-schedule-wizard-tv` | same | MLB postseason guide | schedule/viewing planning | Yes, time-sensitive |
| `/blog/world-series-2026-schedule-wizard-tv` | same | World Series guide | schedule/viewing planning | Yes, time-sensitive |
| `/blog/nba-2026-27-schedule-wizard-tv` | same | NBA schedule guide | dates/key games | Yes, time-sensitive |
| `/blog/uefa-champions-league-2026-27-fixtures-wizard-tv` | same | UEFA fixtures guide | fixtures/viewing planning | Yes, time-sensitive |
| `/reseller` | `src/app/reseller/page.tsx` | Reseller inquiry | Wizard TV reseller | Yes |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy | legal/trust | Yes, but weak |
| `/terms` | `src/app/terms/page.tsx` | Terms | legal/trust | Yes, but weak |
| `/refund` | `src/app/refund/page.tsx` | Refund policy | legal/trust | Yes, but weak |
| `/disclaimer` | `src/app/disclaimer/page.tsx` | Disclaimer | legal/trust | Yes |

Non-indexable or system routes:

- `/robots.txt`: generated by `src/app/robots.ts`.
- `/sitemap.xml`: generated by `src/app/sitemap.ts`.
- `/_next/*`, static assets, images, icons: framework/public assets.
- Missing routes use default Next 404 behavior; no custom `not-found.tsx` exists.

Deployment/host configuration:

- Canonical domain is centralized at `src/lib/site.ts:1-17`: `https://www.wizardtv.vip`.
- `next.config.ts:3-13` permanently redirects host `wizardtv.vip` to `https://www.wizardtv.vip/:path*`.
- No custom headers, rewrites, middleware, image remote config, CSP, or security header config is present.

## 3. Google Indexing Assessment

Confirmed technical blocker:

- **Production HTTPS is failing.** `curl -I https://www.wizardtv.vip/` and `curl -I https://wizardtv.vip/` returned HTTP code `000` with TLS error `unexpected eof while reading`. A site that cannot complete TLS cannot be reliably crawled, indexed, or validated in Google Search Console.

Repository crawlability:

- `src/app/robots.ts:4-8` allows all user agents and points to `https://www.wizardtv.vip/sitemap.xml`.
- `src/app/sitemap.ts:5-14` includes all 10 static routes plus all 10 blog articles.
- No `noindex` directives were found in source by grep.
- No `X-Robots-Tag` headers are configured in source.
- Page-level canonicals are present via `alternates.canonical`; homepage uses `absoluteUrl("/")`, while most routes use relative canonicals resolved by `metadataBase`.
- Internal navigation links to the commercial pages, FAQ, blog, reseller, and legal pages through header/footer.

Indexing risks:

- **P0 live access risk:** production TLS failure prevents Googlebot from fetching `/`, `/robots.txt`, `/sitemap.xml`, and pages.
- **P2 sitemap precision:** static sitemap entries omit `lastModified`, while articles use `updatedAt`. This is acceptable but less informative for static pages.
- **P2 404 handling:** no custom 404 page exists. Default 404 is technically fine, but a branded 404 could reduce soft-404/user-experience risk.
- **P2 query parameters:** no canonical parameter handling beyond route canonicals. Pricing uses client state rather than query parameters, so duplication risk is low.

Requires GSC confirmation:

- Whether Google has indexed any URL.
- Whether pages are reported as `Crawled - currently not indexed`, `Discovered - currently not indexed`, `Duplicate without user-selected canonical`, or soft 404.
- Whether TLS failure is intermittent, regional, CDN-specific, or permanent.

## 4. Route-by-Route SEO Audit

| URL | Indexable? | Title | H1 | Canonical | Content Quality | Main Issue | Severity |
|---|---|---|---|---|---|---|---|
| `/` | Intended yes; live blocked | Wizard TV IPTV Plans, Device Setup and Free Trial | Wizard TV IPTV Plans for Simple TV Viewing Across Your Devices | `https://www.wizardtv.vip/` | Solid service overview | live TLS blocks fetch; trust details thin | P0/P1 |
| `/pricing` | Intended yes; live blocked | Wizard TV IPTV Pricing and Subscription Plans | same | `/pricing` resolved to production | Strong pricing intent | no payment/refund confidence from legal pages | P1 |
| `/channels` | Intended yes; live blocked | Wizard TV IPTV Devices and Setup Guide | Devices That Work With Wizard TV IPTV | `/channels` | Conservative and useful | page slug says channels but content is devices | P2 |
| `/faq` | Intended yes; live blocked | Wizard TV IPTV FAQ, Plans, Devices and Support | Frequently Asked Questions About Wizard TV IPTV | `/faq` | Useful FAQ hub | accordions hide most answer text until interaction for users, though HTML likely contains it | P3 |
| `/blog` | Intended yes; live blocked | Wizard TV Blog | Wizard TV blog | `/blog` | Thin listing but acceptable | intro says blog ready for deeper articles despite articles existing | P2 |
| `/blog/iptv-buffering-freezing-fixes-2026` | Intended yes; live blocked | IPTV Buffering or Freezing? 15 Fixes for 2026 | article title | slug canonical | Useful troubleshooting | overlaps with freezing causes article | P2 |
| `/blog/wizard-tv-not-working-black-screen` | Intended yes; live blocked | Wizard TV Not Working? Black Screen and Playback Fixes | article title | slug canonical | Useful branded support | many issues require direct account/support data | P2 |
| `/blog/xtream-codes-not-working-login-server-url` | Intended yes; live blocked | Xtream Codes Not Working? Fix Login, Server URL & IPTV Connection Errors | article title | slug canonical | Useful technical setup | targets third-party/protocol term, not Wizard TV brand | P2 |
| `/blog/iptv-epg-not-working-guide-time` | Intended yes; live blocked | IPTV EPG Not Working? Fix Missing Guide, Wrong Time & Program Information | article title | slug canonical | Useful | low commercial relevance | P3 |
| `/blog/why-iptv-keeps-freezing-causes-fixes` | Intended yes; live blocked | Why Does IPTV Keep Freezing? Causes, Fixes & Troubleshooting Guide | article title | slug canonical | Useful | cannibalizes buffering/freezing fixes | P2 |
| `/blog/wizard-tv-no-sound-audio-sync` | Intended yes; live blocked | Wizard TV No Sound? Fix IPTV Audio Delay, Sync & Playback Problems | article title | slug canonical | Useful branded support | low independent proof of Wizard TV-specific causes | P2 |
| `/blog/mlb-playoffs-2026-schedule-wizard-tv` | Intended yes; live blocked | MLB Playoffs 2026: Schedule, Key Dates & How to Watch With Wizard TV | article title | slug canonical | Time-sensitive | needs daily verification during postseason | P1 |
| `/blog/world-series-2026-schedule-wizard-tv` | Intended yes; live blocked | World Series 2026: Schedule, Dates, Teams & Wizard TV Viewing Guide | article title | slug canonical | Time-sensitive | likely premature/TBD until teams/dates settle | P1 |
| `/blog/nba-2026-27-schedule-wizard-tv` | Intended yes; live blocked | NBA 2026-27: Schedule, Key Games & How to Watch With Wizard TV | article title | slug canonical | Time-sensitive | must match NBA official updates | P2 |
| `/blog/uefa-champions-league-2026-27-fixtures-wizard-tv` | Intended yes; live blocked | UEFA Champions League 2026-27: Fixtures, Big Matches & Wizard TV Viewing Guide | article title | slug canonical | Time-sensitive | must match UEFA official updates | P2 |
| `/reseller` | Intended yes; live blocked | Wizard TV IPTV Reseller Information | Become a Wizard TV IPTV Reseller | `/reseller` | Conservative | no real reseller terms published | P2 |
| `/privacy` | Intended yes; live blocked | Privacy Policy | Privacy Policy | `/privacy` | Weak placeholder | says final policy should be reviewed | P1 |
| `/terms` | Intended yes; live blocked | Terms | Terms | `/terms` | Weak placeholder | says starter terms should be replaced | P1 |
| `/refund` | Intended yes; live blocked | Refund Policy | Refund Policy | `/refund` | Weak placeholder | says refund rules must be finalized | P1 |
| `/disclaimer` | Intended yes; live blocked | Disclaimer | Disclaimer | `/disclaimer` | Acceptable short disclaimer | thin legal support | P2 |

## 5. Homepage Deep Audit

Evidence:

- Metadata in `src/app/page.tsx:11-27` targets Wizard TV IPTV plans, devices, Free Trial, and WhatsApp support.
- H1 in `src/app/page.tsx:130-132` clearly states the brand and offer category.
- Above-the-fold content explains plan comparison, device count, Free Trial, and support in `src/app/page.tsx:133-147`.
- Hero image uses `next/image` with `priority`, `fill`, and `sizes="100vw"` at `src/app/page.tsx:119-125`.
- Homepage FAQ schema is generated from five visible FAQs at `src/app/page.tsx:29-55` and `98-117`.

What the homepage answers well:

- What is Wizard TV? It states Wizard TV is an IPTV subscription service with plans by duration/device count.
- What does the service offer? Pricing comparison, devices, trial request, WhatsApp ordering/support.
- Who is it for? Visitors looking for IPTV viewing across common home devices.
- How does a visitor start? Pricing CTA and Free Trial CTA.

Gaps:

- No About page or business identity detail. The site does not show company/operator identity, location, ownership, email, or formal support channel beyond WhatsApp.
- Trust signals are intentionally conservative but sparse. There are no testimonials, ratings, guarantees, or licensing claims, which avoids false claims but also gives users little confidence.
- No explicit content/licensing position beyond the disclaimer. The page avoids broadcaster-partnership claims, which is good, but a service in this category benefits from clearer compliance language.
- Pricing is present via component, but refund/payment terms are not finalized elsewhere.

Recommended correction:

- Add real business identity and support details only if they are true.
- Replace placeholder legal pages before launch.
- Consider adding a concise "What Wizard TV does not claim" or compliance note if legally approved.
- Keep homepage claims conservative; do not add channel counts, 4K guarantees, uptime guarantees, or broadcaster affiliations without proof.

## 6. Blog Quality Audit

Method:

- Read `src/data/blog.ts` and renderer `src/app/blog/[slug]/page.tsx`.
- Estimated reader-visible word counts from source strings excluding URLs/assets/imports. Counts are approximate but sufficient to confirm articles are substantial.
- Reviewed current official-source risk through web search. MLB official postseason schedule is currently live and changing; competitor/SERP search showed similarly named Wizard TV domains and IPTV competitor pages.

| Slug | Approx. source words | Primary keyword | Usefulness | Duplication/cannibalization risk | Factual risk | Recommendation |
|---|---:|---|---|---|---|---|
| `iptv-buffering-freezing-fixes-2026` | 2,652 | IPTV buffering fix | High | overlaps freezing article | Low/medium | Keep, but differentiate as immediate fix checklist |
| `wizard-tv-not-working-black-screen` | 2,580 | Wizard TV not working | High for support | Low | Medium because account/service issues need support data | Keep, add clear support escalation/contact context |
| `xtream-codes-not-working-login-server-url` | 2,568 | Xtream Codes not working | Good | Low | Medium; third-party terminology may shift | Keep if relevant to actual setup |
| `iptv-epg-not-working-guide-time` | 2,574 | IPTV EPG not working | Good | Low | Medium; player-specific behavior varies | Keep |
| `why-iptv-keeps-freezing-causes-fixes` | 2,635 | why does IPTV keep freezing | Good | High vs buffering article | Low/medium | Reposition as root-cause explainer or consolidate |
| `wizard-tv-no-sound-audio-sync` | 2,570 | Wizard TV no sound | Good | Low | Medium; not all causes Wizard TV-specific | Keep |
| `mlb-playoffs-2026-schedule-wizard-tv` | 2,595 | MLB Playoffs 2026 schedule | Useful only if current | Medium vs World Series | High during postseason | Recheck against MLB daily |
| `world-series-2026-schedule-wizard-tv` | 2,572 | World Series 2026 schedule | Premature/TBD unless updated | High vs MLB playoffs | High | Keep only if updated as teams/dates become final |
| `nba-2026-27-schedule-wizard-tv` | 2,574 | NBA 2026-27 schedule | Useful if official dates match | Medium vs other sports pages | Medium/high | Recheck against NBA official schedule |
| `uefa-champions-league-2026-27-fixtures-wizard-tv` | 2,582 | UEFA Champions League 2026-27 fixtures | Useful if official fixtures match | Medium vs other sports pages | Medium/high | Recheck against UEFA official fixtures |

Specific findings:

- Blog rendering is technically strong: one H1, generated TOC, H2 sections, images with alt text, source links, FAQ, related links, and BlogPosting JSON-LD.
- `src/app/blog/[slug]/page.tsx:131-155` uses `overflow-x-auto` and `min-w-[42rem]` tables. This prevents cramped tables but requires horizontal scroll on mobile.
- Blog dates are global constants in `src/data/blog.ts:28-29`; all articles share published `2026-10-05` and updated `2026-10-06`. This is simple but risky for time-sensitive sports pages that need independent update dates.
- Sports article source links point to official sources in `src/data/blog.ts:45-50`, but no automated freshness check exists.
- MLB official postseason schedule pages are currently active and changing as of 2026-10-09; the report used MLB.com search results for current official context.

## 7. Technical SEO Findings

Confirmed:

- **P0 production TLS failure.** Live HTTPS fetches failed for both www and apex hosts.
- **P2 stale QA script.** `scripts/crawl-links.mjs:1-14` still lists removed blog routes `/blog/choose-iptv-plan-devices` and `/blog/wizard-tv-device-setup`, so `npm run check:links` cannot be trusted unless updated.
- **P2 no custom security headers.** `next.config.ts` only defines redirects; it does not configure HSTS, CSP, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy.
- **P2 no custom 404.** There is no `src/app/not-found.tsx`.
- **P3 footer stale text.** `src/components/Footer.tsx:59-60` says `Production domain to be configured`, while `siteConfig.domain` is already `https://www.wizardtv.vip`.

Positive technical observations:

- Canonical origin is centralized in `src/lib/site.ts`.
- Sitemap covers all intended routes.
- Robots allows crawling and points to the canonical sitemap.
- No source-level `noindex` found.
- `next/image` is used for homepage/blog images.
- Font loading uses `next/font/google`, which self-hosts optimized fonts in Next builds.

## 8. Internal Linking and Cannibalization

HTML discovery:

- Header links to Home, Pricing, Devices, FAQ, Blog, Reseller.
- Footer repeats navigation and links Privacy, Terms, Refund Policy, Disclaimer.
- Homepage links to pricing, channels, FAQ content, blog snippets, and WhatsApp CTAs.
- Blog listing links to all articles.
- Articles link back to `/blog`, related articles, sources, and sometimes internal pages via rich text.

Potential orphan pages:

- No intended route is orphaned from header/footer or blog listing.
- Legal pages are linked from footer only, which is acceptable.

Cannibalization:

- `iptv-buffering-freezing-fixes-2026` and `why-iptv-keeps-freezing-causes-fixes` both target freezing/buffering troubleshooting. Differentiate one as immediate "fix now" and the other as diagnostic/root-cause, or consolidate if rankings split.
- `mlb-playoffs-2026-schedule-wizard-tv` and `world-series-2026-schedule-wizard-tv` overlap during postseason. Keep World Series page focused only on the best-of-seven series and use the MLB Playoffs page as the broader bracket hub.
- Sports schedule pages share a similar viewing-guide pattern. Add sport-specific details and reduce generic Wizard TV setup repetition.

Internal link improvement plan:

- Add contextual links from troubleshooting articles to the device page and FAQ where setup/support context is needed.
- Add a "current schedule sources" block on sports articles linking directly to official MLB/NBA/UEFA pages.
- Add breadcrumbs visibly, not only JSON-LD, for blog articles and commercial pages.
- Update `scripts/crawl-links.mjs` to crawl actual slugs from `src/data/blog.ts`.

## 9. Structured Data

Implemented schema:

- Organization in `src/app/layout.tsx:49-62`.
- WebSite and FAQPage on homepage in `src/app/page.tsx:98-117`.
- BreadcrumbList and FAQPage on pricing, channels, FAQ, and reseller.
- BlogPosting in `src/data/blog.ts:1368-1380`.
- Article pages render BlogPosting and FAQPage via `src/app/blog/[slug]/page.tsx:70-82`.

Findings:

- JSON-LD construction is valid object-based React rendering through `JsonLd`.
- BlogPosting has `headline`, `description`, `datePublished`, `dateModified`, `image`, `mainEntityOfPage`, `author`, and `publisher`.
- Organization lacks optional trust details such as logo, sameAs, address, and contact URL. Do not invent these.
- FAQPage markup appears on many pages. Valid schema does not guarantee Google FAQ rich results.
- No Product/Offer schema is used for pricing. This avoids misrepresentation, but pricing pages could eventually use Product/Offer only if product identity, price currency, availability, and terms are legally accurate.

## 10. Performance and Mobile UX

Actual measurements:

- Live Lighthouse/Core Web Vitals were not measured because production HTTPS failed.
- No field Core Web Vitals data or CrUX data was available in this audit.

Source-based performance risks:

- `PricingSelector`, `Header`, and `FaqAccordion` are client components; hydration footprint appears modest.
- Homepage hero image is prioritized correctly with `next/image`.
- The same living-room image is reused in multiple homepage sections, which can be cache-friendly but visually repetitive.
- Blog article hero images are prioritized. That is correct for article LCP, but all article pages use image-heavy layouts.
- No third-party analytics, tag managers, chat widgets, or ad scripts were found.

Mobile/accessibility observations:

- CSS sets `overflow-x: hidden` on `body` and `overflow-wrap: anywhere` for text/buttons, reducing accidental overflow risk.
- Mobile nav uses a real button with `aria-expanded`, `aria-controls`, and `aria-label`.
- Tables use horizontal scrolling, which is preferable to broken layouts but should be tested at 320px.
- Existing `.qa-screens` artifacts indicate prior screenshots at 390px, 768px, and 1440px, but this audit did not create new screenshots because the instruction was read-only except for the final report.

## 11. Trust and Business Consistency

Confirmed trust issues:

- `src/app/privacy/page.tsx:18-19` says a final production privacy policy should be reviewed when production domain and operating details are supplied.
- `src/app/terms/page.tsx:18-19` says starter terms should be reviewed and replaced before launch.
- `src/app/refund/page.tsx:18-19` says refund rules must be finalized by the business owner before production launch.
- Footer says `Production domain to be configured` at `src/components/Footer.tsx:59-60`.
- No About page or Contact page exists.
- Contact/support is WhatsApp-only through `src/lib/whatsapp.ts:3-12`.

Positive trust controls:

- The site avoids unsupported claims about broadcaster partnerships, uptime guarantees, proprietary apps, 4K guarantees, channel counts, fake reviews, fake ratings, and reseller earnings.
- Device compatibility language is appropriately conditional.
- Reseller page explicitly avoids publishing reseller prices, margins, commissions, or guarantees.

Recommended correction:

- Replace placeholder legal pages with final reviewed policies.
- Add an About/Contact page with real business identity and support expectations.
- Remove stale footer production-domain text.
- Keep conservative claim posture.

## 12. Competitor Analysis

External search was available and used for a limited SERP snapshot.

Brand ambiguity:

- Search results show similarly named domains, including `wizardtv.org`, `wizardtv.net`, and `wizardiptv.com`. Some use stronger commercial claims such as channel counts, anti-buffering claims, PPV claims, 4K claims, and money-back guarantees. This creates brand confusion and makes clear domain/brand trust important.

Nonbranded IPTV SERP patterns:

- Competing IPTV pages commonly emphasize pricing, free trials, device counts, channel/VOD counts, sports, support, refund windows, and setup guides.
- Examples found in search results included IPTV USA FAQ, LEMO TV free trial, OTTV pricing, Nomad IPTV, and WeSellIPTV.
- Many competitors make aggressive claims that Wizard TV currently avoids. That conservative positioning reduces legal/trust risk but may need stronger factual proof points to compete.

SERP opportunity:

- Build trust around clarity: transparent pricing, no invented compatibility claims, support workflow, setup prerequisites, and practical troubleshooting.
- Differentiate from lookalike Wizard domains with consistent `www.wizardtv.vip` branding, About/Contact detail, and finalized policies.
- Do not copy competitor channel-count/guarantee claims unless independently verified and legally approved.

No search volume, rankings, traffic, or keyword difficulty were verified.

## 13. Google Search Console Readiness

Ready in repository:

- Canonical origin configured.
- Sitemap generation includes all intended URLs.
- Robots allows crawling.
- No source `noindex`.
- Static article slugs are enumerable.
- Metadata and structured data are present.

Not ready / blocked:

- Production HTTPS must be fixed before reliable GSC verification, sitemap submission, URL Inspection, or indexing requests.
- Legal/trust pages should not be submitted as final production pages while they say they are placeholders.

GSC action plan:

1. Fix TLS/hosting for `https://www.wizardtv.vip/` and apex redirect.
2. Verify a Domain property or URL-prefix property for `https://www.wizardtv.vip/`.
3. Submit `https://www.wizardtv.vip/sitemap.xml`.
4. Use URL Inspection for `/`, `/pricing`, `/channels`, `/faq`, `/blog`, and one article.
5. Check Page Indexing reports for server errors, soft 404, duplicates, alternate canonicals, and discovered/crawled-not-indexed.
6. Validate structured data in Rich Results Test and Schema Markup Validator.
7. Monitor Core Web Vitals once production is crawlable and receiving field data.

## 14. Prioritized Issue Register

| ID | Severity | Route | File/Line | Evidence | Root Cause | Recommended Fix | Verification |
|---|---|---|---|---|---|---|---|
| SEO-001 | P0 | all production URLs | hosting/TLS | curl code `000`, TLS unexpected EOF for www and apex | production SSL/CDN/server misconfiguration | fix certificate/hosting/TLS and apex/www routing | `curl -I https://www.wizardtv.vip/`, GSC URL Inspection |
| SEO-002 | P1 | `/privacy` | `src/app/privacy/page.tsx:18-19` | says final policy should be reviewed | placeholder legal copy | publish final privacy policy | page content review |
| SEO-003 | P1 | `/terms` | `src/app/terms/page.tsx:18-19` | says starter terms should be replaced | placeholder legal copy | publish final terms | page content review |
| SEO-004 | P1 | `/refund` | `src/app/refund/page.tsx:18-19` | says refund rules must be finalized | placeholder refund copy | publish final refund policy | page content review |
| SEO-005 | P1 | sitewide | no route file | no About or Contact page | trust architecture gap | add truthful About/Contact pages | crawl route, nav/footer links |
| SEO-006 | P2 | footer | `src/components/Footer.tsx:59-60` | says production domain to be configured | stale launch text | replace with accurate footer copy | rendered footer check |
| SEO-007 | P2 | blog sports | `src/data/blog.ts:822-1360` | time-sensitive schedule articles | static content with no freshness workflow | verify and update from official sources | compare against MLB/NBA/UEFA official pages |
| SEO-008 | P2 | blog | `src/data/blog.ts:65-70`, `564-576` | freezing/buffering topic overlap | adjacent intents split into two pages | differentiate or consolidate | content map and GSC query data |
| SEO-009 | P2 | QA | `scripts/crawl-links.mjs:1-14` | old blog slugs listed | stale hardcoded crawler | derive routes from `src/data/blog.ts` | run link crawl |
| SEO-010 | P2 | sitewide | `next.config.ts:3-13` | redirects only, no headers | security headers not configured | add reviewed headers | `curl -I`, securityheaders.com-style check |
| SEO-011 | P2 | missing routes | no `src/app/not-found.tsx` | default 404 only | no branded error page | add custom 404 if desired | fetch nonexistent URL |
| SEO-012 | P3 | `/channels` | route filename | page is devices/setup, URL says channels | old route naming | consider `/devices` redirect/canonical strategy | redirect/canonical QA |

## 15. Remediation Roadmap

Phase A: Critical indexing and production issues

- Fix HTTPS/TLS for `www.wizardtv.vip`.
- Verify apex-to-www redirect in production.
- Confirm `/robots.txt`, `/sitemap.xml`, `/`, and priority pages return 200 over HTTPS.

Phase B: High-priority technical SEO

- Update stale link crawler to actual blog slugs.
- Add production security headers after review.
- Add custom 404 if the brand needs a better error experience.
- Verify rendered canonicals and `og:url` in production.

Phase C: Homepage and commercial-page SEO

- Add truthful About/Contact content.
- Finalize legal/refund/support policy pages.
- Remove stale footer text.
- Keep claims conservative and evidence-backed.

Phase D: Blog and content quality

- Differentiate or consolidate buffering/freezing articles.
- Add a sports freshness workflow with per-article updated dates.
- Recheck sports facts against official MLB, NBA, and UEFA pages before submitting to Google.
- Add more contextual internal links between troubleshooting, devices, FAQ, and support pages.

Phase E: Performance, UX, and trust

- Run Lighthouse on production mobile and desktop once HTTPS works.
- Test 320px, 390px, 768px, 1024px, and 1440px viewports.
- Validate keyboard navigation and focus states for mobile nav, FAQ accordions, and pricing selector.

Phase F: Post-deployment and GSC validation

- Submit sitemap in GSC.
- Inspect priority URLs.
- Request indexing only after live pages, canonicals, and legal/trust copy are correct.
- Monitor Page Indexing, Core Web Vitals, and query data.

## 16. Final Verdict

**NEEDS MAJOR REMEDIATION**

The local implementation has a serious SEO foundation and no obvious source-level `noindex`, sitemap omission, or canonical-domain conflict. However, production HTTPS failed during live testing, which is a direct crawlability and user-access blocker. The site also has placeholder legal/refund/terms copy and no About/Contact route, which weakens trust for a subscription service. Once production access and trust pages are corrected, the site should move into a targeted-improvements phase focused on content differentiation, sports freshness, security headers, and measured performance.


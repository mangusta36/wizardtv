# Wizard TV Pre-Blog Forensic Audit

Final verdict: NOT READY FOR BLOG EXPANSION

Audit date: 2026-10-05

## CRITICAL

| Page/File | Exact Problem | Evidence | SEO/UX Impact | Fix Status | Recommended Action |
|---|---|---|---|---|---|
| `src/lib/site.ts`, rendered canonicals, `/robots.txt`, `/sitemap.xml` | Production domain is unresolved and rendered production-facing URLs use `https://wizard-tv-domain-unset.invalid`. | Canonicals render with `.invalid`; robots references `https://wizard-tv-domain-unset.invalid/sitemap.xml`; sitemap loc values use the same unresolved host. | Search engines should not receive placeholder canonical/sitemap URLs. This blocks a clean production launch and blog expansion. | Not fixed; real domain not provided and must not be invented. | Set `NEXT_PUBLIC_SITE_URL` to the verified Wizard TV production domain before launch, rebuild, and re-run this audit. |

## HIGH

No high-severity issues remain after fixes.

## MEDIUM

| Page/File | Exact Problem | Evidence | SEO/UX Impact | Fix Status | Recommended Action |
|---|---|---|---|---|---|
| `/`, cross-page headings | Homepage and commercial pages are heavily branded. This is not keyword stuffing, but the homepage is close to the upper edge of natural repetition. | Rendered homepage body: `Wizard TV` 46, `Wizard TV IPTV` 11, `Wizard IPTV` 9. Many headings include a brand variant. | Could make the site feel more SEO-shaped than editorial if future blog content repeats the same phrasing. | Documented, not rewritten because content remains understandable and page intent is distinct. | Future blog work should use more natural long-tail phrasing and avoid repeating landing-page H1/H2 formulas. |

## LOW

| Page/File | Exact Problem | Evidence | SEO/UX Impact | Fix Status | Recommended Action |
|---|---|---|---|---|---|
| Existing blog seed content | Two starter articles already exist even though this task did not ask to create new articles. | `/blog/choose-iptv-plan-devices`, `/blog/wizard-tv-device-setup` are present in sitemap. | Not harmful, but future content planning should treat them as existing seed posts. | No change; not a defect. | Keep, revise, or remove intentionally during the blog-cluster phase. |

## PASS

- Pricing matrix verified: 20/20 prices pass.
- WhatsApp order messages verified: 20/20 pass.
- Other WhatsApp flows verified for Free Trial, Support, and Reseller.
- Rendered link crawl passed: 299 links checked.
- Brand/domain leak audit passed: 0 forbidden brand/domain references.
- Unsupported published claims: 0.
- FAQPage schema parity passed on all visible FAQ pages after fix.
- No Product, Offer, Review, or AggregateRating schema found.
- Responsive QA passed at 390px, 768px, and 1440px for `/`, `/pricing`, `/channels`, `/faq`, `/reseller`, and `/blog`.
- Design system is coherent across major pages.

## Fixes Applied During Audit

| File | Fix |
|---|---|
| `src/app/blog/[slug]/page.tsx` | Added FAQPage JSON-LD matching visible article “Quick answers.” |
| `src/app/blog/[slug]/page.tsx` | Added article-specific Twitter metadata. |
| `src/app/blog/page.tsx` | Added page-specific Open Graph and Twitter metadata. |
| `src/app/privacy/page.tsx` | Added page-specific Open Graph and Twitter metadata. |
| `src/app/terms/page.tsx` | Added page-specific Open Graph and Twitter metadata. |
| `src/app/refund/page.tsx` | Added page-specific Open Graph and Twitter metadata. |
| `src/app/disclaimer/page.tsx` | Added page-specific Open Graph and Twitter metadata. |

## All Page H1s

| Page | H1 | Status |
|---|---|---|
| `/` | Wizard TV IPTV Plans for Simple TV Viewing Across Your Devices | PASS |
| `/pricing` | Wizard TV IPTV Pricing and Subscription Plans | PASS |
| `/channels` | Devices That Work With Wizard TV IPTV | PASS |
| `/faq` | Frequently Asked Questions About Wizard TV IPTV | PASS |
| `/reseller` | Become a Wizard TV IPTV Reseller | PASS |
| `/blog` | Wizard TV blog | PASS |
| `/blog/choose-iptv-plan-devices` | How to choose a Wizard TV plan for your devices | PASS |
| `/blog/wizard-tv-device-setup` | Wizard TV device setup basics | PASS |
| `/privacy` | Privacy Policy | PASS |
| `/terms` | Terms | PASS |
| `/refund` | Refund Policy | PASS |
| `/disclaimer` | Disclaimer | PASS |

## Cross-Page Heading Duplication

| Heading | Locations | Assessment |
|---|---|---|
| Use Wizard TV on Fire TV and Android TV | `/` H3, `/channels` H2 | Acceptable overlap; homepage preview points to the devices page. |
| 1 Month / 3 Months / 6 Months / 12 Months | `/` pricing cards, `/pricing` cards/details | Acceptable pricing consistency. |
| Navigation / Legal | Global footer | Acceptable global footer repetition. |
| Article titles | `/blog` H2 and article H1s | Acceptable blog index-to-article pattern. |
| Quick answers / Related articles | Blog article templates | Acceptable structural article headings. |

## Keyword Distribution

| Page | Wizard TV | Wizard TV IPTV | Wizard IPTV | Editorial Assessment |
|---|---:|---:|---:|---|
| `/` | 46 | 11 | 9 | High but still readable; monitor future content. |
| `/pricing` | 24 | 7 | 5 | Natural for pricing intent. |
| `/channels` | 35 | 4 | 4 | Natural for device intent. |
| `/faq` | 45 | 7 | 5 | Acceptable because FAQ is comprehensive. |
| `/reseller` | 35 | 5 | 5 | Natural for reseller intent. |
| `/blog` | 7 | 0 | 0 | Natural. |
| Blog articles | 7 each | 0 | 0 | Natural. |

Keyword over-optimization assessment: PASS for current major pages, with a medium caution on future blog phrasing.

## Keyword Cannibalization

| Page | Primary Intent | Cannibalization Risk |
|---|---|---|
| `/` | Wizard TV brand/service overview | Low |
| `/pricing` | Wizard TV IPTV pricing/subscription intent | Low |
| `/channels` | Wizard TV IPTV device compatibility/setup intent | Low |
| `/faq` | Wizard TV questions/help intent | Low |
| `/reseller` | Wizard TV reseller intent | Low |
| `/blog` | Content hub | Low |

Result: PASS. Future blog posts should not target the primary landing-page intents as their main query.

## FAQ Duplication

| Area | Result |
|---|---|
| Homepage FAQ | Short brand/service preview; acceptable. |
| Pricing FAQ | Pricing-specific; acceptable. |
| Devices FAQ | Device-specific; acceptable. |
| FAQ page | Comprehensive; appropriate main FAQ destination. |
| Reseller FAQ | Reseller-specific; acceptable. |
| Blog article FAQs | Article-specific after schema fix. |

No harmful FAQ duplication found.

## Metadata

| Page | Title | Description | OG | Twitter | Status |
|---|---|---|---|---|---|
| `/` | Present | Present | Present | Present | PASS |
| `/pricing` | Present | Present | Present | Present | PASS |
| `/channels` | Present | Present | Present | Present | PASS |
| `/faq` | Present | Present | Present | Present | PASS |
| `/reseller` | Present | Present | Present | Present | PASS |
| `/blog` | Present | Present | Present after fix | Present after fix | PASS |
| Blog articles | Present | Present | Present | Present after fix | PASS |
| Legal pages | Present | Present | Present after fix | Present after fix | PASS |

## Canonical and Indexability

| Check | Status | Notes |
|---|---|---|
| One canonical per page | PASS | Canonicals render consistently. |
| Correct production canonical host | FAIL | Host is unresolved placeholder `.invalid`. |
| No `noindex` on important pages | PASS | No accidental noindex found. |
| Important pages render 200 | PASS | Build and rendered crawl pass. |
| Redirect behavior | PASS | No unexpected redirects observed in crawl. |

PRODUCTION DOMAIN: UNRESOLVED

## Robots

| Check | Status | Notes |
|---|---|---|
| Site-wide disallow absent | PASS | `Allow: /` rendered. |
| Important pages crawlable | PASS | No robots block found. |
| Sitemap reference | FAIL | References unresolved `.invalid` host. |
| Cross-brand leakage | PASS | None found. |

## Sitemap

| Check | Status | Notes |
|---|---|---|
| Major pages included | PASS | Home, pricing, devices, FAQ, blog, reseller, legal pages included. |
| Blog posts included | PASS | Existing two posts included. |
| Dead routes/junk routes absent | PASS | No login/cart/checkout junk. |
| Duplicate URLs absent | PASS | No duplicates found. |
| Correct production host | FAIL | URLs use unresolved `.invalid` host. |
| Meaningless dynamic timestamps | PASS | Static `2026-10-05` used for static routes, article dates used for posts. |

## Schema

| Page | JSON-LD Types | Status |
|---|---|---|
| `/` | Organization, WebSite, FAQPage | PASS |
| `/pricing` | Organization, BreadcrumbList, FAQPage | PASS |
| `/channels` | Organization, BreadcrumbList, FAQPage | PASS |
| `/faq` | Organization, BreadcrumbList, FAQPage | PASS |
| `/reseller` | Organization, BreadcrumbList, FAQPage | PASS |
| `/blog` | Organization | PASS |
| Blog articles | Organization, BlogPosting, FAQPage | PASS after fix |
| Legal pages | Organization | PASS |

No fake review, fake rating, Product, Offer, or AggregateRating schema found.

## Internal Linking

| Relationship | Status |
|---|---|
| Home -> Pricing, Devices, FAQ, Reseller | PASS |
| Pricing -> Devices, FAQ, Blog, Reseller | PASS |
| Devices -> Pricing, FAQ, Blog, Reseller | PASS |
| FAQ -> Pricing, Devices, Blog, Reseller | PASS |
| Reseller -> Pricing, Devices, FAQ, Blog | PASS |
| Blog -> existing articles | PASS |
| Blog articles -> related articles | PASS |
| Legal pages reachable from footer | PASS |

Anchor text is varied enough and not exact-match spam.

## Unsupported Claims

| Claim Type | Published Unsupported Count |
|---|---:|
| Channel/VOD counts | 0 |
| 4K/HD guarantees | 0 |
| Uptime / zero buffering | 0 |
| Activation time / instant activation | 0 |
| 24/7 support | 0 |
| Customers / years in business / awards | 0 |
| Reviews / ratings | 0 |
| Payment methods | 0 |
| Proprietary app guarantees | 0 |
| Third-party partnerships | 0 |
| Reseller profits / margins / earnings | 0 |
| White-label or territory claims | 0 |

Negative clarifications such as “does not claim” were not counted as unsupported claims.

## Pricing

| Check | Status |
|---|---|
| 1 Month prices for 1-5 devices | PASS |
| 3 Months prices for 1-5 devices | PASS |
| 6 Months prices for 1-5 devices | PASS |
| 12 Months prices for 1-5 devices | PASS |
| Homepage/pricing agreement | PASS |
| FAQ pricing references | PASS |
| Reseller page avoids presenting customer prices as reseller prices | PASS |

20/20 pricing: PASS.

## WhatsApp

| Flow | Expected Message | Status |
|---|---|---|
| Order | `Hi Wizard TV, I'd like the [DURATION] plan for [N] device(s) ($[PRICE]).` | PASS |
| Free Trial | `Hi Wizard TV, I'd like to request a free trial.` | PASS |
| Support | `Hi Wizard TV, I need some help.` | PASS |
| Reseller | `Hi Wizard TV, I'm interested in becoming a reseller.` | PASS |

Number: `212753936672`.

No conflicting hardcoded WhatsApp number found in source.

## Responsive QA

| Viewport | Pages Checked | Status |
|---|---|---|
| 390px | `/`, `/pricing`, `/channels`, `/faq`, `/reseller`, `/blog` | PASS |
| 768px | `/`, `/pricing`, `/channels`, `/faq`, `/reseller`, `/blog` | PASS |
| 1440px | `/`, `/pricing`, `/channels`, `/faq`, `/reseller`, `/blog` | PASS |

No horizontal overflow found. Screenshots saved in `.qa-screens/pre-blog/`.

## Accessibility

| Check | Status | Notes |
|---|---|---|
| One H1 per page | PASS | Verified rendered pages. |
| Heading hierarchy | PASS | No semantic blockers found. |
| Keyboard/focus visibility | PASS | Buttons/links use visible focus styling. |
| Link/button semantics | PASS | CTAs are links; menu toggle is a button. |
| Accordion accessibility | PASS | Uses buttons and `aria-expanded`. |
| Image alt text | PASS | Images have useful alt text. |
| Forms/labels | PASS | No forms present. |
| Contrast | PASS | Visual inspection acceptable. |
| Touch targets | PASS | Primary controls are large; small footer/text links are conventional navigation links. |

## Images

| Check | Status |
|---|---|
| Broken images | PASS |
| Relevant imagery | PASS |
| Next Image usage | PASS |
| Useful alt text | PASS |
| Cross-brand assets | PASS |
| Massive unnecessary files | PASS |

## Design and Copy Quality

| Check | Status | Notes |
|---|---|---|
| Header/footer consistency | PASS | Shared layout. |
| Typography/buttons/spacing | PASS | Coherent across major pages. |
| Excessive cards/icons/glow/pills | PASS | Restrained layout. |
| Fake stats/testimonials | PASS | None found. |
| Generic AI marketing copy | PASS | No problematic “unlock/elevate/ultimate” style copy found in rendered pages. |

## Performance / Client JS

| Area | Status | Notes |
|---|---|---|
| Client components | PASS | Limited to Header, FAQ accordion, and pricing selector where interactivity is needed. |
| Heavy libraries | PASS | No animation/analytics bloat found. |
| Hydration | PASS | Appropriate for current features. |

## Blog Readiness

| Check | Status |
|---|---|
| Blog index design | PASS |
| Article template | PASS |
| Article metadata | PASS after fix |
| BlogPosting schema | PASS |
| Article FAQ schema | PASS after fix |
| Related article support | PASS |
| Breadcrumbs in article template | LOW opportunity: visible blog link exists, but BreadcrumbList schema is not yet used on articles. |
| Category/date handling | PASS |
| Author credentials | PASS; no invented author shown. |

Blog architecture: PASS.

## Blog Cannibalization Plan

Future blog articles should not use these primary intents:

- Homepage intent: Wizard TV brand/service overview.
- Pricing intent: Wizard TV pricing and subscription plans.
- Devices intent: Wizard TV device compatibility and setup.
- FAQ intent: Wizard TV questions/help.
- Reseller intent: Wizard TV reseller inquiries.

Future posts should target supporting informational queries, examples:

- Device-specific setup considerations.
- How to choose duration/device count.
- Trial/order preparation.
- IPTV player compatibility considerations without claiming partnerships.
- Troubleshooting questions that link back to the commercial pages.

Blog cannibalization plan: PASS.

## Validation Results

| Command | Result |
|---|---|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| `npm run check:pricing` | PASS |
| `npm run check:brand` | PASS |
| `npm run check:links` | PASS |

## Final Verdict

NOT READY FOR BLOG EXPANSION

Reason: the site is technically, structurally, and editorially close, but production domain configuration is unresolved. Canonicals, robots sitemap reference, and sitemap URLs must point to the verified Wizard TV production domain before the blog/content-cluster phase begins.

# Wizard TV 10 Blog Forensic SEO Audit

Read-only audit date: 2026-10-06

Scope inspected:
- `src/data/blog.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/components/FaqAccordion.tsx`
- `src/lib/site.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `public/images/blog/*`

No implementation files were modified. This report is the only created file.

## Executive Verdict

The previous PASS summary is materially overstated.

The implementation does create 10 article records, and all 10 exceed 2,500 reader-visible words by a direct body extraction. However, the content quality does not pass a forensic SEO standard because most article length is produced through shared paragraph factories in `src/data/blog.ts:57-119`, not uniquely written article content. The sports articles are especially template-heavy, with 8-word shingle similarity between sports pages ranging from 0.725 to 0.758.

Production domain remains unresolved. Absolute structured-data and sitemap URLs still use `https://wizard-tv-domain-unset.invalid` through `src/lib/site.ts:7`.

## Method

Visible article-body counts were calculated from each article title, excerpt, rendered section headings, rendered section paragraphs, rendered table text, visible source labels, FAQ questions/answers, and related-article labels. Metadata, JSON-LD source code, imports, filenames, image alt text, navigation, and global footer content were excluded.

Programmatic checks used direct TypeScript transpilation of `src/data/blog.ts` and independent body extraction from the exported article data. Similarity checks used normalized article section text and 8-word shingles.

I did not run `next build` because the instruction was a read-only forensic audit and a production build rewrites `.next/`. I inspected the source and existing generated design paths instead.

## Rule 1: Reader-Visible Word Counts

| # | Title | Slug | Visible body words | Result |
|---|---|---:|---:|---|
| 1 | IPTV Keeps Buffering or Freezing? 15 Ways to Fix It in 2026 | `iptv-buffering-freezing-fixes-2026` | 3,565 | PASS count / FAIL quality |
| 2 | Wizard TV Not Working? Fix Black Screen, Playback Errors & Channels Not Loading | `wizard-tv-not-working-black-screen` | 3,074 | PASS count / FAIL quality |
| 3 | Xtream Codes Not Working? Fix Login, Server URL & IPTV Connection Errors | `xtream-codes-not-working-login-server-url` | 3,019 | PASS count / FAIL quality |
| 4 | IPTV EPG Not Working? Fix Missing Guide, Wrong Time & Program Information | `iptv-epg-not-working-guide-time` | 2,998 | PASS count / FAIL quality |
| 5 | Why Does IPTV Keep Freezing? Causes, Fixes & Troubleshooting Guide | `why-iptv-keeps-freezing-causes-fixes` | 3,014 | PASS count / FAIL quality |
| 6 | Wizard TV No Sound? Fix IPTV Audio Delay, Sync & Playback Problems | `wizard-tv-no-sound-audio-sync` | 3,033 | PASS count / FAIL quality |
| 7 | MLB Playoffs 2026: Schedule, Key Dates & How to Watch With Wizard TV | `mlb-playoffs-2026-schedule-wizard-tv` | 3,016 | PASS count / FAIL quality |
| 8 | World Series 2026: Schedule, Dates, Teams & Wizard TV Viewing Guide | `world-series-2026-schedule-wizard-tv` | 3,001 | PASS count / FAIL quality |
| 9 | NBA 2026-27: Schedule, Key Games & How to Watch With Wizard TV | `nba-2026-27-schedule-wizard-tv` | 3,016 | PASS count / FAIL quality |
| 10 | UEFA Champions League 2026-27: Fixtures, Big Matches & Wizard TV Viewing Guide | `uefa-champions-league-2026-27-fixtures-wizard-tv` | 3,072 | PASS count / FAIL quality |

Quality finding: the count is inflated by repeated helper-generated prose. Examples are `supportNote`, `diagnosticParagraph`, `practicalParagraph`, and `makeLongSections` in `src/data/blog.ts:57-119`. These helpers produce the same sentence frames across all articles, including generic lines about isolating layers, controlled tests, Wizard TV support, and unsupported claims.

## Rule 2: Search Intent

| # | Inferred primary query | Intent | Answer-first? | Focus result |
|---|---|---|---|---|
| 1 | `IPTV buffering fix` / `IPTV keeps buffering or freezing` | Immediate troubleshooting | Partly | FAIL: fix-oriented but generic repetition dominates |
| 2 | `Wizard TV not working` | Branded playback troubleshooting | Partly | PARTIAL: branded symptoms are addressed, but Wizard TV is repeated unnaturally |
| 3 | `Xtream Codes not working` | Login/server URL troubleshooting | Partly | PARTIAL: field issues are addressed, but generic blocks dilute intent |
| 4 | `IPTV EPG not working` | Missing/wrong guide troubleshooting | Partly | PARTIAL: EPG-specific headings exist, but many paragraphs are generic |
| 5 | `why does IPTV keep freezing` | Cause/diagnosis | Partly | FAIL: overlaps heavily with article #1 |
| 6 | `Wizard TV no sound` | Audio troubleshooting | Partly | PARTIAL: audio-specific headings exist, but repeated support/test prose dilutes it |
| 7 | `MLB Playoffs 2026 schedule` | Schedule and viewing planning | Weak | FAIL: schedule facts are thin relative to generic viewing setup |
| 8 | `World Series 2026 schedule` | Dates/teams guide | Weak | FAIL: mostly generic because teams/dates are not substantively answered |
| 9 | `NBA 2026-27 schedule` | Key schedule dates | Partly | FAIL: useful table exists, but article body is mostly template prose |
| 10 | `UEFA Champions League 2026-27 fixtures` | Fixture lookup/planning | Weak | FAIL: fixture-specific content is generic and depends on external sources |

## Rule 3: Keyword Quality

Keyword counts in visible body extraction:

| Slug | wizard tv | iptv | iptv buffering | iptv freezing | xtream codes | iptv epg |
|---|---:|---:|---:|---:|---:|---:|
| `iptv-buffering-freezing-fixes-2026` | 19 | 40 | 37 | 0 | 0 | 0 |
| `wizard-tv-not-working-black-screen` | 56 | 1 | 0 | 0 | 0 | 0 |
| `xtream-codes-not-working-login-server-url` | 14 | 3 | 0 | 0 | 37 | 0 |
| `iptv-epg-not-working-guide-time` | 14 | 36 | 0 | 0 | 0 | 33 |
| `why-iptv-keeps-freezing-causes-fixes` | 14 | 35 | 0 | 31 | 0 | 0 |
| `wizard-tv-no-sound-audio-sync` | 47 | 4 | 0 | 0 | 0 | 0 |
| Sports articles | 24 each | 1-2 | 0 | 0 | 0 | 0 |

Suspicious examples:
- `src/data/blog.ts:78`: every article opens with the same searcher-needs-help sentence frame.
- `src/data/blog.ts:87-108`: every section repeats the same diagnostic structure.
- `src/data/blog.ts:114-115`: every conclusion repeats the same generic ending structure.
- Wizard TV mentions are excessive in branded and sports articles: 56 in article #2, 47 in article #6, and 24 in each sports article.

## Rule 4: Article #1 vs #5 Cannibalization

Article #1 is meant to satisfy "How do I fix IPTV buffering/freezing?" Article #5 is meant to satisfy "Why does IPTV keep freezing?"

Evidence:
- #1 title/H1 is fix-oriented: `IPTV Keeps Buffering or Freezing? 15 Ways to Fix It in 2026` at `src/data/blog.ts:148`.
- #5 title/H1 is cause-oriented: `Why Does IPTV Keep Freezing? Causes, Fixes & Troubleshooting Guide` at `src/data/blog.ts:279`.
- #1 includes `The 15 fixes to try in order`, Ethernet/router tests, player/device fixes, and service-side sections at `src/data/blog.ts:160-167`.
- #5 includes `Use a symptom-to-layer diagnosis`, packet loss, Wi-Fi, device/decoder, and documentation sections at `src/data/blog.ts:291-297`.

Programmatic result: 8-word shingle similarity between article #1 and #5 is 0.318, with 582 common 8-word shingles. This is high for pages targeting adjacent IPTV freezing queries.

Manual result: YES, Google could reasonably see the two pages as competing for essentially the same query. FAIL cannibalization. The headings differ, but both articles repeatedly discuss Ethernet, Wi-Fi, devices, app/player behavior, stream-specific issues, support escalation, and freezing/buffering diagnosis through the same template paragraphs.

## Rule 5: Cross-Article Duplication

Exact substantial duplicates: 6 major helper-generated patterns across the full set.

Near-duplicate suspicious blocks: 30 repeated template blocks after replacing only the article name and primary keyword.

Boilerplate patterns: 4 core generators:
- `supportNote` at `src/data/blog.ts:57-59`
- `diagnosticParagraph` at `src/data/blog.ts:61-63`
- `practicalParagraph` at `src/data/blog.ts:65-67`
- `makeLongSections` at `src/data/blog.ts:69-119`

Similarity highlights:
- All technical article pairs were around 0.302-0.339 8-word shingle similarity.
- `mlb-playoffs-2026-schedule-wizard-tv` vs `world-series-2026-schedule-wizard-tv`: 0.758.
- `world-series-2026-schedule-wizard-tv` vs `nba-2026-27-schedule-wizard-tv`: 0.747.
- `mlb-playoffs-2026-schedule-wizard-tv` vs `nba-2026-27-schedule-wizard-tv`: 0.734.
- `nba-2026-27-schedule-wizard-tv` vs `uefa-champions-league-2026-27-fixtures-wizard-tv`: 0.734.

Target was 0 substantial duplicates. Result: FAIL.

## Rule 6: Heading Structure

| # | One H1 | H2 hierarchy | H3 use | Heading quality | Result |
|---|---|---|---|---|---|
| 1 | PASS | PASS | PASS, none used | Mostly relevant | PASS structure / PARTIAL quality |
| 2 | PASS | PASS | PASS, none used | Relevant | PASS structure / PARTIAL quality |
| 3 | PASS | PASS | PASS, none used | Relevant | PASS structure / PARTIAL quality |
| 4 | PASS | PASS | PASS, none used | Relevant | PASS structure / PARTIAL quality |
| 5 | PASS | PASS | PASS, none used | Relevant but overlaps #1 | PARTIAL |
| 6 | PASS | PASS | PASS, none used | Relevant | PASS structure / PARTIAL quality |
| 7 | PASS | PASS | PASS, none used | Too generic | FAIL quality |
| 8 | PASS | PASS | PASS, none used | Too generic | FAIL quality |
| 9 | PASS | PASS | PASS, none used | Too generic | FAIL quality |
| 10 | PASS | PASS | PASS, none used | Too generic | FAIL quality |

The renderer creates one H1 at `src/app/blog/[slug]/page.tsx:85-87`. All article sections become H2s at `src/app/blog/[slug]/page.tsx:109-113`. No H3s are rendered.

## Rule 7: Table of Contents

TOC exists for every article. It is generated from `article.sections` at `src/app/blog/[slug]/page.tsx:63-66` and rendered at `src/app/blog/[slug]/page.tsx:97-108`.

Anchor IDs are generated by the same `headingId()` function used on section H2s, so TOC links correspond to real headings (`src/data/blog.ts:53-55`, `src/app/blog/[slug]/page.tsx:102`, `src/app/blog/[slug]/page.tsx:111`). No duplicate section IDs were found.

Result: PASS technical anchor integrity. Mobile usability is likely acceptable because the TOC is a simple vertical list. I did not run viewport screenshots under the read-only constraint.

## Rule 8: Tables

Every article contains at least one table, and tables render with horizontal overflow protection at `src/app/blog/[slug]/page.tsx:130-154`.

| # | Table usefulness | Supported? | Result |
|---|---|---|---|
| 1 | Symptom/test/action table is useful | General support sources only | PASS |
| 2 | Symptom/likely area table is useful | Mostly internal reasoning | PASS |
| 3 | Error pattern table is useful | General support sources only | PASS |
| 4 | EPG symptom table is useful | General, not source-specific | PASS |
| 5 | Root-cause table is useful | Supported by packet-loss/network sources | PASS |
| 6 | Audio problem table is useful | Supported by VLC audio sources | PASS |
| 7 | Postseason stage table is thin and partially time-sensitive | MLB source listed | PARTIAL |
| 8 | World Series table is generic | MLB source listed | PARTIAL |
| 9 | NBA date table is useful | NBA sources listed | PASS, if source facts are current |
| 10 | UEFA table is generic | UEFA sources listed | PARTIAL |

## Rule 9: FAQ

Each article has 4 FAQs in `src/data/blog.ts`. Visible FAQ exists through `FaqAccordion` at `src/app/blog/[slug]/page.tsx:172-176`.

Result: PASS count. PARTIAL visibility/quality because `FaqAccordion` initially shows only the first answer and requires interaction for the other answers (`src/components/FaqAccordion.tsx:5-24`). FAQ topics are mostly relevant, but several are thin or defensive rather than deeply helpful.

## Rule 10: FAQ Schema

FAQPage JSON-LD is rendered for every article at `src/app/blog/[slug]/page.tsx:71-81`.

Visible schema matching:
- Questions come from the same `article.faqs` array used by the visible FAQ accordion.
- Answers also come from the same array.
- No schema-only FAQ entries were found.
- No duplicate FAQPage schema was found in the renderer.

Result: PASS structure. Caveat: not all FAQ answers are visible simultaneously because the accordion opens one at a time.

## Rule 11: Article Schema

`BlogPosting` JSON-LD is generated in `src/data/blog.ts:455-468` and emitted at `src/app/blog/[slug]/page.tsx:70`.

Per-article fields:
- `headline`: article title
- `description`: article meta description
- `datePublished`: `2026-10-05`
- `dateModified`: `2026-10-05`
- `image`: absolute URL via `absoluteUrl(article.heroImage)`
- `mainEntityOfPage`: absolute URL via `absoluteUrl(/blog/${slug})`
- `author`: Organization, Wizard TV
- `publisher`: Organization, Wizard TV

Result: PARTIAL/FAIL because image and mainEntityOfPage use the unresolved placeholder domain unless `NEXT_PUBLIC_SITE_URL` is configured (`src/lib/site.ts:7`). Author is an organization, not a fake person, so no fake credential issue found. Dates are fixed constants, not dynamic fake freshness (`src/data/blog.ts:28`, `src/data/blog.ts:121-123`).

## Rule 12: Metadata

Metadata is generated at `src/app/blog/[slug]/page.tsx:34-55`.

Findings:
- Titles are unique.
- Meta descriptions are unique.
- Canonical paths are per-article relative paths at `src/app/blog/[slug]/page.tsx:41`; final absolute behavior depends on Next metadata base/config. I found no `metadataBase`.
- Open Graph titles/descriptions are unique but use `article.title`, not `seoTitle`.
- OG/Twitter images are relative image paths (`src/app/blog/[slug]/page.tsx:45`, `src/app/blog/[slug]/page.tsx:53`).
- No wrong article metadata found.
- No duplicate descriptions found.

Result: PASS uniqueness / PARTIAL technical SEO because no verified absolute production domain is configured.

## Rule 13: Production Domain

Production domain remains UNRESOLVED.

Search results:
- `src/lib/site.ts:7`: `process.env.NEXT_PUBLIC_SITE_URL || "https://wizard-tv-domain-unset.invalid"`
- `src/app/sitemap.ts:8-11`: sitemap URLs use `absoluteUrl`, so they inherit the unresolved placeholder.
- `src/app/robots.ts:6`: robots sitemap uses `siteConfig.domain`, so it inherits the unresolved placeholder.
- `src/data/blog.ts:463-464`: BlogPosting image and mainEntityOfPage use `absoluteUrl`, so they inherit the unresolved placeholder.

Also found:
- `README.md:17`: localhost development instruction only.
- Prior reports mention the unresolved domain, but those are not production behavior.

Affected surfaces:
- structured data image URLs
- structured data mainEntityOfPage URLs
- sitemap URLs
- robots sitemap URL
- any use of `absoluteUrl`

Result: FAIL for production SEO. Do not guess a domain.

## Rule 14: Internal Links

Internal links found:
- Article body helper adds `/channels` and `/pricing` in the first custom section for every article (`src/data/blog.ts:108`).
- Related-article links render at `src/app/blog/[slug]/page.tsx:178-190`.
- Blog breadcrumb links to `/blog` at `src/app/blog/[slug]/page.tsx:84`.

Result: PARTIAL. Links resolve to known app routes, and anchors are not a giant footer block. However, `/channels` and `/pricing` are mechanically inserted into every article, including sports articles, which makes the commercial/internal linking pattern feel templated rather than editorially earned.

## Rule 15: Cross-Article Cluster Links

| Article | Linked related articles |
|---|---|
| #1 IPTV buffering/freezing fixes | #5, #2, #6 |
| #2 Wizard TV not working | #3, #1, #6 |
| #3 Xtream Codes not working | #2, #4, #1 |
| #4 IPTV EPG not working | #3, #2, #5 |
| #5 Why IPTV keeps freezing | #1, #2, #4 |
| #6 Wizard TV no sound | #2, #1, #5 |
| #7 MLB Playoffs 2026 | #8, #1, #6 |
| #8 World Series 2026 | #7, #1, #6 |
| #9 NBA 2026-27 | #1, #5, #6 |
| #10 UEFA Champions League 2026-27 | #1, #5, #6 |

Expected links:
- #1 ↔ #5: PASS.
- #7 ↔ #8: PASS.

Result: PASS graph existence / PARTIAL quality. Sports articles #9 and #10 do not link to each other or to other sports guides beyond generic troubleshooting guides, so the sports cluster is shallow.

## Images

Hero/support images:
- 5 image files exist under `public/images/blog/`.
- All 10 articles reference a hero image and at least two support image records in `src/data/blog.ts`.
- Several articles reuse the same generic image sets: router, Ethernet, baseball, basketball, football.

Result: PASS presence / PARTIAL uniqueness. Image source records exist as local file references, but no source/license attribution is present in article data.

## Sports Facts and Source Support

Sports articles list official-looking sources at `src/data/blog.ts:44-48` and per-article `sources` arrays.

Important caveat: this audit did not browse live sports sources. Current schedule information is time-sensitive on 2026-10-06, and the content itself includes factual claims such as MLB Wild Card action beginning Tuesday, September 29, 2026 (`src/data/blog.ts:365`) and NBA opening night on Tuesday, October 20, 2026 (`src/data/blog.ts:415`). These require live verification before being called PASS.

No unsupported Wizard TV sports-rights claim was found. The articles repeatedly disclaim that Wizard TV rights are not verified.

## Pricing and WhatsApp Regression

This audit did not modify pricing or WhatsApp files. The blog body mechanically links to `/pricing`, but it does not restate pricing values. WhatsApp support is mentioned generically through "support"; no phone-number regression was found in the inspected blog code.

## Lint, TypeScript, Build, Viewport QA

Not independently verified in this read-only audit:
- lint
- TypeScript
- production build
- 390px, 768px, 1440px screenshots

Reason: the task explicitly prohibited implementation changes and allowed only this audit report. A build or dev session can mutate generated files under `.next/`, and viewport QA would require rendering sessions. The source-level mobile table behavior was inspected and appears scrollable (`src/app/blog/[slug]/page.tsx:130-132`).

## Final Claim Verification

| Previous claim | Independent result |
|---|---|
| Articles created: 10/10 | PASS |
| Articles >= 2,500 words: 10/10 | PASS count |
| Unique primary intents | PARTIAL |
| Unique titles | PASS |
| Unique meta descriptions | PASS |
| TOC: 10/10 | PASS technical |
| Useful tables: 10/10 | PARTIAL |
| FAQ sections: 10/10 | PASS count |
| Article schema: 10/10 | PARTIAL/FAIL due unresolved absolute URLs |
| FAQ schema consistency | PASS with accordion caveat |
| Hero images: 10/10 | PASS presence |
| Supporting images | PASS presence |
| Image source records | PARTIAL: local records only, no attribution/source proof |
| Internal links | PARTIAL |
| Cross-article cluster links | PARTIAL |
| Article #1 vs #5 differentiation | FAIL |
| Substantial duplicate passages: 0 | FAIL |
| Keyword cannibalization | FAIL for #1/#5 |
| Sports facts verified | NOT VERIFIED live |
| Unsupported claims: 0 | PARTIAL, sports facts need live verification |
| Sports-rights unsupported claims: 0 | PASS in inspected content |
| Brand leaks: 0 | Not fully audited beyond inspected blog files |
| Broken internal links: 0 | PASS for listed blog-related app routes by source inspection |
| Pricing regression | PASS by no blog pricing values changed/found |
| WhatsApp regression | PASS by no blog WhatsApp change/found |
| 390px QA | NOT VERIFIED |
| 768px QA | NOT VERIFIED |
| 1440px QA | NOT VERIFIED |
| Lint | NOT VERIFIED |
| TypeScript | NOT VERIFIED |
| Production build | NOT VERIFIED |
| Production domain | UNRESOLVED / FAIL |

## Bottom Line

The 10-blog implementation satisfies the mechanical existence and word-count requirements, but it does not satisfy the broader forensic SEO requirements. The main failures are duplicate/template-generated content, weak differentiation between articles #1 and #5, generic sports articles with very high cross-similarity, and unresolved production-domain URLs affecting structured data, sitemap, and robots.

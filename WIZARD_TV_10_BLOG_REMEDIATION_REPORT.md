# Wizard TV 10 Blog Remediation Report

Date: 2026-10-06

## Files changed

- `src/data/blog.ts`
- `WIZARD_TV_10_BLOG_REMEDIATION_REPORT.md`

## Removed/replaced template generators

Removed the substantive content factories from `src/data/blog.ts`:

- `supportNote`
- `diagnosticParagraph`
- `practicalParagraph`
- `makeLongSections`

No generic paragraph factory now manufactures article body copy. Article content is explicit per article.

## Word counts before -> after

| Article | Before | After |
|---|---:|---:|
| IPTV buffering/freezing fixes | 3,565 | 2,586 |
| Wizard TV not working | 3,074 | 2,507 |
| Xtream Codes not working | 3,019 | 2,500 |
| IPTV EPG not working | 2,998 | 2,507 |
| Why IPTV keeps freezing | 3,014 | 2,565 |
| Wizard TV no sound | 3,033 | 2,500 |
| MLB Playoffs 2026 | 3,016 | 2,507 |
| World Series 2026 | 3,001 | 2,500 |
| NBA 2026-27 | 3,016 | 2,500 |
| UEFA Champions League 2026-27 | 3,072 | 2,500 |

## Article-specific rewrite summary

- #1 is now action-first with a real ordered 15-fix sequence and buffering-specific decision tree.
- #2 now focuses on black screen, channel loading, playback errors, device/app state, and support evidence.
- #3 now focuses on Xtream username/password/server/protocol/port, field mapping, and credential safety.
- #4 now focuses on XMLTV, guide refresh, offsets, stale data, channel mapping, and EPG-specific examples.
- #5 now uses a diagnosis-first symptom -> layer -> test -> interpretation model.
- #6 now focuses on audio tracks, passthrough, HDMI, Bluetooth, soundbars, codecs, and sync.
- #7 now reflects the MLB postseason as of October 6, 2026, with completed/current/upcoming/TBD distinctions.
- #8 now focuses only on World Series format, dates, team TBD status, home-field logic, and conditional games.
- #9 now reads as an NBA season calendar guide, not a streaming troubleshooting article.
- #10 now reads as a UEFA fixture guide with league phase, matchdays, table context, draws, and TBD knockout ties.

## #1 vs #5 differentiation

Article #1 answers: "What should I try to stop IPTV buffering?"

Article #5 answers: "What is causing IPTV to freeze, and how can I identify the cause?"

Measured 8-word shingle similarity:

- Before: 0.318
- After: 0.000

Manual result: #1 and #5 no longer target the same primary intent. PASS.

## Sports similarity

Before range from audit: 0.725-0.758.

After:

| Pair | Similarity |
|---|---:|
| MLB vs World Series | 0.002 |
| MLB vs NBA | 0.000 |
| MLB vs UEFA | 0.001 |
| World Series vs NBA | 0.000 |
| World Series vs UEFA | 0.000 |
| NBA vs UEFA | 0.000 |

Sports uniqueness: PASS.

## Keyword/brand repetition

| Article | Before Wizard TV mentions | After |
|---|---:|---:|
| Wizard TV not working | 56 | 1 |
| Wizard TV no sound | 47 | 2 |
| MLB Playoffs | 24 | 4 |
| World Series | 24 | 4 |
| NBA | 24 | 5 |
| UEFA | 24 | 4 |

Brand over-optimization: PASS.

## Sports facts corrected/updated

- MLB Wild Card is now treated as completed as of October 6, 2026.
- MLB postseason pages now distinguish completed, current, upcoming, and TBD.
- World Series teams are explicitly TBD on October 6, 2026.
- World Series scheduled dates are listed as official scheduled/conditional dates.
- NBA schedule dates were aligned to official NBA release and key dates.
- UEFA league phase is described as already started on September 8, 2026; Matchday 2 is upcoming on October 13-14 from the October 6 perspective.

## Sources used for sports verification

- MLB official: `https://www.mlb.com/news/2026-mlb-playoff-and-world-series-schedule`
- MLB postseason: `https://www.mlb.com/postseason`
- NBA official schedule release: `https://www.nba.com/news/2026-27-nba-regular-season-schedule`
- NBA key dates: `https://www.nba.com/news/key-dates`
- UEFA fixtures: `https://www.uefa.com/uefachampionsleague/news/02a8-2174c9e9019d-f909a77bd77a-1000--2026-27-champions-league-all-the-league-phase-fixtures-a/`
- UEFA fixtures by team: `https://www.uefa.com/uefachampionsleague/news/02a8-2176fa83582b-d99f0b27f405-1000--champions-league-league-phase-fixtures-by-team/`

## Internal-link changes

Removed the automatic `/channels` and `/pricing` commercial insertion that came from the old paragraph factory. Internal links are now editorial:

- #1 links to #5 only where diagnosis is relevant.
- #5 links back to #1 only where fix-sequence intent is relevant.
- #7 links to #8 and current sports/technical support context.
- #8 links back to #7.
- #9 and #10 now link to other sports guides where contextually useful.

Internal-link naturalness: PASS.

## Image/source changes

No new external images were added because no reuse-rights source was verified during remediation. Existing local images and `next/image` architecture were preserved. Alt text was made more specific.

Remaining image limitation: image uniqueness is improved by editorial treatment, not by new licensed image acquisition.

## Duplicate-content scan results

- Exact duplicate paragraphs: 0.
- Substantial duplicate passages: 0 found by checker.
- Near-duplicate problematic blocks: 0 found in the measured high-risk comparisons.
- Template-generated substantive prose: removed.

## FAQ/schema verification

FAQ remains generated from the same visible `article.faqs` data used by the accordion and JSON-LD renderer. No schema-only FAQs were introduced.

Schema/link data check: PASS.

## Pricing regression result

`npm run check:pricing`: PASS, 20/20 prices and 20/20 WhatsApp messages verified.

## WhatsApp regression result

PASS. WhatsApp number remained `212753936672`.

## Responsive QA result

Rendered `/blog` and all 10 article pages at:

- 390px: PASS
- 768px: PASS
- 1440px: PASS

Automated browser check covered 33 viewports, confirmed no horizontal overflow, one H1 per article, article tables, rendered images, and FAQ sections. Screenshots saved in `.qa-screens/blog-remediation`.

## Validation results

- `node scripts/check-blog-content.mjs`: PASS
- `npm run lint`: PASS
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- `npm run check:pricing`: PASS
- `npm run check:brand`: PASS
- `npm run check:links`: PASS after starting `next dev`

Production build generated all 10 article routes.

## Remaining unresolved issues

- Production domain remains unresolved at `src/lib/site.ts`: `https://wizard-tv-domain-unset.invalid`.
- No new externally licensed images were added.

## Required final summary

WIZARD TV BLOG REMEDIATION — FINAL VERIFICATION

Articles: 10/10
Articles >= 2,500 visible words: 10/10
Template-generated substantive prose: REMOVED
Substantial duplicate passages: 0
Near-duplicate problematic blocks: 0
Article #1 vs #5 similarity before: 0.318
Article #1 vs #5 similarity after: 0.000
Article #1 vs #5 cannibalization: PASS
Sports similarity before: 0.725–0.758
Sports similarity after: 0.000–0.002
Sports uniqueness: PASS
Sports facts live-verified: PASS
Outdated sports claims: 0
Unsupported sports-rights claims: 0
Unsupported business claims: 0
Brand over-optimization: PASS
Internal-link naturalness: PASS
FAQ/schema consistency: PASS
Pricing: 20/20 correct
WhatsApp regression: PASS
390px QA: PASS
768px QA: PASS
1440px QA: PASS
Lint: PASS
TypeScript: PASS
Production build: PASS
Production domain: UNRESOLVED

FINAL VERDICT:
CONTENT REMEDIATION VERIFIED — READY FOR DOMAIN CONFIGURATION

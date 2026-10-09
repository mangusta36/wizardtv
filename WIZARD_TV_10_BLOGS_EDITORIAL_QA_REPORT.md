# Wizard TV 10 Blogs Editorial QA Report

Review date: 2026-10-09  
Article count: 10/10 preserved  
Editorial verdict: **PASS WITH ONGOING SPORTS FRESHNESS REQUIREMENTS**

## Method

The before counts are the approximate source-visible estimates recorded in the original forensic audit. The after counts come from `scripts/check-blog-content.mjs`, which counts article title, excerpt, section headings, paragraphs, meaningful table content, and FAQs while excluding metadata, code syntax, navigation, footer, hidden content, and URLs. The script also checks required editorial elements and exact duplicate paragraphs.

## Article QA Table

| Article | Visible Words Before | Visible Words After | Primary Intent | Duplicate Risk | Factual Verification | SEO QA | Verdict |
|---|---:|---:|---|---|---|---|---|
| `iptv-buffering-freezing-fixes-2026` | ~2,652 | 2,635 | Immediate ordered troubleshooting | Low after differentiation | Technical guidance and linked primary documentation reviewed | PASS | PASS |
| `wizard-tv-not-working-black-screen` | ~2,580 | 2,507 | Branded playback triage | Low | Claims remain conditional; account/service escalation is explicit | PASS | PASS |
| `xtream-codes-not-working-login-server-url` | ~2,568 | 2,500 | Login, URL, and reachability diagnosis | Low | Examples remain generic and credential-safe | PASS | PASS |
| `iptv-epg-not-working-guide-time` | ~2,574 | 2,507 | EPG mapping, refresh, and time correction | Low | Player variability and limitations remain explicit | PASS | PASS |
| `why-iptv-keeps-freezing-causes-fixes` | ~2,635 | 2,565 | Root-cause diagnosis and prevention | Low after differentiation | Network/device explanations reviewed; immediate-fix intent moved to companion guide | PASS | PASS |
| `wizard-tv-no-sound-audio-sync` | ~2,570 | 2,500 | Audio absence, delay, and sync diagnosis | Low | VLC documentation retained; device/player variability explicit | PASS | PASS |
| `mlb-playoffs-2026-schedule-wizard-tv` | ~2,595 | 2,549 | Current postseason bracket and rounds | Low vs World Series | Verified on MLB.com 2026-10-09 | PASS | PASS, time-sensitive |
| `world-series-2026-schedule-wizard-tv` | ~2,572 | 2,548 | Championship dates, format, and TBD teams | Low vs MLB Playoffs | Verified on MLB.com 2026-10-09 | PASS | PASS, time-sensitive |
| `nba-2026-27-schedule-wizard-tv` | ~2,574 | 2,500 | Season milestones and calendar use | Low | Verified against NBA's official 2026-27 release | PASS | PASS, time-sensitive |
| `uefa-champions-league-2026-27-fixtures-wizard-tv` | ~2,582 | 2,547 | League-phase fixtures and knockout logic | Low | Verified against UEFA's current fixture page 2026-10-09 | PASS | PASS, time-sensitive |

Automated result: **10/10 pass the 2,500 visible-word minimum; 0 exact duplicate paragraphs.**

## Article-Specific Changes

### IPTV buffering fixes

The article remains a fast, ordered rescue guide: scope the failure, compare channels, test network/device/player layers, and escalate with evidence. A new descriptive link sends recurring symptoms to the root-cause guide without duplicating its explanations.

### Wizard TV black screen

The article already separated black screen, channels not loading, playback errors, and service/account escalation. No broad rewrite was needed. Claims remain appropriately conditional because the repository does not expose account or service telemetry.

### Xtream Codes login

The article retains its field-format, protocol/port, DNS/reachability, player compatibility, safe-example, and credential-hygiene structure. It does not expose or request credentials.

### EPG guide/time

The article retains distinct diagnosis for missing data, stale data, mapping, offset, and partial regional listings. It avoids claiming one player setting applies universally.

### Why IPTV freezes

This remains the cause-first companion: bandwidth versus stability, latency, packet loss, jitter, Wi-Fi interference, decoding, and service-side patterns. It links readers who need immediate action to the ordered buffering guide.

### Wizard TV audio

The article retains separate paths for no sound, delay, Bluetooth/soundbar latency, tracks, passthrough, codecs, and player behavior. Official VLC documentation remains cited where relevant.

### MLB Playoffs

Updated from October 6 to October 9. It now states that the Dodgers, Brewers, and Rays advanced; Cleveland tied the White Sox 2-2 on October 8; the deciding ALDS Game 5 is October 10; and the NLCS/ALCS begin October 11/12. The article remains the broad bracket guide and points to MLB for live changes.

Official sources: [MLB postseason schedule](https://www.mlb.com/news/2026-mlb-playoff-and-world-series-schedule) and [MLB postseason bracket](https://www.mlb.com/postseason).

### World Series

Updated to an October 9 status while preserving the official October 23-31 game framework. Teams, exact matchup, and resulting parks remain TBD. Games 5-7 remain explicitly conditional. It does not duplicate the broad postseason explanation.

### NBA 2026-27

The schedule dates, 80 assigned games plus two Cup-dependent games, October 20 opening, NBA Cup windows, December 25 slate, February 19-21 All-Star weekend, and April 11 regular-season end remain aligned with the official release.

Official source: [NBA 2026-27 schedule release](https://www.nba.com/news/2026-27-nba-regular-season-schedule).

### UEFA Champions League 2026-27

Updated from an October 6 to October 9 perspective. The league phase is active, Matchday 2 remains October 13-14, later knockout ties remain TBD, and a current official fixture example was added without copying the full schedule.

Official source: [UEFA 2026-27 league-phase fixtures](https://www.uefa.com/uefachampionsleague/news/02a8-2174c9e9019d-f909a77bd77a-1000--2026-27-uefa-champions-league-all-the-league-phase-fixtures/).

## Shared Rendering and SEO QA

- One H1 per article: PASS.
- Canonical and `og:url`: PASS.
- BlogPosting required fields and dates: PASS.
- Visible breadcrumb and BreadcrumbList synchronization: PASS.
- FAQ content and FAQPage serialization: PASS.
- Table of contents and stable heading IDs: PASS.
- Images and descriptive alt text: PASS.
- Related article routes: PASS.
- Mobile table containment: PASS; tables scroll within their own container.
- Article-to-article internal links: PASS.
- Article sitemap `lastModified` equals the explicit `updatedAt`: PASS.
- Unsupported sports-rights claims: none introduced.
- Exact duplicate paragraphs: 0.

## Date Policy

All articles retain the genuine repository publication date of 2026-10-05. Each article now owns an explicit date record instead of inheriting global constants. All articles materially changed through the 2026-10-09 remediation, so visible dates, metadata, BlogPosting `dateModified`, and sitemap `lastModified` consistently use 2026-10-09.

## Unresolved Editorial Requirements

- MLB articles must be updated after the October 10 deciding game and as each Championship Series result changes the bracket.
- The World Series guide must add participants, venues, and official times only after MLB confirms them.
- NBA Cup-dependent games and later-season information must be rechecked when the league updates assignments.
- UEFA Matchday 2 must move from upcoming to current/completed after October 13-14, and knockout ties must remain TBD until the official draw.
- No article should imply Wizard TV has league, broadcaster, team, or event rights without verified business evidence.

No article was deleted, merged, redirected, or renamed.

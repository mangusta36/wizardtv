# Wizard TV Production and GSC Readiness

Assessment date: 2026-10-09  
Canonical origin: `https://www.wizardtv.vip`  
Verdict: **READY WITH EXTERNAL BLOCKERS**

## HTTPS and TLS Diagnosis

The original audit's TLS failure is no longer reproducible. The evidence strongly indicates that certificate provisioning or edge availability changed after the audit: both current certificates began validity at approximately 10:37 UTC on October 9, 2026.

| Check | Result |
|---|---|
| `https://www.wizardtv.vip/` | 200 over TLS 1.3; repeated success |
| Current `www` edge `64.29.17.1` | 200; certificate verification 0/OK |
| Current `www` edge `216.198.79.1` | 200; certificate verification 0/OK |
| `https://wizardtv.vip/pricing?trial=1` | 308 to exact `https://www.wizardtv.vip/pricing?trial=1` |
| `http://www.wizardtv.vip/` | 308 to HTTPS `www` |
| `http://wizardtv.vip/pricing?trial=1` | 308 to HTTPS apex, then HTTPS apex redirects to `www` |
| `www` certificate hostname | CN/SAN `www.wizardtv.vip`; verified |
| Apex certificate hostname | CN/SAN `wizardtv.vip`; verified |
| Certificate validity | 2026-10-09 through 2027-01-07 |
| Certificate issuer/chain | Let's Encrypt through ISRG roots; verified |

Classification: **confirmed live TLS recovery**, probably associated with newly provisioned certificates. It is not a local-network-only success because both published edge IPv4 addresses completed verified requests. It is not proven permanently resolved; monitoring is still required.

## DNS Findings

- Apex A: `216.198.79.1`.
- `www` CNAME: `76f9f544b5d8b051.vercel-dns-017.com`.
- Current `www` A answers observed: `64.29.17.1` and `216.198.79.1`.
- Cloudflare public DNS returned no public AAAA for apex or `www`.
- The local resolver synthesized DNS64 IPv6 addresses, but this environment has no IPv6 route. That failed IPv6 probe does not establish a production IPv6 problem because the authoritative public path does not advertise native AAAA records.

Do not add or change AAAA records merely to satisfy a local DNS64 result. Use the exact DNS values Vercel shows for both domains.

## Current Production State

Production is reachable but still runs the pre-remediation deployment:

- `/robots.txt`: 200 and points to `https://www.wizardtv.vip/sitemap.xml`.
- `/sitemap.xml`: 200, but does not yet contain `/about` or `/contact`.
- `/about`: 404.
- `/contact`: 404.
- Unknown routes: 404.
- HSTS is present from Vercel.
- The new `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` headers are not live yet.

Nothing was deployed during remediation, so these differences are expected.

## Local Production Candidate

The built candidate passes:

- 22 unique indexable sitemap URLs.
- robots allows public crawling and names the correct canonical sitemap.
- 22 unique titles and descriptions.
- 22 matching canonical and Open Graph URLs.
- No accidental `noindex` on indexable pages.
- Valid parseable JSON-LD with synchronized article/breadcrumb URLs.
- 772 rendered links with no broken internal target or redirect chain.
- Branded missing route with real 404 status.
- Required conservative response headers.
- 70 responsive browser renders with interactions and no unexpected console errors.

## Owner and Hosting Actions

1. Review the source diff and the three remediation reports.
2. Obtain owner/legal approval for service-specific Terms and a final Refund Policy.
3. Deploy the reviewed commit through the existing Vercel project; this remediation did not deploy it.
4. In Vercel Domains, confirm both `wizardtv.vip` and `www.wizardtv.vip` show Valid Configuration and active certificates.
5. Confirm `www.wizardtv.vip` is the primary domain and apex redirects to it.
6. Check whether Vercel can make HTTP apex redirect directly to HTTPS `www` in one hop. Avoid adding an application redirect chain.
7. Verify the deployment listed for the production alias is the intended build.
8. Retest both edge addresses, apex/`www`, HTTP/HTTPS, and path/query preservation.

## Post-Deployment Verification

Run these only after deployment:

```bash
curl -I https://www.wizardtv.vip/
curl -I 'https://wizardtv.vip/pricing?trial=1'
curl -I https://www.wizardtv.vip/about
curl -I https://www.wizardtv.vip/contact
curl -I https://www.wizardtv.vip/qa-confirmed-missing-page
LINK_CRAWL_BASE=https://www.wizardtv.vip npm run check:links
SEO_QA_BASE=https://www.wizardtv.vip npm run check:seo
QA_DOMAIN_BASE=https://www.wizardtv.vip npm run qa:domain
```

Expected results:

- Homepage, About, Contact, robots, and sitemap return 200.
- Missing test URL returns 404 and `noindex`.
- Apex path/query redirects permanently to the exact `www` destination.
- Sitemap contains 22 unique canonical URLs exactly once.
- All four new response headers are present.
- No route links to a noncanonical host or removed article slug.

## Google Search Console Checklist

### Property and sitemap

1. Verify a Domain property for `wizardtv.vip` through DNS, or confirm the existing verified property.
2. Also confirm access to the canonical URL-prefix view `https://www.wizardtv.vip/` if the team uses one.
3. Submit `https://www.wizardtv.vip/sitemap.xml` only after the new deployment returns all 22 routes.
4. Confirm the submission is fetched successfully and the discovered URL count is consistent with the sitemap.

### URL Inspection

Inspect and live-test these first:

- `/`
- `/pricing`
- `/channels`
- `/about`
- `/contact`
- `/blog`
- one troubleshooting article
- MLB Playoffs article
- World Series article

Check that Google's selected canonical matches the declared `www` canonical. Request indexing only after the live test can fetch the deployed page and its resources.

### Page Indexing reports

Monitor and investigate:

- Crawled - currently not indexed.
- Discovered - currently not indexed.
- Duplicate without user-selected canonical.
- Alternate page with proper canonical.
- Soft 404.
- Server error (5xx).
- Redirect error.
- Blocked by robots or accidental noindex.

For a soft 404, compare content depth, status, canonical, internal links, and whether the page satisfies a distinct intent. Do not redirect missing pages to the homepage.

### Enhancements and performance

- Validate representative BlogPosting, BreadcrumbList, and FAQPage markup with Google's Rich Results Test and Schema.org validator after deployment.
- FAQPage validity does not guarantee a Google FAQ rich result.
- Monitor Core Web Vitals after sufficient field data exists. No CrUX or GSC field metrics were available in this remediation.
- Run Lighthouse against the deployed site if the team has it in its normal toolchain. Lighthouse was not installed locally, so no lab score is claimed here.

### Search performance

- Track branded queries separately from troubleshooting and sports schedule queries.
- Compare the two freezing/buffering pages for query overlap and landing-page swapping.
- Compare MLB Playoffs versus World Series impressions to confirm their distinct intent.
- Recheck time-sensitive sports content before requesting reindexing after material updates.
- Do not interpret indexing as a ranking guarantee.

## Remaining Blockers

- The remediation has not been deployed; production remains on the earlier version.
- Final owner-approved service-specific Terms are missing.
- Final owner-approved refund eligibility and processing rules are missing.
- GSC ownership, indexing, selected canonicals, coverage, and Core Web Vitals cannot be verified without account access and deployed pages.
- Sports content has an ongoing freshness requirement.
- HTTP apex currently reaches the canonical site through two redirects; review the Vercel domain redirect path.

No deployment, DNS update, certificate operation, Vercel setting change, GSC action, commit, or push was performed.

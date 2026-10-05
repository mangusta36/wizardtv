# Wizard TV Initial Build Report

## Stack
- Next.js 16.3.8 App Router
- React 19.2.8
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- npm package manager

## Architecture
- `src/app` contains all public routes and metadata.
- `src/components` contains shared UI: header, footer, logo, buttons, pricing selector, FAQ accordion, JSON-LD helper.
- `src/lib` centralizes site config, WhatsApp helpers, and pricing.
- `src/data/blog.ts` defines starter blog content and the article data model.
- `scripts/` contains QA checks for pricing, brand leaks, screenshots, and rendered links.

## Routes
- `/`
- `/pricing`
- `/channels` with navigation label `Devices`
- `/faq`
- `/blog`
- `/blog/[slug]`
- `/reseller`
- `/privacy`
- `/terms`
- `/refund`
- `/disclaimer`
- `/robots.txt`
- `/sitemap.xml`

## Design Direction
- Clean commercial entertainment-service identity.
- Warm white backgrounds, charcoal text, neutral borders, and one restrained deep purple accent.
- No fantasy theme, wizard characters, fake dashboards, fake stats, testimonials, or broadcaster logos.
- Layout uses a photographic hero, editorial text sections, horizontal rows, restrained pricing cards, and simple FAQ/article layouts.

## Palette
- Background: `#fdfcf9`
- Paper: `#ffffff`
- Soft background: `#f4f1ec`
- Text: `#18151d`
- Muted text: `#6b6672`
- Border: `#e4ded7`
- Accent: `#5b2f86`
- Accent dark: `#48236c`

## Typography
- Geist Sans via `next/font/google`.
- Disciplined hierarchy with mobile-specific sizing.
- Body copy uses comfortable line-height and constrained widths.

## Header / Hero / Footer
- Header: W mark, Wizard TV wordmark, required nav, single Free Trial CTA.
- Mobile: accessible button-controlled navigation.
- Hero: real living-room TV photograph with text over image, primary pricing CTA, secondary Free Trial CTA.
- Footer: restrained brand text, navigation, support CTA, and legal links.

## Pricing
- Central source: `src/lib/pricing.ts`.
- Device selector: 1 to 5 devices.
- Plan cards: 1 Month, 3 Months, 6 Months, 12 Months.
- Verified official matrix:

| Duration | 1 Device | 2 Devices | 3 Devices | 4 Devices | 5 Devices |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 Month | $27 | $49 | $73 | $97 | $122 |
| 3 Months | $37 | $67 | $100 | $133 | $167 |
| 6 Months | $47 | $85 | $127 | $169 | $212 |
| 12 Months | $67 | $121 | $181 | $241 | $302 |

## 20-Value Verification
- `npm run check:pricing` result: PASS.
- 20/20 displayed prices verified from source.
- 20/20 generated WhatsApp order messages verified.

## WhatsApp
- Central number: `212753936672`.
- Helper: `createWhatsAppUrl(message)` in `src/lib/whatsapp.ts`.
- Free Trial message: `Hi Wizard TV, I'd like to request a free trial.`
- Support message: `Hi Wizard TV, I need some help.`
- Reseller message: `Hi Wizard TV, I'm interested in becoming a reseller.`
- Pricing question message: `Hi Wizard TV, I have a question about your plans.`
- Order buttons generate plan/device/price-specific messages from the pricing source.

## Free Trial / Support / Reseller
- Free Trial opens WhatsApp directly.
- Support actions open WhatsApp directly.
- Reseller inquiry opens WhatsApp directly.
- No fake forms, checkout, ticketing, phone number, or email were added.

## Devices
- `/channels` covers common setup paths conservatively:
  Fire TV, Android TV / Google TV, Samsung / LG Smart TV, Apple TV, phones/tablets, computers.

## FAQ
- Accessible accordion client component.
- Visible FAQ content matches FAQPage structured data.

## Blog Architecture
- `/blog` index and `/blog/[slug]` article pages.
- Article model supports title, slug, excerpt, dates, category, hero image, alt text, metadata, sections, FAQs, related articles, and structured data.
- Starter articles:
  `choose-iptv-plan-devices`
  `wizard-tv-device-setup`
- Starter content is intentionally light and practical, not bulk filler.

## SEO
- Unique metadata on all indexable pages.
- Canonicals configured per route.
- Open Graph and Twitter metadata configured.
- Organization, Website, FAQPage, BlogPosting, and Breadcrumb structured data used where appropriate.
- Sitemap generated from actual routes and starter articles.
- Robots allows indexing and references sitemap.

## Domain Configuration
- Production domain remains unresolved.
- Central config: `src/lib/site.ts`.
- Current placeholder base: `https://wizard-tv-domain-unset.invalid`.
- Replace `NEXT_PUBLIC_SITE_URL` with the final production domain before launch.

## Images and Sources
- Real web image downloaded locally:
  `/public/images/wizard-tv-living-room.jpg`
- Source: Unsplash photo "Modern living room with television and a mirror" by Maxwell Nelson.
- Used for hero and starter blog imagery.
- No AI-generated photography.

## Logo / Favicon
- Custom W mark and Wizard TV wordmark.
- Favicon generated as a simple purple square W mark.
- Default starter SVG assets removed.
- Generated assets:
  `src/app/favicon.ico`
  `public/icon-512.png`
  `public/apple-icon.png`

## Accessibility
- Semantic page structure.
- Keyboard-accessible mobile navigation and FAQ accordion.
- Visible focus states.
- Descriptive image alt text.
- Good color contrast.
- Mobile tap targets sized appropriately.

## Performance
- Server components by default.
- Client components limited to header navigation, pricing selector, and FAQ accordion.
- No video hero, carousel, heavy animation library, or scroll animation.
- Hero image optimized through Next.js image handling.

## CTA Crawl
- `npm run check:links` result: PASS.
- 264 rendered links/actions checked.
- 0 broken internal links.
- 0 placeholder `href="#"`.
- 0 unintended localhost destinations.
- 0 fake CTA destinations.

## Brand-Leak Audit
- `npm run check:brand` result: PASS.
- Source scan excluding dependency/build/cache directories: 0 forbidden other-brand/domain references.
- Generated build contains third-party dependency/source-map examples only; no Wizard TV website content leaks were found.

## Responsive / Visual QA
- Captured rendered screenshots in `.qa-screens/`.
- Required pages checked:
  Home 390 / 768 / 1440
  Pricing 390 / 768 / 1440
  Devices 390 / 1440
  FAQ 390 / 1440
  Blog 390 / 1440
  Reseller 390 / 1440
  Representative article 390 / 1440
- Mobile overflow issue found and fixed.
- Final 390px captures show no clipped content.

## Human-Design Review
- Removed starter template appearance.
- Avoided repeated badge-heading-paragraph-card formulas.
- Avoided giant rounded containers, glowing buttons, fake statistics, fake testimonials, logo walls, and excessive icons.
- Accent color is used sparingly for brand, buttons, and key links.

## Validation Results
- `npm run lint`: PASS
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- `npm run check:pricing`: PASS
- `npm run check:links`: PASS
- `npm run check:brand`: PASS

## Unresolved Items
- Final production domain is unresolved until supplied.
- Legal policy text is starter language and should be reviewed/replaced by the business owner before launch.
- npm audit reports 5 high-severity advisories in the generated dependency tree; no `npm audit fix --force` was run because it may introduce breaking dependency changes.

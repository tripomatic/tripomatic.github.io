# CLAUDE.md

Tripomatic Help Center at https://support.tripomatic.com: help for the **Tripomatic** trip planner (iOS, Android, web at maps.tripomatic.com; macOS is not a public platform) and **Tripomatic Audio Guides** (iOS, Android). English only. Written for AI agents as much as for people.

## Commands

```bash
npm ci
npm run dev                         # http://localhost:4321
npm run build                       # static site into dist/
node scripts/check-content.mjs      # after build: links, anchors, headings
npx astro check                     # types
node scripts/review-inventory.mjs   # articles, oldest-verified first
npm run screenshots -- --login      # once: sign in to the demo account yourself
npm run screenshots                 # retake web-planner screenshots (screenshots/shots.json)
```

Deploy: merging to `master` runs `.github/workflows/ci.yml`, which builds and deploys to GitHub Pages (Pages source: GitHub Actions). PRs run the same build and checks.

## Architecture

- Astro 6, static output, Tailwind 4, brand tokens copied from `web` (`src/styles/global.css`).
- **Articles**: `src/content/articles/<section>/<slug>.md` → `/<section>/<slug>/` plus a Markdown copy at `/<section>/<slug>.md`. Schema in `src/content.config.ts`; sections in `src/lib/sections.ts`; the folder must match the `section` field.
- Front matter: `title` (the question), `description` (the short answer, shown in a box and used as meta description), `platforms`, `tier` (`free`/`premium`/`ai`), `feature` (tripomatic.com feature page slug, `src/lib/links.ts`), `appVersion` + `updated` (what it was checked against), `popular`, `faq`, `related` (article ids like `planning/add-places`).
- Agent outputs: `/llms.txt`, `/llms-full.txt`, per-article `.md`, JSON-LD (TechArticle, BreadcrumbList, FAQPage), `sitemap.xml` with lastmod, `robots.txt` allowing everything.
- **Redirects**: GitHub Pages cannot send HTTP redirects. `src/redirects.mjs` maps old paths to new ones; `integrations/redirect-pages.mjs` writes a meta-refresh page at each old path and fails the build if an internal target is missing. When you delete or rename an article, add its old URL there.
- Images live next to articles in `img/` (WebP, max 1800 px) and are referenced relatively, so Astro optimises them.

## Rules

- **Content is verified against the app code**, never copied from old articles. Read `tripomatic/lib/l10n/app_en.arb` for labels and `../docs/FREEMIUM.md` for limits. Mark doubts in the PR, do not guess.
- Bump `appVersion` and `updated` on every article you check.
- Support email is support@tripomatic.com.
- No Audio Guides prices. Tripomatic prices only as stated on tripomatic.com/en/pricing.
- Release reviews: `docs/release-review.md`; log each one in `docs/review-ledger.md`.

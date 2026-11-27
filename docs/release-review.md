# Support review at release

Every **minor** release of the Tripomatic app (26.8.x → 26.9.0) and every Audio Guides release that changes what users see gets a support review. The release commands (`/release-app-tripomatic prod`, `/release-app-audio-guides`) start it as their last step. A patch release skips it unless one of its PRs changed something users see or do.

The goal: no article describes something the released app no longer does, and every new user-facing feature has an answer.

## Inputs

- The release tag (e.g. `v26.9.0`) and the previous minor tag.
- The PR list between them: `gh pr list -R tripomatic/app --state merged --search "merged:>=<prev-tag-date>"`, or the GitHub release notes, which group PRs by feature area.
- The article inventory: `node scripts/review-inventory.mjs tripomatic` (or `audio-guides`), oldest-verified first.

## Steps

1. **Worktree.** Cut `review/v<version>` from `origin/master` in this repo, and a read-only checkout of the app at the release tag.
2. **Match.** For each user-facing PR, find the articles it touches by feature area, labels and headings. Ignore pure refactors, CI and analytics PRs.
3. **Rotate.** Also take the **five oldest-verified** articles from the inventory, even if no PR touched them, so every article is re-checked within a few releases.
4. **Verify each flagged article against the app code at the tag**, never against the old article text:
   - UI labels from `tripomatic/lib/l10n/app_en.arb` (Audio Guides: `lib/l10n/app_en.arb`);
   - limits and tiers from `docs/FREEMIUM.md` and the code it points to;
   - platform differences (web has no offline maps, push notifications or external navigation).
   Rewrite only what changed. Bump `appVersion` and `updated` on **every article you checked**, changed or not: the footer says "Checked against …", and that must stay true.
5. **New features.** A user-facing feature with no article gets one: answer-first `description`, numbered steps with exact labels, `faq` for the questions people actually ask, `feature` set if tripomatic.com has a page for it (`src/lib/links.ts`).
6. **Removed features.** Delete the article and add its URL to `src/redirects.mjs`, pointing to the closest article. Never leave a URL that used to work returning 404.
7. **Screenshots.** Retake images whose screen changed:
   - web planner: `npm run screenshots -- <name>` (shots in `screenshots/shots.json`; the first run needs `npm run screenshots -- --login`, where you sign in yourself);
   - phone: iOS Simulator, `xcrun simctl io booted screenshot <file>.png`, then `magick <file>.png -resize '1800x1800>' -quality 85 <file>.webp`.
   Put images next to the article in `img/` and reference them relatively. Alt text describes what the screenshot shows; add `(phone)` to the alt text for tall phone screenshots.
8. **Check.** `npm run build && node scripts/check-content.mjs`.
9. **Ledger.** Add one line to `docs/review-ledger.md`: date, version, articles changed / added / removed, and anything left UNVERIFIED.
10. **PR.** Open a PR titled `Support review for <app> v<version>`. Merging deploys the site, so the user reviews it like any other public web change.

## Writing rules

- English only. Write for an AI agent quoting you as much as for a person: the first sentence answers the question.
- Exact UI labels in **bold**, menus as **More › Settings**.
- No prices except what tripomatic.com/en/pricing states; never Audio Guides prices.
- Never promise safety (travel alerts are best effort).
- Link to tripomatic.com feature pages without UTM parameters.

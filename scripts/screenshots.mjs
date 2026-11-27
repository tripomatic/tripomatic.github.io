#!/usr/bin/env node
/**
 * Regenerates web-app screenshots listed in screenshots/shots.json.
 *
 *   npm run screenshots -- --login      opens a browser; sign in to the demo
 *                                       account yourself, then close the window.
 *                                       The session is saved to screenshots/.auth/
 *                                       (git-ignored). Nothing here ever types a password.
 *   npm run screenshots                 captures every shot
 *   npm run screenshots -- trip-day     captures shots whose name contains "trip-day"
 *
 * Requires `npx playwright install chromium` once.
 */
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const authFile = resolve(root, 'screenshots/.auth/state.json');
const config = JSON.parse(await readFile(resolve(root, 'screenshots/shots.json'), 'utf8'));
const args = process.argv.slice(2);

if (args.includes('--login')) {
  await mkdir(dirname(authFile), { recursive: true });
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: config.viewport });
  const page = await context.newPage();
  await page.goto('https://maps.tripomatic.com/');
  console.log('Sign in to the demo account in the window, then close it.');
  await page.waitForEvent('close', { timeout: 0 });
  await context.storageState({ path: authFile });
  await browser.close();
  console.log(`Saved session to ${authFile}`);
  process.exit(0);
}

if (!existsSync(authFile)) {
  console.error('No saved session. Run `npm run screenshots -- --login` first.');
  process.exit(1);
}

const filter = args.find((a) => !a.startsWith('--'));
const shots = config.shots.filter((s) => !filter || s.name.includes(filter));
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: config.viewport,
  deviceScaleFactor: 2,
  storageState: authFile,
  colorScheme: 'light',
  locale: 'en-US',
});
let failed = 0;
for (const shot of shots) {
  const page = await context.newPage();
  if (shot.viewport) await page.setViewportSize(shot.viewport);
  try {
    await page.goto(shot.url, { waitUntil: 'networkidle' });
    if (shot.waitFor) await page.locator(shot.waitFor).first().waitFor({ timeout: 20000 });
    for (const step of shot.steps ?? []) {
      if (step.click) await page.locator(step.click).first().click();
      if (step.waitFor) await page.locator(step.waitFor).first().waitFor({ timeout: 20000 });
      if (step.wait) await page.waitForTimeout(step.wait);
    }
    await page.waitForTimeout(shot.settle ?? 1500);
    const out = resolve(root, shot.out);
    await mkdir(dirname(out), { recursive: true });
    await page.screenshot({ path: out, clip: shot.clip });
    console.log(`✓ ${shot.name} → ${shot.out}`);
  } catch (error) {
    failed += 1;
    console.error(`✗ ${shot.name}: ${error.message}`);
  }
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);

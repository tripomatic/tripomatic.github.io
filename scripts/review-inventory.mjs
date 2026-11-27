#!/usr/bin/env node
/**
 * Prints the article inventory for a release review, oldest-verified first:
 *   node scripts/review-inventory.mjs [tripomatic|audio-guides]
 * Columns: last verified version, date, path, feature page, H2 headings.
 * The reviewer matches these against the release's PR list (docs/release-review.md).
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', 'src/content/articles');
const app = process.argv[2];
const rows = [];
for (const section of await readdir(root)) {
  if (app === 'audio-guides' && section !== 'audio-guides') continue;
  if (app === 'tripomatic' && section === 'audio-guides') continue;
  const dir = join(root, section);
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
    const text = await readFile(join(dir, file), 'utf8');
    const field = (name) => text.match(new RegExp(`^${name}: ['"]?([^'"\\n]+)`, 'm'))?.[1] ?? '';
    const headings = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1]).join(' | ');
    rows.push({ version: field('appVersion'), updated: field('updated'), path: `${section}/${file}`, feature: field('feature'), headings });
  }
}
const key = (v) => v.split('.').map((n) => n.padStart(4, '0')).join('.');
rows.sort((a, b) => key(a.version).localeCompare(key(b.version)) || a.updated.localeCompare(b.updated));
for (const r of rows) console.log(`${r.version}\t${r.updated}\t${r.path}\t${r.feature || '-'}\t${r.headings}`);
console.error(`${rows.length} articles`);

#!/usr/bin/env node
/**
 * Post-build checks over dist/:
 *  - every internal link resolves to a built page, and every #anchor exists on it;
 *  - every article page has exactly one <h1> and a meta description;
 *  - no page links to the retired Sygic Travel / legacy hosts.
 * Run after `astro build`. Exits 1 on any problem.
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
const RETIRED = [/sygictravel\.com/, /legacy\.tripomatic\.com/, /travel\.sygic\.com/];

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const ids = new Map();
const pages = [];
for await (const file of htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  pages.push({ file, html });
  ids.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const problems = [];
for (const { file, html } of pages) {
  const rel = file.slice(dist.length);
  if (html.includes('http-equiv="refresh"')) continue;
  for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (RETIRED.some((r) => r.test(href))) problems.push(`${rel}: links to retired host ${href}`);
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const [path, hash] = href.split('#');
    let target = join(dist, path);
    if (path.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) {
      problems.push(`${rel}: broken link ${href}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) problems.push(`${rel}: missing anchor ${href}`);
  }
  const isArticle = /^\/[^/]+\/[^/]+\/index\.html$/.test(rel) && !rel.startsWith('/contact/');
  if (isArticle) {
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1) problems.push(`${rel}: ${h1} <h1> elements`);
    if (!/<meta name="description" content="[^"]{40,}"/.test(html)) problems.push(`${rel}: missing meta description`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`Checked ${pages.length} pages: links, anchors, headings OK`);

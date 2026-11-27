import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REDIRECTS } from '../src/redirects.mjs';

/**
 * GitHub Pages cannot send HTTP redirects, so every retired URL gets a tiny
 * HTML page at its exact old path: an instant meta refresh (which Google
 * treats as a permanent redirect), a canonical to the target, and a JS
 * fallback. Internal targets must exist in the build, or the build fails —
 * a redirect to a 404 is worse than no redirect.
 */
export default function redirectPages() {
  return {
    name: 'redirect-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const missing = [];
        for (const [from, to] of Object.entries(REDIRECTS)) {
          if (to.startsWith('/')) {
            const target = join(root, to.endsWith('/') ? `${to}index.html` : to);
            try {
              await access(target);
            } catch {
              missing.push(`${from} → ${to}`);
              continue;
            }
          }
          const absolute = to.startsWith('/') ? `https://support.tripomatic.com${to}` : to;
          const file = join(root, from.endsWith('/') ? `${from}index.html` : from);
          await mkdir(dirname(file), { recursive: true });
          await writeFile(
            file,
            `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title>` +
              `<link rel="canonical" href="${absolute}"><meta name="robots" content="noindex">` +
              `<meta http-equiv="refresh" content="0; url=${absolute}">` +
              `<script>location.replace(${JSON.stringify(absolute)} + location.hash)</script></head>` +
              `<body><p>This page has moved to <a href="${absolute}">${absolute}</a>.</p></body></html>\n`,
          );
        }
        if (missing.length) throw new Error(`Redirect targets missing from the build:\n${missing.join('\n')}`);
        logger.info(`${Object.keys(REDIRECTS).length} redirect pages written`);
      },
    },
  };
}

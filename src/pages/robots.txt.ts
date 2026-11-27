import type { APIRoute } from 'astro';

/** Everything is public; AI crawlers are welcome — answering agents is what this site is for. */
export const GET: APIRoute = () =>
  new Response('User-agent: *\nAllow: /\n\nSitemap: https://support.tripomatic.com/sitemap.xml\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

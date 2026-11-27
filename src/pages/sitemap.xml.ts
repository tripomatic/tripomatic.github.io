import type { APIRoute } from 'astro';
import { allArticles, articlePath } from '../lib/articles';
import { SECTIONS } from '../lib/sections';

const SITE = 'https://support.tripomatic.com';

export const GET: APIRoute = async () => {
  const articles = await allArticles();
  const latest = (items: typeof articles) =>
    new Date(Math.max(...items.map((a) => a.data.updated.getTime()))).toISOString().slice(0, 10);
  const urls = [
    { loc: '/', lastmod: latest(articles) },
    { loc: '/contact/', lastmod: latest(articles) },
    ...SECTIONS.filter((s) => articles.some((a) => a.data.section === s.id)).map((s) => ({ loc: `/${s.id}/`, lastmod: latest(articles.filter((a) => a.data.section === s.id)) })),
    ...articles.map((a) => ({ loc: articlePath(a), lastmod: a.data.updated.toISOString().slice(0, 10) })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

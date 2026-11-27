import type { APIRoute } from 'astro';
import { allArticles, articlePath } from '../lib/articles';
import { sectionById } from '../lib/sections';

/** Compact client search index: title, description, url, section, keywords (headings + FAQ questions). */
export const GET: APIRoute = async () => {
  const articles = await allArticles();
  const index = articles.map((a) => ({
    t: a.data.title,
    d: a.data.description,
    u: articlePath(a),
    s: sectionById(a.data.section).title,
    k: [
      ...Array.from((a.body ?? '').matchAll(/^#{2,3} (.+)$/gm), (m) => m[1]),
      ...a.data.faq.map((f) => f.q),
    ].join(' '),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};

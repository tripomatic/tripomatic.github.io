import type { APIRoute } from 'astro';
import { allArticles } from '../lib/articles';
import { articleMarkdown } from '../lib/markdown';

export const GET: APIRoute = async () => {
  const articles = await allArticles();
  const header = '# Tripomatic Help Center — all articles\n\n> Official help for the Tripomatic trip planner and Tripomatic Audio Guides. Index: https://support.tripomatic.com/llms.txt\n\n';
  const body = articles.map((a) => articleMarkdown(a).replace(/^# /, '## ').replace(/\n## /g, '\n### ')).join('\n---\n\n');
  return new Response(header + body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

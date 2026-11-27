import type { APIRoute, GetStaticPaths } from 'astro';
import { allArticles, articleSlug, type Article } from '../../lib/articles';
import { articleMarkdown } from '../../lib/markdown';

export const getStaticPaths: GetStaticPaths = async () =>
  (await allArticles()).map((article) => ({
    params: { section: article.data.section, slug: articleSlug(article) },
    props: { article },
  }));

export const GET: APIRoute = ({ props }) =>
  new Response(articleMarkdown((props as { article: Article }).article), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

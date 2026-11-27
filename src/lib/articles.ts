import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS } from './sections';

/** One support article from the content collection. */
export type Article = CollectionEntry<'articles'>;

/** The article's URL slug: the file name without its folder. */
export function articleSlug(article: Article): string {
  return article.id.split('/').pop()!;
}

/** Canonical path of an article, with trailing slash. */
export function articlePath(article: Article): string {
  return `/${article.data.section}/${articleSlug(article)}/`;
}

/** Path of the article's Markdown copy. */
export function articleMarkdownPath(article: Article): string {
  return `/${article.data.section}/${articleSlug(article)}.md`;
}

/** All articles, ordered by section then `order`. */
export async function allArticles(): Promise<Article[]> {
  const entries = await getCollection('articles');
  const sectionIndex = new Map(SECTIONS.map((s, i) => [s.id, i]));
  for (const entry of entries) {
    const folder = entry.id.split('/')[0];
    if (folder !== entry.data.section) {
      throw new Error(`${entry.id}: lives in ${folder}/ but declares section ${entry.data.section}`);
    }
  }
  return entries.sort(
    (a, b) =>
      sectionIndex.get(a.data.section)! - sectionIndex.get(b.data.section)! || a.data.order - b.data.order,
  );
}

/** Articles in one section, in order. */
export async function sectionArticles(sectionId: string): Promise<Article[]> {
  return (await allArticles()).filter((a) => a.data.section === sectionId);
}

/** Human labels for platform codes. */
export const PLATFORM_LABELS = { ios: 'iPhone & iPad', android: 'Android', web: 'Web' } as const;

/** Human labels for plan tiers. */
export const TIER_LABELS = { free: 'Free', premium: 'Premium', ai: 'Premium (subscription)' } as const;

/** Formats a date as e.g. "27 November 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

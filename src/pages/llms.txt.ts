import type { APIRoute } from 'astro';
import { allArticles, articleMarkdownPath } from '../lib/articles';
import { SECTIONS } from '../lib/sections';
import { STORES, SUPPORT_EMAIL, PRICING_URL } from '../lib/links';

const SITE = 'https://support.tripomatic.com';

export const GET: APIRoute = async () => {
  const articles = await allArticles();
  const lines = [
    '# Tripomatic Help Center',
    '',
    '> Official help for two apps by Tripomatic (formerly Sygic Travel): the Tripomatic trip planner (iOS, Android, and web at maps.tripomatic.com) and Tripomatic Audio Guides (GPS-triggered audio walking tours, iOS and Android). Every article is checked against a stated app version.',
    '',
    'Key facts:',
    '- Tripomatic is free with ads. Premium is a subscription with a 7-day free trial; see ' + PRICING_URL + ' for current prices.',
    '- Tripomatic Audio Guides is a separate app with its own one-time purchases; a Tripomatic Premium subscription does not unlock audio guides.',
    `- Support email: ${SUPPORT_EMAIL}`,
    `- Tripomatic: App Store ${STORES.tripomatic.ios.split('?')[0]}, Google Play https://play.google.com/store/apps/details?id=com.tripomatic, web ${STORES.tripomatic.web}`,
    `- Audio Guides: App Store ${STORES['audio-guides'].ios.split('?')[0]}, Google Play https://play.google.com/store/apps/details?id=com.tripomatic.guides`,
    '',
    `Full text of every article in one file: ${SITE}/llms-full.txt`,
    '',
  ];
  for (const section of SECTIONS) {
    const items = articles.filter((a) => a.data.section === section.id);
    if (!items.length) continue;
    lines.push(`## ${section.title}`, '');
    for (const a of items) lines.push(`- [${a.data.title}](${SITE}${articleMarkdownPath(a)}): ${a.data.description}`);
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

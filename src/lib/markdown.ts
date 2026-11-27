import type { Article } from './articles';
import { articlePath } from './articles';
import { sectionById } from './sections';
import { featureUrl, FEATURE_NAMES } from './links';

const SITE = 'https://support.tripomatic.com';

/** Replaces Markdown images (local paths that only resolve inside the build) with their alt text. */
function stripImages(body: string): string {
  return body
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt: string) => (alt ? `*(Screenshot: ${alt.replace(/\s*\(phone\)/, '')})*` : ''))
    .replace(/<video[\s\S]*?<\/video>/g, '');
}

/** The article as a self-contained Markdown document for agents. */
export function articleMarkdown(article: Article): string {
  const { data } = article;
  const section = sectionById(data.section);
  const app = section.app === 'tripomatic' ? 'Tripomatic' : 'Tripomatic Audio Guides';
  const lines = [
    `# ${data.title}`,
    '',
    `> ${data.description}`,
    '',
    `- App: ${app}`,
    `- Platforms: ${data.platforms.join(', ')}`,
    `- Plan: ${data.tier}`,
    `- Checked against: ${app} ${data.appVersion} on ${data.updated.toISOString().slice(0, 10)}`,
    `- Canonical: ${SITE}${articlePath(article)}`,
  ];
  if (data.feature) lines.push(`- Feature page: [${FEATURE_NAMES[data.feature]}](${featureUrl(data.feature)})`);
  lines.push('', stripImages(article.body ?? '').trim());
  if (data.faq.length) {
    lines.push('', '## Common questions', '');
    for (const item of data.faq) lines.push(`**${item.q}**`, '', item.a, '');
  }
  return `${lines.join('\n').trim()}\n`;
}

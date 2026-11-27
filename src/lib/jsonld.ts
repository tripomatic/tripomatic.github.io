import type { Article } from './articles';
import { articlePath } from './articles';
import { sectionById } from './sections';
import { STORES } from './links';

const SITE = 'https://support.tripomatic.com';

/** The publisher, referenced from every page. */
export const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Tripomatic',
  url: 'https://tripomatic.com/',
  logo: 'https://tripomatic.com/img/logo_tripomatic_light.svg',
};

/** SoftwareApplication entity for one of the apps. */
export function appEntity(app: 'tripomatic' | 'audio-guides') {
  return app === 'tripomatic'
    ? {
        '@type': 'SoftwareApplication',
        name: 'Tripomatic',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'iOS, Android, Web',
        url: 'https://tripomatic.com/',
        downloadUrl: [STORES.tripomatic.ios, STORES.tripomatic.android],
      }
    : {
        '@type': 'SoftwareApplication',
        name: 'Tripomatic Audio Guides',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'iOS, Android',
        url: 'https://tripomatic.com/en/audio-guides',
        downloadUrl: [STORES['audio-guides'].ios, STORES['audio-guides'].android],
      };
}

/** BreadcrumbList for a trail of (name, path) pairs after the home page. */
export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Help Center', href: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.href}`,
    })),
  };
}

/** TechArticle for a support article. */
export function articleLd(article: Article) {
  const section = sectionById(article.data.section);
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.data.title,
    description: article.data.description,
    url: `${SITE}${articlePath(article)}`,
    dateModified: article.data.updated.toISOString().slice(0, 10),
    inLanguage: 'en',
    articleSection: section.title,
    about: appEntity(section.app),
    version: article.data.appVersion,
    publisher: ORGANIZATION,
    author: ORGANIZATION,
  };
}

/** FAQPage from question/answer pairs. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

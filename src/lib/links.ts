/**
 * Outbound links: tripomatic.com feature pages, the web planner and the store
 * listings. tripomatic.com links carry no UTM parameters — a tagged URL is a
 * different URL to a crawler, and these links exist partly to pass relevance
 * to the canonical feature pages.
 */

/** Feature page slugs that exist at `https://tripomatic.com/en/features/{slug}` (web `src/lib/features.ts`). */
export const FEATURE_SLUGS = [
  'ai-travel-assistant',
  'ai-trip-planner',
  'connect-ai',
  'destination-guides',
  'export-trip',
  'flight-tracker',
  'offline-maps',
  'places-to-visit',
  'public-holidays',
  'route-planner',
  'tours-and-activities',
  'travel-alerts',
  'trip-attachments',
  'trip-collaboration',
  'trip-cost-estimator',
  'trip-itinerary-planner',
] as const;

/** A feature page slug on tripomatic.com. */
export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

/** Display names for the feature pages, used as link text. */
export const FEATURE_NAMES: Record<FeatureSlug, string> = {
  'ai-travel-assistant': 'AI travel assistant',
  'ai-trip-planner': 'AI trip planner',
  'connect-ai': 'Connect your AI',
  'destination-guides': 'Destination guides',
  'export-trip': 'Trip export',
  'flight-tracker': 'Flight tracker',
  'offline-maps': 'Offline maps',
  'places-to-visit': 'Places to visit',
  'public-holidays': 'Public holidays',
  'route-planner': 'Route planner',
  'tours-and-activities': 'Tours and activities',
  'travel-alerts': 'Travel alerts',
  'trip-attachments': 'Trip attachments',
  'trip-collaboration': 'Trip collaboration',
  'trip-cost-estimator': 'Trip cost estimator',
  'trip-itinerary-planner': 'Trip itinerary planner',
};

/** Main marketing site. */
export const SITE_HOME = 'https://tripomatic.com/';

/** The web planner. */
export const WEB_APP = 'https://maps.tripomatic.com/';

/** Pricing page on tripomatic.com. */
export const PRICING_URL = 'https://tripomatic.com/en/pricing';

/** Audio Guides landing page on tripomatic.com. */
export const AUDIO_GUIDES_URL = 'https://tripomatic.com/en/audio-guides';

/** Connect-your-AI landing page on tripomatic.com. */
export const CONNECT_AI_URL = 'https://tripomatic.com/en/connect-ai';

/** Support email address. */
export const SUPPORT_EMAIL = 'support@tripomatic.com';

/** The feature page URL for a slug. */
export function featureUrl(slug: FeatureSlug): string {
  return `https://tripomatic.com/en/features/${slug}`;
}

/** Store listing URLs per app, tagged so installs from the support site are attributable. */
export const STORES = {
  tripomatic: {
    name: 'Tripomatic',
    ios: 'https://apps.apple.com/app/apple-store/id519058033?pt=1133038&ct=support&mt=8',
    android: 'https://play.google.com/store/apps/details?id=com.tripomatic&referrer=utm_source%3Dsupport',
    web: WEB_APP,
  },
  'audio-guides': {
    name: 'Tripomatic Audio Guides',
    ios: 'https://apps.apple.com/app/apple-store/id6787904577?pt=1133038&ct=support&mt=8',
    android: 'https://play.google.com/store/apps/details?id=com.tripomatic.guides&referrer=utm_source%3Dsupport',
    web: AUDIO_GUIDES_URL,
  },
} as const;

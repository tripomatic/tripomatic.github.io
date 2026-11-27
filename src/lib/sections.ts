/** The two apps the support site covers. */
export type AppId = 'tripomatic' | 'audio-guides';

/** A top-level group of articles, rendered at `/{id}/`. */
export interface Section {
  /** URL segment and content folder name. */
  id: string;
  /** Display name. */
  title: string;
  /** One sentence shown on cards and used as the section's meta description. */
  description: string;
  /** Which app the section belongs to. */
  app: AppId;
  /** Inline SVG path data (24×24 viewBox, stroke icon). */
  icon: string;
}

/** Section ids in display order; the content schema validates against this list. */
export const SECTION_IDS = [
  'getting-started',
  'planning',
  'ai',
  'sharing-and-export',
  'on-the-road',
  'premium',
  'account',
  'audio-guides',
] as const;

/** Every section, in display order. */
export const SECTIONS: readonly Section[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'What Tripomatic is, where it runs, and how to plan your first trip.',
    app: 'tripomatic',
    icon: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z',
  },
  {
    id: 'planning',
    title: 'Planning a trip',
    description: 'Days, places, times, transport, hotels and tours in your itinerary.',
    app: 'tripomatic',
    icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  {
    id: 'ai',
    title: 'AI features',
    description: 'The AI assistant, AI day plans, and connecting Claude or ChatGPT to your trips.',
    app: 'tripomatic',
    icon: 'M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
  },
  {
    id: 'sharing-and-export',
    title: 'Sharing, attachments and export',
    description: 'Plan together, keep bookings with the trip, and export to PDF.',
    app: 'tripomatic',
    icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  },
  {
    id: 'on-the-road',
    title: 'On the road',
    description: 'Maps, offline maps, navigation, travel alerts and live flight status.',
    app: 'tripomatic',
    icon: 'M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3zM9 7v13M15 4v13',
  },
  {
    id: 'premium',
    title: 'Free plan and Premium',
    description: 'What is free, what Premium adds, the free trial, buying, cancelling and restoring.',
    app: 'tripomatic',
    icon: 'M2 7l5 4 5-7 5 7 5-4-2 12H4z',
  },
  {
    id: 'account',
    title: 'Account and settings',
    description: 'Signing in, sync, email and password, old Sygic Travel accounts, deleting your account.',
    app: 'tripomatic',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  {
    id: 'audio-guides',
    title: 'Tripomatic Audio Guides',
    description: 'GPS-triggered audio walking tours: finding tours, buying, offline use and playback.',
    app: 'audio-guides',
    icon: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z',
  },
];

/** Looks up a section by id; throws on an unknown id so a typo fails the build. */
export function sectionById(id: string): Section {
  const section = SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}

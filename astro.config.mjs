import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import redirectPages from './integrations/redirect-pages.mjs';

export default defineConfig({
  site: 'https://support.tripomatic.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [redirectPages()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  vite: { plugins: [tailwindcss()] },
});

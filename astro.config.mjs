import { defineConfig } from 'astro/config';
import { transformerNotationDiff } from '@shikijs/transformers';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://strdr4605.com',
  outDir: './out',
  trailingSlash: 'never',
  redirects: {
    '/planable-wrapped': '/planable-wrapped/index.html',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      transformers: [transformerNotationDiff()],
    },
  },
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://helloluffydd.github.io/',
  markdown: {
    drafts: false,
  },
  experimental: {
    contentCollections: true,
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    mdx(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
});

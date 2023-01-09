import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import image from '@astrojs/image';

import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';

export default defineConfig({
  site: 'https://helloluffydd.github.io/',
  // Use to generate your sitemap and canonical URLs in your final build.
  markdown: {
    drafts: false,
    remarkPlugins: [remarkToc],
  },
  experimental: {
    contentCollections: true,
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    image(),
    mdx({
      remarkPlugins: [remarkToc],
    }),
  ],
});

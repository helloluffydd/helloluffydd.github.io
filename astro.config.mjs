import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
// import rehypeMinifyHtml from 'rehype-minify-html';

// https://astro.build/config
export default defineConfig({
  site: 'https://helloluffydd.github.io/',
  // Use to generate your sitemap and canonical URLs in your final build.
  markdown: {
    drafts: true,
  },
  experimental: {
    contentCollections: true,
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    astroImageTools,
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'dracula' },
      remarkPlugins: [remarkToc],
      // rehypePlugins: [rehypeMinifyHtml],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: false,
    }),
  ],
});

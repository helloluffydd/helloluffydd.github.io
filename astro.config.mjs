import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
export default defineConfig({
  site: 'https://helloluffydd.github.io/', // Use to generate your sitemap and canonical URLs in your final build.

  integrations: [react(), tailwind(), sitemap(), robotsTxt(), astroImageTools],
});

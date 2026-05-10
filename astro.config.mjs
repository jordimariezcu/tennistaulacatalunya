import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.tennistaulacatalunya.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        return { ...item, lastmod: new Date().toISOString().split('T')[0] };
      }
    }),
    keystatic(),
  ],
});

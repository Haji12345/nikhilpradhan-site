// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nikhilpradhan.in',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			fallbacks: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
			weights: [400, 500, 600, 700, 800],
			styles: ['normal'],
		},
	],
});

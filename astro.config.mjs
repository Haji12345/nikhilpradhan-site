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
			name: 'Fraunces',
			cssVariable: '--font-serif',
			fallbacks: ['Iowan Old Style', 'Georgia', 'serif'],
			weights: [400, 500, 600, 700],
			styles: ['normal', 'italic'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
			weights: [400, 500],
			styles: ['normal'],
		},
	],
});

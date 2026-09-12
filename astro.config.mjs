// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Wrap every Markdown table in a horizontal scroller. A wide exhibit table
 * would otherwise widen the whole page on a phone; this keeps the scroll
 * inside the table. Paired with `.prose .table-scroll` in global.css.
 */
function rehypeTableScroll() {
	return (tree) => {
		const walk = (node) => {
			if (!Array.isArray(node.children)) return;
			node.children = node.children.map((child) => {
				walk(child);
				if (child.type === 'element' && child.tagName === 'table') {
					return {
						type: 'element',
						tagName: 'div',
						properties: { className: ['table-scroll'] },
						children: [child],
					};
				}
				return child;
			});
		};
		walk(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	markdown: { rehypePlugins: [rehypeTableScroll] },
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

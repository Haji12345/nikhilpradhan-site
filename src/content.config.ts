import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

/**
 * Case studies — long-form write-ups of real work.
 * Files live in `src/content/work/`. Files starting with `_` (e.g. `_TEMPLATE.mdx`)
 * are ignored. Entries with `draft: true` show in `npm run dev` but never in the
 * production build, so you can write in public without publishing half-finished work.
 */
const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// One or two sentences: the problem and the outcome.
			summary: z.string(),
			role: z.string(),
			organisation: z.string(),
			period: z.string(), // free text, e.g. "2021 – present" or "Jun – Jul 2026"
			location: z.string().optional(),
			themes: z.array(z.string()).default([]),
			stakeholders: z.array(z.string()).default([]),
			// Up to four verifiable numbers. Leave empty rather than stretch a claim.
			metrics: z
				.array(z.object({ value: z.string(), label: z.string() }))
				.max(4)
				.default([]),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
			heroCaption: z.string().optional(),
			order: z.number().default(99), // lower = earlier in lists
			featured: z.boolean().default(false), // featured entries show on the homepage
			draft: z.boolean().default(true),
			updatedDate: z.coerce.date().optional(),
		}),
});

/**
 * Tourism & hospitality projects — short project cards.
 * Files live in `src/content/tourism/`. The Markdown body (optional) becomes the longer
 * description on /tourism. `draft: true` hides an entry from the production build.
 */
const tourism = defineCollection({
	loader: glob({ base: './src/content/tourism', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			place: z.string(), // e.g. "Darjeeling, India"
			role: z.string(), // one line: what you did
			engagement: z.string().optional(), // e.g. 'Independent Consultant', 'Erasmus+ traineeship'
			services: z.array(z.string()).default([]),
			period: z.string().optional(),
			link: z.object({ href: z.string(), label: z.string() }).optional(),
			instagram: z.string().optional(), // full profile URL
			/**
			 * Photos and videos shown in the card's carousel, in order.
			 *   - { type: 'image', src: '../../assets/photos/tourism/x.jpg', alt: '…' }
			 *   - { type: 'video', src: '/video/x.mp4', poster: '../../assets/photos/tourism/x.jpg', alt: '…' }
			 * Videos: compressed H.264 .mp4 in public/video/ (aim for under 3 MB, no audio).
			 */
			media: z
				.array(
					z.discriminatedUnion('type', [
						z.object({ type: z.literal('image'), src: image(), alt: z.string() }),
						z.object({ type: z.literal('video'), src: z.string(), poster: image(), alt: z.string() }),
					]),
				)
				.default([]),
			order: z.number().default(99),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog, work, tourism };

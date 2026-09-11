import { getCollection, type CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'work'>;

/** Published case studies (plus drafts while running `astro dev`), sorted by `order`. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
	const entries = await getCollection('work', ({ data }) => import.meta.env.DEV || !data.draft);
	return entries.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export type TourismProject = CollectionEntry<'tourism'>;

/** Tourism & hospitality projects (drafts included only in `astro dev`), sorted by `order`. */
export async function getTourismProjects(): Promise<TourismProject[]> {
	const entries = await getCollection('tourism', ({ data }) => import.meta.env.DEV || !data.draft);
	return entries.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

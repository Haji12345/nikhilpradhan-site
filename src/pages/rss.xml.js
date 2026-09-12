import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getCaseStudies } from '../lib/work';

export async function GET(context) {
	const studies = await getCaseStudies();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: studies.map((entry) => ({
			title: entry.data.title,
			description: entry.data.summary,
			link: `/case-studies/${entry.id}/`,
			...(entry.data.updatedDate ? { pubDate: entry.data.updatedDate } : {}),
		})),
	});
}

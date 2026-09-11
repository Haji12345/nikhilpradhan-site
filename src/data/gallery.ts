import type { ImageMetadata } from 'astro';

/**
 * "Through the lens" — travel and place photography shown on /tourism.
 * Add a photo:
 *   1. Put a web-sized JPG (max ~2400px on the long edge) in src/assets/photos/lens/
 *   2. Import it below and add an entry. The section hides itself while this list is empty.
 */
// import desert from '../assets/photos/lens/merzouga-caravan.jpg';

export interface GalleryPhoto {
	src: ImageMetadata;
	alt: string;
	caption: string; // place, year
}

export const gallery: GalleryPhoto[] = [
	// { src: desert, alt: 'Camel caravan crossing dunes', caption: 'Merzouga, Morocco · 2026' },
];

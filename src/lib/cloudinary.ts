// ── Cloudinary CDN Configuration ──
// Update CLOUD_NAME with your Cloudinary cloud name.
// All images should be uploaded to Cloudinary under the folder structure used below.

export const CLOUD_NAME = 'dpndj7zd1';
export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build a Cloudinary URL with custom transforms.
 * @param path - image path in Cloudinary (e.g. "services/general-service")
 * @param transforms - Cloudinary transform string (default: "f_auto,q_auto")
 */
export function cloudinaryUrl(path: string, transforms = 'f_auto,q_auto'): string {
    if (path.startsWith('/')) return path;
    return `${CLOUDINARY_BASE}/${transforms}/${path}`;
}

/** Hero / above-the-fold images — eco quality at 1600px wide */
export function heroUrl(path: string): string {
    return cloudinaryUrl(path, 'f_auto,q_auto:eco,w_1600');
}

/** Service card thumbnails — 400px, 4:3 fill crop */
export function cardUrl(path: string): string {
    return cloudinaryUrl(path, 'f_auto,q_auto,w_400,c_fill,ar_4:3');
}

/** Gallery images — 800px wide */
export function galleryUrl(path: string): string {
    return cloudinaryUrl(path, 'f_auto,q_auto,w_800,c_fill');
}

/** Portrait / avatar thumbnails — face-cropped circle-friendly */
export function avatarUrl(path: string): string {
    return cloudinaryUrl(path, 'f_auto,q_auto,w_150,h_150,c_fill,g_face');
}

/** About / large showcase images */
export function showcaseUrl(path: string): string {
    return cloudinaryUrl(path, 'f_auto,q_auto,w_1500');
}

// ── Responsive srcSet generator ──

const RESPONSIVE_WIDTHS = [400, 600, 800, 1200];

/**
 * Generates a srcSet string for responsive images.
 * @param path - Cloudinary image path
 * @returns srcSet string like "url 400w, url 600w, ..."
 */
export function srcSet(path: string): string {
    return RESPONSIVE_WIDTHS
        .map(w => `${cloudinaryUrl(path, `f_auto,q_auto,w_${w}`)} ${w}w`)
        .join(', ');
}

/** Default sizes attribute for grid-based layouts */
export const GRID_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
export const GALLERY_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

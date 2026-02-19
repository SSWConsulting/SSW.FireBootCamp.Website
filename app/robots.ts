import type { MetadataRoute } from 'next';

/**
 * Generates robots.txt for search engine crawlers
 * - Allows all crawlers to access the site
 * - Blocks the TinaCMS admin interface from indexing
 * - References the sitemap for discovery
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firebootcamp.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

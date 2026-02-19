import client from '@/tina/__generated__/client';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firebootcamp.com';

/**
 * Collects all internal hrefs from global settings (nav, mega menu, footer links).
 * Normalises them to full URLs and deduplicates.
 */
function collectGlobalLinks(global: Record<string, unknown>): string[] {
  const hrefs: string[] = [];
  const g = global as {
    header?: {
      nav?: { href?: string }[];
      megaMenu?: { href?: string }[];
      ctaLink?: string;
      megaMenuBannerLinkUrl?: string;
    };
    footer?: {
      primaryCtaLink?: string;
      secondaryCtaLink?: string;
      linkColumns?: { links?: { href?: string }[] }[];
    };
  };

  // Header nav links
  for (const item of g.header?.nav ?? []) {
    if (item?.href) hrefs.push(item.href);
  }

  // Mega menu links
  for (const item of g.header?.megaMenu ?? []) {
    if (item?.href) hrefs.push(item.href);
  }

  // Header CTA & banner links
  if (g.header?.ctaLink) hrefs.push(g.header.ctaLink);
  if (g.header?.megaMenuBannerLinkUrl) hrefs.push(g.header.megaMenuBannerLinkUrl);

  // Footer CTA links
  if (g.footer?.primaryCtaLink) hrefs.push(g.footer.primaryCtaLink);
  if (g.footer?.secondaryCtaLink) hrefs.push(g.footer.secondaryCtaLink);

  // Footer link columns
  for (const col of g.footer?.linkColumns ?? []) {
    for (const link of col?.links ?? []) {
      if (link?.href) hrefs.push(link.href);
    }
  }

  // Normalise to full URLs, keeping only internal links
  const urls = new Set<string>();
  for (const href of hrefs) {
    if (href.startsWith('#')) {
      // Hash links are sections on the home page
      urls.add(`${baseUrl}/${href}`);
    } else if (href.startsWith('/')) {
      // Internal path links
      urls.add(`${baseUrl}${href}`);
    }
    // Skip external URLs (http/https), mailto:, tel:, etc.
  }

  return [...urls];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seenUrls = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (seenUrls.has(entry.url)) return;
    seenUrls.add(entry.url);
    entries.push(entry);
  };

  // Home page
  addEntry({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Posts index page
  addEntry({
    url: `${baseUrl}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // --- Global settings links (nav, mega menu, footer) ---
  const globalResponse = await client.queries.global({ relativePath: 'index.json' });
  const globalData = globalResponse.data?.global;

  if (globalData) {
    for (const url of collectGlobalLinks(globalData as Record<string, unknown>)) {
      addEntry({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // --- TinaCMS pages ---
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });
    if (pages.data.pageConnection.edges && allPages.data.pageConnection.edges) {
      allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
    }
  }

  for (const edge of allPages.data.pageConnection.edges || []) {
    const breadcrumbs = edge?.node?._sys?.breadcrumbs;
    if (!breadcrumbs || (breadcrumbs.length === 1 && breadcrumbs[0] === 'home')) {
      continue;
    }
    if (!edge?.node) {
      continue;
    }
    addEntry({
      url: `${baseUrl}/${breadcrumbs.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // --- TinaCMS posts ---
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });
    if (posts.data.postConnection.edges && allPosts.data.postConnection.edges) {
      allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
    }
  }

  for (const edge of allPosts.data.postConnection.edges || []) {
    const breadcrumbs = edge?.node?._sys?.breadcrumbs;
    if (!breadcrumbs || !edge?.node) continue;

    addEntry({
      url: `${baseUrl}/posts/${breadcrumbs.join('/')}`,
      lastModified: edge.node.date ? new Date(edge.node.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}

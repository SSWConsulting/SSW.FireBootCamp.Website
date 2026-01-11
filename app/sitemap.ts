import client from '@/tina/__generated__/client';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://firebootcamp.com';
  const entries: MetadataRoute.Sitemap = [];

  // Home page
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Posts index page
  entries.push({
    url: `${baseUrl}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Fetch all pages
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

  // Add pages to sitemap
  for (const edge of allPages.data.pageConnection.edges || []) {
    const breadcrumbs = edge?.node?._sys?.breadcrumbs;
    if (!breadcrumbs || (breadcrumbs.length === 1 && breadcrumbs[0] === 'home')) {
      continue;
    }
    if (!edge?.node) {
      continue;
    }
    entries.push({
      url: `${baseUrl}/${breadcrumbs.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Fetch all posts
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

  // Add posts to sitemap
  for (const edge of allPosts.data.postConnection.edges || []) {
    const breadcrumbs = edge?.node?._sys?.breadcrumbs;
    if (!breadcrumbs || !edge?.node) continue;

    entries.push({
      url: `${baseUrl}/posts/${breadcrumbs.join('/')}`,
      lastModified: edge.node.date ? new Date(edge.node.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}

import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import PostClientPage from './client-page';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    return {
      title: 'Post Not Found | SSW FireBootCamp',
    };
  }

  const post = data.data.post;

  // Use static SEO fields from CMS instead of dynamic extraction
  const seo = post.seo;

  // Default values
  const defaultDescription = 'Read our latest blog post from SSW FireBootCamp';

  // Build title with fallback: SEO title → post title → default
  const title = seo?.title ? `${seo.title} | SSW FireBootCamp` : post.title ? `${post.title} | SSW FireBootCamp` : 'SSW FireBootCamp Blog';

  // Build description with fallback: SEO description → default
  // Note: We no longer extract from excerpt (rich text parsing removed)
  const description = seo?.description || defaultDescription;

  // Build Open Graph metadata with fallbacks
  const ogImage = seo?.openGraph?.image || post.heroImg;
  const ogUpdatedTime = seo?.openGraph?.updatedTime || (post.date ? new Date(post.date).toISOString() : undefined);

  const openGraph: Metadata['openGraph'] = {
    title: seo?.openGraph?.title || title,
    description: seo?.openGraph?.description || description,
    type: 'article',
    // Use SEO OG image or fallback to hero image (filter out null/undefined)
    ...(ogImage && { images: [ogImage] }),
    // Use SEO OG updatedTime or fallback to post date
    ...(ogUpdatedTime && { updatedTime: ogUpdatedTime }),
    // Use post date for publishedTime (article-specific)
    ...(post.date && {
      publishedTime: new Date(post.date).toISOString(),
    }),
    // Use post author for authors (article-specific)
    ...(post.author?.name && {
      authors: [post.author.name],
    }),
  };

  return {
    title,
    description,
    openGraph,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  try {
    const { query, data, variables } = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });

    if (!data.post) {
      notFound();
    }

    return (
      <Layout rawPageData={{ query, data, variables }}>
        <PostClientPage query={query} data={data} variables={variables} />
      </Layout>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  const params =
    allPosts.data?.postConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}

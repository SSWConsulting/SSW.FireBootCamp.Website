import React from 'react';
import { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
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
  const title = post.title 
    ? `${post.title} | SSW FireBootCamp`
    : 'SSW FireBootCamp Blog';

  // Extract text from excerpt (it's rich text, so we need to handle it)
  let description = 'Read our latest blog post from SSW FireBootCamp';
  if (post.excerpt) {
    // If excerpt is a string, use it directly
    if (typeof post.excerpt === 'string') {
      description = post.excerpt.substring(0, 160);
    } else if (post.excerpt && typeof post.excerpt === 'object' && 'children' in post.excerpt) {
      // If it's rich text, extract text from children
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (node?.children) {
          return node.children.map(extractText).join(' ');
        }
        return '';
      };
      description = extractText(post.excerpt).substring(0, 160);
    }
  }

  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    type: 'article',
  };

  if (post.heroImg) {
    openGraph.images = [post.heroImg];
  }

  if (post.date) {
    openGraph.publishedTime = new Date(post.date).toISOString();
  }

  if (post.author?.name) {
    openGraph.authors = [post.author.name];
  }

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
  const data = await client.queries.post({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
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

import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import { Metadata } from 'next';
import React from 'react';
import ClientPage from './[...urlSegments]/client-page';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  // Use static SEO fields from CMS instead of dynamic extraction
  const seo = data.data.page.seo;

  // Default values from root layout
  const defaultTitle = 'SSW FireBootCamp';
  const defaultDescription = 'Transform your tech career with our 12-week intensive fullstack developer program';

  // Build title with fallback
  const title = seo?.title ? `${seo.title} | SSW FireBootCamp` : defaultTitle;

  // Build description with fallback
  const description = seo?.description || defaultDescription;

  // Build Open Graph metadata with fallbacks
  const openGraph: Metadata['openGraph'] = {
    title: seo?.openGraph?.title || title,
    description: seo?.openGraph?.description || description,
    type: 'website',
    ...(seo?.openGraph?.image && { images: [seo.openGraph.image] }),
    ...(seo?.openGraph?.updatedTime && { updatedTime: seo.openGraph.updatedTime }),
  };

  return {
    title,
    description,
    openGraph,
  };
}

export default async function Home() {
  try {
    const { query, data, variables } = await client.queries.page({
      relativePath: `home.mdx`,
    });

    return (
      <Layout rawPageData={{ query, data, variables }}>
        <ClientPage query={query} data={data} variables={variables} />
      </Layout>
    );
  } catch (error) {
    console.error('Failed to fetch home page:', error);
    throw error;
  }
}

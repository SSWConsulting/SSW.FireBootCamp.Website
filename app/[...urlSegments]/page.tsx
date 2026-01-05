import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';

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
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    return {
      title: 'Page Not Found | SSW FireBootCamp',
    };
  }

  // Use static SEO fields from CMS instead of dynamic extraction
  const seo = data.data.page.seo;
  
  // Default values
  const defaultTitle = 'SSW FireBootCamp';
  const defaultDescription = 'SSW FireBootCamp - Transform your tech career with our 12-week intensive fullstack developer program';
  
  // Fallback to filename-based title if no SEO title (last resort)
  const filenameTitle = filepath.split('/').pop()?.replace(/-/g, ' ') || 'Page';

  // Build title with fallback hierarchy: SEO title → filename-based → default
  const title = seo?.title 
    ? `${seo.title} | SSW FireBootCamp`
    : `${filenameTitle} | SSW FireBootCamp`;

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

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  try {
    const { query, data, variables } = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });

    if (!data.page) {
      notFound();
    }

    return (
      <Layout rawPageData={{ query, data, variables }}>
        <Section>
          <ClientPage query={query} data={data} variables={variables} />
        </Section>
      </Layout>
    );
  } catch (error) {
    console.error("Failed to fetch page:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === 'home')); // exclude the home page

  return params;
}
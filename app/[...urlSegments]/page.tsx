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

  // Extract title from first block's headline if available
  const firstBlock = data.data.page.blocks?.[0];
  const title = firstBlock && 'headline' in firstBlock 
    ? `${firstBlock.headline} | SSW FireBootCamp`
    : firstBlock && 'title' in firstBlock
    ? `${firstBlock.title} | SSW FireBootCamp`
    : `${filepath.split('/').pop()?.replace(/-/g, ' ') || 'Page'} | SSW FireBootCamp`;

  const description = firstBlock && 'description' in firstBlock
    ? String(firstBlock.description || '').substring(0, 160)
    : 'SSW FireBootCamp - Transform your tech career with our 12-week intensive fullstack developer program';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
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
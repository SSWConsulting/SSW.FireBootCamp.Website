import React from "react";
import { Metadata } from "next";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  // Extract title from first block's headline if available
  const firstBlock = data.data.page.blocks?.[0];
  const title = firstBlock && 'headline' in firstBlock 
    ? `${firstBlock.headline} | SSW FireBootCamp`
    : 'SSW FireBootCamp';

  const description = firstBlock && 'description' in firstBlock
    ? String(firstBlock.description || '').substring(0, 160)
    : 'Transform your tech career with our 12-week intensive fullstack developer program';

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

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

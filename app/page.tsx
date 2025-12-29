import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

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
    console.error("Failed to fetch home page:", error);
    throw error;
  }
}

import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import PostsClientPage from './client-page';

export const revalidate = 300;

export default async function PostsPage() {
  try {
    let { query, data, variables } = await client.queries.postConnection({
      sort: 'date',
      last: 1,
    });

    if (!data.postConnection.edges) {
      return (
        <Layout rawPageData={{ query, data, variables }}>
          <PostsClientPage query={query} data={data} variables={variables} />
        </Layout>
      );
    }

    // Accumulate all posts across pages
    const allEdges = [...data.postConnection.edges];

    while (data?.postConnection.pageInfo.hasPreviousPage) {
      const { data: nextData } = await client.queries.postConnection({
        sort: 'date',
        before: data.postConnection.pageInfo.endCursor,
      });

      if (!nextData.postConnection.edges) {
        break;
      }

      allEdges.push(...nextData.postConnection.edges.reverse());
      data = nextData;
    }

    // Create final data structure with all edges
    const finalData = {
      ...data,
      postConnection: {
        ...data.postConnection,
        edges: allEdges,
      },
    };

    return (
      <Layout rawPageData={{ query, data: finalData, variables }}>
        <PostsClientPage query={query} data={finalData} variables={variables} />
      </Layout>
    );
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

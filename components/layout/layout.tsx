import React, { PropsWithChildren } from 'react';
import client from '../../tina/__generated__/client';
import { LayoutProvider } from './layout-context';
import { Footer } from './nav/footer';
import { Header } from './nav/header';

type LayoutProps = PropsWithChildren & {
  rawPageData?: Record<string, unknown> | null;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    {
      relativePath: 'index.json',
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData || {}}>
      <Header />
      <main id='main-content' className='overflow-x-hidden'>
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}

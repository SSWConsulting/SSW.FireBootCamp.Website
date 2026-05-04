import React, { PropsWithChildren } from 'react';
import { encodeContact } from '@/lib/contact-encoding';
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

  // Encode contact email/cc so the address never appears verbatim in the SSR
  // HTML / RSC payload (anti-harvesting). useMailto decodes on the client.
  const safeGlobal = {
    ...globalData.global,
    contactEmail: globalData.global.contactEmail ? encodeContact(globalData.global.contactEmail) : globalData.global.contactEmail,
    contactCc: globalData.global.contactCc ? encodeContact(globalData.global.contactCc) : globalData.global.contactCc,
  };

  return (
    <LayoutProvider globalSettings={safeGlobal} pageData={rawPageData || {}}>
      <Header />
      <main id='main-content' className='overflow-x-hidden'>
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}

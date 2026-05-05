import React, { PropsWithChildren } from 'react';
import client from '../../tina/__generated__/client';
import { encodeBase64 } from '../../lib/email-obfuscation';
import { LayoutProvider } from './layout-context';
import { Footer } from './nav/footer';
import { Header } from './nav/header';

type LayoutProps = PropsWithChildren & {
  rawPageData?: Record<string, unknown> | null;
};

const FALLBACK_CONTACT_EMAIL = 'pennywalker@ssw.com.au';
const FALLBACK_CONTACT_CC = 'adamcogan@ssw.com.au';

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

  // Strip plaintext email fields before they cross to the client and pass
  // base64-encoded copies instead. The client decodes only at runtime,
  // keeping addresses out of SSR HTML and the hydration payload.
  const rawEmail = globalData.global.contactEmail || FALLBACK_CONTACT_EMAIL;
  const rawCc = globalData.global.contactCc || FALLBACK_CONTACT_CC;
  const sanitizedGlobal = {
    ...globalData.global,
    contactEmail: null,
    contactCc: null,
  };
  const encodedContactEmail = encodeBase64(rawEmail);
  const encodedContactCc = encodeBase64(rawCc);

  return (
    <LayoutProvider
      globalSettings={sanitizedGlobal}
      pageData={rawPageData || {}}
      encodedContactEmail={encodedContactEmail}
      encodedContactCc={encodedContactCc}
    >
      <Header />
      <main id='main-content' className='overflow-x-hidden'>
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}

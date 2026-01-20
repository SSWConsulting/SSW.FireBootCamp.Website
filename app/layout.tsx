import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import VideoDialog from '@/components/ui/VideoDialog';
import { VideoDialogProvider } from '@/components/ui/VideoDialogContext';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans, JetBrains_Mono, Lato, Nunito, Oswald } from 'next/font/google';
import React from 'react';

import '@/styles.css';
import { TailwindIndicator } from '@/components/ui/breakpoint-indicator';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: '400',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['100', '400'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firebootcamp.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'SSW FireBootCamp',
  description: 'Transform your tech career with our 12-week intensive fullstack developer program',
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cn(fontSans.variable, nunito.variable, lato.variable, oswald.variable, jetbrainsMono.variable)}>
      <body className='min-h-screen bg-background font-sans antialiased'>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground'
        >
          Skip to main content
        </a>
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

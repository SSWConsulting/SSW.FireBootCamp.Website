'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 tracking component
 *
 * Loads the GA4 gtag.js script and initialises tracking.
 * Only renders when NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is set.
 *
 * Setup:
 * 1. Create a GA4 property at https://analytics.google.com
 * 2. Get the Measurement ID (starts with G-)
 * 3. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel environment variables
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  // Don't render anything if no measurement ID is configured
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Load the gtag.js library */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Initialise GA4 tracking */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

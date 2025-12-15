import Link from 'next/link';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

/**
 * Enhanced Link component that automatically opens external links in a new tab.
 * Drop-in replacement for Next.js Link component.
 */
export const AutoLink = ({ href, ...props }: LinkProps) => {
  const isExternal = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));

  return (
    <Link
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  );
};


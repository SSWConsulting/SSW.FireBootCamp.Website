'use client';

import React, { useEffect, useRef } from 'react';
import { buildMailtoHref, decodeBase64 } from '@/lib/email-obfuscation';

type MailtoLinkProps = {
  encodedEmail: string;
  encodedCc?: string;
  subject?: string;
  body?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const MailtoLink = React.forwardRef<HTMLAnchorElement, MailtoLinkProps>(function MailtoLink(
  { encodedEmail, encodedCc, subject, body, children, ...rest },
  forwardedRef
) {
  const innerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const node = innerRef.current;
    if (!node || !encodedEmail) return;
    const email = decodeBase64(encodedEmail);
    const cc = encodedCc ? decodeBase64(encodedCc) : undefined;
    node.href = buildMailtoHref({ email, cc, subject, body });
  }, [encodedEmail, encodedCc, subject, body]);

  const setRef = (node: HTMLAnchorElement | null) => {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <a ref={setRef} href='#contact' rel='nofollow' {...rest}>
      {children}
    </a>
  );
});

'use client';
import { useEffect, useState } from 'react';
import { decodeContact } from './contact-encoding';

type MailtoOptions = {
  subject?: string;
  cc?: string;
  body?: string;
};

export const useMailto = (encodedEmail: string, options?: MailtoOptions) => {
  const [href, setHref] = useState('');
  const subject = options?.subject;
  const encodedCc = options?.cc;
  const body = options?.body;

  useEffect(() => {
    const email = decodeContact(encodedEmail);
    const cc = encodedCc ? decodeContact(encodedCc) : undefined;
    const params = [
      subject ? `subject=${encodeURIComponent(subject)}` : '',
      cc ? `cc=${encodeURIComponent(cc)}` : '',
      body ? `body=${encodeURIComponent(body)}` : '',
    ]
      .filter(Boolean)
      .join('&');
    setHref(`mailto:${email}${params ? `?${params}` : ''}`);
  }, [encodedEmail, subject, encodedCc, body]);

  return href;
};

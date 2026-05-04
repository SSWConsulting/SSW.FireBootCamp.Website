// Encode/decode helpers for hiding email addresses from page-level scrapers.
// Encoded values are emitted in the SSR HTML and hydration payload; the real
// `mailto:` URL is only ever assembled on the client after hydration.
// See: https://www.ssw.com.au/rules/avoid-using-mailto-on-your-website

export function encodeBase64(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(value)));
}

export function decodeBase64(encoded: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(encoded, 'base64').toString('utf8');
  }
  return decodeURIComponent(escape(atob(encoded)));
}

export type MailtoParts = {
  email: string;
  cc?: string;
  subject?: string;
  body?: string;
};

export function buildMailtoHref({ email, cc, subject, body }: MailtoParts): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return params.length > 0 ? `mailto:${email}?${params.join('&')}` : `mailto:${email}`;
}

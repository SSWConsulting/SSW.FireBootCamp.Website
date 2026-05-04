const SEPARATOR = '|';

export const encodeContact = (email: string) => {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  return `${[...local].reverse().join('')}${SEPARATOR}${[...domain].reverse().join('')}`;
};

export const decodeContact = (encoded: string) => {
  if (!encoded || !encoded.includes(SEPARATOR)) return encoded;
  const [local, domain] = encoded.split(SEPARATOR);
  return `${[...local].reverse().join('')}@${[...domain].reverse().join('')}`;
};

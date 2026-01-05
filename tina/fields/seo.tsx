import { CharacterCounterInput } from './character-counter';

/**
 * Reusable SEO field schema for TinaCMS collections
 * Provides fields for meta title, description, and Open Graph metadata
 * 
 * Usage:
 * ```ts
 * import { seoFieldSchema } from '@/tina/fields/seo';
 * 
 * const Page: Collection = {
 *   fields: [
 *     seoFieldSchema,
 *     // ... other fields
 *   ],
 * };
 * ```
 */
export const seoFieldSchema: {
  type: 'object';
  label: string;
  name: string;
  description: string;
  fields: Array<any>;
} = {
  type: 'object',
  label: 'SEO & Metadata',
  name: 'seo',
  description: 'Configure SEO metadata for search engines and social media sharing',
  fields: [
    {
      type: 'string',
      label: 'Meta Title',
      name: 'title',
      description: 'Override the page title for search engines. Leave blank to use the page title.',
    },
    {
      type: 'string',
      label: 'Meta Description',
      name: 'description',
      description: 'A brief description of the page for search engines. Recommended: 150-160 characters.',
      ui: {
        component: CharacterCounterInput,
      },
    },
    {
      type: 'object',
      label: 'Open Graph',
      name: 'openGraph',
      description: 'Metadata for social media sharing (Facebook, Twitter/X, LinkedIn)',
      fields: [
        {
          type: 'string',
          label: 'OG Title',
          name: 'title',
          description: 'Title shown when shared on social media. Leave blank to use meta title.',
        },
        {
          type: 'string',
          label: 'OG Description',
          name: 'description',
          description: 'Description shown when shared on social media. Leave blank to use meta description.',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image',
          label: 'OG Image',
          name: 'image',
          description: 'Image shown when shared on social media. Recommended: 1200x630px, WebP format.',
        },
        {
          type: 'datetime',
          label: 'Updated Time',
          name: 'updatedTime',
          description: 'When this content was last updated. Used for Open Graph metadata.',
          ui: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
          },
        },
      ],
    },
  ],
};


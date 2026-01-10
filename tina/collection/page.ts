import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { contentBlockSchema } from '@/components/blocks/content';
import { fbcCertificationBlockSchema } from '@/components/blocks/fbc-certification';
import { fbcCtaBannerBlockSchema } from '@/components/blocks/fbc-cta-banner';
import { fbcFaqBlockSchema } from '@/components/blocks/fbc-faq';
import { fbcHeroBlockSchema } from '@/components/blocks/fbc-hero';
import { fbcPricingBlockSchema } from '@/components/blocks/fbc-pricing';
import { fbcSkillsBlockSchema } from '@/components/blocks/fbc-skills';
import { fbcTabsBlockSchema } from '@/components/blocks/fbc-tabs';
import { fbcTeamBlockSchema } from '@/components/blocks/fbc-team';
import { fbcTestimonialSliderBlockSchema } from '@/components/blocks/fbc-testimonial-slider';
import { fbcVideoBlockSchema } from '@/components/blocks/fbc-video';
import { featureBlockSchema } from '@/components/blocks/features';
import { heroBlockSchema } from '@/components/blocks/hero';
import { statsBlockSchema } from '@/components/blocks/stats';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { videoBlockSchema } from '@/components/blocks/video';
import { seoFieldSchema } from '@/tina/fields/seo';
import type { Collection } from 'tinacms';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    seoFieldSchema,
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        fbcHeroBlockSchema,
        fbcSkillsBlockSchema,
        fbcVideoBlockSchema,
        fbcTabsBlockSchema,
        fbcCertificationBlockSchema,
        fbcPricingBlockSchema,
        fbcTestimonialSliderBlockSchema,
        fbcTeamBlockSchema,
        fbcFaqBlockSchema,
        fbcCtaBannerBlockSchema,
      ],
    },
  ],
};

export default Page;

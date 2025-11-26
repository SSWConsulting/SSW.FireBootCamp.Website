import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { fbcHeroBlockSchema } from '@/components/blocks/fbc-hero';
import { fbcSkillsBlockSchema } from '@/components/blocks/fbc-skills';
import { fbcVideoBlockSchema } from '@/components/blocks/fbc-video';
import { fbcTabsBlockSchema } from '@/components/blocks/fbc-tabs';
import { fbcCertificationBlockSchema } from '@/components/blocks/fbc-certification';
import { fbcPricingBlockSchema } from '@/components/blocks/fbc-pricing';
import { fbcTestimonialSliderBlockSchema } from '@/components/blocks/fbc-testimonial-slider';
import { fbcTeamBlockSchema } from '@/components/blocks/fbc-team';
import { fbcFaqBlockSchema } from '@/components/blocks/fbc-faq';
import { fbcCtaBannerBlockSchema } from '@/components/blocks/fbc-cta-banner';

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

'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcPricing, PageBlocksFbcPricingPlans, PageBlocksFbcPricingPlansFeatures } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { useLayout } from '../layout/layout-context';

export const FbcPricing = ({ data }: { data: PageBlocksFbcPricing }) => {
  const { globalSettings } = useLayout();
  const contactEmail = globalSettings?.contactEmail || 'pennywalker@ssw.com.au';
  const contactSubject = globalSettings?.contactSubject || "SSW Firebootcamp - Let's chat";
  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`;
  
  return (
    <section id="pricing" className="bg-scheme-3-background px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 h-fit">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20 items-center">
        <div className="max-w-full md:max-w-[768px] text-center flex flex-col gap-4 md:gap-6">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-3-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5] text-scheme-3-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full flex flex-wrap min-[1440px]:flex-nowrap justify-center gap-4">
          {data.plans?.map((plan, index) => {
            // Below 1440px: Trial (0) → 1st, Full Tuition (2) → 2nd, Scholarship (1) → 3rd
            // At 1440px+: DOM order (Trial, Scholarship, Full Tuition)
            const orderClasses = 
              index === 0 ? 'order-1 min-[1440px]:order-1' : 
              index === 1 ? 'order-3 min-[1440px]:order-2' : 
              'order-2 min-[1440px]:order-3';
            return (
              <div 
                key={index}
                className={`w-full md:w-[calc(50%-8px)] min-[1440px]:flex-1 min-[1440px]:max-w-[480px] ${orderClasses}`}
              >
                <PricingCard plan={plan!} mailtoLink={mailtoLink} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan, mailtoLink }: { plan: PageBlocksFbcPricingPlans; mailtoLink: string }) => {
  const isFeatured = plan.isFeatured || false;
  return (
    <div className={`bg-scheme-1-background rounded-lg flex flex-col overflow-hidden w-full h-full ${
      isFeatured 
        ? 'border border-red shadow-[0px_0px_0px_6px_rgba(204,65,65,0.22)] pb-6 md:pb-8 pt-0 px-0' 
        : 'border border-border p-6 md:p-8'
    }`}>
      {isFeatured && (
        <div className="bg-red text-white text-center px-6 md:px-8 py-3 md:py-4">
          <p className="font-oswald font-bold text-[14px] md:text-[16px] uppercase tracking-[1.6px] leading-[1.1]">
            MOST POPULAR
          </p>
        </div>
      )}
      <div className={`flex flex-col gap-6 md:gap-8 flex-1 ${isFeatured ? 'px-6 md:px-8 py-8' : ''}`}>
        <div className="flex gap-4 items-center">
          {plan.icon && (
            <div className="w-10 h-[36px] md:w-12 md:h-[42px] relative" data-tina-field={tinaField(plan, 'icon')}>
              <Image src={plan.icon} alt="" fill className="object-contain" />
            </div>
          )}
          <h3
            data-tina-field={tinaField(plan, 'name')}
            className="font-oswald font-bold text-[20px] md:text-[24px] lg:text-[26px] uppercase tracking-[-0.26px] leading-[1.1] text-scheme-1-text"
          >
            {plan.name}
          </h3>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <p
            data-tina-field={tinaField(plan, 'price')}
            className="font-oswald font-bold text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] uppercase tracking-[-0.84px] leading-none text-scheme-1-text"
          >
            {plan.price}
          </p>
          <p
            data-tina-field={tinaField(plan, 'subtitle')}
            className="font-sans text-[14px] md:text-[16px] lg:text-[18px] leading-[1.5] text-scheme-1-text"
          >
            {plan.subtitle}
          </p>
        </div>

        <div className="h-px bg-scheme-1-border" />

        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col gap-3 md:gap-4 py-2">
            {plan.features?.map((feature, index) => (
              <FeatureItem key={index} feature={feature!} />
            ))}
          </div>
        </div>
      </div>

      <div className={isFeatured ? 'px-6 md:px-8' : 'h-20'}>
        <Button
          asChild
          className="w-full bg-red hover:bg-red-dark text-white mt-6 md:mt-8"
        >
          <a href={mailtoLink}>{plan.ctaLabel || 'Apply now'}</a>
        </Button>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: PageBlocksFbcPricingPlansFeatures }) => {
  return (
    <div className="flex gap-3 md:gap-4 items-start">
      <svg className="w-5 h-5 md:w-6 md:h-6 text-red shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <p className="font-sans text-[14px] md:text-[16px] lg:text-[18px] leading-[1.5] text-scheme-1-text">{feature.text}</p>
    </div>
  );
};

export const fbcPricingBlockSchema: Template = {
  name: 'fbcPricing',
  label: 'FBC Pricing',
  ui: {
    previewSrc: '/blocks/stats.png',
    defaultItem: {
      title: 'Flexible learning paths for aspiring consultants',
      description: 'Transparent and flexible options for your learning journey.',
      plans: [
        {
          name: 'Full Tuition',
          price: '$12,000',
          subtitle: 'Immerse yourself in our 12-week intensive fullstack developer program.',
          icon: '',
          ctaLabel: 'Apply now',
          ctaLink: '/apply',
          features: [
            { text: 'Full 12-week course access' },
            { text: 'Training in Scrum & Agile workflows' },
            { text: 'Engage with stakeholders to develop soft skills' },
            { text: 'Mentoring from superstar Senior Software Engineers' },
            { text: 'Achieve your certification as an SSW Qualified Developer' },
            { text: 'Potential employment opportunity with SSW as a Software Developer' },
          ],
        },
        {
          name: 'Scholarship Price',
          price: '$9,000',
          subtitle: 'Pass the entry test and get access to the discounted full course price.',
          icon: '',
          ctaLabel: 'Apply now',
          ctaLink: '/apply',
          features: [
            { text: '$3,000 off full tuition fee' },
            { text: 'Access to full 12-week immersive course and all its inclusions.' },
          ],
        },
        {
          name: '1-Day Trial Session',
          price: '$100',
          subtitle: 'Shadow a developer for 1 day to get a taste of the course.',
          icon: '',
          ctaLabel: 'Apply now',
          ctaLink: '/apply',
          features: [
            { text: '1 day shadowing a developer' },
            { text: 'Attend daily team meeting' },
            { text: 'Exposure to tech ecosystem' },
          ],
        },
      ],
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'object',
      label: 'Plans',
      name: 'plans',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.name }),
      },
      fields: [
        {
          type: 'string',
          label: 'Plan Name',
          name: 'name',
        },
        {
          type: 'string',
          label: 'Price',
          name: 'price',
        },
        {
          type: 'string',
          label: 'Subtitle',
          name: 'subtitle',
        },
        {
          type: 'image',
          label: 'Icon',
          name: 'icon',
        },
        {
          type: 'string',
          label: 'CTA Label',
          name: 'ctaLabel',
        },
        {
          type: 'string',
          label: 'CTA Link',
          name: 'ctaLink',
        },
        {
          type: 'boolean',
          label: 'Featured',
          name: 'isFeatured',
        },
        {
          type: 'object',
          label: 'Features',
          name: 'features',
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.text }),
          },
          fields: [
            {
              type: 'string',
              label: 'Feature Text',
              name: 'text',
            },
          ],
        },
      ],
    },
  ],
};


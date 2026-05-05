'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcPricing, PageBlocksFbcPricingPlans, PageBlocksFbcPricingPlansFeatures } from '../../tina/__generated__/types';
import { useLayout } from '../layout/layout-context';
import { Button } from '../ui/button';
import { MailtoLink } from '../ui/mailto-link';

type PlanMailto = { subject: string; body: string };

export const FbcPricing = ({ data }: { data: PageBlocksFbcPricing }) => {
  const { globalSettings } = useLayout();
  const siteUrl = globalSettings?.siteUrl || 'https://firebootcamp.com.au';

  const buildPlanMailto = (plan: PageBlocksFbcPricingPlans): PlanMailto => {
    const planName = plan.name || 'Pricing Plan';
    const subject = (plan as PageBlocksFbcPricingPlans & { emailSubject?: string | null }).emailSubject || `FireBootCamp \u2013 ${planName}`;
    const emailBody = plan.emailBody ? plan.emailBody.replace('[Plan Name]', planName) : `Hi, I am interested in ${planName}.`;
    const body = emailBody.includes(siteUrl) ? emailBody : `${emailBody}\n\n${siteUrl}`;
    return { subject, body };
  };

  return (
    <section id='pricing' className='bg-scheme-3-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32 h-fit'>
      <div className='max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20 items-center'>
        <div className='max-w-full md:max-w-[768px] text-center flex flex-col gap-4 md:gap-6'>
          <h2
            data-tina-field={tinaField(data, 'title')}
            className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-3-text'
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-scheme-3-text'>
            {data.description}
          </p>
        </div>

        <div className='w-full flex flex-wrap min-[1440px]:flex-nowrap justify-center gap-x-4 gap-y-8 min-[1440px]:gap-4'>
          {data.plans?.map((plan, index) => {
            const isFeatured = plan?.isFeatured || false;
            // Count how many non-featured cards come before this one
            const nonFeaturedBefore = data.plans?.slice(0, index).filter((p) => !p?.isFeatured).length || 0;
            // Below 1440px: Featured card appears first (order: 1), others follow in sequence (order: 2, 3, etc.)
            // At 1440px+: Maintain DOM order (order based on index + 1)
            const mobileOrder = isFeatured ? 1 : nonFeaturedBefore + 2;
            const desktopOrder = index + 1;
            return (
              <div
                key={index}
                className='pricing-card-wrapper w-full md:w-[calc(50%-8px)] min-[1440px]:flex-1 min-[1440px]:max-w-[480px]'
                style={
                  {
                    '--mobile-order': mobileOrder,
                    '--desktop-order': desktopOrder,
                  } as React.CSSProperties
                }
              >
                <PricingCard plan={plan!} mailto={buildPlanMailto(plan!)} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan, mailto }: { plan: PageBlocksFbcPricingPlans; mailto: PlanMailto }) => {
  const { encodedContactEmail, encodedContactCc } = useLayout();
  const isFeatured = plan.isFeatured || false;
  const planName = plan.name || 'Pricing Plan';
  const isFullCourse = planName.toLowerCase().includes('full course');

  // Parse price for Full Course Access (show $9,000 with $12,000 strikethrough)
  const getPriceDisplay = () => {
    const discountPrice = (plan as PageBlocksFbcPricingPlans & { discountPrice?: string | null }).discountPrice;
    if (isFullCourse) {
      return {
        mainPrice: '$9,000',
        discountPrice: discountPrice || '$12,000',
      };
    }
    return {
      mainPrice: plan.price || '$0',
      discountPrice: discountPrice || null,
    };
  };

  const priceDisplay = getPriceDisplay();

  // Icon sizing based on plan type
  const getIconSize = () => {
    if (isFullCourse) {
      return 'w-[60px] h-[36px]';
    }
    return 'w-[68px] h-[36px]';
  };

  return (
    <div
      className={`bg-scheme-1-background flex flex-col overflow-visible w-full h-full relative md:min-h-[750px] ${
        isFeatured
          ? 'border-2 border-red shadow-block-red-pricing rounded-lg pb-6 md:pb-8 px-0'
          : 'border border-[rgba(0,0,0,0.15)] shadow-block-grey-pricing rounded-lg p-6 md:p-8'
      }`}
      aria-label={isFeatured ? `${planName} - Most popular plan` : planName}
    >
      {isFeatured && (
        <div className='absolute top-[-17px] left-1/2 -translate-x-1/2 bg-red text-white px-6 py-2.5 rounded-lg flex justify-center items-center w-fit max-h-[30px]'>
          <p className='font-sans font-semibold text-sm uppercase leading-[1.5] whitespace-nowrap'>MOST POPULAR</p>
        </div>
      )}
      <div className={`flex flex-col gap-6 flex-1 ${isFeatured ? 'px-6 md:px-8 pt-8' : ''}`}>
        {/* Card header content wrapper - gap-24px */}
        <div className='flex flex-col gap-6'>
          {/* Card header content - gap-12px */}
          <div className='flex flex-col gap-6'>
            {plan.icon && (
              <div className={`${getIconSize()} relative`} data-tina-field={tinaField(plan, 'icon')}>
                <Image src={plan.icon} alt='' fill className='object-contain' />
              </div>
            )}
            <div className='flex flex-col gap-3'>
              <h3
                data-tina-field={tinaField(plan, 'name')}
                className='font-oswald font-bold text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] uppercase tracking-[-0.4px] leading-[100%] text-[#000]'
              >
                {plan.name}
              </h3>
              <p data-tina-field={tinaField(plan, 'subtitle')} className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-scheme-1-text'>
                {plan.subtitle}
              </p>
            </div>
          </div>

          {/* Price parent div - flex-col, gap-8px */}
          <div className='flex flex-col gap-2 min-h-[119px]'>
            {/* Price container - flex, align-items flex-end, gap-10px */}
            <div className='flex items-end gap-[10px]'>
              {/* Price wrapper - flex, align-items flex-end, gap-10px */}
              <div className='flex flex-wrap items-start md:items-end gap-[10px]'>
                <p
                  data-tina-field={tinaField(plan, 'price')}
                  className='font-oswald font-bold text-[3rem] md:text-[4rem] lg:text-[5.25rem] uppercase tracking-[-0.84px] leading-[100%] text-[#000]'
                >
                  {priceDisplay.mainPrice}
                </p>
                {priceDisplay.discountPrice && (
                  <p
                    data-tina-field={tinaField(plan, 'discountPrice' as any)}
                    className='font-oswald font-bold text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] uppercase tracking-[-0.4px] leading-[100%] text-[#B2B2B2] line-through'
                  >
                    {priceDisplay.discountPrice}
                  </p>
                )}
              </div>
            </div>
            {/* Scholarship note */}
            {(() => {
              const planWithNote = plan as PageBlocksFbcPricingPlans & { scholarshipNote?: string | null };
              const scholarshipNote = planWithNote.scholarshipNote;
              const displayNote = scholarshipNote || (isFullCourse ? '*Pass the entry test to get the discounted price' : null);
              if (!displayNote) return null;
              return (
                <p data-tina-field={tinaField(plan, 'scholarshipNote' as any)} className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[150%] text-[#4C4C4C]'>
                  {displayNote}
                </p>
              );
            })()}
          </div>
        </div>

        <div className='h-px bg-scheme-1-border' />

        <div className='flex flex-col gap-3 md:gap-4'>
          <div className='flex flex-col gap-3 md:gap-4 py-2'>
            {plan.features?.map((feature, index) => (
              <FeatureItem key={index} feature={feature!} />
            ))}
          </div>
        </div>
      </div>

      <div className={isFeatured ? 'px-6 md:px-8' : 'h-20'}>
        <Button asChild className='w-full bg-red text-white mt-6 md:mt-8'>
          <MailtoLink encodedEmail={encodedContactEmail} encodedCc={encodedContactCc} subject={mailto.subject} body={mailto.body}>
            {plan.ctaLabel || 'Apply now'}
          </MailtoLink>
        </Button>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: PageBlocksFbcPricingPlansFeatures }) => {
  return (
    <div className='flex gap-3 md:gap-4 items-start'>
      <svg className='w-5 h-5 md:w-6 md:h-6 text-red shrink-0' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' />
      </svg>
      <p className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] leading-[1.5] text-scheme-1-text'>{feature.text}</p>
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
          name: 'Full Course Access',
          price: '$12,000',
          discountPrice: '$12,000',
          subtitle: 'Immerse yourself in our 12-week intensive fullstack developer program. Scholarship price available: $9,000 after passing entry test.',
          icon: '',
          ctaLabel: 'Apply now',
          ctaLink: '/apply',
          emailSubject: 'FireBootCamp \u2013 Apply Now',
          emailBody: "I'd like to apply for the Full Course at FireBootCamp!",
          scholarshipNote: '*Pass the entry test to get the discounted price',
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
          name: '1-Day Trial Session',
          price: '$100',
          subtitle: 'Shadow a developer for 1 day to get a taste of the course.',
          icon: '',
          ctaLabel: 'Book trial day',
          ctaLink: '/apply',
          emailSubject: 'FireBootCamp \u2013 Book Trial Day',
          emailBody: "I'd like to book a 1-Day Trial Session at FireBootCamp!",
          features: [{ text: '1 day shadowing a developer' }, { text: 'Attend daily team meeting' }, { text: 'Exposure to tech ecosystem' }],
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
          label: 'Discount Price',
          name: 'discountPrice',
          description: 'Optional: Original price to show with strikethrough (e.g., $12,000)',
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
          type: 'string',
          label: 'Email Subject',
          name: 'emailSubject',
          description: 'Subject line for the mailto link',
        },
        {
          type: 'string',
          label: 'Email Body',
          name: 'emailBody',
          description: 'Email body template for mailto link. Use [Plan Name] as placeholder. Site URL is appended automatically.',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'boolean',
          label: 'Featured',
          name: 'isFeatured',
        },
        {
          type: 'string',
          label: 'Scholarship Note',
          name: 'scholarshipNote',
          description: 'Optional: Note text to display below the price (e.g., "*Pass the entry test to get the discounted price")',
          ui: {
            component: 'textarea',
          },
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

'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCtaBanner } from '../../tina/__generated__/types';
import { useLayout } from '../layout/layout-context';
import { Button } from '../ui/button';

export const FbcCtaBanner = ({ data }: { data: PageBlocksFbcCtaBanner }) => {
  const { globalSettings } = useLayout();
  const contactEmail = globalSettings?.contactEmail || 'pennywalker@ssw.com.au';
  const contactCc = globalSettings?.contactCc || 'adamcogan@ssw.com.au';
  const siteUrl = globalSettings?.siteUrl || 'https://firebootcamp.com.au';
  const subject = data.emailSubject || 'FireBootCamp \u2013 Let\u2019s Talk';
  const body = data.emailBody || `I'm interested in FireBootCamp, let's schedule a time to chat!\n\n${siteUrl}`;
  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&cc=${encodeURIComponent(contactCc)}&body=${encodeURIComponent(body.includes(siteUrl) ? body : `${body}\n\n${siteUrl}`)}`;

  return (
    <section className='bg-scheme-4-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='bg-scheme-4-foreground rounded-lg p-6 md:p-8 lg:p-12 relative'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <h2
                data-tina-field={tinaField(data, 'title')}
                className='font-oswald font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-4-text'
              >
                {data.title}
              </h2>
              <p
                data-tina-field={tinaField(data, 'description')}
                className='font-sans text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5] text-scheme-4-text'
              >
                {data.description}
              </p>
            </div>

            <div className='w-full lg:w-[513px] flex flex-col gap-4'>
              <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <label htmlFor='cta-banner-email' className='sr-only'>
                  Email address
                </label>
                <input
                  id='cta-banner-email'
                  type='email'
                  placeholder={data.emailPlaceholder || 'Enter your email address'}
                  className='flex-1 min-h-[51px] px-3 bg-white/10 rounded-md font-sans text-[16px] md:text-[18px] leading-[1.5] text-scheme-4-text border-0 placeholder:!text-white/80'
                />
                <Button asChild variant='tertiary' className='whitespace-nowrap w-full sm:w-fit sm:shrink-0'>
                  <a href={mailtoLink}>{data.buttonLabel || 'Submit'}</a>
                </Button>
              </div>
            </div>
          </div>

          {/* SophieBot character - absolutely positioned at bottom-right */}
          <div className='absolute bottom-0 right-0 w-[418px] h-[325px] hidden lg:block pointer-events-none'>
            <Image src='/uploads/sophiebot.png' alt='' fill className='object-contain object-center' />
          </div>
        </div>
      </div>
    </section>
  );
};

export const fbcCtaBannerBlockSchema: Template = {
  name: 'fbcCtaBanner',
  label: 'FBC CTA Banner',
  ui: {
    previewSrc: '/blocks/cta.png',
    defaultItem: {
      title: 'Your code. Your future. Now.',
      description: 'Take the first step towards a transformative developer career',
      emailPlaceholder: 'Enter your email address',
      buttonLabel: 'Submit',
      emailSubject: 'FireBootCamp \u2013 Let\u2019s Talk',
      emailBody: "I'm interested in FireBootCamp, let's schedule a time to chat!",
      disclaimer: "By submitting, you're committing to a breakthrough in your software development career.",
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
      type: 'string',
      label: 'Email Placeholder',
      name: 'emailPlaceholder',
    },
    {
      type: 'string',
      label: 'Button Label',
      name: 'buttonLabel',
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
      description: 'Body text for the mailto link. Site URL is appended automatically.',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Disclaimer',
      name: 'disclaimer',
    },
  ],
};

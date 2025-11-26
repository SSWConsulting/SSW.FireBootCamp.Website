'use client';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCtaBanner } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcCtaBanner = ({ data }: { data: PageBlocksFbcCtaBanner }) => {
  return (
    <section className="bg-scheme-4-background px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-scheme-4-foreground rounded-lg p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center">
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h2
              data-tina-field={tinaField(data, 'title')}
              className="font-oswald font-bold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] uppercase tracking-[-0.48px] leading-none text-scheme-4-text"
            >
              {data.title}
            </h2>
            <p
              data-tina-field={tinaField(data, 'description')}
              className="font-sans text-[14px] md:text-[16px] lg:text-[20px] leading-[1.5] text-scheme-4-text"
            >
              {data.description}
            </p>
          </div>

          <div className="w-full lg:w-[513px] flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input
                type="email"
                placeholder={data.emailPlaceholder || 'Enter your email address'}
                className="flex-1 h-10 md:h-12 px-3 bg-scheme-4-border rounded-md font-sans text-[14px] md:text-[16px] lg:text-[18px] leading-[1.5] text-scheme-4-text border-0 placeholder:text-scheme-4-text/60"
              />
              <Button className="bg-scheme-4-accent hover:bg-scheme-4-accent/90 text-scheme-4-background whitespace-nowrap">
                {data.buttonLabel || 'Commit'}
              </Button>
            </div>
            <p
              data-tina-field={tinaField(data, 'disclaimer')}
              className="font-sans text-[11px] md:text-[12px] leading-[1.5] text-scheme-4-text"
            >
              {data.disclaimer}
            </p>
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
      buttonLabel: 'Commit',
      disclaimer: 'By submitting, you commit to becoming a professional software developer',
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
      label: 'Disclaimer',
      name: 'disclaimer',
    },
  ],
};


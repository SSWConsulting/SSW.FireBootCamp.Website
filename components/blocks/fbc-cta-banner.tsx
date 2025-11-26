'use client';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCtaBanner } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcCtaBanner = ({ data }: { data: PageBlocksFbcCtaBanner }) => {
  return (
    <section className="bg-fbc-red px-16 py-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-fbc-red-dark rounded-lg p-12 flex gap-8 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <h2
              data-tina-field={tinaField(data, 'title')}
              className="font-oswald font-bold text-5xl uppercase tracking-tight leading-none text-white"
            >
              {data.title}
            </h2>
            <p
              data-tina-field={tinaField(data, 'description')}
              className="text-xl leading-relaxed text-white"
            >
              {data.description}
            </p>
          </div>

          <div className="w-[513px] flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder={data.emailPlaceholder || 'Enter your email address'}
                className="flex-1 h-12 px-3 bg-white/10 rounded-md text-lg text-white border-0 placeholder:text-white/60"
              />
              <Button className="h-12 bg-white hover:bg-white/90 text-black px-6 rounded-md text-lg font-medium">
                {data.buttonLabel || 'Commit'}
              </Button>
            </div>
            <p
              data-tina-field={tinaField(data, 'disclaimer')}
              className="text-xs text-white"
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


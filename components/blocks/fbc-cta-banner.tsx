'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCtaBanner } from '../../tina/__generated__/types';

export const FbcCtaBanner = ({ data }: { data: PageBlocksFbcCtaBanner }) => {
  return (
    <section className='bg-scheme-4-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='bg-scheme-4-foreground rounded-lg p-6 md:p-8 lg:p-12 relative'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <h2
                data-tina-field={tinaField(data, 'title')}
                className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-4-text'
              >
                {data.title}
              </h2>
              <p
                data-tina-field={tinaField(data, 'description')}
                className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-scheme-4-text'
              >
                {data.description}
              </p>
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
  ],
};

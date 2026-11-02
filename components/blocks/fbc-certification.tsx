'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCertification } from '../../tina/__generated__/types';

export const FbcCertification = ({ data }: { data: PageBlocksFbcCertification }) => {
  return (
    <section className='bg-scheme-1-background px-6 md:px-16 lg:px-16 pt-16 md:pt-24 lg:pt-16 pb-16 md:pb-24 lg:pb-32'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='flex flex-col lg:flex-row-reverse gap-8 md:gap-12 items-center justify-center'>
          {data.badgeImage && (
            <div
              className='w-full max-w-[300px] md:max-w-[400px] lg:w-[530px] aspect-[530/435] relative shrink-0'
              data-tina-field={tinaField(data, 'badgeImage')}
            >
              <Image src={data.badgeImage} alt='SSW Qualified Developer Badge' fill className='object-contain' />
            </div>
          )}

          <div className='flex-1 max-w-full lg:max-w-[560px] flex flex-col gap-6 md:gap-8 items-center lg:items-start'>
            <div className='flex flex-col gap-4 md:gap-6 items-center lg:items-start'>
              <h2
                data-tina-field={tinaField(data, 'title')}
                className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-1-text text-center lg:text-left'
              >
                {data.title}
              </h2>
              <p
                data-tina-field={tinaField(data, 'description')}
                className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.25rem] leading-[1.5] text-scheme-1-text whitespace-pre-line text-center lg:text-left max-w-[560px]'
              >
                {data.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export const fbcCertificationBlockSchema: Template = {
  name: 'fbcCertification',
  label: 'FBC Certification',
  ui: {
    previewSrc: '/blocks/cta.png',
    defaultItem: {
      title: 'Get certified as an SSW Qualified Developer',
      description:
        'After completing FireBootCamp, you will earn a certification as an SSW Qualified Developer!\nWhich can be validated, recognised and shared on social media platforms.',
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
      type: 'image',
      label: 'Badge Image',
      name: 'badgeImage',
    },
  ],
};

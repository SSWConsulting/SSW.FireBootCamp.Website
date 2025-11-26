'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcCertification } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcCertification = ({ data }: { data: PageBlocksFbcCertification }) => {
  return (
    <section className="bg-scheme-1-background px-16 py-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-12 items-start justify-center">
          {data.badgeImage && (
            <div className="w-[526px] h-[437px] relative shrink-0" data-tina-field={tinaField(data, 'badgeImage')}>
              <Image src={data.badgeImage} alt="SSW Qualified Developer Badge" fill className="object-contain" />
            </div>
          )}

          <div className="flex-1 max-w-[560px] flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2
                data-tina-field={tinaField(data, 'title')}
                className="font-oswald font-bold text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-1-text"
              >
                {data.title}
              </h2>
              <p
                data-tina-field={tinaField(data, 'description')}
                className="font-sans text-[20px] leading-[1.5] text-scheme-1-text whitespace-pre-line"
              >
                {data.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-[513px]">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder={data.emailPlaceholder || 'Enter your email address'}
                  className="flex-1 px-3 py-2 bg-black/5 rounded-md font-sans text-[18px] leading-[1.5] border-0 placeholder:text-black/60"
                />
                <Button className="bg-red hover:bg-red-dark text-white">
                  {data.buttonLabel || 'Commit'}
                </Button>
              </div>
              <p
                data-tina-field={tinaField(data, 'disclaimer')}
                className="font-sans text-[12px] leading-[1.5] text-scheme-1-text"
              >
                {data.disclaimer}
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
      description: 'After completing FireBootCamp, you will earn a certification as an SSW Qualified Developer!\nWhich can be validated, recognised and shared on social media platforms.',
      emailPlaceholder: 'Enter your email address',
      buttonLabel: 'Commit',
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
      type: 'image',
      label: 'Badge Image',
      name: 'badgeImage',
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


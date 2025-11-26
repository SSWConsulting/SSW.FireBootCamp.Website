'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcHero } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcHero = ({ data }: { data: PageBlocksFbcHero }) => {
  return (
    <section className="relative min-h-[800px] flex flex-col gap-20 items-start justify-center px-16 py-32 overflow-hidden">
      {data.backgroundImage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            className="object-cover mix-blend-luminosity opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-col gap-20">
        <div className="max-w-[1024px]">
          <h1
            data-tina-field={tinaField(data, 'headline')}
            className="font-oswald font-bold text-white uppercase tracking-tight leading-none"
          >
            <span className="font-jetbrains font-thin text-[108px] text-white tracking-[-1.08px]">&lt;</span>
            <span className="text-fbc-red text-[84px] tracking-[-0.84px]">Code</span>
            <span className="font-jetbrains font-thin text-[108px] text-white tracking-[-1.08px]">&gt;</span>
            <span className="text-[84px] tracking-[-0.84px]"> {data.headline}</span>
          </h1>
        </div>

        <div className="flex flex-col gap-4 items-end w-full">
          <div className="flex flex-col gap-8 items-start max-w-[560px]">
            <p
              data-tina-field={tinaField(data, 'description')}
              className="text-white text-xl leading-relaxed"
            >
              {data.description}
            </p>

            {data.ctaLabel && (
              <Button
                asChild
                data-tina-field={tinaField(data, 'ctaLabel')}
                className="bg-fbc-red hover:bg-fbc-red-dark text-white px-6 py-2.5 rounded-md text-lg font-medium"
              >
                <Link href={data.ctaLink || '#'}>{data.ctaLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const fbcHeroBlockSchema: Template = {
  name: 'fbcHero',
  label: 'FBC Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      headline: 'your way to a professional career in software development',
      description: 'After 12-weeks of intense training you will emerge as a professional fullstack developer. Master enterprise-grade technologies and transform your potential into a powerful technical skill set, ready for real-world challenges.',
      ctaLabel: 'Apply now',
      ctaLink: '/apply',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
      description: 'Text that appears after "<Code>"',
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
      label: 'Background Image',
      name: 'backgroundImage',
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
  ],
};


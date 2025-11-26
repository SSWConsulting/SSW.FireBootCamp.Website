'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcHero } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { useLayout } from '../layout/layout-context';

export const FbcHero = ({ data }: { data: PageBlocksFbcHero }) => {
  const { globalSettings } = useLayout();
  const contactEmail = globalSettings?.contactEmail || 'pennywalker@ssw.com.au';
  const contactSubject = globalSettings?.contactSubject || "SSW Firebootcamp - Let's chat";
  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`;
  
  const hasVideo = !!data.backgroundVideo;
  const hasImage = !!data.backgroundImage;

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[800px] flex flex-col gap-10 md:gap-16 lg:gap-20 items-start justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 overflow-hidden">
      {(hasVideo || hasImage) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          {hasVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-50"
            >
              <source src={data.backgroundVideo!} type="video/webm" />
            </video>
          ) : hasImage ? (
            <Image
              src={data.backgroundImage!}
              alt=""
              fill
              className="object-cover mix-blend-luminosity opacity-50"
              priority
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20">
        <div className="max-w-full lg:max-w-[1024px]">
          <h1
            data-tina-field={tinaField(data, 'headline')}
            className="font-oswald font-bold text-white uppercase tracking-tight leading-none"
          >
            <span className="font-jetbrains font-thin text-[40px] sm:text-[60px] md:text-[80px] lg:text-[108px] text-white tracking-[-1.08px]">&lt;</span>
            <span className="text-fbc-red text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] tracking-[-0.84px]">Code</span>
            <span className="font-jetbrains font-thin text-[40px] sm:text-[60px] md:text-[80px] lg:text-[108px] text-white tracking-[-1.08px]">&gt;</span>
            <span className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] tracking-[-0.84px]"> {data.headline}</span>
          </h1>
        </div>

        <div className="flex flex-col gap-4 items-start lg:items-end w-full">
          <div className="flex flex-col gap-6 md:gap-8 items-start max-w-full lg:max-w-[560px]">
            <p
              data-tina-field={tinaField(data, 'description')}
              className="font-sans text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5]"
            >
              {data.description}
            </p>

            {data.ctaLabel && (
              <Button
                asChild
                data-tina-field={tinaField(data, 'ctaLabel')}
                className="bg-red hover:bg-red-dark text-white"
              >
                <a href={mailtoLink}>{data.ctaLabel}</a>
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
      description: 'Fallback image if no video is provided',
    },
    {
      type: 'image',
      label: 'Background Video',
      name: 'backgroundVideo',
      description: 'WebM video that auto-plays and loops (takes priority over image)',
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


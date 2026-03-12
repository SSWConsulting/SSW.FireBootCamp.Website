'use client';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcHero } from '../../tina/__generated__/types';

export const FbcHero = ({ data }: { data: PageBlocksFbcHero }) => {
  const hasVideo = !!data.backgroundVideo;
  const hasImage = !!data.backgroundImage;

  return (
    <section className='relative min-h-[80vh] flex flex-col gap-10 md:gap-16 lg:gap-20 items-start justify-center px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      {(hasVideo || hasImage) && (
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute inset-0 bg-black' />
          {hasVideo ? (
            <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-50'>
              <source src={data.backgroundVideo!} type='video/webm' />
            </video>
          ) : hasImage ? (
            <Image src={data.backgroundImage!} alt='' fill className='object-cover mix-blend-luminosity opacity-50' priority />
          ) : null}
          <div className='absolute inset-0 bg-black/60' />
        </div>
      )}

      <div className='relative z-10 max-w-[1440px] w-full mx-auto flex flex-col gap-16 h-full justify-start items-start'>
        <div className='max-w-full lg:max-w-[1024px]'>
          <h1 data-tina-field={tinaField(data, 'headline')} className='font-oswald font-bold text-white uppercase tracking-tight leading-none'>
            <span className='font-jetbrains font-thin text-[2.5rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[6.75rem] text-white tracking-[-1.08px]'>&lt;</span>
            <span className='text-fbc-red text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.25rem] tracking-[-0.84px]'>Code</span>
            <span className='font-jetbrains font-thin text-[2.5rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[6.75rem] text-white tracking-[-1.08px]'>&gt;</span>
            <span className='text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.25rem] tracking-[-0.84px] lg:leading-[5.9375rem]'> {data.headline}</span>
          </h1>
        </div>

        <p
          data-tina-field={tinaField(data, 'description')}
          className='font-sans text-white text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] w-full max-w-full lg:max-w-[560px]'
        >
          {data.description}
        </p>

        <div className='flex flex-col gap-4 items-start lg:items-end w-full'>
          <a
            href='#pricing'
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label='Scroll to pricing section'
            className='flex gap-6 items-center rounded-md overflow-visible cursor-pointer transition-all hover:brightness-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            <div className='px-0 h-full w-fit flex items-center justify-center'>
              <span
                data-tina-field={tinaField(data, 'ctaLabel')}
                className='font-oswald font-bold text-white text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] uppercase leading-none tracking-[-0.4px] w-fit h-fit'
              >
                {data.ctaLabel || 'Continue'}
              </span>
            </div>
            <div className='bg-red w-16 h-[62px] pt-[3px] flex items-center justify-center gap-2.5 rounded-lg shadow-[0_4px_0_0_#A33434]'>
              <ChevronDown className='text-white size-6' aria-hidden='true' />
            </div>
          </a>
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
      description:
        'After 12-weeks of intense training you will emerge as a professional fullstack developer. Master enterprise-grade technologies and transform your potential into a powerful technical skill set, ready for real-world challenges.',
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

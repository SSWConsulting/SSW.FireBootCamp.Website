'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaGithub, FaGlobe, FaLinkedin, FaStar } from 'react-icons/fa6';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type {
  PageBlocksFbcTestimonialSlider,
  PageBlocksFbcTestimonialSliderTestimonials,
  PageBlocksFbcTestimonialSliderTestimonialsSocials,
} from '../../tina/__generated__/types';

export const FbcTestimonialSlider = ({ data }: { data: PageBlocksFbcTestimonialSlider }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = (data.testimonials || []).filter(
    (t): t is PageBlocksFbcTestimonialSliderTestimonials => t != null
  );

  if (testimonials.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className='bg-scheme-1-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32 overflow-hidden'>
      <div className='max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-8'>
        {/* Scrolling carousel viewport */}
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-500 ease-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='w-full flex-shrink-0 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-20 items-center'
              >
                {testimonial.image && (
                  <div className='w-full md:w-1/2 aspect-square relative rounded-lg overflow-hidden shrink-0'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author || 'Testimonial author'}
                      fill
                      className='object-cover'
                      data-tina-field={tinaField(testimonial, 'image')}
                    />
                  </div>
                )}

                <div className='w-full md:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8'>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className='w-4 h-4 md:w-5 md:h-5 text-yellow-400' aria-hidden='true' />
                    ))}
                  </div>

                  <blockquote
                    data-tina-field={tinaField(testimonial, 'quote')}
                    className='font-oswald font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] uppercase tracking-[-0.32px] leading-[1.1] text-scheme-1-text'
                  >
                    {testimonial.quote}
                  </blockquote>

                  <div className='flex gap-8 items-center'>
                    <div className='flex flex-col whitespace-nowrap'>
                      <p
                        data-tina-field={tinaField(testimonial, 'author')}
                        className='font-sans text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-[1.5] text-scheme-1-text'
                      >
                        {testimonial.author}
                      </p>
                      <p
                        data-tina-field={tinaField(testimonial, 'role')}
                        className='font-sans text-[14px] md:text-[16px] lg:text-[18px] leading-[1.5] text-scheme-1-text'
                      >
                        {testimonial.role}
                      </p>
                    </div>

                    {testimonial.socials && testimonial.socials.length > 0 && (
                      <>
                        <div className='w-px h-16 bg-scheme-1-border shrink-0' />
                        <div className='flex gap-4' data-tina-field={tinaField(testimonial, 'socials')}>
                          {testimonial.socials.map((social, socialIndex) =>
                            social ? (
                              <SocialLink key={socialIndex} social={social} />
                            ) : null
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows - always fixed outside scroll */}
        <div className='flex items-center justify-end'>
          <div className='flex gap-2 md:gap-4'>
            <button
              onClick={goToPrevious}
              aria-label='Previous testimonial'
              className='p-2 md:p-3 bg-scheme-3-background hover:bg-scheme-1-border rounded transition-colors cursor-pointer'
            >
              <FaChevronLeft className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
            </button>
            <button
              onClick={goToNext}
              aria-label='Next testimonial'
              className='p-2 md:p-3 bg-scheme-3-background hover:bg-scheme-1-border rounded transition-colors cursor-pointer'
            >
              <FaChevronRight className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ social }: { social: PageBlocksFbcTestimonialSliderTestimonialsSocials }) => {
  const getIcon = (platform: string | null | undefined) => {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return <FaLinkedin className='size-6' aria-hidden='true' />;
      case 'github':
        return <FaGithub className='size-6' aria-hidden='true' />;
      case 'globe':
      case 'website':
        return <FaGlobe className='size-6' aria-hidden='true' />;
      default:
        return null;
    }
  };

  const icon = getIcon(social.platform);
  if (!icon || !social.url) return null;

  const platformLabel =
    social.platform?.toLowerCase() === 'linkedin'
      ? 'LinkedIn profile'
      : social.platform?.toLowerCase() === 'github'
        ? 'GitHub profile'
        : social.platform?.toLowerCase() === 'globe'
          ? 'Personal website'
          : 'Social link';

  return (
    <a
      href={social.url}
      target='_blank'
      rel='noopener noreferrer'
      className='bg-scheme-1-foreground border border-scheme-1-background rounded p-3 flex items-center justify-center text-scheme-1-text hover:bg-scheme-1-border transition-colors cursor-pointer'
      aria-label={platformLabel}
    >
      {icon}
    </a>
  );
};

export const fbcTestimonialSliderBlockSchema: Template = {
  name: 'fbcTestimonialSlider',
  label: 'FBC Testimonial Slider',
  ui: {
    previewSrc: '/blocks/testimonial.png',
    defaultItem: {
      testimonials: [
        {
          quote:
            "As someone without a background in programming, this opportunity not only introduced me to the essential fundamentals of coding but also provided comprehensive insights into both backend and frontend development. It's truly been the highlight of my learning journey.",
          author: 'Jeoffrey Fischer',
          role: 'Senior Software Engineer',
          image: '',
        },
      ],
    },
  },
  fields: [
    {
      type: 'object',
      label: 'Testimonials',
      name: 'testimonials',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.author }),
      },
      fields: [
        {
          type: 'string',
          label: 'Quote',
          name: 'quote',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          label: 'Author',
          name: 'author',
        },
        {
          type: 'string',
          label: 'Role',
          name: 'role',
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
        },
        {
          type: 'object',
          label: 'Social Links',
          name: 'socials',
          list: true,
          fields: [
            {
              type: 'string',
              label: 'Platform',
              name: 'platform',
              options: ['linkedin', 'github', 'globe'],
            },
            {
              type: 'string',
              label: 'URL',
              name: 'url',
            },
          ],
        },
      ],
    },
  ],
};

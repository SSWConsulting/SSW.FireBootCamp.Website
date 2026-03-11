'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type {
  PageBlocksFbcTestimonialSlider,
  PageBlocksFbcTestimonialSliderTestimonials,
  PageBlocksFbcTestimonialSliderTestimonialsSocials,
} from '../../tina/__generated__/types';
import { AutoLink } from '../ui/link';

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
                      <svg key={i} className='w-4 h-4 md:w-5 md:h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
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
              <svg className='w-5 h-5 md:w-6 md:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </button>
            <button
              onClick={goToNext}
              aria-label='Next testimonial'
              className='p-2 md:p-3 bg-scheme-3-background hover:bg-scheme-1-border rounded transition-colors cursor-pointer'
            >
              <svg className='w-5 h-5 md:w-6 md:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
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
        return (
          <svg className='size-6' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.5 3.24268C3.67157 3.24268 3 3.91425 3 4.74268V19.7427C3 20.5711 3.67157 21.2427 4.5 21.2427H19.5C20.3284 21.2427 21 20.5711 21 19.7427V4.74268C21 3.91425 20.3284 3.24268 19.5 3.24268H4.5ZM8.52076 7.2454C8.52639 8.20165 7.81061 8.79087 6.96123 8.78665C6.16107 8.78243 5.46357 8.1454 5.46779 7.24681C5.47201 6.40165 6.13998 5.72243 7.00764 5.74212C7.88795 5.76181 8.52639 6.40728 8.52076 7.2454ZM12.2797 10.0044H9.75971H9.7583V18.5643H12.4217V18.3646C12.4217 17.9847 12.4214 17.6047 12.4211 17.2246C12.4203 16.2108 12.4194 15.1959 12.4246 14.1824C12.426 13.9363 12.4372 13.6804 12.5005 13.4455C12.7381 12.568 13.5271 12.0013 14.4074 12.1406C14.9727 12.2291 15.3467 12.5568 15.5042 13.0898C15.6013 13.423 15.6449 13.7816 15.6491 14.129C15.6605 15.1766 15.6589 16.2242 15.6573 17.2719C15.6567 17.6417 15.6561 18.0117 15.6561 18.3815V18.5629H18.328V18.3576C18.328 17.9056 18.3278 17.4537 18.3275 17.0018C18.327 15.8723 18.3264 14.7428 18.3294 13.6129C18.3308 13.1024 18.276 12.599 18.1508 12.1054C17.9638 11.3713 17.5771 10.7638 16.9485 10.3251C16.5027 10.0129 16.0133 9.81178 15.4663 9.78928C15.404 9.78669 15.3412 9.7833 15.2781 9.77989C14.9984 9.76477 14.7141 9.74941 14.4467 9.80334C13.6817 9.95662 13.0096 10.3068 12.5019 10.9241C12.4429 10.9949 12.3852 11.0668 12.2991 11.1741L12.2797 11.1984V10.0044ZM5.68164 18.5671H8.33242V10.01H5.68164V18.5671Z'
              fill='currentColor'
            />
          </svg>
        );
      case 'github':
        return (
          <svg className='size-6' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z'
              fill='currentColor'
            />
          </svg>
        );
      case 'globe':
      case 'website':
        return (
          <svg className='size-6' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3M12 21C14.761 21 15.941 15.837 15.941 12C15.941 8.163 14.761 3 12 3M12 21C9.239 21 8.059 15.837 8.059 12C8.059 8.163 9.239 3 12 3M3.5 9H20.5M3.5 15H20.5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        );
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
    <AutoLink
      href={social.url}
      className='bg-scheme-1-foreground border border-scheme-1-background rounded p-3 flex items-center justify-center text-scheme-1-text hover:bg-scheme-1-border transition-colors cursor-pointer'
      aria-label={platformLabel}
    >
      {icon}
    </AutoLink>
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

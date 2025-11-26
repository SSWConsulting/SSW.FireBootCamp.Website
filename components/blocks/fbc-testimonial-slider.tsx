'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTestimonialSlider, PageBlocksFbcTestimonialSliderTestimonials } from '../../tina/__generated__/types';

export const FbcTestimonialSlider = ({ data }: { data: PageBlocksFbcTestimonialSlider }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = data.testimonials || [];
  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (!currentTestimonial) return null;

  return (
    <section className="bg-scheme-1-background px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        <div className="flex gap-20 items-center">
          {currentTestimonial.image && (
            <div className="w-[616px] h-[640px] relative rounded-lg overflow-hidden shrink-0">
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.author || ''}
                fill
                className="object-cover"
                data-tina-field={tinaField(currentTestimonial, 'image')}
              />
            </div>
          )}

          <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote
              data-tina-field={tinaField(currentTestimonial, 'quote')}
              className="font-oswald font-bold text-[32px] uppercase tracking-[-0.32px] leading-[1.1] text-scheme-1-text"
            >
              {currentTestimonial.quote}
            </blockquote>

            <div className="flex gap-5 items-center">
              <div className="flex flex-col">
                <p
                  data-tina-field={tinaField(currentTestimonial, 'author')}
                  className="font-sans text-[18px] font-semibold leading-[1.5] text-scheme-1-text"
                >
                  {currentTestimonial.author}
                </p>
                <p
                  data-tina-field={tinaField(currentTestimonial, 'role')}
                  className="font-sans text-[18px] leading-[1.5] text-scheme-1-text"
                >
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-scheme-1-text' : 'bg-scheme-1-text/30'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={goToPrevious}
              className="p-3 bg-scheme-3-background hover:bg-scheme-1-border rounded transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="p-3 bg-scheme-3-background hover:bg-scheme-1-border rounded transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
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
          quote: "As someone without a background in programming, this opportunity not only introduced me to the essential fundamentals of coding but also provided comprehensive insights into both backend and frontend development. It's truly been the highlight of my learning journey.",
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
      ],
    },
  ],
};


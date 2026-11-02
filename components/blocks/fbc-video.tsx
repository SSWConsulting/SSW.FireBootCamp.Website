'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcVideo, PageBlocksFbcVideoVideos } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcVideo = ({ data }: { data: PageBlocksFbcVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = (data.videos || []).filter((v): v is PageBlocksFbcVideoVideos => !!v?.videoUrl);

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));

  return (
    <section className='bg-scheme-3-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      <div className='max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-16 lg:gap-10 items-center'>
        <div className='max-w-full md:max-w-[768px] text-center flex flex-col gap-6 md:gap-8 items-center'>
          <div className='flex flex-col gap-4 md:gap-6'>
            <h2
              data-tina-field={tinaField(data, 'title')}
              className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-3-text'
            >
              {data.title}
            </h2>
            <p
              data-tina-field={tinaField(data, 'description')}
              className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.25rem] leading-[1.5] text-scheme-3-text'
            >
              {data.description}
            </p>
          </div>
        </div>

        {videos.length > 0 && (
          <div className='w-full max-w-[1280px] flex flex-col gap-4'>
            {videos.length > 1 && (
              <div className='flex gap-2 md:gap-4 justify-end'>
                <button
                  type='button'
                  onClick={goToPrevious}
                  aria-label='Previous video'
                  className='p-2 md:p-3 bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.12)] text-scheme-3-text rounded transition-colors cursor-pointer'
                >
                  <FaChevronLeft className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
                </button>
                <button
                  type='button'
                  onClick={goToNext}
                  aria-label='Next video'
                  className='p-2 md:p-3 bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.12)] text-scheme-3-text rounded transition-colors cursor-pointer'
                >
                  <FaChevronRight className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
                </button>
              </div>
            )}

            <div className='w-full rounded-lg overflow-hidden shadow-[0_0_8.4px_3px_rgba(0,0,0,0.25)]'>
              <div
                className='flex transition-transform duration-500 ease-out'
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {videos.map((video, index) => (
                  <div key={index} className='w-full flex-shrink-0 aspect-video' data-tina-field={tinaField(video, 'videoUrl')}>
                    <iframe
                      src={video.videoUrl!}
                      title={video.title || data.title || `Video ${index + 1}`}
                      className='w-full h-full'
                      loading='lazy'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.secondaryLabel && (
          <Button
            asChild
            variant='secondary'
            data-tina-field={tinaField(data, 'secondaryLabel')}
            className='bg-[rgba(0,0,0,0.05)] border border-transparent hover:bg-[rgba(0,0,0,0.12)] text-scheme-3-text w-full sm:w-fit sm:shrink-0'
          >
            <Link href={data.secondaryLink || '#'} target='_blank' rel='noopener noreferrer'>
              {data.secondaryLabel}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export const fbcVideoBlockSchema: Template = {
  name: 'fbcVideo',
  label: 'FBC Video',
  ui: {
    previewSrc: '/blocks/video.png',
    defaultItem: {
      title: 'A day in the life of a software consultant at SSW',
      description: 'Dive into an overview of FireBootCamp in the video below.',
      secondaryLabel: '🟥 More videos on YouTube playlist',
      secondaryLink: 'https://www.youtube.com/@SSWTV',
      videos: [{ title: 'Example video', videoUrl: 'https://www.youtube.com/embed/example' }],
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
      label: 'Watch Button Label',
      name: 'watchLabel',
    },
    {
      type: 'string',
      label: 'Secondary Link Label',
      name: 'secondaryLabel',
    },
    {
      type: 'string',
      label: 'Secondary Link URL',
      name: 'secondaryLink',
    },
    {
      type: 'object',
      label: 'Videos',
      name: 'videos',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Video URL',
          name: 'videoUrl',
          description: 'YouTube embed URL',
        },
      ],
    },
    {
      type: 'image',
      label: 'Thumbnail',
      name: 'thumbnail',
    },
  ],
};

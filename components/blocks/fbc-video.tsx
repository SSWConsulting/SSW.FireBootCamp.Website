'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcVideo } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

export const FbcVideo = ({ data }: { data: PageBlocksFbcVideo }) => {
  return (
    <section className="bg-fbc-gray px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20 items-center">
        <div className="max-w-[768px] text-center flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-6">
            <h2
              data-tina-field={tinaField(data, 'title')}
              className="font-oswald font-bold text-6xl uppercase tracking-tight leading-none text-black"
            >
              {data.title}
            </h2>
            <p
              data-tina-field={tinaField(data, 'description')}
              className="text-xl leading-relaxed text-black"
            >
              {data.description}
            </p>
          </div>

          <div className="flex gap-6 items-center">
            {data.watchLabel && (
              <Button
                variant="ghost"
                data-tina-field={tinaField(data, 'watchLabel')}
                className="bg-black/5 hover:bg-black/10 text-black px-6 py-2.5 rounded-md text-lg font-medium"
              >
                {data.watchLabel}
              </Button>
            )}
            {data.secondaryLabel && (
              <Link
                href={data.secondaryLink || '#'}
                data-tina-field={tinaField(data, 'secondaryLabel')}
                className="flex items-center gap-2 text-lg font-medium text-black hover:underline"
              >
                {data.secondaryLabel}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {data.videoUrl && (
          <div className="w-full max-w-[1280px] rounded-lg overflow-hidden shadow-[0_0_8.4px_3px_rgba(0,0,0,0.25)]">
            <HeroVideoDialog
              videoSrc={data.videoUrl}
              thumbnailSrc={data.thumbnail || ''}
              thumbnailAlt={data.title || 'Video thumbnail'}
            />
          </div>
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
      watchLabel: 'Watch',
      secondaryLabel: 'More at SSWTV',
      secondaryLink: 'https://tv.ssw.com',
      videoUrl: 'https://www.youtube.com/embed/example',
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
      type: 'string',
      label: 'Video URL',
      name: 'videoUrl',
      description: 'YouTube embed URL',
    },
    {
      type: 'image',
      label: 'Thumbnail',
      name: 'thumbnail',
    },
  ],
};


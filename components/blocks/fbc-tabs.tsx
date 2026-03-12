'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTabs, PageBlocksFbcTabsTabs } from '../../tina/__generated__/types';

export const FbcTabs = ({ data }: { data: PageBlocksFbcTabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = (data.tabs || []).filter((tab): tab is PageBlocksFbcTabsTabs => tab !== null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleTabChange = useCallback(
    (index: number) => {
      if (index === activeTab) return;
      setActiveTab(index);
    },
    [activeTab]
  );

  const goToPrevious = useCallback(() => {
    setActiveTab((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  }, [tabs.length]);

  const goToNext = useCallback(() => {
    setActiveTab((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  }, [tabs.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) && document.activeElement !== sectionRef.current) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <section
      ref={sectionRef}
      id='program'
      className='bg-scheme-1-background px-6 md:px-16 lg:px-16 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-16'
      tabIndex={0}
      aria-label='Program agenda'
    >
      <div className='max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16 items-center'>
        <div className='max-w-full md:max-w-[768px] text-center flex flex-col gap-4 md:gap-6 lg:gap-8'>
          <h2
            data-tina-field={tinaField(data, 'title')}
            className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-1-text'
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-scheme-1-text'>
            {data.description}
          </p>
        </div>

        <div className='w-full flex flex-col gap-8 md:gap-12 lg:gap-16 items-center'>
          <div className='flex flex-wrap gap-3 md:gap-6 items-center justify-center' role='tablist' aria-label='Program tabs'>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                role='tab'
                aria-selected={activeTab === index}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
                className={`px-2 md:px-0 py-2 font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-medium leading-[1.5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 rounded-none ${
                  activeTab === index ? 'text-red border-b-2 border-red font-bold' : 'text-scheme-1-text hover:text-red'
                }`}
              >
                {tab?.title}
              </button>
            ))}
          </div>

          <div className='w-full relative'>
            <div className='w-full bg-scheme-3-background rounded-lg overflow-hidden relative'>
              {/* Scrolling content strip */}
              <div
                className='flex h-full transition-transform duration-500 ease-out'
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
                aria-live='polite'
              >
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className='w-full flex-shrink-0 flex flex-col md:flex-row items-stretch'
                    role='tabpanel'
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                  >
                    <div className='w-full md:w-1/2 aspect-square relative overflow-hidden shrink-0'>
                      {tab.image && (
                        <Image src={tab.image} alt={tab.title || 'Tab content image'} fill className='object-cover' data-tina-field={tinaField(tab, 'image')} />
                      )}
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col py-8 px-6 md:py-12 md:px-10 lg:py-16 lg:px-12 gap-4 md:gap-6 lg:gap-8'>
                      <div className='flex flex-col gap-3 md:gap-4'>
                        <span className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-semibold leading-[1.5] text-scheme-3-text'>{tab.title}</span>
                        <div className='flex flex-col gap-4 md:gap-6'>
                          <h3
                            data-tina-field={tinaField(tab, 'headline')}
                            className='font-oswald font-bold text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] uppercase tracking-[-0.48px] leading-none text-scheme-3-text'
                          >
                            {tab.headline}
                          </h3>
                          <p
                            data-tina-field={tinaField(tab, 'content')}
                            className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.25rem] leading-[1.5] text-scheme-3-text'
                          >
                            {tab.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows - fixed position, outside the scroll strip */}
              <div className='absolute bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-16 lg:right-12 flex gap-2 md:gap-4 z-10'>
                <button
                  onClick={goToPrevious}
                  aria-label='Previous tab'
                  className='p-2 md:p-3 bg-red rounded-[4px] transition-all cursor-pointer hover:brightness-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red min-w-[44px] min-h-[44px] flex items-center justify-center'
                >
                  <ChevronLeft className='w-5 h-5 md:w-6 md:h-6 text-white' aria-hidden='true' />
                </button>
                <button
                  onClick={goToNext}
                  aria-label='Next tab'
                  className='p-2 md:p-3 bg-red rounded-[4px] transition-all cursor-pointer hover:brightness-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red min-w-[44px] min-h-[44px] flex items-center justify-center'
                >
                  <ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-white' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const fbcTabsBlockSchema: Template = {
  name: 'fbcTabs',
  label: 'FBC Tabs',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'Accelerate your developer path',
      description: 'Discover a strategic learning experience designed to transform ambitious developers into industry-ready professionals.',
      tabs: [
        {
          title: 'Why this course',
          headline: 'Build intelligent systems that solve real-world problems',
          content: 'Learn to design robust technical frameworks that solve real-world problems. Develop strategic thinking beyond basic programming skills.',
          image: '',
        },
        {
          title: 'What to expect',
          headline: 'Intensive hands-on training with real projects',
          content: 'Experience 12 weeks of immersive learning with practical exercises and real client projects.',
          image: '',
        },
        {
          title: 'Prerequisites',
          headline: 'Basic programming knowledge recommended',
          content: 'While we accept learners from diverse backgrounds, basic understanding of programming concepts will help you succeed.',
          image: '',
        },
      ],
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
      type: 'object',
      label: 'Tabs',
      name: 'tabs',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
      },
      fields: [
        {
          type: 'string',
          label: 'Tab Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Headline',
          name: 'headline',
        },
        {
          type: 'string',
          label: 'Content',
          name: 'content',
          ui: {
            component: 'textarea',
          },
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

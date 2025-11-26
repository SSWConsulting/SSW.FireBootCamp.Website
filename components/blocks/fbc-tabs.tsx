'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTabs, PageBlocksFbcTabsTabs } from '../../tina/__generated__/types';

export const FbcTabs = ({ data }: { data: PageBlocksFbcTabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState(0);
  const tabs = data.tabs || [];

  const handleTabChange = (index: number) => {
    if (index === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedTab(index);
      setActiveTab(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <section className="bg-scheme-1-background px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16 items-center">
        <div className="max-w-full md:max-w-[768px] text-center flex flex-col gap-4 md:gap-6 lg:gap-8">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-1-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5] text-scheme-1-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full flex flex-col gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="flex flex-wrap gap-3 md:gap-6 items-center justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`px-2 md:px-0 py-2 font-sans text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[1.5] transition-colors ${
                  activeTab === index
                    ? 'text-red border-b-2 border-red font-bold'
                    : 'text-scheme-1-text hover:text-red'
                }`}
              >
                {tab?.title}
              </button>
            ))}
          </div>

          <div className="w-full min-h-[400px] md:min-h-[500px] lg:h-[640px] bg-scheme-3-background rounded-lg overflow-hidden">
            <div 
              className={`h-full transition-opacity duration-200 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {tabs[displayedTab] && <TabContent tab={tabs[displayedTab]!} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TabContent = ({ tab }: { tab: PageBlocksFbcTabsTabs }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="h-[200px] md:h-[250px] lg:h-auto lg:flex-1 relative">
        {tab.image && (
          <Image
            src={tab.image}
            alt=""
            fill
            className="object-cover"
            data-tina-field={tinaField(tab, 'image')}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-4 md:gap-6 lg:gap-8 p-6 md:p-8 lg:p-12 justify-center">
        <div className="flex flex-col gap-3 md:gap-4 max-w-full lg:max-w-[560px]">
          <span className="font-sans text-[14px] md:text-[16px] font-semibold leading-[1.5] text-scheme-3-text">{tab.title}</span>
          <div className="flex flex-col gap-4 md:gap-6">
            <h3
              data-tina-field={tinaField(tab, 'headline')}
              className="font-oswald font-bold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] uppercase tracking-[-0.48px] leading-none text-scheme-3-text"
            >
              {tab.headline}
            </h3>
            <p
              data-tina-field={tinaField(tab, 'content')}
              className="font-sans text-[14px] md:text-[16px] lg:text-[20px] leading-[1.5] text-scheme-3-text"
            >
              {tab.content}
            </p>
          </div>
        </div>
      </div>
    </div>
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


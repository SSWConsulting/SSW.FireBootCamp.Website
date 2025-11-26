'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTabs, PageBlocksFbcTabsTabs } from '../../tina/__generated__/types';

export const FbcTabs = ({ data }: { data: PageBlocksFbcTabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = data.tabs || [];

  return (
    <section className="bg-white px-16 py-32">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16 items-center">
        <div className="max-w-[768px] text-center flex flex-col gap-8">
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

        <div className="w-full flex flex-col gap-16 items-center">
          <div className="flex gap-6 items-center justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-0 py-2 text-lg font-medium transition-colors ${
                  activeTab === index
                    ? 'text-fbc-red border-b-2 border-fbc-red font-bold'
                    : 'text-black hover:text-fbc-red'
                }`}
              >
                {tab?.title}
              </button>
            ))}
          </div>

          <div className="w-full h-[640px] bg-fbc-gray rounded-lg overflow-hidden">
            {tabs[activeTab] && <TabContent tab={tabs[activeTab]!} />}
          </div>
        </div>
      </div>
    </section>
  );
};

const TabContent = ({ tab }: { tab: PageBlocksFbcTabsTabs }) => {
  return (
    <div className="flex h-full">
      <div className="flex-1 relative">
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
      <div className="flex-1 flex flex-col gap-8 p-12 justify-center">
        <div className="flex flex-col gap-4 max-w-[560px]">
          <span className="text-base font-semibold text-black">{tab.title}</span>
          <div className="flex flex-col gap-6">
            <h3
              data-tina-field={tinaField(tab, 'headline')}
              className="font-oswald font-bold text-5xl uppercase tracking-tight leading-none text-black"
            >
              {tab.headline}
            </h3>
            <p
              data-tina-field={tinaField(tab, 'content')}
              className="text-xl leading-relaxed text-black"
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


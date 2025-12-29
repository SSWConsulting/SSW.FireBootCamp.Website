'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTabs, PageBlocksFbcTabsTabs } from '../../tina/__generated__/types';

export const FbcTabs = ({ data }: { data: PageBlocksFbcTabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState(0);
  const tabs = (data.tabs || []).filter((tab): tab is PageBlocksFbcTabsTabs => tab !== null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleTabChange = useCallback((index: number) => {
    if (index === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedTab(index);
      setActiveTab(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  }, [activeTab, isTransitioning]);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isTransitioning) return;
    const newIndex = activeTab === 0 ? tabs.length - 1 : activeTab - 1;
    handleTabChange(newIndex);
  }, [activeTab, isTransitioning, tabs.length, handleTabChange]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    if (isTransitioning) return;
    const newIndex = activeTab === tabs.length - 1 ? 0 : activeTab + 1;
    handleTabChange(newIndex);
  }, [activeTab, isTransitioning, tabs.length, handleTabChange]);

  const goToIndex = (index: number) => {
    if (isTransitioning || index === activeTab) return;
    handleTabChange(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if section is in view or focused
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
      id="program" 
      className="bg-scheme-1-background px-6 md:px-16 lg:px-16 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-16"
      tabIndex={0}
      aria-label="Program agenda"
    >
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
          <div 
            className="flex flex-wrap gap-3 md:gap-6 items-center justify-center"
            role="tablist"
            aria-label="Program tabs"
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
                className={`px-2 md:px-0 py-2 font-sans text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[1.5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 rounded-none ${
                  activeTab === index
                    ? 'text-red border-b-2 border-red font-bold'
                    : 'text-scheme-1-text hover:text-red'
                }`}
              >
                {tab?.title}
              </button>
            ))}
          </div>

          <div className="w-full relative">
            <div 
              className="w-full min-h-[400px] md:min-h-[500px] lg:h-[640px] bg-scheme-3-background rounded-lg overflow-hidden relative"
            >
              <div 
                className={`h-full transition-opacity duration-200 ease-in-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                aria-live="polite"
              >
                {tabs[displayedTab] && (
                  <TabContent 
                    tab={tabs[displayedTab]!}
                    tabs={tabs}
                    activeTab={activeTab}
                    goToIndex={goToIndex}
                    goToPrevious={goToPrevious}
                    goToNext={goToNext}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TabContent = ({ 
  tab, 
  tabs, 
  activeTab, 
  goToIndex, 
  goToPrevious, 
  goToNext 
}: { 
  tab: PageBlocksFbcTabsTabs;
  tabs: PageBlocksFbcTabsTabs[];
  activeTab: number;
  goToIndex: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}) => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full aspect-[4/3] lg:h-auto lg:flex-1 lg:max-w-[50%] relative pointer-events-none">
        {tab.image && (
          <Image
            src={tab.image}
            alt={tab.title || 'Tab content image'}
            fill
            className="object-cover"
            data-tina-field={tinaField(tab, 'image')}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col py-16 px-12 justify-between items-center self-stretch gap-8">
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

        {/* Progress bar and navigation buttons container */}
        <div className="flex justify-between items-center self-stretch">
          {/* Progress bar - clickable segments */}
          <div 
            className="flex items-start gap-2"
            role="group"
            aria-label="Tab progress"
          >
            {tabs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                aria-label={`Go to tab ${index + 1}: ${tabs[index]?.title || ''}`}
                className="w-2 h-2 flex items-center justify-center p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
                aria-current={activeTab === index ? 'step' : undefined}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === index
                      ? 'bg-red'
                      : 'bg-scheme-1-text/20'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={goToPrevious}
              aria-label="Previous tab"
              className="p-2 md:p-3 bg-red rounded-[4px] transition-all cursor-pointer hover:brightness-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next tab"
              className="p-2 md:p-3 bg-red rounded-[4px] transition-all cursor-pointer hover:brightness-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
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


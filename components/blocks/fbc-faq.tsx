'use client';
import { useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcFaq, PageBlocksFbcFaqFaqs } from '../../tina/__generated__/types';

export const FbcFaq = ({ data }: { data: PageBlocksFbcFaq }) => {
  return (
    <section className="bg-scheme-2-background px-2 sm:px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20 items-center">
        <div className="max-w-full md:max-w-[768px] text-center flex flex-col gap-4 md:gap-6 px-2 sm:px-0">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-2-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[14px] md:text-[16px] lg:text-[20px] leading-[1.5] text-scheme-2-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full max-w-full md:max-w-[768px] flex flex-col gap-3 md:gap-4">
          {data.faqs?.map((faq, index) => (
            <FaqItem key={index} faq={faq!} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ faq }: { faq: PageBlocksFbcFaqFaqs }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-scheme-2-foreground rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-3 md:gap-6 px-4 md:px-6 py-4 md:py-5"
      >
        <p
          data-tina-field={tinaField(faq, 'question')}
          className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[1.5] text-scheme-2-text text-left"
        >
          {faq.question}
        </p>
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 text-scheme-2-text shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
        </svg>
      </button>

      <div 
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <p
              data-tina-field={tinaField(faq, 'answer')}
              className="font-sans text-[14px] md:text-[16px] lg:text-[18px] leading-[1.5] text-scheme-2-text"
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const fbcFaqBlockSchema: Template = {
  name: 'fbcFaq',
  label: 'FBC FAQ',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'FAQs',
      description: 'Get answers to the most common questions about our intensive developer training program.',
      faqs: [
        {
          question: 'What technologies will I learn?',
          answer: "You'll master .NET, Angular, Entity Framework Core, and SQL Server. Our curriculum covers modern full-stack development technologies used by top tech companies.",
        },
        {
          question: 'Do I need prior coding experience?',
          answer: 'Basic programming knowledge is helpful but not required. We accept motivated learners with varying technical backgrounds through our entry assessment.',
        },
        {
          question: 'What is the scholarship process?',
          answer: 'Candidates must pass an entry test to qualify for the discounted $9,000 rate. Limited spots are available each cohort.',
        },
        {
          question: 'Is online learning an option?',
          answer: 'Our program is currently in-person to ensure maximum interaction and hands-on learning. Future online options are being developed.',
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
      label: 'FAQs',
      name: 'faqs',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.question }),
      },
      fields: [
        {
          type: 'string',
          label: 'Question',
          name: 'question',
        },
        {
          type: 'string',
          label: 'Answer',
          name: 'answer',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
};


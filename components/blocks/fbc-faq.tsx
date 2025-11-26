'use client';
import { useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcFaq, PageBlocksFbcFaqFaqs } from '../../tina/__generated__/types';

export const FbcFaq = ({ data }: { data: PageBlocksFbcFaq }) => {
  return (
    <section className="bg-scheme-2-background px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20 items-center">
        <div className="max-w-[768px] text-center flex flex-col gap-6">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-2-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[20px] leading-[1.5] text-scheme-2-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full max-w-[768px] flex flex-col gap-4">
          {data.faqs?.map((faq, index) => (
            <FaqItem key={index} faq={faq!} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ faq, defaultOpen }: { faq: PageBlocksFbcFaqFaqs; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <div className="bg-scheme-2-foreground rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-6 px-6 py-5"
      >
        <p
          data-tina-field={tinaField(faq, 'question')}
          className="font-sans text-[20px] font-bold leading-[1.5] text-scheme-2-text text-left"
        >
          {faq.question}
        </p>
        <svg
          className={`w-6 h-6 text-scheme-2-text shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <p
            data-tina-field={tinaField(faq, 'answer')}
            className="font-sans text-[18px] leading-[1.5] text-scheme-2-text"
          >
            {faq.answer}
          </p>
        </div>
      )}
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


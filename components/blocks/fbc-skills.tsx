'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcSkills, PageBlocksFbcSkillsSkills } from '../../tina/__generated__/types';

export const FbcSkills = ({ data }: { data: PageBlocksFbcSkills }) => {
  return (
    <section id='skills' className='bg-scheme-1-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      <div className='max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20 justify-start items-center'>
        <div className='max-w-full md:max-w-[768px] flex flex-col gap-4 md:gap-6'>
          <h2
            data-tina-field={tinaField(data, 'title')}
            className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-1-text text-center'
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.25rem] leading-[1.5] text-scheme-1-text text-center'
          >
            {data.description}
          </p>
        </div>

        <div className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {data.skills?.map((skill, index) => (
              <SkillItem key={index} skill={skill!} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillItem = ({ skill, index }: { skill: PageBlocksFbcSkillsSkills; index: number }) => {
  // Border logic:
  // - All cards: top border
  // - Tablet (2-col): left column (indices 0, 2, 4) gets right border only
  // - Desktop (3-col): middle column (indices 1, 4) gets left and right borders
  const isLeftColumnMd = index % 2 === 0;
  const isMiddleColumnLg = index % 3 === 1;
  // Only reset tablet right border if NOT middle column in desktop
  const resetTabletBorderAtLg = isLeftColumnMd && !isMiddleColumnLg;

  return (
    <div
      className={`
        flex flex-col gap-4 md:gap-6 py-6 md:py-8 px-0 md:px-6 lg:px-8
        border-t border-scheme-1-border
        ${isLeftColumnMd ? 'md:border-r' : ''}
        ${resetTabletBorderAtLg ? 'lg:border-r-0' : ''}
        ${isMiddleColumnLg ? 'lg:border-l lg:border-r' : ''}
      `}
    >
      {skill.icon && (
        <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative' data-tina-field={tinaField(skill, 'icon')}>
          <Image src={skill.icon} alt='' fill className='object-contain' />
        </div>
      )}
      <div className='flex flex-col gap-3 md:gap-4'>
        <h3
          data-tina-field={tinaField(skill, 'title')}
          className='font-oswald font-bold text-[1.25rem] md:text-[1.375rem] lg:text-[1.625rem] uppercase tracking-[-0.26px] leading-[1.1] text-scheme-1-text'
        >
          {skill.title}
        </h3>
        <p data-tina-field={tinaField(skill, 'text')} className='font-sans text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem] leading-[1.5] text-scheme-1-text'>
          {skill.text}
        </p>
      </div>
    </div>
  );
};

export const fbcSkillsBlockSchema: Template = {
  name: 'fbcSkills',
  label: 'FBC Skills',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Build job ready skills in software development',
      description: 'Learn the essential technologies that power professional software engineering. Transform raw potential into industry-ready expertise.',
      skills: [
        {
          icon: '/uploads/icons/icon-dotnet.svg',
          title: 'Full stack development',
          text: 'Build and deliver production-ready web applications using modern, enterprise-grade tools and patterns.',
        },
        {
          icon: '/uploads/icons/icon-sql.svg',
          title: 'Database design',
          text: 'Develop advanced skills in Entity Framework Core and SQL Server for efficient data handling.',
        },
        {
          icon: '/uploads/icons/icon-architect.svg',
          title: 'Software architecture',
          text: 'Learn how to design systems that scale, make sense to other developers, and stand up to real-world constraints.',
        },
        {
          icon: '/uploads/icons/icon-testing.svg',
          title: 'Testing and quality',
          text: 'Understand how automated testing fits into real projects and how quality is maintained as systems grow.',
        },
        {
          icon: '/uploads/icons/icon-collaboration.svg',
          title: 'Communication skills',
          text: 'Practice explaining technical decisions, working with stakeholders, and collaborating effectively.',
        },
        {
          icon: '/uploads/icons/icon-agile.svg',
          title: 'Agile project workflows',
          text: 'Work like a pro using Scrum to ship better software, faster, with real team collaboration.',
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
      label: 'Skills',
      name: 'skills',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
      },
      fields: [
        {
          type: 'image',
          label: 'Icon',
          name: 'icon',
        },
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Text',
          name: 'text',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
};

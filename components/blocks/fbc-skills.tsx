'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcSkills, PageBlocksFbcSkillsSkills } from '../../tina/__generated__/types';

export const FbcSkills = ({ data }: { data: PageBlocksFbcSkills }) => {
  return (
    <section className="bg-scheme-1-background px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
        <div className="max-w-[768px] flex flex-col gap-6">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-1-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[20px] leading-[1.5] text-scheme-1-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full">
          <div className="border-t border-black/15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data.skills?.map((skill, index) => (
              <SkillItem key={index} skill={skill!} isLast={index === (data.skills?.length || 0) - 1} isFirst={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillItem = ({ skill, isLast, isFirst }: { skill: PageBlocksFbcSkillsSkills; isLast: boolean; isFirst: boolean }) => {
  return (
    <div className={`flex flex-col gap-6 py-8 pr-8 ${!isFirst ? 'pl-8' : ''} ${!isLast ? 'border-r border-scheme-1-border' : ''}`}>
      {skill.icon && (
        <div className="w-16 h-16 relative" data-tina-field={tinaField(skill, 'icon')}>
          <Image src={skill.icon} alt="" fill className="object-contain" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h3
          data-tina-field={tinaField(skill, 'title')}
          className="font-oswald font-bold text-[26px] uppercase tracking-[-0.26px] leading-[1.1] text-scheme-1-text"
        >
          {skill.title}
        </h3>
        <p
          data-tina-field={tinaField(skill, 'text')}
          className="font-sans text-[16px] leading-[1.5] text-scheme-1-text"
        >
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
          icon: '/uploads/skills/dotnet.png',
          title: '.NET development fundamentals',
          text: 'Learn to build robust enterprise applications using the powerful and versatile .NET framework.',
        },
        {
          icon: '/uploads/skills/angular.png',
          title: 'Angular framework mastery',
          text: 'Create dynamic, responsive web applications with advanced Angular techniques and best practices.',
        },
        {
          icon: '/uploads/skills/sql.png',
          title: 'Database design and management',
          text: 'Develop advanced skills in Entity Framework Core and SQL Server for efficient data handling.',
        },
        {
          icon: '/uploads/skills/scrum.png',
          title: 'Agile project workflows',
          text: 'Implement Scrum methodologies to streamline development processes and enhance collaboration and productivity.',
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


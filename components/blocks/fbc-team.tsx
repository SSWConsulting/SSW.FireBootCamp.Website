'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTeam, PageBlocksFbcTeamMembers, PageBlocksFbcTeamMembersSocials } from '../../tina/__generated__/types';
import { Button } from '../ui/button';

export const FbcTeam = ({ data }: { data: PageBlocksFbcTeam }) => {
  return (
    <section className="bg-fbc-gray px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20 items-center">
        <div className="max-w-[768px] text-center flex flex-col gap-6">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.members?.map((member, index) => (
            <TeamMemberCard key={index} member={member!} />
          ))}
        </div>

        {(data.ctaTitle || data.ctaDescription) && (
          <div className="max-w-[768px] text-center flex flex-col gap-6 items-center">
            {data.ctaTitle && (
              <h3
                data-tina-field={tinaField(data, 'ctaTitle')}
                className="font-oswald font-bold text-[40px] uppercase tracking-tight leading-none text-black"
              >
                {data.ctaTitle}
              </h3>
            )}
            {data.ctaDescription && (
              <p
                data-tina-field={tinaField(data, 'ctaDescription')}
                className="text-xl leading-relaxed text-black max-w-[488px]"
              >
                {data.ctaDescription}
              </p>
            )}
            {data.ctaLabel && (
              <Button
                asChild
                variant="ghost"
                className="bg-black/5 hover:bg-black/10 text-black px-6 py-2.5 rounded-md text-lg font-medium"
              >
                <Link href={data.ctaLink || '#'}>{data.ctaLabel}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }: { member: PageBlocksFbcTeamMembers }) => {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      {member.image && (
        <div className="w-full aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={member.image}
            alt={member.name || ''}
            fill
            className="object-cover"
            data-tina-field={tinaField(member, 'image')}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <p
            data-tina-field={tinaField(member, 'name')}
            className="text-[26px] font-semibold text-black"
          >
            {member.name}
          </p>
          <p
            data-tina-field={tinaField(member, 'role')}
            className="text-xl text-black"
          >
            {member.role}
          </p>
        </div>

        <p
          data-tina-field={tinaField(member, 'bio')}
          className="text-lg leading-relaxed text-black"
        >
          {member.bio}
        </p>
      </div>

      {member.socials && member.socials.length > 0 && (
        <div className="flex gap-3.5">
          {member.socials.map((social, index) => (
            <SocialLink key={index} social={social!} />
          ))}
        </div>
      )}
    </div>
  );
};

const SocialLink = ({ social }: { social: PageBlocksFbcTeamMembersSocials }) => {
  const getIcon = (platform: string | null | undefined) => {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'twitter':
      case 'x':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'dribbble':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={social.url || '#'} className="text-black hover:text-fbc-red transition-colors">
      {getIcon(social.platform)}
    </Link>
  );
};

export const fbcTeamBlockSchema: Template = {
  name: 'fbcTeam',
  label: 'FBC Team',
  ui: {
    previewSrc: '/blocks/testimonial.png',
    defaultItem: {
      title: 'Our team of FireBootCamp Mentors',
      description: 'Experienced professionals dedicated to transforming aspiring developers into industry-ready talent.',
      ctaTitle: 'Join our team',
      ctaDescription: "Join our team – we're seeking talented developers ready to make an impact!",
      ctaLabel: 'View job openings',
      ctaLink: '/careers',
      members: [
        {
          name: 'Luke Cook (Cookie)',
          role: 'Lead Instructor',
          bio: 'Luke is a seasoned professional with over 20 years of dedicated experience in the dynamic realms of Fintech and Paytech.',
          image: '',
          socials: [
            { platform: 'linkedin', url: '#' },
            { platform: 'twitter', url: '#' },
          ],
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
      label: 'Team Members',
      name: 'members',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.name }),
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
        },
        {
          type: 'string',
          label: 'Role',
          name: 'role',
        },
        {
          type: 'string',
          label: 'Bio',
          name: 'bio',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
        },
        {
          type: 'object',
          label: 'Social Links',
          name: 'socials',
          list: true,
          fields: [
            {
              type: 'string',
              label: 'Platform',
              name: 'platform',
              options: ['linkedin', 'twitter', 'dribbble'],
            },
            {
              type: 'string',
              label: 'URL',
              name: 'url',
            },
          ],
        },
      ],
    },
    {
      type: 'string',
      label: 'CTA Title',
      name: 'ctaTitle',
    },
    {
      type: 'string',
      label: 'CTA Description',
      name: 'ctaDescription',
    },
    {
      type: 'string',
      label: 'CTA Label',
      name: 'ctaLabel',
    },
    {
      type: 'string',
      label: 'CTA Link',
      name: 'ctaLink',
    },
  ],
};


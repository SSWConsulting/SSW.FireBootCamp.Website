'use client';
import Image from 'next/image';
import { FaDribbble, FaGithub, FaGlobe, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTeam, PageBlocksFbcTeamMembers, PageBlocksFbcTeamMembersSocials } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { AutoLink } from '../ui/link';

export const FbcTeam = ({ data }: { data: PageBlocksFbcTeam }) => {
  return (
    <section id='mentors' className='bg-scheme-3-background px-6 md:px-16 lg:px-16 py-16 md:py-24 lg:py-32'>
      <div className='max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-16 lg:gap-20 items-center'>
        <div className='max-w-[768px] text-center flex flex-col gap-4 md:gap-6'>
          <h2
            data-tina-field={tinaField(data, 'title')}
            className='font-oswald font-bold text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] uppercase tracking-[-0.6px] leading-none text-scheme-3-text'
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className='font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-scheme-3-text'>
            {data.description}
          </p>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-20'>
          {data.members && data.members.length > 0 && (
            <>
              {data.members.map((member, index) => (
                <TeamMemberCard key={index} member={member!} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }: { member: PageBlocksFbcTeamMembers }) => {
  return (
    <div className='flex flex-col gap-4 md:gap-6 items-center text-center max-w-[375px] w-full mx-auto'>
      {member.image && (
        <div className='relative shrink-0 size-[186.5px] rounded-full overflow-hidden'>
          <Image src={member.image} alt={member.name || 'Team member'} fill className='object-cover' data-tina-field={tinaField(member, 'image')} />
        </div>
      )}

      <div className='flex flex-col gap-3 md:gap-4 w-full flex-1'>
        <div className='flex flex-col items-center'>
          <p
            data-tina-field={tinaField(member, 'name')}
            className='font-sans text-[1.25rem] md:text-[1.5rem] lg:text-[1.625rem] font-semibold leading-[1.5] text-scheme-3-text'
          >
            {member.name}
          </p>
          <p data-tina-field={tinaField(member, 'role')} className='font-sans text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-semibold uppercase leading-[150%] text-[#7F7F7F] text-center'>
            {member.role}
          </p>
        </div>

        <p data-tina-field={tinaField(member, 'bio')} className='font-sans text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem] leading-[1.5] text-scheme-3-text'>
          {member.bio}
        </p>
      </div>

      {member.socials && member.socials.length > 0 && (
        <div className='flex gap-[14px] items-start'>
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
        return <FaLinkedin className='size-6' aria-hidden='true' />;
      case 'github':
        return <FaGithub className='size-6' aria-hidden='true' />;
      case 'globe':
      case 'website':
        return <FaGlobe className='size-6' aria-hidden='true' />;
      case 'twitter':
      case 'x':
        return <FaXTwitter className='size-6' aria-hidden='true' />;
      case 'dribbble':
        return <FaDribbble className='size-6' aria-hidden='true' />;
      default:
        return null;
    }
  };

  return (
    <AutoLink
      href={social.url || '#'}
      className='text-scheme-3-text hover:text-red transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]'
    >
      {getIcon(social.platform)}
    </AutoLink>
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
              options: ['linkedin', 'github', 'globe', 'twitter', 'dribbble'],
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
  ],
};

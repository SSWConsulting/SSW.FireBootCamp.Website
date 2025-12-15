'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import type { PageBlocksFbcTeam, PageBlocksFbcTeamMembers, PageBlocksFbcTeamMembersSocials } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { AutoLink } from '../ui/link';

export const FbcTeam = ({ data }: { data: PageBlocksFbcTeam }) => {
  return (
    <section id="mentors" className="bg-scheme-3-background px-16 py-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-32 items-center">
        <div className="max-w-[768px] text-center flex flex-col gap-6">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="font-oswald font-bold text-[60px] uppercase tracking-[-0.6px] leading-none text-scheme-3-text"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, 'description')}
            className="font-sans text-[20px] leading-[1.5] text-scheme-3-text"
          >
            {data.description}
          </p>
        </div>

        <div className="w-full flex flex-col gap-[64px]">
          {data.members && data.members.length > 0 && (
            <>
              {/* First row: First 2 members */}
              <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-center gap-[64px]">
                {data.members.slice(0, 2).map((member, index) => (
                  <TeamMemberCard key={index} member={member!} />
                ))}
              </div>
              {/* Second row: Last 2 members */}
              {data.members.length > 2 && (
                <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-center gap-[64px]">
                  {data.members.slice(2, 4).map((member, index) => (
                    <TeamMemberCard key={index + 2} member={member!} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {(data.ctaTitle || data.ctaDescription) && (
          <div className="max-w-[768px] text-center flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-4 items-center">
              {data.ctaTitle && (
                <h3
                  data-tina-field={tinaField(data, 'ctaTitle')}
                  className="font-oswald font-bold text-[40px] uppercase tracking-[-0.4px] leading-none text-scheme-3-text"
                >
                  {data.ctaTitle}
                </h3>
              )}
              {data.ctaDescription && (
                <p
                  data-tina-field={tinaField(data, 'ctaDescription')}
                  className="font-sans text-[20px] leading-[1.5] text-scheme-3-text max-w-[488px]"
                >
                  {data.ctaDescription}
                </p>
              )}
            </div>
            {data.ctaLabel && (
              <Button
                asChild
                variant="ghost"
                className="bg-[rgba(0,0,0,0.05)] border border-transparent hover:bg-[rgba(0,0,0,0.1)] text-scheme-3-text"
              >
                <AutoLink href="https://www.ssw.com.au/employment">{data.ctaLabel}</AutoLink>
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
    <div className="basis-0 grow flex flex-col gap-6 items-center text-center max-w-[375px] w-full md:w-auto">
      {member.image && (
        <div className="relative shrink-0 size-[186.5px] rounded-full overflow-hidden">
          <Image
            src={member.image}
            alt={member.name || ''}
            fill
            className="object-cover"
            data-tina-field={tinaField(member, 'image')}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full flex-1">
        <div className="flex flex-col items-center">
          <p
            data-tina-field={tinaField(member, 'name')}
            className="font-sans text-[26px] font-semibold leading-[1.5] text-scheme-3-text"
          >
            {member.name}
          </p>
          <p
            data-tina-field={tinaField(member, 'role')}
            className="font-sans text-[20px] leading-[1.5] text-scheme-3-text"
          >
            {member.role}
          </p>
        </div>

        <p
          data-tina-field={tinaField(member, 'bio')}
          className="font-sans text-[16px] leading-[1.5] text-scheme-3-text"
        >
          {member.bio}
        </p>
      </div>

      {member.socials && member.socials.length > 0 && (
        <div className="flex gap-[14px] items-start">
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
          <svg className="size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3.24268C3.67157 3.24268 3 3.91425 3 4.74268V19.7427C3 20.5711 3.67157 21.2427 4.5 21.2427H19.5C20.3284 21.2427 21 20.5711 21 19.7427V4.74268C21 3.91425 20.3284 3.24268 19.5 3.24268H4.5ZM8.52076 7.2454C8.52639 8.20165 7.81061 8.79087 6.96123 8.78665C6.16107 8.78243 5.46357 8.1454 5.46779 7.24681C5.47201 6.40165 6.13998 5.72243 7.00764 5.74212C7.88795 5.76181 8.52639 6.40728 8.52076 7.2454ZM12.2797 10.0044H9.75971H9.7583V18.5643H12.4217V18.3646C12.4217 17.9847 12.4214 17.6047 12.4211 17.2246C12.4203 16.2108 12.4194 15.1959 12.4246 14.1824C12.426 13.9363 12.4372 13.6804 12.5005 13.4455C12.7381 12.568 13.5271 12.0013 14.4074 12.1406C14.9727 12.2291 15.3467 12.5568 15.5042 13.0898C15.6013 13.423 15.6449 13.7816 15.6491 14.129C15.6605 15.1766 15.6589 16.2242 15.6573 17.2719C15.6567 17.6417 15.6561 18.0117 15.6561 18.3815V18.5629H18.328V18.3576C18.328 17.9056 18.3278 17.4537 18.3275 17.0018C18.327 15.8723 18.3264 14.7428 18.3294 13.6129C18.3308 13.1024 18.276 12.599 18.1508 12.1054C17.9638 11.3713 17.5771 10.7638 16.9485 10.3251C16.5027 10.0129 16.0133 9.81178 15.4663 9.78928C15.404 9.78669 15.3412 9.7833 15.2781 9.77989C14.9984 9.76477 14.7141 9.74941 14.4467 9.80334C13.6817 9.95662 13.0096 10.3068 12.5019 10.9241C12.4429 10.9949 12.3852 11.0668 12.2991 11.1741L12.2797 11.1984V10.0044ZM5.68164 18.5671H8.33242V10.01H5.68164V18.5671Z" fill="currentColor"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="currentColor"/>
          </svg>
        );
      case 'globe':
      case 'website':
        return (
          <svg className="size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3M12 21C14.761 21 15.941 15.837 15.941 12C15.941 8.163 14.761 3 12 3M12 21C9.239 21 8.059 15.837 8.059 12C8.059 8.163 9.239 3 12 3M3.5 9H20.5M3.5 15H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'twitter':
      case 'x':
        return (
          <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'dribbble':
        return (
          <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <AutoLink 
      href={social.url || '#'} 
      className="text-scheme-3-text hover:text-red transition-colors"
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
      ctaTitle: 'Join the SSW team',
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


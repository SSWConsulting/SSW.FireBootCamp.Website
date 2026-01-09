'use client';
import React from 'react';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { ScriptCopyBtn, scriptCopyBlockSchema } from '../magicui/script-copy-btn';
import { Mermaid } from './mermaid';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section background={data.background!} className='prose prose-lg' data-tina-field={tinaField(data, 'body')}>
      <TinaMarkdown
        content={data.body}
        components={
          {
            mermaid: (props: { value?: string } | undefined) => <Mermaid value={props?.value || ''} />,
            scriptCopyBlock: (props: unknown) => {
              const typedProps = props as {
                showMultiplePackageOptions?: boolean;
                codeLanguage: string;
                lightTheme: string;
                darkTheme: string;
                commandMap: string;
                className?: string;
              };
              return <ScriptCopyBtn {...typedProps} />;
            },
          } as Parameters<typeof TinaMarkdown>[0]['components']
        }
      />
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      templates: [scriptCopyBlockSchema],
    },
  ],
};

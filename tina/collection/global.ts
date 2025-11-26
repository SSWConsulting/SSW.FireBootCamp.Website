import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "image",
          label: "Logo",
          name: "logo",
        },
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "CTA Label",
          name: "ctaLabel",
        },
        {
          type: "string",
          label: "CTA Link",
          name: "ctaLink",
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "/",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "boolean",
              label: "Has Dropdown",
              name: "hasDropdown",
            },
          ],
        },
        {
          type: "object",
          label: "Mega Menu Items",
          name: "megaMenu",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: "string",
              label: "Icon",
              name: "icon",
              options: ["live_tv", "developer_mode_tv", "local_fire_department", "start"],
            },
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "string",
              label: "Description",
              name: "description",
            },
            {
              type: "string",
              label: "Link",
              name: "href",
            },
          ],
        },
        {
          type: "string",
          label: "Mega Menu Banner Text",
          name: "megaMenuBannerText",
          description: "Text shown in the banner below the mega menu",
        },
        {
          type: "string",
          label: "Mega Menu Banner Link Text",
          name: "megaMenuBannerLinkText",
          description: "Link text in the mega menu banner",
        },
        {
          type: "string",
          label: "Mega Menu Banner Link URL",
          name: "megaMenuBannerLinkUrl",
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Headline",
          name: "headline",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Primary CTA Label",
          name: "primaryCtaLabel",
        },
        {
          type: "string",
          label: "Primary CTA Link",
          name: "primaryCtaLink",
        },
        {
          type: "string",
          label: "Secondary CTA Label",
          name: "secondaryCtaLabel",
        },
        {
          type: "string",
          label: "Secondary CTA Link",
          name: "secondaryCtaLink",
        },
        {
          type: "object",
          label: "Link Columns",
          name: "linkColumns",
          list: true,
          fields: [
            {
              type: "object",
              label: "Links",
              name: "links",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
                {
                  type: "boolean",
                  label: "Is Heading",
                  name: "isHeading",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.platform };
            },
          },
          fields: [
            {
              type: "string",
              label: "Platform",
              name: "platform",
              options: ["facebook", "instagram", "twitter", "linkedin", "youtube"],
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            // @ts-ignore
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;

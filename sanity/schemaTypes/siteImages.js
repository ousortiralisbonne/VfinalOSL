import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteImages',
  title: 'Site Images',
  type: 'document',
  fields: [
    defineField({
      name: 'imageId',
      title: 'Image ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for the image (e.g., "hero-bridge", "about-personal")',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
        }),
        defineField({
          name: 'pt',
          title: 'Portuguese',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Hero Images', value: 'hero'},
          {title: 'About Page', value: 'about'},
          {title: 'Popular Experiences', value: 'experiences'},
          {title: 'Page Banners', value: 'banners'},
          {title: 'General', value: 'general'},
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
        }),
        defineField({
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
        }),
      ],
      description: 'Alternative text for accessibility',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this image is currently active',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order for sorting (lower numbers appear first)',
    }),
  ],
  preview: {
    select: {
      title: 'imageId',
      subtitle: 'title.en',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Site Image',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})

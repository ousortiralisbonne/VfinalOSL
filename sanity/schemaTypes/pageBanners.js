import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageBanners',
  title: 'Page Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Restaurants', value: 'restaurants'},
          {title: 'Bars', value: 'bars'},
          {title: 'Clubs', value: 'clubs'},
          {title: 'Events', value: 'events'},
          {title: 'Hotels', value: 'hotels'},
          {title: 'Blog', value: 'blog'},
          {title: 'Transfers', value: 'transfers'},
          {title: 'Boat Trips', value: 'boat-trips'},
          {title: 'Guided Tours', value: 'guided-tours'},
          {title: 'Sports', value: 'sports'},
          {title: 'More Activities', value: 'more-activities'},
          {title: 'More Explore', value: 'more-explore'},
          {title: 'Custom Tours', value: 'custom-tours'},
          {title: 'About', value: 'about'},
        ]
      }
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
      name: 'subtitle',
      title: 'Subtitle',
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
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this banner is currently active',
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
      title: 'pageId',
      subtitle: 'title.en',
      media: 'bannerImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Page Banner',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})

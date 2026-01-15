// schemas/moreActivities.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'moreActivities',
  title: 'More Activities',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
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
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'fr',
                  title: 'French',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'pt',
                  title: 'Portuguese',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
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
              name: 'details',
              title: 'Details',
              type: 'object',
              fields: [
                defineField({
                  name: 'price',
                  title: 'Price',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'highlights',
                  title: 'Highlights',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'en',
                      title: 'English',
                      type: 'array',
                      of: [{type: 'string'}],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'fr',
                      title: 'French',
                      type: 'array',
                      of: [{type: 'string'}],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'pt',
                      title: 'Portuguese',
                      type: 'array',
                      of: [{type: 'string'}],
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})

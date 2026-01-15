// schemas/blogCategories.js
import {defineType, defineField} from 'sanity'
import {nanoid} from 'nanoid'

export default defineType({
  name: 'blogCategories',
  title: 'Blog Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID (has to be unique)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
  ],
})

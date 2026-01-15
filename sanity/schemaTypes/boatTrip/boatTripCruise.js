// schemas/cruise.js
export default {
  name: 'boatCruises',
  title: 'Cruise',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{type: 'boatTripCruiseType'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'fr',
          title: 'French',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'departures',
      title: 'Departures',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'fr',
          title: 'French',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'fr',
          title: 'French',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'object',
              fields: [
                {
                  name: 'en',
                  title: 'English',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'fr',
                  title: 'French',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'pt',
                  title: 'Portuguese',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'boatTriplocation'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'schedule',
      title: 'Schedule (e.g., 22h30 - 1h30)',
      type: 'string',
      description: 'Horaires de départ et arrivée (optionnel, pour Nouvel An)',
    },
    {
      name: 'food',
      title: 'Food',
      type: 'object',
      description: 'Nourriture incluse (optionnel, pour Nouvel An)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
        },
      ],
    },
    {
      name: 'drinks',
      title: 'Drinks',
      type: 'object',
      description: 'Boissons incluses (optionnel, pour Nouvel An)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
        },
      ],
    },
    {
      name: 'embarkation',
      title: 'Embarkation',
      type: 'object',
      description: 'Lieu d\'embarquement (optionnel, pour Nouvel An)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
        {
          name: 'pt',
          title: 'Portuguese',
          type: 'string',
        },
      ],
    },
  ],
}

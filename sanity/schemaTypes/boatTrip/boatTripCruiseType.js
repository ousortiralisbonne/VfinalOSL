export default {
  name: 'boatTripCruiseType',
  title: 'Boat Trip Cruise Type',
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
    /* {
      name: 'onlyLisbon',
      title: 'Only Lisbon',
      type: 'boolean',
    }, */
  ],
}

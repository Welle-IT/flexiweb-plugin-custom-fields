import type { CollectionConfig } from 'payload'

import { TelephoneField } from '../../src/fields/Telephone/index.js'

export const TelephoneExamples: CollectionConfig = {
  slug: 'telephoneExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...TelephoneField({
      name: 'telephone',
      admin: {
        placeholder: '+436501234567',
        width: '33%',
      },
      required: true,
    }),
    ...TelephoneField(
      {
        name: 'fax',
        admin: {
          description: 'Hello world!',
          placeholder: '+436501234567',
          position: 'sidebar',
        },
        required: false,
      },
      {
        defaultCountry: 'US',
        international: true,
      },
    ),
  ],
}

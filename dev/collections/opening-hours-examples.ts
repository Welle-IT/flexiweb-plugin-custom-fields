import type { CollectionConfig } from 'payload'

import { OpeningHoursField } from '../../src/fields/OpeningHours/index.js'

export const OpeningHoursExamples: CollectionConfig = {
  slug: 'openingHoursExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...OpeningHoursField({
      name: 'openingHours',
    }),
  ],
}

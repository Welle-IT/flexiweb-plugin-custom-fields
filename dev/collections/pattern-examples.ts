import type { CollectionConfig } from 'payload'

import { PatternField } from '../../src/fields/Pattern/index.js'

export const PatternExamples: CollectionConfig = {
  slug: 'patternExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...PatternField(
      {
        name: 'telephone',
        type: 'text',
        admin: {
          placeholder: '% 20',
        },
        required: false,
      },
      {
        allowEmptyFormatting: true,
        format: '+1 (###) #### ###',
        mask: '_',
        prefix: '% ',
      },
    ),
  ],
}

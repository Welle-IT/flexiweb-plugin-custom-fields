import type { CollectionConfig } from 'payload'

import { NumberField } from '../../src/fields/Number/index.js'

export const NumberExamples: CollectionConfig = {
  slug: 'numberExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        ...NumberField(
          {
            name: 'price',
            required: true,
          },
          {
            decimalScale: 2,
            fixedDecimalScale: true,
            min: 5,
            prefix: '$ ',
            thousandSeparator: ',',
          },
        ),
        ...NumberField(
          {
            name: 'discount',
            admin: {
              placeholder: '% 20',
            },
            max: 20,
            min: 0,
            required: true,
          },
          {
            decimalScale: 0,
            fixedDecimalScale: true,
            max: 20,
            min: 5,
            suffix: '% ',
          },
        ),
      ],
    },
  ],
}

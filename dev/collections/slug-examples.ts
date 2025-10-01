import type { CollectionConfig } from 'payload'

import { SlugField } from '../../src/fields/Slug/index.js'

export const SlugExamples: CollectionConfig = {
  slug: 'slugExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...SlugField('title'),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}

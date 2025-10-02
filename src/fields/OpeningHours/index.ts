import type { TFunction } from '@payloadcms/translations'
import type { Field, JSONField } from 'payload'

import { deepMerge } from 'payload'
import { validate } from 'src/fields/OpeningHours/validate.js'

import type { CustomTranslationsKeys } from '../../translations/index.js'

// Monday = 0 ... Sunday = 6
export type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DayHours = {
  from?: string
  open: boolean
  to?: string
}

export type OpeningHoursValue = Partial<Record<DayKey, DayHours>>

type OpeningHours = (
  /** Field overrides */
  overrides: Omit<JSONField, 'type'>,
) => Field[]

export const OpeningHoursField: OpeningHours = (overrides) => {
  const openingHoursField = deepMerge<JSONField, Omit<JSONField, 'type'>>(
    {
      name: 'openingHours',
      type: 'json',
      admin: {
        components: {
          Field: {
            path: '@flexiweb/custom-fields/OpeningHours/client#OpeningHoursComponent',
          },
        },
      },
      // Basic guard server-side; client performs stricter checks
      validate,
    },
    overrides,
  )

  const fields = [openingHoursField]

  return fields
}

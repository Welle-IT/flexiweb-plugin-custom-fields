import type { Field, JSONField } from 'payload'

import { deepMerge } from 'payload'

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
      validate: (value: unknown, { req }) => {
        if (value == null || value === '') {
          return true
        }
        try {
          const lang = req.locale || 'de'
          const obj = value as OpeningHoursValue
          const timeRe = /^(?:[01]?\d|2[0-3]):[0-5]\d(?:\s?(?:AM|PM|am|pm))?$/
          for (const key of Object.keys(obj)) {
            const day = Number(key)
            if (Number.isNaN(day) || day < 0 || day > 6) {
              switch (lang) {
                case 'de':
                  return 'Ungültiger Tag'
                case 'en':
                  return 'Invalid day'
                case 'hu':
                  return 'Érvénytelen nap'
                default:
                  return 'Ungültiger Tag'
              }
            }
            const entry = obj[day as DayKey]
            if (!entry) {
              continue
            }
            if (typeof entry.open !== 'boolean') {
              switch (lang) {
                case 'de':
                  return 'Ungültiger Tag'
                case 'en':
                  return 'Invalid day'
                case 'hu':
                  return 'Érvénytelen nap'
                default:
                  return 'Ungültiger Tag'
              }
            }
            if (entry.open) {
              if (!entry.from || !timeRe.test(entry.from)) {
                switch (lang) {
                  case 'de':
                    return 'Ungültiger "von" Datum'
                  case 'en':
                    return 'Invalid from time'
                  case 'hu':
                    return 'Érvénytelen "tól" dátum'
                  default:
                    return 'Ungültiger "von" Datum'
                }
              }
              if (!entry.to || !timeRe.test(entry.to)) {
                switch (lang) {
                  case 'de':
                    return 'Ungültiger "bis" Datum'
                  case 'en':
                    return 'Invalid to time'
                  case 'hu':
                    return 'Érvénytelen "ig" dátum'
                  default:
                    return 'Ungültiger "bis" Datum'
                }
              }
            }
          }
          return true
        } catch {
          return 'Ungültiger Tag'
        }
      },
    },
    overrides,
  )

  const fields = [openingHoursField]

  return fields
}

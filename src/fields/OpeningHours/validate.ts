import type { TFunction } from '@payloadcms/translations'
import type { Validate } from 'payload'

import type { CustomTranslationsKeys } from '../../translations/index.js'
import type { DayKey, OpeningHoursValue } from './index.js'

export const validate: Validate = (value, ctx) => {
  const t = ctx.req.t as TFunction<CustomTranslationsKeys>
  if (value == null || value === '') {
    return true
  }
  try {
    const obj = value as OpeningHoursValue
    const timeRe = /^(?:[01]?\d|2[0-3]):[0-5]\d(?:\s?(?:AM|PM|am|pm))?$/
    for (const key of Object.keys(obj)) {
      const day = Number(key)
      if (Number.isNaN(day) || day < 0 || day > 6) {
        return t('flexiweb:customFields:validation:invalidOpeningHoursDay')
      }
      const entry = obj[day as DayKey]
      if (!entry) {
        continue
      }
      if (typeof entry.open !== 'boolean') {
        return t('flexiweb:customFields:validation:invalidOpeningHoursDay')
      }
      if (entry.open) {
        if (!entry.from || !timeRe.test(entry.from)) {
          return t('flexiweb:customFields:validation:invalidOpeningHoursFrom')
        }
        if (!entry.to || !timeRe.test(entry.to)) {
          return t('flexiweb:customFields:validation:invalidOpeningHoursTo')
        }
      }
    }
    return true
  } catch {
    return t('flexiweb:customFields:validation:invalidOpeningHoursDay')
  }
}

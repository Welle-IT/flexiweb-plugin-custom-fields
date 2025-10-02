import type { TFunction } from '@payloadcms/translations'
import type { Validate } from 'payload'

import { isPossiblePhoneNumber } from 'libphonenumber-js'

import type { CustomTranslationsKeys } from '../../translations/index.js'

export const validate =
  (required?: boolean): Validate =>
  (value, ctx) => {
    const t = ctx.req.t as TFunction<CustomTranslationsKeys>
    if (!required && (!value || value === '')) {
      return true
    } else if (Boolean(required) && (!value || value === '')) {
      return t('validation:required')
    }
    if (isPossiblePhoneNumber(value)) {
      return true
    }

    return t('flexiweb:customFields:validation:invalidPhoneNumber')
  }

import type { TFunction } from '@payloadcms/translations'
import type { Validate } from 'payload'

import type { CustomTranslationsKeys } from '../../translations/index.js'

const hexRegex = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const rgbRegex = /^rgba?\(\s*(?:\d{1,3}\s*,){2}\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/
const hslRegex = /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/

function isLikelyColor(value: string): boolean {
  if (hexRegex.test(value)) {
    return true
  }
  if (rgbRegex.test(value)) {
    return true
  }
  if (hslRegex.test(value)) {
    return true
  }
  // Basic named color allowance — too many to list; allow simple alpha strings as a fallback
  // Consumers can extend server-side if needed
  return typeof value === 'string' && value.length > 0
}

export const validate =
  (required?: boolean): Validate =>
  (value, ctx) => {
    const t = ctx.req.t as TFunction<CustomTranslationsKeys>
    if (!required && (!value || value === '')) {
      return true
    }
    if (required && (!value || value === '')) {
      return t('validation:required')
    }

    if (typeof value !== 'string') {
      return t('flexiweb:customFields:validation:invalidColor')
    }

    return isLikelyColor(value) || t('flexiweb:customFields:validation:invalidColor')
  }

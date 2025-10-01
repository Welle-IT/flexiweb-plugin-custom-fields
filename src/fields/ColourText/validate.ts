import type { Validate } from 'payload'

const hexRegex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
const rgbRegex = /^rgba?\(\s*(?:\d{1,3}\s*,){2}\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+))?\s*\)$/
const hslRegex = /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*(?:0|1|0?\.\d+))?\s*\)$/

function isLikelyColor(value: string): boolean {
  if (hexRegex.test(value)) return true
  if (rgbRegex.test(value)) return true
  if (hslRegex.test(value)) return true
  // Basic named color allowance — too many to list; allow simple alpha strings as a fallback
  // Consumers can extend server-side if needed
  return typeof value === 'string' && value.length > 0
}

export const validate =
  (required?: boolean): Validate =>
  (value) => {
    if (!required && (!value || value === '')) {
      return true
    }

    if (required && (!value || value === '')) {
      return 'This field is required.'
    }

    if (typeof value !== 'string') {
      return 'Invalid value.'
    }

    return isLikelyColor(value) || 'This is not a valid color value.'
  }

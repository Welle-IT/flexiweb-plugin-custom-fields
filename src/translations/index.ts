import type { NestedKeysStripped } from '@payloadcms/translations'

import { deTranslations } from './de.js'
import { enTranslations } from './en.js'
import { huTranslations } from './hu.js'

export const customTranslations = {
  de: deTranslations,
  en: enTranslations,
  hu: huTranslations,
}

export type CustomTranslationsObject = typeof customTranslations.de
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>

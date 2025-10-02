import { huTranslations as huDefaultTranslations } from '@payloadcms/translations/languages/hu'

export const huTranslations = {
  ...huDefaultTranslations,
  flexiweb: {
    customFields: {
      validation: {
        invalidColor: 'Érvénytelen szin',
        invalidOpeningHoursDay: 'Érvénytelen nap',
        invalidOpeningHoursFrom: 'Érvénytelen kezdődatum',
        invalidOpeningHoursTo: 'Érvénytelen végdatum',
        invalidPhoneNumber: 'Érvénytelen telefonszám',
      },
    },
  },
}

export const HU_UNTRANSLATED = 'NEM FORDÍTOTT'
export const HU_UNKNOWN = 'ISMERETLEN'

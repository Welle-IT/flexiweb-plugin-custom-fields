import { enTranslations as enDefaultTranslations } from '@payloadcms/translations/languages/en'

export const enTranslations = {
  ...enDefaultTranslations,
  flexiweb: {
    customFields: {
      validation: {
        invalidColor: 'Invalid color',
        invalidOpeningHoursDay: 'Invalid day',
        invalidOpeningHoursFrom: 'Invalid start date',
        invalidOpeningHoursTo: 'Invalid end date',
        invalidPhoneNumber: 'Invalid phone number',
      },
    },
  },
}

export const EN_UNTRANSLATED = 'NOT TRANSLATED'
export const EN_UNKNOWN = 'UNKNOWN'

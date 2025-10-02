import { deTranslations as deDefaultTranslations } from '@payloadcms/translations/languages/de'

export const deTranslations = {
  ...deDefaultTranslations,
  flexiweb: {
    customFields: {
      validation: {
        invalidColor: 'Ungültige Farbe',
        invalidOpeningHoursDay: 'Ungültiger Tag',
        invalidOpeningHoursFrom: 'Ungültige Startdatum',
        invalidOpeningHoursTo: 'Ungültiges Enddatum',
        invalidPhoneNumber: 'Ungültige Telefonnummer',
      },
    },
  },
}

export const DE_UNTRANSLATED = 'NICHT ÜBERSETZT'
export const DE_UNKNOWN = 'UNBEKANNT'

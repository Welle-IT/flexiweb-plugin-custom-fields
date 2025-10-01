import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { de } from 'payload/i18n/de'
import { en } from 'payload/i18n/en'
import { hu } from 'payload/i18n/hu'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AlertBoxExamples } from './collections/alert-examples.js'
import { ColourTextExamples } from './collections/colour-text-examples.js'
import { ComboExamples } from './collections/combo-examples.js'
import { NumberExamples } from './collections/number-examples.js'
import { OpeningHoursExamples } from './collections/opening-hours-examples.js'
import { PatternExamples } from './collections/pattern-examples.js'
import { RangeExamples } from './collections/range-examples.js'
import { SlugExamples } from './collections/slug-examples.js'
import { TelephoneExamples } from './collections/telephone-examples.js'
import { Users } from './collections/users.js'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

export default buildConfig({
  admin: {
    autoLogin: process.env.AUTO_LOGIN_EMAIL
      ? { email: process.env.AUTO_LOGIN_EMAIL, password: process.env.AUTO_LOGIN_PASSWORD }
      : undefined,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    AlertBoxExamples,
    ColourTextExamples,
    ComboExamples,
    NumberExamples,
    PatternExamples,
    RangeExamples,
    SlugExamples,
    TelephoneExamples,
    OpeningHoursExamples,
  ],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: 'de',
    supportedLanguages: {
      de,
      en,
      hu,
    },
  },
  onInit: async (payload) => {
    await seed(payload)
  },
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

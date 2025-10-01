import type { FieldHook } from 'payload'

import type { Config } from './index.js'

import { getItemInNestObject } from '../../utils.js'

export const beforeValidate =
  (watchFields: string[], options: Config): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    // Process on both create and update to keep the derived value in sync
    const missingFields: string[] = []

    const fields = watchFields.map((field) => {
      const nestedItem = getItemInNestObject(field, data as Record<string, unknown>) as string

      if (!nestedItem) {
        missingFields.push(field)
      } else {
        return nestedItem
      }
    })

    /* Repeat the same but in the original doc to make sure we get all the data we can */
    if (missingFields.length > 0 && Boolean(originalDoc)) {
      missingFields.forEach((field) => {
        const nestedItem = getItemInNestObject(field, originalDoc) as string

        if (nestedItem) {
          fields.push(nestedItem)
        }
      })
    }

    const separator = options?.separator ?? ' '

    const processedValue = fields
      .filter((item) => Boolean(item))
      .reduce((accumulator, currentValue, currentIndex) => {
        // const value = options.callback ? options.callback(String(currentValue)) : String(currentValue)
        const value = String(currentValue)

        return String(accumulator) + (currentIndex > 0 ? separator : '') + value
      }, options.initial)

    return processedValue
  }

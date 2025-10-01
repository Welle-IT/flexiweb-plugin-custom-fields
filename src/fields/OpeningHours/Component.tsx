/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
'use client'

import type { JSONFieldClientProps } from 'payload'

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  useField,
  useLocale,
} from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import type { OpeningHoursValue } from './index.js'

import './styles.css'

type Props = JSONFieldClientProps

const getDayLabels = (locale: string) => {
  const baseDate = new Date(2024, 0, 1) // Jan 1, 2024 is a Monday
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
  })
}

const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d(?:\s?(?:AM|PM|am|pm))?$/

export const OpeningHoursComponent: React.FC<Props> = (props) => {
  const locale = useLocale() ?? 'de'
  const { field, path, readOnly, validate } = props

  const { admin: { className, description } = {}, label, required } = field

  const dayLabels = useMemo(() => getDayLabels(locale.code), [locale])

  const memoizedValidate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, options: any) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Label } = {},
    errorMessage,
    setValue,
    showError,
    value,
  } = useField<null | OpeningHoursValue>({
    path,
    // @ts-expect-error - memoizedValidate is not typed
    validate: memoizedValidate,
  })

  const isReadonly = Boolean(readOnly)

  const classes = [
    'field-type',
    className,
    showError && 'error',
    isReadonly && 'read-only',
    'container',
  ]
    .filter(Boolean)
    .join(' ')

  const current: OpeningHoursValue = useMemo(() => value ?? {}, [value])

  const handleToggle = (day: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...(current || {}),
      [day]: {
        from: '',
        open: e.target.checked,
        to: '',
        ...(current?.[day as keyof OpeningHoursValue] || {}),
      },
    })
  }

  const handleTime =
    (day: number, key: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      setValue({
        ...(current || {}),
        [day]: {
          from: key === 'from' ? raw : (current?.[day as keyof OpeningHoursValue]?.from ?? ''),
          open: Boolean(current?.[day as keyof OpeningHoursValue]?.open),
          to: key === 'to' ? raw : (current?.[day as keyof OpeningHoursValue]?.to ?? ''),
        },
      })
    }

  const isValid = (time?: string) => (time ? timeRegex.test(time) : true)

  return (
    <div className={`bfOpeningHoursFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <FieldError message={errorMessage ?? ''} showError={showError} />

        <div className="opening-hours-list">
          {Array.from({ length: 7 }).map((_, day) => {
            const entry = current?.[day as keyof OpeningHoursValue]
            const open = Boolean(entry?.open)
            const from = entry?.from ?? ''
            const to = entry?.to ?? ''

            return (
              <div className="opening-hours-row" key={day}>
                <label className="oh-open">
                  <input
                    checked={open}
                    disabled={isReadonly}
                    onChange={handleToggle(day)}
                    type="checkbox"
                  />
                </label>
                <div className="oh-day">{dayLabels[day]}</div>
                <input
                  aria-invalid={open && !isValid(from)}
                  className="oh-time"
                  disabled={isReadonly || !open}
                  onChange={handleTime(day, 'from')}
                  placeholder="09:00"
                  type="text"
                  value={from}
                />
                <span className="oh-sep">–</span>
                <input
                  aria-invalid={open && !isValid(to)}
                  className="oh-time"
                  disabled={isReadonly || !open}
                  onChange={handleTime(day, 'to')}
                  placeholder="17:00"
                  type="text"
                  value={to}
                />
              </div>
            )
          })}
        </div>
      </div>

      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={
          <FieldDescription
            className={`field-description-${path.replace(/\./g, '__')}`}
            description={description ?? ''}
            path={path}
          />
        }
      />

      {AfterInput}
    </div>
  )
}

## Telephone field

Phone input using `react-phone-number-input`.

### Factory

```ts
import { TelephoneField } from '@flexiweb/custom-fields/Telephone'

TelephoneField(TextFieldOverrides, config?: {
  country?: string;
  defaultCountry?: Country;
  international?: boolean; // default true
  smartCaret?: boolean;
  useNationalFormatForDefaultCountryValue?: boolean;
  withCountryCallingCode?: boolean;
  countryCallingCodeEditable?: boolean;
  countrySelectProps?: { unicodeFlags?: boolean };
  initialValueFormat?: 'national';
})
```

### Behavior

- Stores phone as a string; empty clears to `undefined`.
- Honors Payload `required`, `readOnly`, and UI props like `placeholder`, `width`.

### Example

From `dev/collections/telephone-examples.ts`:

```ts
...TelephoneField({ name: 'telephone', required: true, admin: { placeholder: '+436501234567' } })
```



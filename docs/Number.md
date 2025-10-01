## Number field

Number input with `react-number-format` features.

### Factory

```ts
import { NumberField } from '@flexiweb/custom-fields/Number'

NumberField(NumberFieldOverrides, config: NumericFormatProps)
```

### Config highlights

- Accepts `NumericFormatProps` (e.g., `decimalScale`, `thousandSeparator`, `prefix`, `suffix`).
- Maps `min`, `max`, `required`, `readOnly` into Payload field/admin.

### Behavior

- Client stores numeric value (`number | null`) and shows formatted mask. Empty becomes `null`.

### Example

From `dev/collections/number-examples.ts`:

```ts
...NumberField({ name: 'price', required: true }, { prefix: '$ ', thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true })
```



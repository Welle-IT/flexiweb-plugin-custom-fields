## Range field

HTML range slider with optional tick markers and preview.

### Factory

```ts
import { RangeField } from '@flexiweb/custom-fields/Range'

RangeField(NumberFieldOverrides, config?: { min?: number; max?: number; step?: number | 'any'; markers?: { value: number; label?: string }[]; showPreview?: boolean })
```

### Config

- **min / max**: numeric bounds
- **step**: number or `'any'` (default: `1`)
- **markers**: tick marks displayed via datalist
- **showPreview**: show live value next to the slider

### Behavior

- Stores `number | null`; empty resets to `0` visually but saves `null` when cleared.

### Example

From `dev/collections/range-examples.ts`:

```ts
...RangeField({ name: 'quantity' }, { min: 5, max: 45, showPreview: true, markers: [{ value: 5 }, { label: 'Med', value: 30 }] })
```



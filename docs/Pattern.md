## Pattern field

Text/number input powered by `react-number-format` PatternFormat.

### Factory

```ts
import { PatternField } from '@flexiweb/custom-fields/Pattern'

PatternField(TextOrNumberFieldOverrides, config: PatternFormatProps)
```

### Config highlights

- Accepts `PatternFormatProps` (e.g., `format`, `mask`, `allowEmptyFormatting`, `prefix`).
- If the underlying field `type` is `number`, the client stores `number | null`.
- Otherwise stores `string`.

### Behavior

- Uses `onValueChange` to ensure consistent value parsing.

### Example

From `dev/collections/pattern-examples.ts`:

```ts
...PatternField({ name: 'telephone', type: 'text' }, { format: '+1 (###) #### ###', mask: '_' })
```



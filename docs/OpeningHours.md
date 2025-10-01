## OpeningHours field

Structured weekly opening hours stored as JSON.

### Factory

```ts
import { OpeningHoursField } from '@flexiweb/custom-fields/OpeningHours'

OpeningHoursField(JSONFieldOverrides)
```

### Value shape

```ts
type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 // Monday..Saturday
type DayHours = { open: boolean; from?: string; to?: string }
type OpeningHoursValue = Partial<Record<DayKey, DayHours>>
```

### Behavior

- Renders a row per day with: day label, Open checkbox, From, To inputs.
- Validates times as `HH:MM` or `HH:MM AM/PM` (client + server).
- Stores only days that were interacted with; others are omitted.

### Example

```ts
...OpeningHoursField({ name: 'hours' })
```



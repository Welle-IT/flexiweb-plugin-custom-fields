## Slug field

Adds a sidebar slug with a lock toggle checkbox.

### Factory

```ts
import { SlugField } from '@flexiweb/custom-fields/Slug'

const [slugField, lockCheckbox] = SlugField(fieldToUse?: string = 'title', overrides?: { slugOverrides?: Partial<TextField>; checkboxOverrides?: Partial<CheckboxField> })
```

### Behavior

- Client component listens to `fieldToUse` and formats the slug on the fly when locked.
- Lock button toggles a hidden `slugLock` checkbox.
- Server `beforeValidate` re-formats on API or hook changes.

### Example

From `dev/collections/slug-examples.ts`:

```ts
...SlugField('title')
```



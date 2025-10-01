## Combo field

Derives a text value by concatenating other field values.

### Factory

```ts
import { ComboField } from '@flexiweb/custom-fields/Combo'

ComboField(TextFieldOverrides, fieldPaths: string[], options?: { initial?: string; separator?: string })
```

### Options

- **fieldPaths**: array of field paths to watch (supports nesting like `author.firstName`)
- **options.initial**: initial prefix string (default: `''`)
- **options.separator**: separator between parts (default: `' '`) 

### Behavior

- Client: watches form fields and updates value live.
- Server: `beforeValidate` also processes on create and update to keep values consistent.

### Example

From `dev/collections/combo-examples.ts`:

```ts
...ComboField({ name: 'fullName', admin: { readOnly: true } }, ['firstName', 'lastName'])
```



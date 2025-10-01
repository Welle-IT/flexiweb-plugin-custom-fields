## AlertBox field

Displays a styled inline alert in the admin UI.

### Factory

```ts
import { AlertBoxField } from '@flexiweb/custom-fields/AlertBox'

AlertBoxField({
  config: {
    message: 'string',
    type: 'alert' | 'error' | 'info',
    icon?: { enable?: boolean },
    className?: string,
  },
  overrides: UIFieldOverrides,
})
```

### Config

- **message**: string to display
- **type**: one of `alert | error | info` (default: `info`)
- **icon.enable**: show leading icon (default: `true`)
- **className**: extra CSS class on wrapper

### Overrides (UIField)

You can pass any `UIField` properties via `overrides` (e.g. `name`, `admin.condition`, `admin.position`, etc.).

### Behavior

- Renders an accessible region with `role="status"` and `aria-live="polite"`.
- Icon visibility controlled by `config.icon.enable`.

### Example

From `dev/collections/alert-examples.ts`:

```ts
...AlertBoxField({
  config: {
    type: 'info',
    icon: { enable: true },
    message: 'Please be aware that the title is required for the mobile app.',
  },
  overrides: {
    name: 'titleRequiredUI',
    admin: { condition: (data, siblingData) => !siblingData.title },
  },
})
```



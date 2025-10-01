## ColourText field

A text input that previews the entered CSS color.

### Factory

```ts
import { ColourTextField } from '@flexiweb/custom-fields/ColourText'

ColourTextField(TextFieldOverrides)
```

### Config

No extra config; pass standard `TextField` overrides.

### Validation

- Server: basic color validation allowing hex/rgb/hsl and non-empty named colors when required.
- Client: attempts to set `style.color` and falls back to a gradient preview if invalid.

### Behavior

- Renders an input and a color swatch preview beside it.

### Example

From `dev/collections/colour-text-examples.ts`:

```ts
...ColourTextField({ name: 'colour', required: true })
```



# API

## `useUnoUi(config, variations)`

Creates computed class resolvers based on a variation config.

### Parameters

- `config`: object containing UI elements and a top-level `default` variation map.
- `variations`: plain object, `ref`, or `computed` object with current variation values.

### Return value

- `uu`: computed map of class resolver functions per element.

Each resolver accepts an optional object:

- `classes`: additional class string appended to generated classes.

## Behavior notes

- String-based variations are applied when their value is truthy.
- Fallback to `config.default` happens only when a variation value is `null` or `undefined`.
- If an element has no `variations`, the resolver still returns its `base` classes.

## Example

```ts
const { uu } = useUnoUi(config, computed(() => ({
  variant: props.variant,
  size: props.size,
})))

const classes = uu.value.button({ classes: 'w-full' })
```

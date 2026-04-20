# uno-variations

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

> Work in progress: APIs can change before `1.0.0`.

UnoCSS Variations a first-class variant API.

Full documentation: [doc/README.md](doc/README.md)

## Install

`pnpm add uno-variations --save-catalog-name prod`

## Requirements

- Node.js `>=22`
- pnpm `10.13.1`

## Development

```bash
nix develop
pnpm install
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
```

## Usage

```typescript
import { useUnoUi } from 'uno-variations'

const props = defineProps<{
  class?: any
  state: 'default' | 'error' | 'success'
}>()

const { uu } = useUnoUi({
  default: {
    state: 'default',
  },
  form: {
    base: 'flex flex-col gap-4 border-1',
    variations: {
      state: {
        default: 'border-grey',
        error: 'border-red',
        success: 'border-green',
      },
    },
  },
}, computed(() => ({
  state: props.state,
})))
```

```html
<form :class="uu.form({ classes: props.class })">
  <!-- ... -->
</form>
```

## License

[MIT](./LICENSE.md) License © [ChatonDeAru](https://github.com/chatondearu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/uno-variations?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/uno-variations
[npm-downloads-src]: https://img.shields.io/npm/dm/uno-variations?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/uno-variations
[bundle-src]: https://img.shields.io/bundlephobia/minzip/uno-variations?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=uno-variations
[license-src]: https://img.shields.io/github/license/chatondearu/uno-variations.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/chatondearu/uno-variations/blob/main/LICENSE.md
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/uno-variations
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/antfu/eslint-config

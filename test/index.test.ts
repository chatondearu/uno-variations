import { computed, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { useUnoUi } from '../src'

const configTest = {
  root: {
    base: 'root',
    variations: {
      variant: {
        primary: 'root-primary',
      },
    },
  },
  button: {
    base: 'btn',
    variations: {
      variant: {
        primary: 'button-primary',
        outline: 'button-outline',
        ghost: (_config: unknown, props: Record<string, unknown>) => {
          return `button-ghost text-${String(props.color)}`
        },
      },
      size: {
        sm: 'button-sm',
        md: 'button-md',
        lg: 'button-lg',
      },
      loading: 'button-loading',
      disabled: 'button-disabled',
    },
  },
  default: {
    color: 'blue',
    variant: 'primary',
    size: 'md',
  },
}

describe('uno-ui', () => {
  it('should return the correct classes', () => {
    const { uu } = useUnoUi(configTest, {
      variant: 'ghost',
      color: 'primary',
      size: 'sm',
    })

    expect(uu.value.button({
      classes: 'p-4',
    })).toBe('btn p-4 button-ghost text-primary button-sm')
  })

  it('supports static string variations when value is truthy', () => {
    const { uu } = useUnoUi(configTest, {
      variant: 'primary',
      color: 'blue',
      size: 'md',
      loading: true,
    } as Record<string, unknown>)

    expect(uu.value.button({ classes: '' })).toContain('button-loading')
  })

  it('keeps explicit falsy values instead of replacing them with defaults', () => {
    const config = {
      button: {
        base: 'btn',
        variations: {
          disabled: {
            true: 'is-disabled',
            false: 'is-enabled',
          },
        },
      },
      default: {
        disabled: true,
      },
    }

    const { uu } = useUnoUi<'disabled'>(config, {
      disabled: false,
    } as Record<string, unknown>)

    expect(uu.value.button({ classes: '' })).toContain('is-enabled')
    expect(uu.value.button({ classes: '' })).not.toContain('is-disabled')
  })

  it('returns base classes when an element has no variations', () => {
    const config = {
      card: {
        base: 'card-base',
      },
      default: {},
    }

    const { uu } = useUnoUi<'variant'>(config, {} as Record<string, unknown>)
    expect(uu.value.card({ classes: 'p-2' })).toBe('card-base p-2')
  })

  it('flattens array base classes when an element has no variations', () => {
    const config = {
      button: {
        base: ['btn', 'font-medium'],
      },
      default: {},
    }

    const { uu } = useUnoUi<'variant'>(config, {} as Record<string, unknown>)
    expect(uu.value.button({ classes: 'p-4' })).toBe('btn font-medium p-4')
  })

  it('flattens array base classes when an element has variations', () => {
    const config = {
      button: {
        base: ['btn', 'font-medium'],
        variations: {
          variant: {
            primary: 'button-primary',
          },
        },
      },
      default: {
        variant: 'primary',
      },
    }

    const { uu } = useUnoUi<'variant'>(config, {
      variant: 'primary',
    } as Record<string, unknown>)
    expect(uu.value.button({ classes: 'p-4' })).toBe('btn font-medium p-4 button-primary')
  })

  it('passes full config and merged props to computed variations', () => {
    const config = {
      button: {
        base: 'btn',
        variations: {
          variant: {
            custom: (resolvedConfig: { default: Record<string, unknown> }, props: Record<string, unknown>) => {
              return `${String(resolvedConfig.default.color)}-${String(props.color)}`
            },
          },
        },
      },
      default: {
        color: 'blue',
      },
    }

    const { uu } = useUnoUi<'variant'>(config, {
      variant: 'custom',
      color: 'red',
    } as Record<string, unknown>)

    expect(uu.value.button({ classes: '' })).toContain('blue-red')
  })

  it('supports reactive computed props', () => {
    const variant = ref<'primary' | 'outline'>('primary')
    const props = computed(() => ({
      variant: variant.value,
      color: 'teal',
      size: 'md',
    }))
    const { uu } = useUnoUi(configTest, props as never)

    expect(uu.value.button({ classes: '' })).toContain('button-primary')
    variant.value = 'outline'
    expect(uu.value.button({ classes: '' })).toContain('button-outline')
  })
})

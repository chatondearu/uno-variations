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
        ghost: (_config: any, props: any) => {
          return `button-ghost text-${props.color}`
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
})

import type { ComputedRef, MaybeRef, Ref } from 'vue'
import { defu } from 'defu'
import { computed, ref, unref } from 'vue'

export type UnoUIComputedVariant<T extends string> = (config: UnoUiConfig<T>, props: any) => string

export type UnoUIVariations<T extends string> = Record<T, UnoUIVariation<T>>

export type UnoUIVariation<T extends string> = string | Record<string, string | Record<string, string | UnoUIComputedVariant<T>>>

export interface UnoUiElement<T extends string> {
  base: string | string[]
  variations?: Record<T, UnoUIVariation<T>>
}

export type UnoUiConfig<T extends string> = Record<string, UnoUiElement<T>> & { default: Record<T, any> }

export function useUnoUi<T extends string>(
  config: UnoUiConfig<T>,
  variations: MaybeRef<Record<T, any>>,
): {
  uu: ComputedRef<Record<string, (options: {
    classes: string
    [key: string]: any
  }) => string>>
} {
  const props = ref(variations) as Ref<Record<T, any>>

  function retrieveElementVariationClasses(elementVariations: UnoUIVariations<T>, variantionKey: T, variantionValue: any): string {
    if (!elementVariations?.[variantionKey]) {
      if (variantionKey in elementVariations) {
        console.warn('no variantion found for:', variantionKey, 'in ', elementVariations)
      }

      return ''
    }

    const classes = elementVariations?.[variantionKey]?.[variantionValue as keyof typeof elementVariations[T]] || ''
    return typeof classes === 'function' ? classes(elementVariations, defu(unref(props), config.default)) : classes
  }

  function computeVariationsOfElement(
    elementConfig: UnoUiElement<T>,
    props: Record<T, any>,
  ) {
    const elementVariations = elementConfig.variations

    if (!elementVariations) {
      return () => ''
    }

    return (options?: { classes: string, [key: string]: any }): string => {
      return [
        elementConfig.base,
        options?.classes,
        ...Object.entries(props)
          .reduce((acc, [variationKey, variationValue]) => {
            acc.push(retrieveElementVariationClasses(
              elementVariations,
              variationKey as T,
              variationValue || config.default?.[variationKey as T],
            ))

            return acc
          }, [] as string[]),
      ].filter(Boolean).join(' ')
    }
  }

  const uu = computed(() => {
    const propsValue = defu(unref(props), config.default)

    const computedElements = Object.entries(config).reduce((acc, [elementKey, elementConfig]) => {
      if (elementKey === 'default') {
        return acc
      }

      if (!acc[elementKey]) {
        acc[elementKey] = computeVariationsOfElement(elementConfig as UnoUiElement<T>, propsValue)
      }

      return acc
    }, {} as Record<string, (options: { classes: string, [key: string]: any }) => string>)

    return computedElements
  })

  return {
    uu,
  }
}

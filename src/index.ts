import type { ComputedRef, MaybeRef } from 'vue'
import { defu } from 'defu'
import { computed, unref } from 'vue'

export type UnoUiProps<T extends string> = Record<T, unknown> & Record<string, unknown>

export type UnoUIComputedVariant<T extends string> = (config: UnoUiConfig<T>, props: UnoUiProps<T>) => string

type UnoUIVariationMap<T extends string> = Record<string, string | UnoUIComputedVariant<T>>

export type UnoUIVariation<T extends string> = string | UnoUIVariationMap<T>

export type UnoUIVariations<T extends string> = Partial<Record<T, UnoUIVariation<T>>>

export interface UnoUiElement<T extends string> {
  base: string | string[]
  variations?: UnoUIVariations<T>
}

export interface UnoUiConfig<T extends string> {
  default: Partial<Record<T, unknown>>
  [key: string]: unknown
}

export function useUnoUi<T extends string>(
  config: UnoUiConfig<T>,
  variations: MaybeRef<UnoUiProps<T>>,
): {
  uu: ComputedRef<Record<string, (options: {
    classes: string
    [key: string]: unknown
  }) => string>>
} {
  function retrieveElementVariationClasses(elementVariations: UnoUIVariations<T>, variationKey: T, variationValue: unknown, propsValue: UnoUiProps<T>): string {
    const variantDefinition = elementVariations[variationKey]
    if (!variantDefinition)
      return ''

    if (typeof variantDefinition === 'string') {
      return variationValue ? variantDefinition : ''
    }

    const classes = variantDefinition[String(variationValue)]
    if (!classes)
      return ''

    return typeof classes === 'function' ? classes(config, propsValue) : classes
  }

  function computeVariationsOfElement(
    elementConfig: UnoUiElement<T>,
    propsValue: UnoUiProps<T>,
  ) {
    const elementVariations = elementConfig.variations

    if (!elementVariations) {
      return (options?: { classes: string, [key: string]: unknown }): string => {
        return [...(Array.isArray(elementConfig.base) ? elementConfig.base : [elementConfig.base]), options?.classes].filter(Boolean).join(' ')
      }
    }

    return (options?: { classes: string, [key: string]: unknown }): string => {
      return [
        ...(Array.isArray(elementConfig.base) ? elementConfig.base : [elementConfig.base]),
        options?.classes,
        ...Object.entries(propsValue)
          .reduce((acc, [variationKey, variationValue]) => {
            const resolvedVariationValue = variationValue ?? config.default?.[variationKey as T]
            acc.push(retrieveElementVariationClasses(
              elementVariations,
              variationKey as T,
              resolvedVariationValue,
              propsValue,
            ))

            return acc
          }, [] as string[]),
      ].filter(Boolean).join(' ')
    }
  }

  const uu = computed(() => {
    const propsValue = defu(unref(variations), config.default) as UnoUiProps<T>

    const computedElements = Object.entries(config).reduce((acc, [elementKey, elementConfig]) => {
      if (elementKey === 'default') {
        return acc
      }

      if (!acc[elementKey]) {
        acc[elementKey] = computeVariationsOfElement(elementConfig as UnoUiElement<T>, propsValue)
      }

      return acc
    }, {} as Record<string, (options: { classes: string, [key: string]: unknown }) => string>)

    return computedElements
  })

  return {
    uu,
  }
}

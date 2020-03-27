import { initialDimensions } from '@lib/utils/initialDimensions'
import { getAdaptiveValue } from '@lib/utils/getAdaptiveValue'
import { IDimensions } from '@lib/interfaces/IDimensions'
import { IAdaptiveDimensions } from '@lib/interfaces/IAdaptiveDimensions'
import { DimensionsTypes } from '@lib/enums/DimensionsTypes'

export const getDimensions = (windowWidth: number, adaptiveDimensions?: IAdaptiveDimensions): IDimensions => {
    if (!adaptiveDimensions) {
        return initialDimensions
    }

    return Object
        .keys(adaptiveDimensions)
        .reduce<IDimensions>((dimensions, dimension) => {
            const adaptiveValues = adaptiveDimensions[dimension as DimensionsTypes]

            if (adaptiveValues?.length) {
                return {
                    ...dimensions,
                    [dimension as DimensionsTypes]: getAdaptiveValue(windowWidth, adaptiveValues),
                }
            }

            return dimensions
        }, initialDimensions)
}
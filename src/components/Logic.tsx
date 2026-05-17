

export type ErrorType = 'START_ERROR' | 'MAX_ERROR' | 'RANGE_ERROR' | null


export const getError = (startValue: number, maxValue: number): ErrorType => {
    if (startValue < 0) return 'START_ERROR'
    if (maxValue < 0) return 'MAX_ERROR'
    if (startValue === 0 && maxValue === 0) return null
    if (maxValue <= startValue) return 'RANGE_ERROR'
    return null
}


export const getErrorText = (error: ErrorType): string => {
    switch (error) {
        case 'START_ERROR':
            return 'Start value must be greater than or equal to 0'
        case 'MAX_ERROR':
            return 'Maximum value must be greater than or equal to 0'
        case 'RANGE_ERROR':
            return 'Max must be greater than Start'
        default:
            return ''
    }


}
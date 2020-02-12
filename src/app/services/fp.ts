const noBraces: RegExp = /[\[\]']/g

const hasLengthGreaterThanZero = (array: any[]) => array.length > 0
export const isNotEmptyArray = (array: any) => Array.isArray(array) && hasLengthGreaterThanZero(array)
export const filter = (condition: (entity) => boolean) => (array: any[]) => array.filter(condition)

export function first<T>(array: T[]) {
  return isNotEmptyArray(array) ? array[0] : undefined
}
export function last<T>(array: T[]) {
  return isNotEmptyArray(array) ? array[array.length - 1] : undefined
}
export function get<T>(accessor: (_entity: T) => any) {
  return (entity: T) => (entity ? accessor(entity) : undefined)
}

export function groupBy<T>(key: string): (array: T[]) =>  { [key: string]: T[] } {
  return function(array: T[]): { [key: string]: T[] } {
    return array.reduce((accumulator, currentItem) => {
      ;(accumulator[currentItem[key]] = accumulator[currentItem[key]] || []).push(currentItem)
      return accumulator
    }, {})
  }
}

export const toArray = (value: any) => [value]

export const withoutBraces = (value: string): string => value ? value.replace(noBraces, '') : value

export function distinctFilter<T>(value: T, index: number, _array: T[]) { return _array.indexOf(value) === index }

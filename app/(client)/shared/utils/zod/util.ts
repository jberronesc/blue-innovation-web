export const zodValueOrNullOptionNumber = (option?: {
  label: string
  value: number
}): null | number => {
  if (!option) return null
  return option.value != 0 ? option.value : null
}

export const zodHasValueOptionNumber = (option?: {
  label: string
  value: number
}): boolean => {
  if (!option) return false
  return option.value != 0
}

export const zodValueOrNullOptionString = (option?: {
  label: string
  value: string
}): null | string => {
  if (!option) return null
  return option.value != "" ? option.value : null
}

export const zodHasValueOptionString = (option?: {
  label: string
  value: string
}): boolean => {
  if (!option) return false
  return option.value != ""
}

export const zodOptionOrUndefinedOptionNumber = (
  option:
    | undefined
    | null
    | {
        label: string
        value: number
      }
):
  | undefined
  | {
      label: string
      value: number
    } => (option ? option : undefined)

export const zodOptionOrUndefinedOptionString = (
  option:
    | undefined
    | null
    | {
        label: string
        value: string
      }
):
  | undefined
  | {
      label: string
      value: string
    } => (option ? option : undefined)

import { ReadonlyURLSearchParams } from "next/navigation"
import { z } from "zod"
// { [x: string]: string | { value: number; label: string; } | undefined; }

const searchPCreateZObject = (persist: {
  [x: string]: { key: string; type: string }
}): { [x: string]: z.ZodString | z.ZodOptional<z.ZodTypeAny> } => {
  const newZ: { [x: string]: z.ZodString | z.ZodOptional<z.ZodTypeAny> } = {}

  Object.values(persist).map((elem) => {
    newZ[elem.key] = z.string().trim().optional()
  })

  return newZ
}

const searchPDefaultValues = ({
  searchParams,
  persist,
  defaultInitial,
}: {
  searchParams: ReadonlyURLSearchParams
  persist: { [x: string]: { key: string; type: string } }
  defaultInitial?: { [x: string]: string }
}) => {
  const newObject: { [x: string]: string } = {}

  Object.values(persist).map((elem) => {
    newObject[elem.key as string] = searchParams.get(elem.key)?.toString() || ""
  })

  return {
    ...newObject,
    ...defaultInitial,
  }
}

const searchPDefaultValuesWithSelect = ({
  searchParams,
  persist,
  defaultInitial,
}: {
  searchParams: ReadonlyURLSearchParams
  persist: { [x: string]: { key: string; type: string } }
  defaultInitial?: {
    [x: string]: string | { value: any; label: string } | undefined
  }
}) => {
  const newObject: { [x: string]: string } = {}

  Object.values(persist).map((elem) => {
    newObject[elem.key as string] = searchParams.get(elem.key)?.toString() || ""
  })

  return {
    ...newObject,
    ...defaultInitial,
  }
}

const searchPeristGetDataSubmit = ({
  pathname,
  searchParams,
  persist,
  persistWhenClean,
  data,
}: {
  pathname: string
  searchParams: ReadonlyURLSearchParams
  persist: { [x: string]: { key: string; type: string } }
  persistWhenClean: { [x: string]: { key: string; type: string } }
  data: { [x: string]: string }
  defaultInitial?: { [x: string]: string }
}) => {
  const params = new URLSearchParams(searchParams)

  const pathnameAux = `${pathname}?${params.toString()}`

  const persistWhenCleanValues = Object.values(persistWhenClean)

  const { page, ...rest } = persist

  params.set(persist.page.key, "1")

  Object.values(rest).map((elem) => {
    if (!persistWhenCleanValues.some((wCleanValue) => wCleanValue == elem)) {
      if (data[elem.key]) params.set(elem.key, data[elem.key])
      else params.delete(elem.key)
    }
  })

  const pathnameNew = `${pathname}?${params.toString()}`

  return {
    pathnameNew,
    pathnameAux,
  }
}

const searchPeristGetDataClean = ({
  pathname,
  searchParams,
  persist,
  persistWhenClean,
}: {
  pathname: string
  searchParams: ReadonlyURLSearchParams
  persist: { [x: string]: { key: string; type: string } }
  persistWhenClean: { [x: string]: { key: string; type: string } }
  defaultInitial?: { [x: string]: string }
}) => {
  const params = new URLSearchParams(searchParams)
  const pathnameAux = `${pathname}?${params.toString()}`

  const persistWhenCleanValues = Object.values(persistWhenClean)

  Object.values(persist).map((elem) => {
    if (
      !persistWhenCleanValues.some((wCleanValue) => wCleanValue.key == elem.key)
    )
      params.delete(elem.key)
  })

  const pathnameNew = `${pathname}?${params.toString()}`

  return {
    pathnameNew,
    pathnameAux,
  }
}

export {
  searchPCreateZObject,
  searchPDefaultValues,
  searchPeristGetDataSubmit,
  searchPeristGetDataClean,
  searchPDefaultValuesWithSelect,
}

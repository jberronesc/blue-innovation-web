import { ReadonlyURLSearchParams } from "next/navigation"

const getParamsToBack = (
  searchParams: ReadonlyURLSearchParams,
  persists: { [x: string]: { key: string; type: string } }[]
) => {
  const params = new URLSearchParams(searchParams)

  const valuesInValues = persists.map((persist) => Object.values(persist))

  const values = valuesInValues.reduce(
    (acc, current) => [...acc, ...current],
    []
  )

  const valuesParams = values.map((param) => {
    const paramValue = params.get(param.key)

    if (!paramValue) return "xd"

    return `${param.key}=${paramValue}`
  })

  return valuesParams.filter((elem) => elem != "xd").join("&")
}

export { getParamsToBack }

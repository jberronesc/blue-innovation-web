"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import ConfigSystemSlice from "../reduxt-toolkit/slices/configSystemSlice"
import ToastifyUtil from "../../utils/toastify/toastify"
import {
  searchPeristGetDataClean,
  searchPeristGetDataSubmit,
} from "../../utils/search-persist/searchPersist"
import { ZodConstant } from "@utils/zod/zod.constant"

export const ViewModelSearchPersist = ({
  perstQ,
  persistWhenClean = {},
  setValue,
  setValueWithSelect,
}: {
  perstQ: { [x: string]: { key: string; type: string } }
  persistWhenClean?: { [x: string]: { key: string; type: string } }
  setValue?: UseFormSetValue<{ [x: string]: string }>
  setValueWithSelect?: UseFormSetValue<{
    [x: string]: string | { value: any; label: string } | undefined
  }>
}) => {
  const searchParams = useSearchParams()
  const { replace, refresh } = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<{
    [x: string]: string | { value: number | string; label: string } | undefined
  }> = (data) => {
    const newData: { [x: string]: string } = {}

    Object.keys(data).map((key) => {
      if (typeof data[key] == "string") {
        newData[key] = data[key] as string

        return data[key]
      }

      if (typeof data[key] == "undefined") return null
      else {
        if (data[key].value == 0 || data[key].value == "") return null

        newData[key as string] = (
          data[key] as { value: number | string; label: string }
        ).value.toString()

        return (
          data[key] as { value: number | string; label: string }
        ).value.toString()
      }

      return null
    })

    const { pathnameAux, pathnameNew } = searchPeristGetDataSubmit({
      pathname,
      searchParams,
      persist: perstQ,
      persistWhenClean,
      data: newData,
    })

    if (pathnameAux === pathnameNew)
      return ToastifyUtil.warning("Cambie los atributos para buscar!")

    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
    console.log({
      msg: "busqueda",
      value: pathnameNew,
    })
    replace(pathnameNew)
  }

  const cleanFields = () => {
    Object.values(perstQ).map((elem) => {
      if (setValue) setValue(elem.key, "")

      if (setValueWithSelect) {
        if (elem.type == "text") {
          setValueWithSelect(elem.key, "")
        } else if (elem.type == "optionNumber") {
          setValueWithSelect(elem.key, ZodConstant.optionNumberEmpty)
        } else {
          setValueWithSelect(elem.key, ZodConstant.optionStringEmpty)
        }
      }
    })
  }

  const handleClean = () => {
    const { pathnameAux, pathnameNew } = searchPeristGetDataClean({
      pathname,
      searchParams,
      persist: perstQ,
      persistWhenClean,
    })

    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))

    cleanFields()

    if (pathnameAux === pathnameNew) {
      refresh()
      return
    }

    replace(pathnameNew)
  }

  const handleCleanFields = () => cleanFields()

  return {
    onSubmit,
    handleClean,
    handleCleanFields,
  }
}

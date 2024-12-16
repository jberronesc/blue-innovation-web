"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { ButtonLink } from "@component/button"
import { InputSearchSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SearchButtomsSimple } from "@component/search"
import { SelectSearchReactCustom } from "@component/select"
import { AppStore } from "@rdtkl/store"
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity"
import ModuleConst from "@security/module/domain/constantClient"
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist"
import SelectZod from "@utils/zod/selectZod"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"
import { ZodConstant } from "@utils/zod/zod.constant"

const constant = ModuleConst

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
  [constant.pQ.menu.key]: SelectZod.objectOptionalNumber,
})

type SearchType = z.infer<typeof SearchSchema>

const ModuleSearch = ({
  menus,
  provokeBack,
}: {
  menus: MenuActiveEntity[]
  provokeBack?: string
}) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const menu = Number(searchParams.get(constant.pQ.menu.key))
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const options = [
    ZodConstant.optionNumberEmpty,
    ...menus.map((elem) => ({
      value: elem.id,
      label: elem.name,
    })),
  ]

  const { register, handleSubmit, setValue, control } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
        [constant.pQ.menu.key]: options.find((elem) => elem.value == menu),
      },
    }),
  })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    perstQ: constant.pQ,
    persistWhenClean: constant.persistWhenClean,
    setValueWithSelect: setValue,
  })

  useEffect(() => {
    setValue(constant.pQ.page.key, page)
  }, [page])

  useEffect(() => {
    !searchParams.get(constant.pQ.page.key) && handleCleanFields()
  }, [provokeBack])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid gap-6 grid-cols-3">
          <InputSearchSimple
            label="Busqueda... nombre, url"
            register={{ ...register(constant.pQ.query.key) }}
          />

          <SelectSearchReactCustom
            label={<LabelSimple name={constant.pQ.menu.key} label="Menu" />}
            name={constant.pQ.menu.key}
            control={control}
            options={options}
          />
        </div>
        <div className="flex justify-end items-center mt-3">
          <SearchButtomsSimple handleClean={handleClean} />

          {permissions?.addModule && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default ModuleSearch

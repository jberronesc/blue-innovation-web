"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { ButtonLink } from "@component/button"
import { InputSearchSimple } from "@component/input"
import { SearchButtomsSimple } from "@component/search"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"
import BudgetPartidaExpenseConst from "@budget/budget-partida-expense/domain/constantClient"
import { SelectSearchReactCustom } from "@component/select"
import { LabelSimple } from "@component/label"
import { BudgetPartidaTypePertainOptionsEmpty } from "@budget/budget-partida/domain/constantClient"
import SelectZod from "@utils/zod/selectZod"

const constant = BudgetPartidaExpenseConst

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
  [constant.pQ.typePertain.key]: SelectZod.objectOptionalString,
})

type SearchType = z.infer<typeof SearchSchema>

const BudgetPartidaExpenseSearch = ({
  provokeBack,
}: {
  provokeBack?: string
}) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const typePertain = searchParams.get(constant.pQ.typePertain.key) || "123"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { register, handleSubmit, setValue, control } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
        [constant.pQ.typePertain.key]:
          BudgetPartidaTypePertainOptionsEmpty.find(
            (elem) => elem.value == typePertain
          ),
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
            label="Busqueda... partida, nombre, descriccion"
            register={{ ...register(constant.pQ.query.key) }}
          />
          <InputSearchSimple
            label="Partida inicia"
            register={{ ...register(constant.pQ.partidaInit.key) }}
          />

          <SelectSearchReactCustom
            label={
              <LabelSimple
                name={constant.pQ.typePertain.key}
                label="Tipo pertenece"
              />
            }
            name={constant.pQ.typePertain.key}
            control={control}
            options={BudgetPartidaTypePertainOptionsEmpty}
          />
        </div>
        <div className="flex justify-end items-center mt-3">
          <SearchButtomsSimple handleClean={handleClean} />

          {permissions?.addBudgetpartidaexpense && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default BudgetPartidaExpenseSearch

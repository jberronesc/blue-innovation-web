"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import ReformBudgetConst, {
  ReformBudgetClassModificationOptionsEmpty,
} from "@budget/reform-budget/domain/constantClient"
import { ButtonLink } from "@component/button"
import { SearchButtomsSimple } from "@component/search"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"
import DateRangeZod from "@utils/zod/dateRangeZod"
import SelectZod from "@utils/zod/selectZod"
import { InputNumberSearchSimple } from "@component/input/InputNumberSearchSimple"
import { SelectSearchReactCustom } from "@component/select"
import { LabelSimple } from "@component/label"
import { DateRanges } from "@component/date"

const constant = ReformBudgetConst

const {
  dateStartFunction,
  dateStartDestinty,
  dateEndFunction,
  dateEndDestinty,
} = DateRangeZod.refineData({
  dateStartName: constant.pQ.dateStart.key,
  dateEndName: constant.pQ.dateEnd.key,
})

const SearchSchema = z
  .object({
    ...searchPCreateZObject(constant.pQ),
    [constant.pQ.classModification.key]: SelectZod.objectOptionalString,
  })
  .refine(dateStartFunction, dateStartDestinty)
  .refine(dateEndFunction, dateEndDestinty)

type SearchType = z.infer<typeof SearchSchema>

const ReformBudgetSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const classModification =
    searchParams.get(constant.pQ.classModification.key) || ""
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    control,
  } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
        [constant.pQ.classModification.key]:
          ReformBudgetClassModificationOptionsEmpty.find(
            (elem) => elem.value == classModification
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
        <div className="grid gap-5 grid-cols-4">
          <InputNumberSearchSimple
            label="Secuencia..."
            register={{ ...register(constant.pQ.sequence.key) }}
          />
          <DateRanges
            register={register}
            dateStartName={constant.pQ.dateStart.key}
            dateEndName={constant.pQ.dateEnd.key}
            errors={errors}
          />
          <SelectSearchReactCustom
            label={
              <LabelSimple
                name={constant.pQ.classModification.key}
                label="Clase de modificacion"
              />
            }
            name={constant.pQ.classModification.key}
            control={control}
            options={ReformBudgetClassModificationOptionsEmpty}
          />
        </div>
        <div className="flex justify-end items-center mt-3">
          <SearchButtomsSimple handleClean={handleClean} />
          {permissions?.addReformbudget && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default ReformBudgetSearch

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
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { AppStore } from "@rdtkl/store"
import { IconSearch } from "@tabler/icons-react"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"
import IncomeAffectationConstCli from "../../domain/constantClient"

const SearchSchemaClient = z.object({
  ...searchPCreateZObject(IncomeAffectationConstCli.pQ),
})

type IncomeAffectationSearchFormTypeClient = z.infer<typeof SearchSchemaClient>

const IncomeAffectationSearch = ({
  params,
  provokeBack,
  incomeExecution,
}: {
  provokeBack?: string
  params: { incomeExecutionId: string }
  incomeExecution: IncomeExecutionGetEntity
}) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(IncomeAffectationConstCli.pQ.page) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { register, handleSubmit, setValue, control } =
    useForm<IncomeAffectationSearchFormTypeClient>({
      resolver: zodResolver(SearchSchemaClient),
      defaultValues: searchPDefaultValues({
        searchParams,
        persist: IncomeAffectationConstCli.pQ,
        defaultInitial: {
          [IncomeAffectationConstCli.pQ.page]: page,
        },
      }),
    })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    pQ: IncomeAffectationConstCli.pQ,
    persistWhenClean: IncomeAffectationConstCli.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    setValue(IncomeAffectationConstCli.pQ.page, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(IncomeAffectationConstCli.pQ.page))
      handleCleanFields()
  }, [provokeBack])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid gap-6 grid-cols-3">
            <InputSearchSimple
              label="Busqueda..."
              register={{
                ...register(IncomeAffectationConstCli.pQ.query),
                placeholder: "Busqueda...",
              }}
              icon={<IconSearch className="form-input-group-icon" />}
            />
          </div>
          <div className="flex justify-end items-center mt-3">
            <SearchButtomsSimple handleClean={handleClean} />
            {permissions?.IncomeAffectationCreate &&
              incomeExecution.isStatusExecution && (
                <span className="ml-3">
                  <ButtonLink
                    href={IncomeAffectationConstCli.createUrl({
                      incomeExecutionId: params.incomeExecutionId,
                    })}
                  />
                </span>
              )}
          </div>
        </div>
      </form>
    </>
  )
}

export default IncomeAffectationSearch

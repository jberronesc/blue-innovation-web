"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconSearch } from "@tabler/icons-react"
import { useSelector } from "react-redux"
import { ButtonLink } from "@component/button"
import { InputSearchSimple } from "@component/input"
import { SearchButtomsSimple } from "@component/search"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const SearchSchemaClient = z.object({
  ...searchPCreateZObject(IncomeExecutionConstCli.pQ),
})

type IncomeExecutionSearchFormTypeClient = z.infer<typeof SearchSchemaClient>

const IncomeExecutionSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(IncomeExecutionConstCli.pQ.page) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { register, handleSubmit, setValue } =
    useForm<IncomeExecutionSearchFormTypeClient>({
      resolver: zodResolver(SearchSchemaClient),
      defaultValues: searchPDefaultValues({
        searchParams,
        persist: IncomeExecutionConstCli.pQ,
        defaultInitial: {
          [IncomeExecutionConstCli.pQ.page]: page,
        },
      }),
    })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    pQ: IncomeExecutionConstCli.pQ,
    persistWhenClean: IncomeExecutionConstCli.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    setValue(IncomeExecutionConstCli.pQ.page, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(IncomeExecutionConstCli.pQ.page)) handleCleanFields()
  }, [provokeBack])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid gap-6 grid-cols-3">
            <InputSearchSimple
              label="Busqueda..."
              register={{
                ...register(IncomeExecutionConstCli.pQ.query),
                placeholder: "Busqueda...",
              }}
              icon={<IconSearch className="form-input-group-icon" />}
            />
          </div>
          <div className="flex justify-end items-center mt-3">
            <SearchButtomsSimple handleClean={handleClean} />
            {permissions?.IncomeExecutionCreate && (
              <span className="ml-3">
                <ButtonLink href={IncomeExecutionConstCli.createUrl({})} />
              </span>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default IncomeExecutionSearch

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
import ExpenseExecutionConstCli from "@financial/expense-execution/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import { IconSearch } from "@tabler/icons-react"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const SearchSchemaClient = z.object({
  ...searchPCreateZObject(ExpenseExecutionConstCli.pQ),
})

type ExpenseExecutionSearchFormTypeClient = z.infer<typeof SearchSchemaClient>

const ExpenseExecutionSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(ExpenseExecutionConstCli.pQ.page) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { register, handleSubmit, setValue } =
    useForm<ExpenseExecutionSearchFormTypeClient>({
      resolver: zodResolver(SearchSchemaClient),
      defaultValues: searchPDefaultValues({
        searchParams,
        persist: ExpenseExecutionConstCli.pQ,
        defaultInitial: {
          [ExpenseExecutionConstCli.pQ.page]: page,
        },
      }),
    })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    pQ: ExpenseExecutionConstCli.pQ,
    persistWhenClean: ExpenseExecutionConstCli.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    setValue(ExpenseExecutionConstCli.pQ.page, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(ExpenseExecutionConstCli.pQ.page)) handleCleanFields()
  }, [provokeBack])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid gap-6 grid-cols-3">
            <InputSearchSimple
              label="Busqueda..."
              register={{
                ...register(ExpenseExecutionConstCli.pQ.query),
                placeholder: "Busqueda...",
              }}
              icon={<IconSearch className="form-input-group-icon" />}
            />
          </div>
          <div className="flex justify-end items-center mt-3">
            <SearchButtomsSimple handleClean={handleClean} />
            {permissions?.ExpenseExecutionCreate && (
              <span className="ml-3">
                <ButtonLink href={ExpenseExecutionConstCli.createUrl({})} />
              </span>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default ExpenseExecutionSearch

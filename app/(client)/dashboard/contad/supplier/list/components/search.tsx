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
import SupplierConstCli from "@contad/supplier/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const SearchSchemaClient = z.object({
  ...searchPCreateZObject(SupplierConstCli.pQ),
})

type SupplierSearchFormTypeClient = z.infer<typeof SearchSchemaClient>

const SupplierSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(SupplierConstCli.pQ.page) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { register, handleSubmit, setValue, control } =
    useForm<SupplierSearchFormTypeClient>({
      resolver: zodResolver(SearchSchemaClient),
      defaultValues: searchPDefaultValues({
        searchParams,
        persist: SupplierConstCli.pQ,
        defaultInitial: {
          [SupplierConstCli.pQ.page]: page,
        },
      }),
    })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    pQ: SupplierConstCli.pQ,
    persistWhenClean: SupplierConstCli.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    setValue(SupplierConstCli.pQ.page, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(SupplierConstCli.pQ.page)) handleCleanFields()
  }, [provokeBack])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid gap-6 grid-cols-3">
            <InputSearchSimple
              label="Busqueda..."
              register={{
                ...register(SupplierConstCli.pQ.query),
                placeholder: "Busqueda...",
              }}
              icon={<IconSearch className="form-input-group-icon" />}
            />
          </div>
          <div className="flex justify-end items-center mt-3">
            <SearchButtomsSimple handleClean={handleClean} />
            {permissions?.SupplierCreate && (
              <span className="ml-3">
                <ButtonLink href={SupplierConstCli.createUrl({})} />
              </span>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default SupplierSearch

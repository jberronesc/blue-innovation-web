"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { ButtonLink } from "@component/button"
import { SearchButtomsSimple } from "@component/search"
import { AppStore } from "@rdtkl/store"
import GroupConst from "@security/group/domain/constantClient"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const constant = GroupConst

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
})

type SearchType = z.infer<typeof SearchSchema>

const GroupSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const { handleSubmit, setValue } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValues({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
      },
    }),
  })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    perstQ: constant.pQ,
    persistWhenClean: constant.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    setValue(constant.pQ.page.key, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(constant.pQ.page.key)) handleCleanFields()
  }, [provokeBack])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid gap-6 grid-cols-3"></div>
        <div className="flex justify-end items-center mt-3">
          <SearchButtomsSimple handleClean={handleClean} />
          {permissions?.addGroup && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default GroupSearch

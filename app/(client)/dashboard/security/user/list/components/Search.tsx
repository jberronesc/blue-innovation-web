"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { AppStore } from "@/app/(client)/shared/ui/reduxt-toolkit/store"
import { ButtonLink } from "@component/button"
import { DateRanges } from "@component/date"
import { InputSearchSimple } from "@component/input"
import { SearchButtomsSimple } from "@component/search"
import UserConst from "@security/user/domain/constantClient"
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist"
import DateRangeZod from "@utils/zod/dateRangeZod"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const constant = UserConst

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
  .object(searchPCreateZObject(constant.pQ))
  .refine(dateStartFunction, dateStartDestinty)
  .refine(dateEndFunction, dateEndDestinty)

type SearchType = z.infer<typeof SearchSchema>

const UserSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValues({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
      },
    }),
  })

  useEffect(() => {
    setValue(constant.pQ.page.key, page)
  }, [page])

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    perstQ: constant.pQ,
    persistWhenClean: constant.persistWhenClean,
    setValue,
  })

  useEffect(() => {
    !searchParams.get(constant.pQ.page.key) && handleCleanFields()
  }, [provokeBack])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid gap-6 grid-cols-3">
          <InputSearchSimple
            label="Busqueda... usuario, dni, email, nombres"
            register={{ ...register(constant.pQ.query.key) }}
          />

          <DateRanges
            register={register}
            dateStartName={constant.pQ.dateStart.key}
            dateEndName={constant.pQ.dateEnd.key}
            errors={errors}
          />
        </div>
        <div className="flex justify-end items-center mt-7">
          <SearchButtomsSimple handleClean={handleClean} />

          {permissions?.addUser && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default UserSearch

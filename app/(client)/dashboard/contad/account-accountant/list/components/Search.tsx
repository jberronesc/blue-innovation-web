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
import AccountAccountantConst, {
  AccountAccountantNatureOptions,
  AccountAccountantTypeOptions,
  AccountAccountantTypePertainOptions,
} from "@contad/account-accountant/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"
import SelectZod from "@utils/zod/selectZod"
import { ZodConstant } from "@utils/zod/zod.constant"
import { SelectSearchReactCustom } from "@component/select"
import { LabelSimple } from "@component/label"

const constant = AccountAccountantConst

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
  [constant.pQ.nature.key]: SelectZod.objectOptionalString,
  [constant.pQ.type.key]: SelectZod.objectOptionalString,
  [constant.pQ.typePertain.key]: SelectZod.objectOptionalString,
})

type SearchType = z.infer<typeof SearchSchema>

const AccountAccountantSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(constant.pQ.page.key) || "1"
  const nature = searchParams.get(constant.pQ.nature.key) || ""
  const type = searchParams.get(constant.pQ.type.key) || ""
  const typePertain = searchParams.get(constant.pQ.typePertain.key) || ""
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const natureOptions = [
    ZodConstant.optionStringEmpty,
    ...AccountAccountantNatureOptions,
  ]
  const typeOptions = [
    ZodConstant.optionStringEmpty,
    ...AccountAccountantTypeOptions,
  ]

  const typePertainOptions = [
    ZodConstant.optionStringEmpty,
    ...AccountAccountantTypePertainOptions,
  ]

  const { register, handleSubmit, setValue, control } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: AccountAccountantConst.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
        [constant.pQ.nature.key]: natureOptions.find(
          (elem) => elem.value == nature
        ),
        [constant.pQ.type.key]: typeOptions.find((elem) => elem.value == type),
        [constant.pQ.typePertain.key]: typePertainOptions.find(
          (elem) => elem.value == typePertain
        ),
      },
    }),
  })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    perstQ: AccountAccountantConst.pQ,
    persistWhenClean: AccountAccountantConst.persistWhenClean,
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
        <div className="grid gap-6 grid-cols-4">
          <InputSearchSimple
            label="Busqueda... cuenta, descriccion"
            register={{ ...register(constant.pQ.query.key) }}
          />
          <SelectSearchReactCustom
            label={
              <LabelSimple name={constant.pQ.nature.key} label="Naturaleza" />
            }
            name={constant.pQ.nature.key}
            control={control}
            options={natureOptions}
          />
          <SelectSearchReactCustom
            label={<LabelSimple name={constant.pQ.type.key} label="Tipo" />}
            name={constant.pQ.type.key}
            control={control}
            options={typeOptions}
          />
          <SelectSearchReactCustom
            label={
              <LabelSimple
                name={constant.pQ.typePertain.key}
                label="Pertenece"
              />
            }
            name={constant.pQ.typePertain.key}
            control={control}
            options={typePertainOptions}
          />
        </div>
        <div className="flex justify-end items-center mt-3">
          <SearchButtomsSimple handleClean={handleClean} />

          {permissions?.addAccountaccountant && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default AccountAccountantSearch

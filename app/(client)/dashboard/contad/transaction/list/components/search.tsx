"use client"

import Select from "react-select"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconNumber } from "@tabler/icons-react"
import { useSelector } from "react-redux"
import { DateRanges } from "@component/date"
import { InputSearchSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SearchButtomsSimple } from "@component/search"
import { SelectSearchReactSimple } from "@component/select"
import TransactionConstCli, {
  TransactionTypeOptions,
  TransactionClassRegisterOptions,
} from "@contad/transaction/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist"
import DateRangeZod from "@utils/zod/dateRangeZod"
import SelectZod from "@utils/zod/selectZod"
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit"

const {
  dateStartFunction,
  dateStartDestinty,
  dateEndFunction,
  dateEndDestinty,
} = DateRangeZod.refineData({
  dateStartName: TransactionConstCli.pQ.dateStart,
  dateEndName: TransactionConstCli.pQ.dateEnd,
})

const SearchSchemaClient = z
  .object({
    ...searchPCreateZObject(TransactionConstCli.pQ),
    ["type" as string]: SelectZod.objectOptionalString,
    ["classRegister" as string]: SelectZod.objectOptionalString,
  })
  .refine(dateStartFunction, dateStartDestinty)
  .refine(dateEndFunction, dateEndDestinty)

type SupplierSearchFormTypeClient = z.infer<typeof SearchSchemaClient>

const SupplierSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams()
  const page = searchParams.get(TransactionConstCli.pQ.page) || "1"
  const type = searchParams.get(TransactionConstCli.pQ.type)
  const classRegister = searchParams.get(TransactionConstCli.pQ.classRegister)
  const { permissions } = useSelector((store: AppStore) => store.auth)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SupplierSearchFormTypeClient>({
    resolver: zodResolver(SearchSchemaClient),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: TransactionConstCli.pQ,
      defaultInitial: {
        [TransactionConstCli.pQ.page]: page,
        [TransactionConstCli.pQ.type]: TransactionTypeOptions.find(
          (elem) => elem.value == type
        ),
        [TransactionConstCli.pQ.classRegister]:
          TransactionClassRegisterOptions.find(
            (elem) => elem.value == classRegister
          ),
      },
    }),
  })

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    pQ: TransactionConstCli.pQ,
    persistWhenClean: TransactionConstCli.persistWhenClean,
    setValueWithSelect: setValue,
  })

  useEffect(() => {
    setValue(TransactionConstCli.pQ.page, page)
  }, [page])

  useEffect(() => {
    if (!searchParams.get(TransactionConstCli.pQ.page)) handleCleanFields()
  }, [provokeBack])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid gap-6 grid-cols-3">
            <InputSearchSimple
              label="Nº Trans."
              register={{
                ...register(TransactionConstCli.pQ.sequence),
                placeholder: "Trans.",
                type: "number",
              }}
              icon={<IconNumber className="form-input-group-icon" />}
            />
            <div className="flex">
              <div className="text-black text-center mr-8">- O -</div>
              <InputSearchSimple
                label="Nº Secuencia"
                register={{
                  ...register(TransactionConstCli.pQ.sequenceType),
                  placeholder: "Secuencia",
                  type: "number",
                }}
                icon={<IconNumber className="form-input-group-icon" />}
              />
            </div>
            <DateRanges
              register={register}
              dateStartName={TransactionConstCli.pQ.dateStart}
              dateEndName={TransactionConstCli.pQ.dateEnd}
              errors={errors}
            />
            <SelectSearchReactSimple
              label={
                <LabelSimple name={TransactionConstCli.pQ.type} label="Tipo" />
              }
              input={
                <Controller
                  name={TransactionConstCli.pQ.type}
                  control={control}
                  render={({ field }) => (
                    <Select
                      autoFocus={false}
                      instanceId={1}
                      {...field}
                      options={TransactionTypeOptions}
                      className="text-black"
                      isClearable
                    />
                  )}
                />
              }
            />
            <SelectSearchReactSimple
              label={
                <LabelSimple
                  name={TransactionConstCli.pQ.classRegister}
                  label="Clase de registro"
                />
              }
              input={
                <Controller
                  name={TransactionConstCli.pQ.classRegister}
                  control={control}
                  render={({ field }) => (
                    <Select
                      autoFocus={false}
                      instanceId={1}
                      {...field}
                      options={TransactionClassRegisterOptions}
                      className="text-black"
                      isClearable
                    />
                  )}
                />
              }
            />
          </div>
          <div className="flex justify-end items-center mt-3">
            <SearchButtomsSimple handleClean={handleClean} />
          </div>
        </div>
      </form>
    </>
  )
}

export default SupplierSearch

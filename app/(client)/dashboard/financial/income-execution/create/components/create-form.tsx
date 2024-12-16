"use client"

import SelectReact from "react-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsCreate, ButtonsEditCancel } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import {
  IncomeExecutionCreateFormTypeClient,
  IncomeExecutionCreateFormSchemaClient,
} from "@financial/income-execution/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function IncomeExecutionCreateForm({
  suppliers,
}: {
  suppliers: SupplierAllEntity[]
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm<IncomeExecutionCreateFormTypeClient>({
    resolver: zodResolver(IncomeExecutionCreateFormSchemaClient),
  })

  const suppliersOptions: {
    value: number
    label: string
  }[] = suppliers.map((elem) => ({
    value: elem.id,
    label: `${elem.firstName} - ${elem.lastName}`,
  }))

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/income-executions",
          body: {
            ...data,
            supplier: data.supplier.value,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          replace(
            `${IncomeExecutionConstCli.listUrl({})}?${getParamsToBack(
              searchParams,
              IncomeExecutionConstCli.getPerst()
            )}`
          )
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <DateSimple
            label="Fecha"
            register={{ ...register("date"), placeholder: "Ingrese: Fecha" }}
            errors={<ErrorField field={errors.date} />}
          />
          <InputSimple
            label="Documento de referencia"
            register={{
              ...register("documentReference"),
              placeholder: "Ingrese: Documento de referencia",
            }}
            errors={<ErrorField field={errors.documentReference} />}
          />
          <InputSimple
            label="Concepto"
            register={{
              ...register("concept"),
              placeholder: "Ingrese: Concepto",
            }}
            errors={<ErrorField field={errors.concept} />}
          />
          <SelectReactSimple
            label={<LabelSimple name="supplier" label="Proveedor" />}
            input={
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={suppliersOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.supplier as FieldError} />}
          />
        </div>
        <ButtonsCreate>
          <ButtonsEditCancel
            href={`${IncomeExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              IncomeExecutionConstCli.getPerst()
            )}
          />
        </ButtonsCreate>
      </form>
    </>
  )
}

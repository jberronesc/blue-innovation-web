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
import { TransactionClassRegisterOptions } from "@contad/transaction/domain/constantClient"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import ExpenseExecutionConstCli, {
  ExpenseExecutionClassExpenseOptions,
} from "@financial/expense-execution/domain/constantClient"
import {
  ExpenseExecutionCreateFormTypeClient,
  ExpenseExecutionCreateFormSchemaClient,
} from "@financial/expense-execution/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function ExpenseExecutionCreateForm({
  transactionInfoToValidate,
  suppliers,
}: {
  transactionInfoToValidate: TransactionInfoToValidateEntity
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
  } = useForm<ExpenseExecutionCreateFormTypeClient>({
    resolver: zodResolver(ExpenseExecutionCreateFormSchemaClient),
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
          url: "/v1/expense-executions",
          body: {
            ...data,
            supplier: data.supplier.value,
            classRegister: data.classRegister.value,
            classExpense: data.classExpense.value,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          replace(
            `${ExpenseExecutionConstCli.listUrl({})}?${getParamsToBack(
              searchParams,
              ExpenseExecutionConstCli.getPerst()
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
            register={{
              ...register("date"),
              min: transactionInfoToValidate.dateOperationMin,
              max: transactionInfoToValidate.dateOperationMax,
            }}
            errors={<ErrorField field={errors.date} />}
          />
          <InputSimple
            label="Documento de referencia"
            register={{ ...register("documentReference") }}
            errors={<ErrorField field={errors.documentReference} />}
          />
          <InputSimple
            label="Concepto"
            register={{ ...register("concept") }}
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
          <SelectReactSimple
            label={
              <LabelSimple name="classRegister" label="Clase de registro" />
            }
            input={
              <Controller
                name="classRegister"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={TransactionClassRegisterOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.classRegister as FieldError} />}
          />
          <SelectReactSimple
            label={<LabelSimple name="classExpense" label="Clase de gasto" />}
            input={
              <Controller
                name="classExpense"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={ExpenseExecutionClassExpenseOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.classExpense as FieldError} />}
          />
        </div>
        <ButtonsCreate>
          <ButtonsEditCancel
            href={`${ExpenseExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              ExpenseExecutionConstCli.getPerst()
            )}
          />
        </ButtonsCreate>
      </form>
    </>
  )
}

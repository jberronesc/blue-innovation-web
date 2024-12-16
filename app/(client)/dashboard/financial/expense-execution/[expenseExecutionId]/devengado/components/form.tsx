"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsEdit, ButtonsEditCancel } from "@component/button"
import ExpenseExecutionConstCli from "@financial/expense-execution/domain/constantClient"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import {
  ExpenseExecutionDevengadoFormTypeClient,
  ExpenseExecutionDevengadoFormSchemaClient,
} from "@financial/expense-execution/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function ExpenseExecutionForm({
  registerToEdit,
}: {
  registerToEdit: ExpenseExecutionGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    formState: { errors },
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<ExpenseExecutionDevengadoFormTypeClient>({
    resolver: zodResolver(ExpenseExecutionDevengadoFormSchemaClient),
  })

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: `/v1/expense-executions/${registerToEdit.id}/devengado`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
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
        <div className="form-sections-inputs"></div>
        <ButtonsEdit>
          <ButtonsEditCancel
            href={`${ExpenseExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              ExpenseExecutionConstCli.getPerst()
            )}
          />
        </ButtonsEdit>
      </form>
    </>
  )
}

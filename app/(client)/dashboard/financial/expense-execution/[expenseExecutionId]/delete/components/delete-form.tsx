"use client"

import { ButtonsDelete, ButtonsDeleteCancel } from "@component/button"
import ExpenseExecutionConstCli from "@financial/expense-execution/domain/constantClient"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { useRouter, useSearchParams } from "next/navigation"

export default function ExpenseExecutionDeleteForm({
  registerToEdit,
}: {
  registerToEdit: ExpenseExecutionGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/v1/expense-executions/${registerToEdit.id}`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" })
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
      <div>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonsDeleteCancel
            href={`${ExpenseExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              ExpenseExecutionConstCli.getPerst()
            )}
          />
        </ButtonsDelete>
      </div>
    </>
  )
}

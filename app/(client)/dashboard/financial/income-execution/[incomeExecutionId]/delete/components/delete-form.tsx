"use client"

import { ButtonsDelete, ButtonsDeleteCancel } from "@component/button"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { useRouter, useSearchParams } from "next/navigation"

export default function IncomeExecutionDeleteForm({
  registerToEdit,
}: {
  registerToEdit: IncomeExecutionGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/v1/income-executions/${registerToEdit.id}`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" })
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
      <div>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonsDeleteCancel
            href={`${IncomeExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              IncomeExecutionConstCli.getPerst()
            )}
          />
        </ButtonsDelete>
      </div>
    </>
  )
}

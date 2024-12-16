"use client"

import { ButtonsDelete, ButtonsDeleteCancel } from "@component/button"
import IncomeAffectationConstCli from "@financial/income-execution/[incomeExecutionId]/income-affectation/domain/constantClient"
import { IncomeAffectationGetEntity } from "@financial/income-execution/[incomeExecutionId]/income-affectation/domain/interfaces/IncomeAffectationGetEntity"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { useRouter, useSearchParams } from "next/navigation"

export default function IncomeAffectationDeleteForm({
  params,
  registerToEdit,
}: {
  params: { incomeExecutionId: string }
  registerToEdit: IncomeAffectationGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/v1/income-affectations/${registerToEdit.id}`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" })
          replace(
            `${IncomeAffectationConstCli.listUrl({
              ...params,
            })}?${getParamsToBack(
              searchParams,
              IncomeAffectationConstCli.getPerst()
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
            href={`${IncomeAffectationConstCli.listUrl({ ...params })}`}
            query={getParamsToBack(
              searchParams,
              IncomeAffectationConstCli.getPerst()
            )}
          />
        </ButtonsDelete>
      </div>
    </>
  )
}

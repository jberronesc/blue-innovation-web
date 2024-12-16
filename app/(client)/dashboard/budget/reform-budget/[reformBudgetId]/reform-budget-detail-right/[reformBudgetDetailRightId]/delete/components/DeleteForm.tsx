"use client"

import { ButtonCancelHref, ButtonsDelete } from "@component/button"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import ReformBudgetDetailRightConst from "../../../domain/constantClient"
import { ReformBudgetDetailRightFindEntity } from "../../../domain/interfaces/ReformBudgetDetailRightFindEntity"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ReformBudgetDetailRightConst

export default function ReformBudgetDetailRightDeleteForm({
  params,
  registerToEdit,
}: {
  params: { reformBudgetId: string }
  registerToEdit: ReformBudgetDetailRightFindEntity
}) {
  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({ ...params }),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/budget/v1/reform-budget-detail-rights/${registerToEdit.id}/delete`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" })
          vmBackUrl.goBackSimple()
        }
      )
    },
  })

  return (
    <>
      {modal}
      <div>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsDelete>
      </div>
    </>
  )
}

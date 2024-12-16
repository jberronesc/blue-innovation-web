"use client"

import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { ButtonCancelHref, ButtonsDelete } from "@component/button"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelBackUrl } from "@viewM/index"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

const constant = BudgetCertificationConst

export default function BudgetCertificationDeleteForm({
  registerToEdit,
}: {
  registerToEdit: BudgetCertificationFindEntity
}) {
  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/budget/v1/budget-certifications/${registerToEdit.id}/delete`,
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

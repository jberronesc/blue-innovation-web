"use client"

import BudgetConst from "@budget/budget/domain/constantClient"
import { BudgetFindEntity } from "@budget/budget/domain/interfaces/BudgetFindEntity"
import { ButtonCancelHref, ButtonsDelete } from "@component/button"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelBackUrl } from "@viewM/index"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

const constant = BudgetConst

export default function BudgetDeleteForm({
  registerToEdit,
}: {
  registerToEdit: BudgetFindEntity
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
          url: `/budget/v1/budgets/${registerToEdit.id}/delete`,
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
        <span className="text-black text-2xl">
          Presupuesto {registerToEdit.exercise.year}
        </span>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsDelete>
      </div>
    </>
  )
}

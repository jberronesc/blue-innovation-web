"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import BudgetConst from "@budget/budget/domain/constantClient"
import { BudgetFindEntity } from "@budget/budget/domain/interfaces/BudgetFindEntity"
import {
  BudgetReviewedType,
  BudgetReviewedSchema,
} from "@budget/budget/domain/schemas"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetConst

export default function BudgetReviewedForm({
  registerToEdit,
}: {
  registerToEdit: BudgetFindEntity
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetReviewedType>({
    resolver: zodResolver(BudgetReviewedSchema),
  })

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPATCHTokenBlueI({
          url: `/budget/v1/budgets/${registerToEdit.id}/reviewed`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
          vmBackUrl.goBackSimple()
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <InputSimple
            label="Concepto"
            register={{ ...register("concept") }}
            errors={<ErrorField field={errors.concept} />}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

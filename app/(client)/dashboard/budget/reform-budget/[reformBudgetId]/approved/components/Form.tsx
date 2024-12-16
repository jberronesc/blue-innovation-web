"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ReformBudgetConst from "@budget/reform-budget/domain/constantClient"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import {
  ReformBudgetApprovedType,
  ReformBudgetApprovedSchema,
} from "@budget/reform-budget/domain/schemas"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ReformBudgetConst

export default function ReformBudgetApprovedForm({
  registerToEdit,
}: {
  registerToEdit: ReformBudgetFindEntity
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<ReformBudgetApprovedType>({
    resolver: zodResolver(ReformBudgetApprovedSchema),
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
          url: `/budget/v1/reform-budgets/${registerToEdit.id}/approved`,
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

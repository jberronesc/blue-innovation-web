"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import BudgetDetailExpenseConst from "../../../domain/constantClient"
import { BudgetDetailExpenseFindEntity } from "../../../domain/interfaces/BudgetDetailExpenseFindEntity"
import {
  BudgetDetailEditSchema,
  BudgetDetailEditType,
} from "@budget/budget/[budgetId]/budget-detail/domain/schema"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetDetailExpenseConst

export default function BudgetDetailExpenseEditForm({
  registerToEdit,
  params,
}: {
  registerToEdit: BudgetDetailExpenseFindEntity
  params: { budgetId: string; budgetDetailExpenseId: string }
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<BudgetDetailEditType>({
    resolver: zodResolver(BudgetDetailEditSchema),
    defaultValues: {
      assigned: registerToEdit.assigned.toString(),
    },
  })

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({ ...params }),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPATCHTokenBlueI({
          url: `/budget/v1/budget-detail-expenses/${registerToEdit.id}/update`,
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
            label="Nombre"
            register={{ ...register("assigned") }}
            errors={<ErrorField field={errors.assigned} />}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

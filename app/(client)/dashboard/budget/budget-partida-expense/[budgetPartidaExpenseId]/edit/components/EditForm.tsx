"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { BudgetPartidaExpenseFindEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseFindEntity"
import {
  BudgetPartidaExpenseEditSchema,
  BudgetPartidaExpenseEditType,
} from "@budget/budget-partida-expense/domain/schemas"
import BudgetPartidaExpenseConst from "@budget/budget-partida-expense/domain/constantClient"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetPartidaExpenseConst

export default function BudgetPartidaExpenseEditForm({
  registerToEdit,
}: {
  registerToEdit: BudgetPartidaExpenseFindEntity
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetPartidaExpenseEditType>({
    resolver: zodResolver(BudgetPartidaExpenseEditSchema),
    defaultValues: {
      ...registerToEdit,
    },
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
          url: `/budget/v1/budget-partida-expenses/${registerToEdit.id}/update`,
          body: { ...data },
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
            label="Partida"
            register={{ ...register("partida") }}
            errors={<ErrorField field={errors.partida} />}
          />
          <InputSimple
            label="Nombre"
            register={{ ...register("name") }}
            errors={<ErrorField field={errors.name} />}
          />
          <InputSimple
            label="Descripcion"
            register={{ ...register("description") }}
            errors={<ErrorField field={errors.description} />}
          />
          <CheckboxSimple
            label="Activo?"
            register={{ ...register("isActive") }}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

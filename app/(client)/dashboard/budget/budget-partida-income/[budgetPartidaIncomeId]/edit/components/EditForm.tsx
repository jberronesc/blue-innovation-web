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
import { BudgetPartidaIncomeFindEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeFindEntity"
import {
  BudgetPartidaIncomeEditSchema,
  BudgetPartidaIncomeEditType,
} from "@budget/budget-partida-income/domain/schemas"
import BudgetPartidaIncomeConst from "@budget/budget-partida-income/domain/constantClient"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetPartidaIncomeConst

export default function BudgetPartidaIncomeEditForm({
  registerToEdit,
}: {
  registerToEdit: BudgetPartidaIncomeFindEntity
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetPartidaIncomeEditType>({
    resolver: zodResolver(BudgetPartidaIncomeEditSchema),
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
          url: `/budget/v1/budget-partida-incomes/${registerToEdit.id}/update`,
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

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import {
  BudgetPartidaIncomeCreateSchema,
  BudgetPartidaIncomeCreateType,
} from "@budget/budget-partida-income/domain/schemas"
import BudgetPartidaIncomeConst from "@budget/budget-partida-income/domain/constantClient"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetPartidaIncomeConst

export default function BudgetPartidaIncomeCreateForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetPartidaIncomeCreateType>({
    resolver: zodResolver(BudgetPartidaIncomeCreateSchema),
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
        await new FetchPOSTTokenBlueI({
          url: "/budget/v1/budget-partida-incomes/create",
          body: { ...data },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
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
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

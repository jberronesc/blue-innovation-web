"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import BudgetConst from "@budget/budget/domain/constantClient"
import {
  BudgetCreateType,
  BudgetCreateSchema,
} from "@budget/budget/domain/schemas"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { BudgetExerciseNextCreateEntity } from "@budget/budget/domain/interfaces/BudgetExerciseNextCreateEntity"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetConst

export default function BudgetCreateForm({
  exercise,
}: {
  exercise: BudgetExerciseNextCreateEntity
}) {
  const { handleSubmit, getValues } = useForm<BudgetCreateType>({
    resolver: zodResolver(BudgetCreateSchema),
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
          url: "/budget/v1/budgets/create",
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
          <span className="text-black text-2xl">
            Crear presupuesto para el ejercicio {exercise.year}
          </span>
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

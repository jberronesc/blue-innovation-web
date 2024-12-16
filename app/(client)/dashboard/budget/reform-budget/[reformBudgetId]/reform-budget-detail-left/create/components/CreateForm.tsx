"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import {
  ReformBudgetDetailCreateType,
  ReformBudgetDetailCreateSchema,
} from "@budget/reform-budget/[reformBudgetId]/reform-budget-detail/domain/schemas"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import ReformBudgetDetailLeftConst from "../../domain/constantClient"
import { ReformBudgetDetailLeftBudgetPartidaEntity } from "../../domain/interfaces/ReformBudgetDetailLeftBudgetPartidaEntity"
import {
  zodHasValueOptionNumber,
  zodValueOrNullOptionNumber,
} from "@utils/zod/util"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { useState } from "react"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { ViewModelBackUrl } from "@viewM/ViewModelBackUrl"

const constant = ReformBudgetDetailLeftConst

export default function ReformBudgetDetailLeftCreateForm({
  params,
  reformBudget,
  leftBudgetPartida,
}: {
  params: { reformBudgetId: string }
  reformBudget: ReformBudgetFindEntity
  leftBudgetPartida: ReformBudgetDetailLeftBudgetPartidaEntity
}) {
  const [isIncome, _] = useState(
    reformBudget.isClassModificationIncomeOrExpense
      ? reformBudget.isClassModificationIncome
      : true
  )

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
  } = useForm<ReformBudgetDetailCreateType>({
    resolver: zodResolver(ReformBudgetDetailCreateSchema),
  })

  const budgetPartidaIncomesOptions =
    leftBudgetPartida.budgetPartidaIncomes.map((elem) => ({
      label: `${elem.partida} - ${elem.name}`,
      value: elem.id,
    }))

  const budgetPartidaExpensesOptions =
    leftBudgetPartida.budgetPartidaExpenses.map((elem) => ({
      label: `${elem.partida} - ${elem.name}`,
      value: elem.id,
    }))

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({ ...params }),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      if (isIncome && !zodHasValueOptionNumber(data.budgetPartidaIncome))
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria ingreso",
        })

      const isExpense = !isIncome

      if (isExpense && !zodHasValueOptionNumber(data.budgetPartidaExpense))
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria gasto",
        })

      return (
        await new FetchPOSTTokenBlueI({
          url: `/budget/v1/reform-budgets/${params.reformBudgetId}/reform-budget-detail-lefts/create`,
          body: {
            ...data,
            budgetPartidaIncome: zodValueOrNullOptionNumber(
              data.budgetPartidaIncome
            ),
            budgetPartidaExpense: zodValueOrNullOptionNumber(
              data.budgetPartidaExpense
            ),
          },
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
            label="Org"
            register={{ ...register("org") }}
            errors={<ErrorField field={errors.org} />}
          />
          <InputSimple
            label="Ubg"
            register={{ ...register("ubg") }}
            errors={<ErrorField field={errors.ubg} />}
          />
          <InputSimple
            label="Fte"
            register={{ ...register("fte") }}
            errors={<ErrorField field={errors.fte} />}
          />
          <InputSimple
            label="Monto"
            register={{ ...register("amount") }}
            errors={<ErrorField field={errors.amount} />}
          />
          {isIncome ? (
            <SelectReactCustom
              label={
                <LabelSimple
                  name="budgetPartidaIncome"
                  label="Partida presupuestaria ingreso"
                />
              }
              name="budgetPartidaIncome"
              control={control}
              options={budgetPartidaIncomesOptions}
              errors={
                <ErrorField field={errors.budgetPartidaIncome as FieldError} />
              }
            />
          ) : (
            <SelectReactCustom
              label={
                <LabelSimple
                  name="budgetPartidaExpense"
                  label="Partida presupuestaria gasto"
                />
              }
              name="budgetPartidaExpense"
              control={control}
              options={budgetPartidaExpensesOptions}
              errors={
                <ErrorField field={errors.budgetPartidaExpense as FieldError} />
              }
            />
          )}
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

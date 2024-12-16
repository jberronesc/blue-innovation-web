"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import {
  ReformBudgetDetailEditType,
  ReformBudgetDetailEditSchema,
} from "@budget/reform-budget/[reformBudgetId]/reform-budget-detail/domain/schemas"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import ReformBudgetDetailRightConst from "../../../domain/constantClient"
import { ReformBudgetDetailRightFindEntity } from "../../../domain/interfaces/ReformBudgetDetailRightFindEntity"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { ReformBudgetDetailRightBudgetPartidaEntity } from "../../../domain/interfaces/ReformBudgetDetailRightBudgetPartidaEntity"
import { useState } from "react"
import {
  zodHasValueOptionNumber,
  zodOptionOrUndefinedOptionNumber,
  zodValueOrNullOptionNumber,
} from "@utils/zod/util"
import { ViewModelBackUrl } from "@viewM/index"
import { SelectReactCustom } from "@component/select/SelectReactCustom"

const constant = ReformBudgetDetailRightConst

export default function ReformBudgetDetailRightEditForm({
  params,
  registerToEdit,
  reformBudget,
  rightBudgetPartida,
}: {
  params: { reformBudgetId: string }
  registerToEdit: ReformBudgetDetailRightFindEntity
  reformBudget: ReformBudgetFindEntity
  rightBudgetPartida: ReformBudgetDetailRightBudgetPartidaEntity
}) {
  const [isExpense, _] = useState(
    reformBudget.isClassModificationIncomeOrExpense
      ? reformBudget.isClassModificationExpense
      : true
  )

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
  } = useForm<ReformBudgetDetailEditType>({
    resolver: zodResolver(ReformBudgetDetailEditSchema),
    defaultValues: {
      ...registerToEdit,
      amount: registerToEdit.amount.toString(),
      budgetPartidaIncome: zodOptionOrUndefinedOptionNumber(
        registerToEdit.budgetPartidaIncome && {
          label: `${registerToEdit.budgetPartidaIncome.partida} - ${registerToEdit.budgetPartidaIncome.name}`,
          value: registerToEdit.budgetPartidaIncome.id,
        }
      ),
      budgetPartidaExpense: zodOptionOrUndefinedOptionNumber(
        registerToEdit.budgetPartidaExpense && {
          label: `${registerToEdit.budgetPartidaExpense.partida} - ${registerToEdit.budgetPartidaExpense.name}`,
          value: registerToEdit.budgetPartidaExpense.id,
        }
      ),
    },
  })

  const budgetPartidaIncomesOptions =
    rightBudgetPartida.budgetPartidaIncomes.map((elem) => ({
      label: `${elem.partida} - ${elem.name}`,
      value: elem.id,
    }))

  const budgetPartidaExpensesOptions =
    rightBudgetPartida.budgetPartidaExpenses.map((elem) => ({
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

      if (isExpense && !zodHasValueOptionNumber(data.budgetPartidaExpense))
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria gasto",
        })

      const isIncome = !isExpense

      if (isIncome && !zodHasValueOptionNumber(data.budgetPartidaIncome))
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria ingreso",
        })

      return (
        await new FetchPATCHTokenBlueI({
          url: `/budget/v1/reform-budget-detail-rights/${registerToEdit.id}/update`,
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
          {isExpense ? (
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
          ) : (
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
          )}
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

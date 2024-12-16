"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import ReformBudgetConst, {
  ReformBudgetClassModification,
  ReformBudgetClassModificationOptions,
} from "@budget/reform-budget/domain/constantClient"
import {
  ReformBudgetCreateType,
  ReformBudgetCreateSchema,
} from "@budget/reform-budget/domain/schemas"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { BudgetPartidaIncomeActiveEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeActiveEntity"
import { BudgetPartidaExpenseActiveEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseActiveEntity"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import {
  zodHasValueOptionNumber,
  zodValueOrNullOptionNumber,
} from "@utils/zod/util"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ReformBudgetConst

export default function ReformBudgetCreateForm({
  budgetPartidaIncomes,
  budgetPartidaExpenses,
}: {
  budgetPartidaIncomes: BudgetPartidaIncomeActiveEntity[]
  budgetPartidaExpenses: BudgetPartidaExpenseActiveEntity[]
}) {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    watch,
  } = useForm<ReformBudgetCreateType>({
    resolver: zodResolver(ReformBudgetCreateSchema),
  })

  const watchClassModification = watch("classModification")

  const isIncome =
    watchClassModification != undefined &&
    [
      ReformBudgetClassModification.REFGROUPINCOME.value,
      ReformBudgetClassModification.TRANSITEMINCOME.value,
    ].some((elem) => elem == watchClassModification.value)

  const isExpense =
    watchClassModification != undefined &&
    [
      ReformBudgetClassModification.REFGROUPEXPENSE.value,
      ReformBudgetClassModification.TRANSITEMEXPENSE.value,
    ].some((elem) => elem == watchClassModification.value)

  const budgetPartidaIncomesOptions = budgetPartidaIncomes.map((elem) => ({
    label: `${elem.partida} - ${elem.name}`,
    value: elem.id,
  }))

  const budgetPartidaExpensesOptions = budgetPartidaExpenses.map((elem) => ({
    label: `${elem.partida} - ${elem.name}`,
    value: elem.id,
  }))

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      if (
        watchClassModification &&
        isIncome &&
        !zodHasValueOptionNumber(data.budgetPartidaIncome)
      )
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria ingreso grupo",
        })

      if (
        watchClassModification &&
        isExpense &&
        !zodHasValueOptionNumber(data.budgetPartidaExpense)
      )
        return vmLoading.errorMessage({
          message: "Tiene que escojer Partida presupuestaria gasto grupo",
        })

      return (
        await new FetchPOSTTokenBlueI({
          url: "/budget/v1/reform-budgets/create",
          body: {
            ...data,
            classModification: data.classModification.value,
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
          <DateSimple
            label="Fecha"
            register={{ ...register("date") }}
            errors={<ErrorField field={errors.date} />}
          />
          <InputSimple
            label="Documento de referencia"
            register={{ ...register("documentReference") }}
            errors={<ErrorField field={errors.documentReference} />}
          />
          <InputSimple
            label="Concepto"
            register={{ ...register("concept") }}
            errors={<ErrorField field={errors.concept} />}
          />
          <SelectReactCustom
            label={
              <LabelSimple
                name="classModification"
                label="Clase de modificacion"
              />
            }
            name="classModification"
            control={control}
            options={ReformBudgetClassModificationOptions}
            errors={
              <ErrorField field={errors.classModification as FieldError} />
            }
          />

          {watchClassModification && isIncome && (
            <SelectReactCustom
              label={
                <LabelSimple
                  name="budgetPartidaIncome"
                  label="Partida presupuestaria ingreso grupo"
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

          {watchClassModification && isExpense && (
            <SelectReactCustom
              label={
                <LabelSimple
                  name="budgetPartidaExpense"
                  label="Partida presupuestaria gasto grupo"
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

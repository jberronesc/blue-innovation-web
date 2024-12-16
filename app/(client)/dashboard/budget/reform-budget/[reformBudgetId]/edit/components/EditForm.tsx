"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import ReformBudgetConst, {
  ReformBudgetClassModificationOptions,
  ReformBudgetClassModification,
} from "@budget/reform-budget/domain/constantClient"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import {
  ReformBudgetEditType,
  ReformBudgetEditSchema,
} from "@budget/reform-budget/domain/schemas"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { BudgetPartidaIncomeActiveEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeActiveEntity"
import { BudgetPartidaExpenseActiveEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseActiveEntity"
import {
  zodHasValueOptionNumber,
  zodOptionOrUndefinedOptionNumber,
  zodValueOrNullOptionNumber,
} from "@utils/zod/util"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ReformBudgetConst

export default function ReformBudgetEditForm({
  registerToEdit,
  budgetPartidaIncomes,
  budgetPartidaExpenses,
}: {
  registerToEdit: ReformBudgetFindEntity
  budgetPartidaIncomes: BudgetPartidaIncomeActiveEntity[]
  budgetPartidaExpenses: BudgetPartidaExpenseActiveEntity[]
}) {
  const {
    formState: { errors },
    control,
    watch,
    register,
    handleSubmit,
    getValues,
  } = useForm<ReformBudgetEditType>({
    resolver: zodResolver(ReformBudgetEditSchema),
    defaultValues: {
      ...registerToEdit,
      classModification: ReformBudgetClassModificationOptions.find(
        (elem) => elem.value == registerToEdit.classModification
      ),
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
        await new FetchPATCHTokenBlueI({
          url: `/budget/v1/reform-budgets/${registerToEdit.id}/update`,
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
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

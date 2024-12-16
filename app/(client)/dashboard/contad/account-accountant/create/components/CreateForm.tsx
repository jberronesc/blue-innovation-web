"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import AccountAccountantConst, {
  AccountAccountantNatureOptions,
  AccountAccountantTypeOptions,
} from "@contad/account-accountant/domain/constantClient"
import {
  AccountAccountantCreateType,
  AccountAccountantCreateSchema,
} from "@contad/account-accountant/domain/schemas"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { BudgetPartidaIncomeActiveEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeActiveEntity"
import { BudgetPartidaExpenseActiveEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseActiveEntity"
import { ZodConstant } from "@utils/zod/zod.constant"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { zodValueOrNullOptionNumber } from "@utils/zod/util"
import { ViewModelBackUrl } from "@viewM/index"

const constant = AccountAccountantConst

export default function AccountAccountantCreateForm({
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
  } = useForm<AccountAccountantCreateType>({
    resolver: zodResolver(AccountAccountantCreateSchema),
  })

  const budgetPartidaIncomesOptions = [
    ZodConstant.optionNumberEmpty,
    ...budgetPartidaIncomes.map((elem) => ({
      value: elem.id,
      label: `${elem.partida} - ${elem.name}`,
    })),
  ]

  const budgetPartidaExpensesOptions = [
    ZodConstant.optionNumberEmpty,
    ...budgetPartidaExpenses.map((elem) => ({
      value: elem.id,
      label: `${elem.partida} - ${elem.name}`,
    })),
  ]

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
          url: "/contad/v1/account-accountants/create",
          body: {
            ...data,
            nature: data.nature.value,
            type: data.type.value,
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
            label="Cuenta"
            register={{ ...register("account") }}
            errors={<ErrorField field={errors.account} />}
          />
          <InputSimple
            label="Descripcion"
            register={{ ...register("description") }}
            errors={<ErrorField field={errors.description} />}
          />
          <SelectReactCustom
            label={<LabelSimple name="nature" label="Naturaleza" />}
            name="nature"
            control={control}
            options={AccountAccountantNatureOptions}
            errors={<ErrorField field={errors.nature as FieldError} />}
          />
          <SelectReactCustom
            label={<LabelSimple name="type" label="Tipo" />}
            name="type"
            control={control}
            options={AccountAccountantTypeOptions}
            errors={<ErrorField field={errors.type as FieldError} />}
          />
          <div className="flex gap-6 flex-wrap">
            <CheckboxSimple
              label="Asocia centro costo?"
              register={{ ...register("associateCenterCost") }}
            />
            <CheckboxSimple
              label="De movimiento?"
              register={{ ...register("movement") }}
            />
            <CheckboxSimple
              label="Activo?"
              register={{ ...register("isActive") }}
            />
          </div>
          <SelectReactCustom
            label={
              <LabelSimple
                name="budgetPartidaIncome"
                label="Partido ingresos"
              />
            }
            name="budgetPartidaIncome"
            control={control}
            options={budgetPartidaIncomesOptions}
            errors={
              <ErrorField field={errors.budgetPartidaIncome as FieldError} />
            }
          />
          <SelectReactCustom
            label={
              <LabelSimple name="budgetPartidaExpense" label="Partido gastos" />
            }
            name="budgetPartidaExpense"
            control={control}
            options={budgetPartidaExpensesOptions}
            errors={
              <ErrorField field={errors.budgetPartidaExpense as FieldError} />
            }
          />
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

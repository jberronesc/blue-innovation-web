"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import BudgetCertificationDetailConst from "../../domain/constantClient"
import { BudgetCertificationDetailBudgetPartidaExpenseEntity } from "../../domain/interfaces/BudgetCertificationDetailBudgetPartidaExpenseEntity"
import {
  BudgetCertificationDetailCreateType,
  BudgetCertificationDetailCreateSchema,
} from "../../domain/schemas"
import { ViewModelBackUrl } from "@viewM/index"
import { SelectReactCustom } from "@component/select/SelectReactCustom"

const constant = BudgetCertificationDetailConst

export default function BudgetCertificationDetailCreateForm({
  params,
  budgetPartidaExpenses,
}: {
  budgetPartidaExpenses: BudgetCertificationDetailBudgetPartidaExpenseEntity[]
  params: { budgetCertificationId: string }
}) {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetCertificationDetailCreateType>({
    resolver: zodResolver(BudgetCertificationDetailCreateSchema),
  })

  const budgetPartidaExpenseOptions = budgetPartidaExpenses.map((elem) => ({
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

      return (
        await new FetchPOSTTokenBlueI({
          url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/budget-certification-details/create`,
          body: {
            ...data,
            budgetPartidaExpense: data.budgetPartidaExpense.value,
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
            label="PG"
            register={{ ...register("pg") }}
            errors={<ErrorField field={errors.pg} />}
          />
          <InputSimple
            label="SP"
            register={{ ...register("sp") }}
            errors={<ErrorField field={errors.sp} />}
          />
          <InputSimple
            label="PY"
            register={{ ...register("py") }}
            errors={<ErrorField field={errors.py} />}
          />
          <InputSimple
            label="ACT"
            register={{ ...register("act") }}
            errors={<ErrorField field={errors.act} />}
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
            label="Org"
            register={{ ...register("org") }}
            errors={<ErrorField field={errors.org} />}
          />
          <InputSimple
            label="N Prest"
            register={{ ...register("nPrest") }}
            errors={<ErrorField field={errors.nPrest} />}
          />
          <InputSimple
            label="Monto"
            register={{ ...register("amount") }}
            errors={<ErrorField field={errors.amount} />}
          />
          <SelectReactCustom
            label={
              <LabelSimple
                name="budgetPartidaExpense"
                label="Partidas presupuestaria de gasto"
              />
            }
            name="budgetPartidaExpense"
            control={control}
            options={budgetPartidaExpenseOptions}
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

"use client"

import Select from "react-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsCreate, ButtonsEditCancel } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import IncomeAffectationConstCli from "../../domain/constantClient"
import { IncomeAffectationAccountAccountantEntity } from "../../domain/interfaces/IncomeAffectationAccountAccountantEntity"
import {
  IncomeAffectationCreateFormTypeClient,
  IncomeAffectationCreateFormSchemaClient,
} from "../../domain/schemas"

export default function IncomeAffectationCreateForm({
  params,
  accountAccountants,
}: {
  accountAccountants: IncomeAffectationAccountAccountantEntity[]
  params: { incomeExecutionId: string }
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
  } = useForm<IncomeAffectationCreateFormTypeClient>({
    resolver: zodResolver(IncomeAffectationCreateFormSchemaClient),
  })

  const accountAccountantOptions = accountAccountants.map((elem) => ({
    label: `${elem.budgetPartidaExpense.partida} - ${elem.budgetPartidaExpense.name} -- Cuenta Asociada ${elem.account}`,
    value: elem.id,
  }))

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: `/v1/income-affectations/income-executions/${params.incomeExecutionId}`,
          body: {
            ...data,
            accountAccountant: data.accountAccountant.value,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          replace(
            `${IncomeAffectationConstCli.listUrl({
              ...params,
            })}?${getParamsToBack(
              searchParams,
              IncomeAffectationConstCli.getPerst()
            )}`
          )
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
            label="Cs"
            register={{ ...register("cs") }}
            errors={<ErrorField field={errors.cs} />}
          />
          <InputSimple
            label="Tipo"
            register={{ ...register("type") }}
            errors={<ErrorField field={errors.type} />}
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
            label="GEO"
            register={{ ...register("geo") }}
            errors={<ErrorField field={errors.geo} />}
          />
          <InputSimple
            label="Monto"
            register={{ ...register("amount") }}
            errors={<ErrorField field={errors.amount} />}
          />
          <SelectReactSimple
            label={
              <LabelSimple
                name="budgetPartida"
                label="Partidas presupuestarias"
              />
            }
            input={
              <Controller
                name="accountAccountant"
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId={10}
                    {...field}
                    options={accountAccountantOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={
              <ErrorField field={errors.accountAccountant as FieldError} />
            }
          />
        </div>
        <ButtonsCreate>
          <ButtonsEditCancel
            href={`${IncomeAffectationConstCli.listUrl({ ...params })}`}
            query={getParamsToBack(
              searchParams,
              IncomeAffectationConstCli.getPerst()
            )}
          />
        </ButtonsCreate>
      </form>
    </>
  )
}

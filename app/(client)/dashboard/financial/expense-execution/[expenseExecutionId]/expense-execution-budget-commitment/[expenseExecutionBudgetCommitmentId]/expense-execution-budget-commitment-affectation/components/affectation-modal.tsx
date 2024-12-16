import { ErrorField } from "@component/form"
import { InputSimple, InputNumberSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { ModalSimple } from "@component/modal"
import { SelectReactSimple } from "@component/select"
import { TypeRetentionActiveEntity } from "@financial/type-retention/domain/interfaces/TypeRetentionActiveEntity"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Select } from "@nextui-org/react"
import ToastifyUtil from "@utils/toastify/toastify"
import React, { useEffect, useState } from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import {
  ExpenseExecutionBudgetCommitmentActiveEntity,
  BudgetCommitmentDetailsBudgetCommitment,
} from "../../../domain/interfaces/ExpenseExecutionBudgetCommitmentActiveEntity"
import {
  ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient,
  ExpenseExecutionBudgetCommitmentAffectationCreateFormSchemaClient,
} from "../domain/schemas"

const init: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient = {
  id: 0,
  budgetPartida: {
    value: 0,
    label: "",
  },
  type: "",
  ubg: "",
  fte: "",
  subTotal0: "",
  subTotalDifferent0: "",
  baseImponibleNoRetention: "",
  baseImponibleRenta: "",
  codeRetentionRenta: undefined,
  totalRetentionRenta: "",
  baseImponibleIva: "",
  codeRetentionIva: undefined,
  totalRetentionIva: "",
  amount: "",
}

const AffectationModal = ({
  showModal,
  onSuccess,
  onCancel,
  typeRetentionActives,
  budgetCommitment,
  budgetCommitmentDetailsBudgetCommitment,
  affectactionSelected,
}: {
  showModal: boolean
  onSuccess: (
    data: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient
  ) => any
  onCancel: () => any
  typeRetentionActives: TypeRetentionActiveEntity[]
  budgetCommitment: ExpenseExecutionBudgetCommitmentActiveEntity
  budgetCommitmentDetailsBudgetCommitment: BudgetCommitmentDetailsBudgetCommitment[]
  affectactionSelected?: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient
}) => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient>({
    resolver: zodResolver(
      ExpenseExecutionBudgetCommitmentAffectationCreateFormSchemaClient
    ),
    defaultValues: init,
  })
  const [configInputs, setConfigInputs] = useState<{
    baseImponibleIva: { [x: string]: string | boolean }
  }>({ baseImponibleIva: {} })
  const [budgetCommitmentDetail, setBudgetCommitmentDetail] = useState<
    BudgetCommitmentDetailsBudgetCommitment | undefined
  >()

  useEffect(() => {
    if (showModal) calculate()
  }, [showModal])

  useEffect(() => {
    if (affectactionSelected) reset({ ...affectactionSelected })
    else reset(init)
    calculate()
  }, [affectactionSelected])

  const typeRetentionActivesOptions = typeRetentionActives.map((elem) => ({
    value: elem.id,
    label: `${elem.code} - ${elem.percentage} - ${elem.name}`,
  }))

  const budgetCommitmentDetailsBudgetOptions =
    budgetCommitmentDetailsBudgetCommitment.map((elem) => ({
      value: elem.budgetPartida.id,
      label: `Monto: ${elem.balance} - Saldo: ${elem.balance} - ${elem.budgetPartida.partida} - ${elem.budgetPartida.name}`,
      budgetCommitmentDetailId: elem.id,
    })) ?? []

  const calculate = () => {
    const subTotal0 = Number(getValues("subTotal0"))
    const subTotalDifferent0 = Number(getValues("subTotalDifferent0"))
    const baseImponibleNoRetention = Number(
      getValues("baseImponibleNoRetention")
    )

    const subTotal = subTotal0 + subTotalDifferent0
    const baseImponibleRenta =
      baseImponibleNoRetention > 0
        ? subTotal - baseImponibleNoRetention
        : subTotal
    const codeRetentionRenta = getValues("codeRetentionRenta")
    let totalRetentionRenta = 0
    if (codeRetentionRenta) {
      const typeRetention = typeRetentionActives.find(
        (elem) => elem.id == codeRetentionRenta.value
      )
      if (typeRetention)
        totalRetentionRenta =
          baseImponibleRenta * (typeRetention.percentage / 100) // TODO: percentage desde back se tiene que enviar el valor ya dividio
    }
    const baseImponibleIva = subTotalDifferent0 * 0.12
    const codeRetentionIva = getValues("codeRetentionIva")
    let totalRetentionIva = 0

    if (codeRetentionIva) {
      const typeRetention = typeRetentionActives.find(
        (elem) => elem.id == codeRetentionIva.value
      )
      if (typeRetention)
        totalRetentionIva = baseImponibleIva * (typeRetention.percentage / 100) // TODO: percentage desde back se tiene que enviar el valor ya dividio
    }

    const amount = baseImponibleNoRetention + baseImponibleRenta

    setValue("baseImponibleRenta", baseImponibleRenta.toString())
    setValue("totalRetentionRenta", totalRetentionRenta.toString())
    setValue("totalRetentionIva", totalRetentionIva.toString())
    setValue("amount", amount.toString())

    if ((subTotalDifferent0 ?? 0) <= 0) {
      setValue("baseImponibleIva", "0")
      setConfigInputs({
        ...configInputs,
        baseImponibleIva: {
          ...configInputs.baseImponibleIva,
          readOnly: true,
        },
      })
    } else {
      setConfigInputs({
        ...configInputs,
        baseImponibleIva: { ...configInputs.baseImponibleIva, readOnly: false },
      })
    }
  }

  return (
    <ModalSimple
      title="Afectacion presupuestaria"
      show={showModal}
      onCancel={() => {
        reset()
        calculate()
        onCancel()
      }}
    >
      <>
        <form
          onSubmit={handleSubmit(() => {
            const data = getValues()

            if (Number(data.amount) <= 0)
              return ToastifyUtil.error("El monto debe ser mayor a cero.")

            if ((budgetCommitmentDetail?.balance ?? 0) <= 0)
              return ToastifyUtil.error(
                "No existe saldo para tomar la partida presupuestaria."
              )

            if (Number(data.amount) > (budgetCommitmentDetail?.balance ?? 0))
              return ToastifyUtil.error("El monto NO debe ser mayor al saldo.")

            reset(init)
            onSuccess(data)
          })}
          id="affectacionForm"
        >
          <div className="form-sections-inputs">
            <SelectReactSimple
              label={
                <LabelSimple
                  name="budgetPartida"
                  label="Partida presupuestaria"
                />
              }
              input={
                <Controller
                  name="budgetPartida"
                  control={control}
                  render={({ field }) => (
                    <Select
                      instanceId={10}
                      {...field}
                      options={budgetCommitmentDetailsBudgetOptions}
                      className="text-black"
                      onChange={(...event: any[]) => {
                        const budgetCommitmentDetailOption = event[0]

                        setBudgetCommitmentDetail(
                          budgetCommitmentDetailsBudgetCommitment.find(
                            (elem) =>
                              elem.id ===
                              budgetCommitmentDetailOption.budgetCommitmentDetailId
                          )
                        )
                        setValue(
                          "id",
                          budgetCommitmentDetailOption.budgetCommitmentDetailId
                        )
                        return field.onChange(...event)
                      }}
                      onBlur={calculate}
                    />
                  )}
                />
              }
              errors={<ErrorField field={errors.budgetPartida as FieldError} />}
            />

            <div className="flex justify-between gap-1">
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
            </div>
            <div className="flex justify-between gap-1">
              <InputNumberSimple
                label="Subtotal 0"
                register={{ ...register("subTotal0", { onBlur: calculate }) }}
                errors={<ErrorField field={errors.subTotal0} />}
              />
              <InputNumberSimple
                label="Subtotal diferente 0"
                register={{
                  ...register("subTotalDifferent0", { onBlur: calculate }),
                }}
                errors={<ErrorField field={errors.subTotalDifferent0} />}
              />
              <InputNumberSimple
                label="Base imponible no retenido"
                register={{
                  ...register("baseImponibleNoRetention", {
                    onBlur: calculate,
                  }),
                }}
                errors={<ErrorField field={errors.baseImponibleNoRetention} />}
              />
            </div>

            <div className="flex justify-between gap-1">
              <InputNumberSimple
                label="Base Imponible Renta"
                register={{
                  ...register("baseImponibleRenta", { onBlur: calculate }),
                }}
                errors={<ErrorField field={errors.baseImponibleRenta} />}
              />
              <div className="flex-1">
                <SelectReactSimple
                  label={
                    <LabelSimple
                      name="codeRetentionRenta"
                      label="Codigo retencion renta"
                    />
                  }
                  input={
                    <Controller
                      name="codeRetentionRenta"
                      control={control}
                      render={({ field }) => (
                        <Select
                          instanceId={10}
                          isClearable
                          {...field}
                          options={typeRetentionActivesOptions}
                          className="text-black"
                          onBlur={calculate}
                        />
                      )}
                    />
                  }
                  errors={
                    <ErrorField
                      field={errors.codeRetentionRenta as FieldError}
                    />
                  }
                />
              </div>
              <InputNumberSimple
                label="Total retencion renta"
                register={{ ...register("totalRetentionRenta") }}
                errors={<ErrorField field={errors.totalRetentionRenta} />}
              />
            </div>

            <div className="flex justify-between gap-1">
              <InputNumberSimple
                label="Base imponible iva"
                register={{
                  ...register("baseImponibleIva", {
                    onBlur: calculate,
                  }),
                  ...configInputs.baseImponibleIva,
                }}
                errors={<ErrorField field={errors.baseImponibleIva} />}
              />
              <div className="flex-1">
                <SelectReactSimple
                  label={
                    <LabelSimple
                      name="codeRetentionIva"
                      label="Codigo retencion iva"
                    />
                  }
                  input={
                    <Controller
                      name="codeRetentionIva"
                      control={control}
                      render={({ field }) => (
                        <Select
                          instanceId={10}
                          isClearable
                          {...field}
                          options={typeRetentionActivesOptions}
                          className="text-black"
                          onChange={(...event: any[]) => {
                            calculate()
                            return field.onChange(...event)
                          }}
                          onBlur={calculate}
                        />
                      )}
                    />
                  }
                  errors={
                    <ErrorField field={errors.codeRetentionIva as FieldError} />
                  }
                />
              </div>
              <InputNumberSimple
                label="Total retenido iva"
                register={{
                  ...register("totalRetentionIva", { onBlur: calculate }),
                }}
                errors={<ErrorField field={errors.totalRetentionIva} />}
              />
            </div>

            <InputNumberSimple
              label="Monto"
              register={{
                ...register("amount"),
                readOnly: "readOnly",
              }}
              errors={<ErrorField field={errors.amount} />}
            />
            <Button color="danger" type="submit" form="affectacionForm">
              {"Si, guardar registro"}
            </Button>
          </div>
        </form>
      </>
    </ModalSimple>
  )
}

export default AffectationModal

"use client"

import { v4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import SelectReact from "react-select"
import React, { useEffect, useMemo, useState } from "react"
import TableSimple from "@/app/(client)/shared/ui/components/table/TableSimple"
import {
  TableCell as TCE,
  TableColumn as TC,
  TableRow as TR,
} from "@nextui-org/react"
import { ButtonsCreate } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { TextAreaSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { ToogleSimple } from "@component/toogle"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { TransactionClassRegister } from "@contad/transaction/domain/constantClient"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import { IncomeXCobrarTransactionClassRegisterOptions } from "@financial/income-x-cobrar/domain/constantClient"
import { IncomeXCobrarSupplierInfoEntity } from "@financial/income-x-cobrar/domain/interfaces/IncomeXCobrarSupplierInfoEntity"
import { IncomeXCobrarSupplierInfoSelected } from "@financial/income-x-cobrar/domain/interfaces/IncomeXCobrarSupplierInfoSelected"
import {
  IncomeXCobrarCreateFormTypeClient,
  IncomeXCobrarCreateFormSchemaClient,
} from "@financial/income-x-cobrar/domain/schemas"
import {
  FetchPOSTTokenBlueI,
  FetchGETTokenBlueI,
} from "@utils/fetch/fetchBlueInnovation"
import ToastifyUtil from "@utils/toastify/toastify"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

const xPay = [
  {
    id: 73,
    amount: 200,
    balance: 200,
    isSelected: false,
    isPaid: false,
    amountSelected: 0,
    transaction: {
      id: 88,
      sequence: 7,
      sequenceType: 4,
      date: "2024-05-27",
      dateOperation: "2024-01-10",
      documentReference: "sn",
      concept: "sn",
      type: "RC",
      classRegister: "COM_Y_DEV",
      sequenceDisplay: "0007",
      sequenceTypeDisplay: "0004",
    },
    expenseXPayDetails: [
      {
        id: 35,
        amount: 100,
        balance: 100,
        isSelected: false,
        isPaid: false,
        amountSelected: 0,
        accountAccountant: {
          id: 390,
          account: "113.37.01",
          description: "CREDITOS PARA PRUEBAS",
          nature: "DEBIT",
          type: "ASSET",
          associateCenterCost: false,
          movement: false,
          isActive: true,
          typePertain: "ACCOUNT_LEVEL_2",
        },
        expenseAffectation: {
          id: 41,
          cs: "h",
          type: "h",
          ubg: "h",
          fte: "h",
          geo: "h",
          amount: 100,
        },
      },
      {
        id: 36,
        amount: 100,
        balance: 100,
        isSelected: false,
        isPaid: false,
        amountSelected: 0,
        accountAccountant: {
          id: 49,
          account: "113.97.07",
          description:
            "CUENTAS POR COBRAR ANTICIPOS DE FONDOS DE AÑOS ANTERIORES",
          nature: "CREDIT",
          type: "ASSET",
          associateCenterCost: false,
          movement: true,
          isActive: true,
          typePertain: "ACCOUNT_LEVEL_2",
        },
        expenseAffectation: {
          id: 42,
          cs: "u",
          type: "u",
          ubg: "u",
          fte: "u",
          geo: "u",
          amount: 100,
        },
      },
    ],
  },
  {
    id: 72,
    amount: 10,
    balance: 10,
    isSelected: false,
    isPaid: false,
    amountSelected: 0,
    transaction: {
      id: 86,
      sequence: 5,
      sequenceType: 3,
      date: "2024-01-24",
      dateOperation: "2024-01-24",
      documentReference: "rt",
      concept: "rt",
      type: "RC",
      classRegister: "COM_Y_DEV",
      sequenceDisplay: "0005",
      sequenceTypeDisplay: "0003",
    },
    expenseXPayDetails: [
      {
        id: 34,
        amount: 10,
        balance: 10,
        isSelected: false,
        isPaid: false,
        amountSelected: 0,
        accountAccountant: {
          id: 390,
          account: "113.37.01",
          description: "CREDITOS PARA PRUEBAS",
          nature: "DEBIT",
          type: "ASSET",
          associateCenterCost: false,
          movement: false,
          isActive: true,
          typePertain: "ACCOUNT_LEVEL_2",
        },
        expenseAffectation: {
          id: 39,
          cs: "g",
          type: "g",
          ubg: "g",
          fte: "g",
          geo: "g",
          amount: 10,
        },
      },
    ],
  },
]

export default function IncomeXCobrarCreateForm({
  transactionInfoToValidate,
  suppliers,
}: {
  transactionInfoToValidate: TransactionInfoToValidateEntity
  suppliers: SupplierAllEntity[]
}) {
  // https://www.material-tailwind.com/docs/html/textarea
  const { replace, push, back, forward, prefetch, refresh } = useRouter()
  const [
    incomeXCobrarSupplierInfoSelected,
    setIncomeXCobrarSupplierInfoSelected,
  ] = useState<IncomeXCobrarSupplierInfoSelected | undefined>(undefined)
  const [sumData, setSumData] = useState<{
    incomeXCobrar: number
    incomeXPay: number
  }>({
    incomeXCobrar: 0,
    incomeXPay: 0,
  })

  useEffect(() => {
    setSumData((state) => ({
      ...state,
      incomeXCobrar:
        incomeXCobrarSupplierInfoSelected?.incomeXCobrarsResult.reduce(
          (a, b) => a + b.amountSelected,
          0
        ) || 0,
      incomeXPay:
        incomeXCobrarSupplierInfoSelected?.expenseXPaysResult.reduce(
          (a, b) => a + b.amountSelected,
          0
        ) || 0,
    }))
  }, [incomeXCobrarSupplierInfoSelected])

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<IncomeXCobrarCreateFormTypeClient>({
    resolver: zodResolver(IncomeXCobrarCreateFormSchemaClient),
    defaultValues: {},
  })

  const suppliersOptions = useMemo(
    () => [
      ...suppliers.map((elem) => ({
        value: elem.id,
        label: `${elem.firstName} - ${elem.lastName} - ${elem.dni}`,
      })),
    ],
    []
  )

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()

      if (sumData.incomeXCobrar <= 0)
        return ToastifyUtil.error(
          "Los cobros no pueden ser menores o igual a cero."
        )

      const incomeXCobrarResult =
        incomeXCobrarSupplierInfoSelected?.incomeXCobrarsResult
          .filter((incomeXCobrar) => incomeXCobrar.isSelected)
          .map((incomeXCobrar) => ({
            ...incomeXCobrar,
            incomeXCobrarDetails: incomeXCobrar.incomeXCobrarDetails.filter(
              (detail) => detail.isSelected
            ),
          }))

      const incomeXPayResult =
        incomeXCobrarSupplierInfoSelected?.expenseXPaysResult
          .filter((expenseXPay) => expenseXPay.isSelected)
          .map((expenseXPay) => ({
            ...expenseXPay,
            expenseXPayDetails: expenseXPay.expenseXPayDetails.filter(
              (detail) => detail.isSelected
            ),
          }))

      if (
        incomeXCobrarResult?.some(
          (incomeXCobrar) => incomeXCobrar.incomeXCobrarDetails.length == 0
        )
      )
        return ToastifyUtil.error(
          "Existe un cobro con cuenta selecciona pero con ningun detalle seleccionado."
        )

      if (
        incomeXCobrarResult?.some((incomeXCobrar) =>
          incomeXCobrar.incomeXCobrarDetails.some(
            (detail) => detail.amountSelected <= 0
          )
        )
      )
        return ToastifyUtil.error(
          "Existe un detalle de cobro seleccionado con cero."
        )

      if (
        data.classRegister.value == TransactionClassRegister.COMPENSACI.value
      ) {
        if (sumData.incomeXCobrar !== sumData.incomeXPay)
          return ToastifyUtil.error(
            "Es COMPENSACION, los montos tienen que ser iguales."
          )

        if (
          incomeXPayResult?.some(
            (expenseXPay) => expenseXPay.expenseXPayDetails.length == 0
          )
        )
          return ToastifyUtil.error(
            "Existe un pago con cuenta selecciona pero con ningun detalle seleccionado."
          )

        if (
          incomeXPayResult?.some((expenseXPay) =>
            expenseXPay.expenseXPayDetails.some(
              (detail) => detail.amountSelected <= 0
            )
          )
        )
          return ToastifyUtil.error(
            "Existe un detalle de pago seleccionado con cero."
          )
      }

      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/income-x-cobrar",
          body: {
            ...data,
            supplier: data.supplier.value,
            classRegister: data.classRegister.value,
            incomeXCobrarResult,
            incomeXPayResult,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          refresh()
          // replace("/dashboard/financial/income-x-cobrar/cobrar")
        }
      )
    },
  })

  const details = async (supplierId: number) => {
    vmLoading.loadingSimple()
    setIncomeXCobrarSupplierInfoSelected(undefined)
    ;(
      await new FetchGETTokenBlueI({
        url: `/v1/income-x-cobrar/supplier/${supplierId}/info`,
      }).exec()
    ).fold(
      async (error) => vmLoading.errorSimple({ error }),
      async (value) => {
        vmLoading.succesNoMessageWithoutLoadings()
        const incomeXCobrarSupplierInfoEntity =
          value.data as IncomeXCobrarSupplierInfoEntity
        setIncomeXCobrarSupplierInfoSelected({
          incomeXCobrarsResult:
            incomeXCobrarSupplierInfoEntity.incomeXCobrarsResult.map(
              (incomeXCobrar) => ({
                isSelected: false,
                amountSelected: 0,
                ...incomeXCobrar,
                incomeXCobrarDetails: incomeXCobrar.incomeXCobrarDetails.map(
                  (detail) => ({
                    ...detail,
                    isSelected: false,
                    amountSelected: 0,
                  })
                ),
              })
            ),
          expenseXPaysResult: xPay,
          // incomeXCobrarSupplierInfoEntity.expenseXPaysResult.map(
          //   (incomeXPay) => ({
          //     isSelected: false,
          //     amountSelected: 0,
          //     ...incomeXPay,
          //     expenseXPayDetails: incomeXPay.expenseXPayDetails.map(
          //       (detail) => ({
          //         ...detail,
          //         isSelected: false,
          //         amountSelected: 0,
          //       })
          //     ),
          //   })
          // ),
        })
      }
    )
  }

  return (
    <>
      {modal}

      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <DateSimple
            label="Fecha"
            register={{
              ...register("date"),
              min: transactionInfoToValidate.dateOperationMin,
              max: transactionInfoToValidate.dateOperationMax,
            }}
            errors={<ErrorField field={errors.date} />}
          />
          <div className="flex">
            <TextAreaSimple
              label="Concepto"
              register={{ ...register("concept") }}
              errors={<ErrorField field={errors.concept} />}
            />
            <div className="w-10"></div>
            <TextAreaSimple
              label="Documento referencia"
              register={{ ...register("documentReference") }}
              errors={<ErrorField field={errors.documentReference} />}
            />
          </div>
          <SelectReactSimple
            label={
              <LabelSimple name="classRegister" label="Clase de retistro" />
            }
            input={
              <Controller
                name="classRegister"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={IncomeXCobrarTransactionClassRegisterOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.supplier as FieldError} />}
          />
          <SelectReactSimple
            label={<LabelSimple name="supplier" label="Proveedor" />}
            input={
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={suppliersOptions}
                    className="text-black"
                    onChange={(...event: any[]) => {
                      details(event[0].value)
                      return field.onChange(...event)
                    }}
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.supplier as FieldError} />}
          />

          {incomeXCobrarSupplierInfoSelected && (
            <>
              {incomeXCobrarSupplierInfoSelected.incomeXCobrarsResult && (
                <table className="min-w-full bg-white shadow-md rounded-xl">
                  <thead>
                    <tr className="bg-blue-gray-100 text-gray-700">
                      <th className="py-3 px-4">Seleccionar</th>
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Nº</th>
                      <th className="py-3 px-4">Tipo/Secuencia</th>
                      <th className="py-3 px-4">Monto</th>
                      <th className="py-3 px-4">Saldo</th>
                      <th className="py-3 px-4">Valor seleccionado</th>
                      <th className="py-3 px-4">Opciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-gray-900">
                    {[
                      ...incomeXCobrarSupplierInfoSelected.incomeXCobrarsResult.map(
                        (incomeXCobrar, index) => (
                          <React.Fragment key={v4()}>
                            <tr
                              key={v4()}
                              className="border-b border-blue-gray-200 text-black"
                            >
                              <td className="text-xs py-3 px-4">
                                <ToogleSimple
                                  checked={incomeXCobrar.isSelected}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    setIncomeXCobrarSupplierInfoSelected(
                                      (state) =>
                                        state && {
                                          ...state,
                                          incomeXCobrarsResult:
                                            state.incomeXCobrarsResult.map(
                                              (incomeXCobrarInter) => {
                                                if (
                                                  incomeXCobrarInter.id !=
                                                  incomeXCobrar.id
                                                )
                                                  return incomeXCobrarInter

                                                return {
                                                  ...incomeXCobrarInter,
                                                  isSelected: e.target.checked,
                                                  amount: 0,
                                                  amountSelected: 0,
                                                  incomeXCobrarDetails:
                                                    incomeXCobrarInter.incomeXCobrarDetails.map(
                                                      (detail) => ({
                                                        ...detail,
                                                        isSelected: false,
                                                        amountSelected: 0,
                                                      })
                                                    ),
                                                }
                                              }
                                            ),
                                        }
                                    )
                                  }}
                                />
                              </td>
                              <td className="text-xs py-3 px-4">
                                {incomeXCobrar.transaction.dateOperation}
                              </td>
                              <td className="text-xs py-3 px-4">
                                {incomeXCobrar.transaction.sequenceDisplay}
                              </td>
                              <td className="text-xs py-3 px-4">
                                {incomeXCobrar.transaction.type} /{" "}
                                {incomeXCobrar.transaction.sequenceTypeDisplay}
                              </td>
                              <td className="text-xs py-3 px-4 text-right">
                                {incomeXCobrar.amount}
                              </td>
                              <td className="text-xs py-3 px-4 text-right">
                                {incomeXCobrar.balance}
                              </td>
                              <td className="text-xs py-3 px-4 text-right">
                                {incomeXCobrar.amountSelected}
                              </td>
                              <td className="text-xs py-3 px-4"></td>
                            </tr>
                            {incomeXCobrar.isSelected && (
                              <tr>
                                <td colSpan={8} className="py-10 px-32">
                                  <table
                                    key={v4()}
                                    className="w-full bg-white shadow-md rounded-xl"
                                  >
                                    <thead>
                                      <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4">
                                          Seleccionar
                                        </th>
                                        <th className="py-3 px-4">
                                          Cuenta contable
                                        </th>
                                        <th className="py-3 px-4">Saldo</th>
                                        <th className="py-3 px-4">
                                          Valor seleccionado
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-blue-gray-900">
                                      {incomeXCobrar.incomeXCobrarDetails.map(
                                        (detail) => (
                                          <tr
                                            key={v4()}
                                            className="border-b border-blue-gray-200 text-black"
                                          >
                                            <td className="text-xs py-3 px-4">
                                              <ToogleSimple
                                                checked={detail.isSelected}
                                                onChange={(
                                                  e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                  setIncomeXCobrarSupplierInfoSelected(
                                                    (state) =>
                                                      state && {
                                                        ...state,
                                                        incomeXCobrarsResult:
                                                          state.incomeXCobrarsResult.map(
                                                            (
                                                              incomeXCobrarInter
                                                            ) => {
                                                              if (
                                                                incomeXCobrarInter.id !=
                                                                incomeXCobrar.id
                                                              )
                                                                return incomeXCobrarInter

                                                              const incomeXCobrarDetails =
                                                                incomeXCobrarInter.incomeXCobrarDetails.map(
                                                                  (
                                                                    detailInter
                                                                  ) => {
                                                                    if (
                                                                      detailInter.id !=
                                                                      detail.id
                                                                    )
                                                                      return detailInter

                                                                    return {
                                                                      ...detailInter,
                                                                      isSelected:
                                                                        e.target
                                                                          .checked,
                                                                      amountSelected: 0,
                                                                    }
                                                                  }
                                                                )

                                                              return {
                                                                ...incomeXCobrarInter,
                                                                amountSelected:
                                                                  incomeXCobrarDetails.reduce(
                                                                    (a, b) =>
                                                                      a +
                                                                      b.amountSelected,
                                                                    0
                                                                  ),
                                                                incomeXCobrarDetails,
                                                              }
                                                            }
                                                          ),
                                                      }
                                                  )
                                                }}
                                              />
                                              {detail.id}
                                            </td>
                                            <td className="text-xs py-3 px-4 text-right">
                                              {detail.accountAccountant.account}
                                            </td>
                                            <td className="text-xs py-3 px-4 text-right">
                                              {detail.balance}
                                            </td>
                                            <td className="text-xs py-3 px-4 text-right">
                                              {detail.isSelected && (
                                                <input
                                                  type="text"
                                                  className="w-20 text-right"
                                                  defaultValue={
                                                    detail.amountSelected
                                                  }
                                                  autoComplete="off"
                                                  autoFocus={false}
                                                  onBlur={(e) => {
                                                    setIncomeXCobrarSupplierInfoSelected(
                                                      (state) =>
                                                        state && {
                                                          ...state,
                                                          incomeXCobrarsResult:
                                                            state.incomeXCobrarsResult.map(
                                                              (
                                                                incomeXCobrarInter
                                                              ) => {
                                                                if (
                                                                  incomeXCobrarInter.id !=
                                                                  incomeXCobrar.id
                                                                )
                                                                  return incomeXCobrarInter

                                                                const incomeXCobrarDetails =
                                                                  incomeXCobrarInter.incomeXCobrarDetails.map(
                                                                    (
                                                                      detailInter
                                                                    ) => {
                                                                      if (
                                                                        detailInter.id !=
                                                                        detail.id
                                                                      )
                                                                        return detailInter

                                                                      const amountSelected =
                                                                        Number(
                                                                          e
                                                                            .target
                                                                            .value
                                                                        )

                                                                      return {
                                                                        ...detailInter,
                                                                        amountSelected:
                                                                          amountSelected >
                                                                          detailInter.balance
                                                                            ? detailInter.balance
                                                                            : amountSelected,
                                                                      }
                                                                    }
                                                                  )

                                                                return {
                                                                  ...incomeXCobrarInter,
                                                                  amountSelected:
                                                                    incomeXCobrarDetails.reduce(
                                                                      (a, b) =>
                                                                        a +
                                                                        b.amountSelected,
                                                                      0
                                                                    ),
                                                                  incomeXCobrarDetails,
                                                                }
                                                              }
                                                            ),
                                                        }
                                                    )
                                                  }}
                                                />
                                              )}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      ),
                      <tr
                        key={v4()}
                        className="border-b border-blue-gray-200 text-black"
                      >
                        <td
                          colSpan={6}
                          className="text-xs py-3 px-4 text-center"
                        >
                          <span className="font-bold">Total:</span>
                        </td>
                        <td className="text-xs py-3 px-4 text-right">
                          <span className="font-bold">
                            {sumData.incomeXCobrar}
                          </span>
                        </td>
                        <td></td>
                      </tr>,
                    ]}
                  </tbody>
                </table>
              )}

              {incomeXCobrarSupplierInfoSelected.expenseXPaysResult && (
                <table className="min-w-full bg-white shadow-md rounded-xl"></table>
              )}
            </>
          )}

          <TableSimple
            hideHeader={true}
            theadTrs={[<TC key={v4()}>N</TC>, <TC key={v4()}>N</TC>]}
          >
            {[
              <TR key={v4()} className="text-black">
                <TCE className="text-center">
                  <b>TOTAL CUENTA X COBRAR</b>
                </TCE>
                <TCE className="text-xs text-right">
                  <b>{sumData.incomeXCobrar}</b>
                </TCE>
              </TR>,
              <TR key={v4()} className="text-black">
                <TCE className="text-center">
                  <b>TOTAL CUENTA X PAGAR</b>
                </TCE>
                <TCE className="text-xs text-right">
                  <b>{sumData.incomeXPay}</b>
                </TCE>
              </TR>,
            ]}
          </TableSimple>
        </div>
        <ButtonsCreate>
          <></>
        </ButtonsCreate>
      </form>
    </>
  )
}

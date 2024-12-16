"use client"

import { v4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import SelectReact from "react-select"
import { useEffect, useMemo, useState } from "react"
import { TableCell, TableColumn, TableRow } from "@nextui-org/react"
import React from "react"
import { ButtonsCreate } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { TextAreaSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { TableSimple } from "@component/table"
import { ToogleSimple } from "@component/toogle"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import { IncomeXTransferSupplierInfoEntity } from "@financial/income-x-transfer/domain/interfaces/IncomeXTransferSupplierInfoEntity"
import { IncomeXTransferSupplierInfoSelected } from "@financial/income-x-transfer/domain/interfaces/IncomeXTransferSupplierInfoSelected"
import {
  IncomeXTransferCreateFormTypeClient,
  IncomeXTransferCreateFormSchemaClient,
} from "@financial/income-x-transfer/domain/schemas"
import {
  FetchPOSTTokenBlueI,
  FetchGETTokenBlueI,
} from "@utils/fetch/fetchBlueInnovation"
import ToastifyUtil from "@utils/toastify/toastify"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function IncomeXTransferCreateForm({
  transactionInfoToValidate,
  suppliers,
}: {
  transactionInfoToValidate: TransactionInfoToValidateEntity
  suppliers: SupplierAllEntity[]
}) {
  // https://www.material-tailwind.com/docs/html/textarea
  const { replace, push, back, forward, prefetch, refresh } = useRouter()
  const [
    incomeXTransferSupplierInfoSelected,
    setIncomeXTransferSupplierInfoSelected,
  ] = useState<IncomeXTransferSupplierInfoSelected[]>([])
  const [sumData, setSumData] = useState<{
    incomeXTransfer: number
  }>({
    incomeXTransfer: 0,
  })

  useEffect(() => {
    setSumData((state) => ({
      ...state,
      incomeXTransfer:
        incomeXTransferSupplierInfoSelected.reduce(
          (a, b) => a + b.amountSelected,
          0
        ) || 0,
    }))
  }, [incomeXTransferSupplierInfoSelected])

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<IncomeXTransferCreateFormTypeClient>({
    resolver: zodResolver(IncomeXTransferCreateFormSchemaClient),
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

      if (sumData.incomeXTransfer <= 0)
        return ToastifyUtil.error(
          "Los cobros no pueden ser menores o igual a cero."
        )

      const incomeXTransferResult = incomeXTransferSupplierInfoSelected
        .filter((incomeXTransfer) => incomeXTransfer.isSelected)
        .map((incomeXTransfer) => ({
          ...incomeXTransfer,
          incomeXTransferDetails: incomeXTransfer.incomeXTransferDetails.filter(
            (detail) => detail.isSelected
          ),
        }))

      if (
        incomeXTransferResult.some(
          (incomeXTransfer) =>
            incomeXTransfer.incomeXTransferDetails.length == 0
        )
      )
        return ToastifyUtil.error(
          "Existe un cobro con cuenta selecciona pero con ningun detalle seleccionado."
        )

      if (
        incomeXTransferResult.some((incomeXTransfer) =>
          incomeXTransfer.incomeXTransferDetails.some(
            (detail) => detail.amountSelected <= 0
          )
        )
      )
        return ToastifyUtil.error(
          "Existe un detalle de cobro seleccionado con cero."
        )

      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/income-x-transfer",
          body: {
            ...data,
            supplier: data.supplier.value,
            incomeXTransferResult,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          refresh()
          // replace("/dashboard/financial/income-x-transfer/transfer")
        }
      )
    },
  })

  const details = async (supplierId: number) => {
    vmLoading.loadingSimple()
    setIncomeXTransferSupplierInfoSelected([])
    ;(
      await new FetchGETTokenBlueI({
        url: `/v1/income-x-transfer/supplier/${supplierId}/info`,
      }).exec()
    ).fold(
      async (error) => vmLoading.errorSimple({ error }),
      async (value) => {
        vmLoading.succesNoMessageWithoutLoadings()
        const incomeXTransferSupplierInfoEntity =
          value.data as IncomeXTransferSupplierInfoEntity[]
        setIncomeXTransferSupplierInfoSelected(
          incomeXTransferSupplierInfoEntity.map((incomeXTransfer) => ({
            isSelected: false,
            amountSelected: 0,
            ...incomeXTransfer,
            incomeXTransferDetails: incomeXTransfer.incomeXTransferDetails.map(
              (detail) => ({
                ...detail,
                isSelected: false,
                amountSelected: 0,
              })
            ),
          }))
        )
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
                ...incomeXTransferSupplierInfoSelected.map(
                  (incomeXTransfer, index) => (
                    <React.Fragment key={v4()}>
                      <tr
                        key={v4()}
                        className="border-b border-blue-gray-200 text-black"
                      >
                        <td className="text-xs py-3 px-4">
                          <ToogleSimple
                            checked={incomeXTransfer.isSelected}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setIncomeXTransferSupplierInfoSelected((state) =>
                                state.map((incomeXTransferInter) => {
                                  if (
                                    incomeXTransferInter.id !=
                                    incomeXTransfer.id
                                  )
                                    return incomeXTransferInter

                                  return {
                                    ...incomeXTransferInter,
                                    isSelected: e.target.checked,
                                    amount: 0,
                                    amountSelected: 0,
                                    incomeXTransferDetails:
                                      incomeXTransferInter.incomeXTransferDetails.map(
                                        (detail) => ({
                                          ...detail,
                                          isSelected: false,
                                          amountSelected: 0,
                                        })
                                      ),
                                  }
                                })
                              )
                            }}
                          />
                        </td>
                        <td className="text-xs py-3 px-4">
                          {incomeXTransfer.transaction.dateOperation}
                        </td>
                        <td className="text-xs py-3 px-4">
                          {incomeXTransfer.transaction.sequenceDisplay}
                        </td>
                        <td className="text-xs py-3 px-4">
                          {incomeXTransfer.transaction.type} /{" "}
                          {incomeXTransfer.transaction.sequenceTypeDisplay}
                        </td>
                        <td className="text-xs py-3 px-4 text-right">
                          {incomeXTransfer.amount}
                        </td>
                        <td className="text-xs py-3 px-4 text-right">
                          {incomeXTransfer.balance}
                        </td>
                        <td className="text-xs py-3 px-4 text-right">
                          {incomeXTransfer.amountSelected}
                        </td>
                        <td className="text-xs py-3 px-4"></td>
                      </tr>
                      {incomeXTransfer.isSelected && (
                        <tr>
                          <td colSpan={8} className="py-10 px-32">
                            <table
                              key={v4()}
                              className="w-full bg-white shadow-md rounded-xl"
                            >
                              <thead>
                                <tr className="bg-blue-gray-100 text-gray-700">
                                  <th className="py-3 px-4">Seleccionar</th>
                                  <th className="py-3 px-4">Cuenta contable</th>
                                  <th className="py-3 px-4">Saldo</th>
                                  <th className="py-3 px-4">
                                    Valor seleccionado
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-blue-gray-900">
                                {incomeXTransfer.incomeXTransferDetails.map(
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
                                            setIncomeXTransferSupplierInfoSelected(
                                              (state) =>
                                                state.map(
                                                  (incomeXTransferInter) => {
                                                    if (
                                                      incomeXTransferInter.id !=
                                                      incomeXTransfer.id
                                                    )
                                                      return incomeXTransferInter

                                                    const incomeXTransferDetails =
                                                      incomeXTransferInter.incomeXTransferDetails.map(
                                                        (detailInter) => {
                                                          if (
                                                            detailInter.id !=
                                                            detail.id
                                                          )
                                                            return detailInter

                                                          return {
                                                            ...detailInter,
                                                            isSelected:
                                                              e.target.checked,
                                                            amountSelected: 0,
                                                          }
                                                        }
                                                      )

                                                    return {
                                                      ...incomeXTransferInter,
                                                      amountSelected:
                                                        incomeXTransferDetails.reduce(
                                                          (a, b) =>
                                                            a +
                                                            b.amountSelected,
                                                          0
                                                        ),
                                                      incomeXTransferDetails,
                                                    }
                                                  }
                                                )
                                            )
                                          }}
                                        />
                                        {detail.id}
                                      </td>
                                      <td className="text-xs py-3 px-4 text-right">
                                        {
                                          incomeXTransfer.accountAccountant
                                            .account
                                        }
                                      </td>
                                      <td className="text-xs py-3 px-4 text-right">
                                        {detail.balance}
                                      </td>
                                      <td className="text-xs py-3 px-4 text-right">
                                        {detail.isSelected && (
                                          <input
                                            type="text"
                                            className="w-20 text-right"
                                            defaultValue={detail.amountSelected}
                                            autoComplete="off"
                                            autoFocus={false}
                                            onBlur={(e) => {
                                              setIncomeXTransferSupplierInfoSelected(
                                                (state) =>
                                                  state.map(
                                                    (incomeXTransferInter) => {
                                                      if (
                                                        incomeXTransferInter.id !=
                                                        incomeXTransfer.id
                                                      )
                                                        return incomeXTransferInter

                                                      const incomeXTransferDetails =
                                                        incomeXTransferInter.incomeXTransferDetails.map(
                                                          (detailInter) => {
                                                            if (
                                                              detailInter.id !=
                                                              detail.id
                                                            )
                                                              return detailInter

                                                            const amountSelected =
                                                              Number(
                                                                e.target.value
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
                                                        ...incomeXTransferInter,
                                                        amountSelected:
                                                          incomeXTransferDetails.reduce(
                                                            (a, b) =>
                                                              a +
                                                              b.amountSelected,
                                                            0
                                                          ),
                                                        incomeXTransferDetails,
                                                      }
                                                    }
                                                  )
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
                  <td colSpan={6} className="text-xs py-3 px-4 text-center">
                    <span className="font-bold">Total:</span>
                  </td>
                  <td className="text-xs py-3 px-4 text-right">
                    <span className="font-bold">{sumData.incomeXTransfer}</span>
                  </td>
                  <td></td>
                </tr>,
              ]}
            </tbody>
          </table>

          <TableSimple
            hideHeader={true}
            theadTrs={[
              <TableColumn key={v4()}>N</TableColumn>,
              <TableColumn key={v4()}>N</TableColumn>,
            ]}
          >
            {[
              <TableRow key={v4()} className="text-black">
                <TableCell className="text-center">
                  <b>TOTAL CUENTA X TRANSFERIR</b>
                </TableCell>
                <TableCell className="text-xs text-right">
                  <b>{sumData.incomeXTransfer}</b>
                </TableCell>
              </TableRow>,
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

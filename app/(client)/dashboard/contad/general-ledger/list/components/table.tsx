"use client"

import { v4 } from "uuid"
import TableSimple from "@/app/(client)/shared/ui/components/table/TableSimple"
import Select from "react-select"
import { TableCell, TableColumn, TableRow } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { AccountAccountantType } from "@contad/account-accountant/domain/constantClient"
import { GeneralLedgerDetailDataEntity } from "@contad/general-ledger/[generalLedgerId]/general-ledger-detail/domain/interfaces/GeneralLedgerDetailDataEntity"
import { AppStore } from "@rdtkl/store"
import { FetchGETTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { useState, useEffect } from "react"

type Inputs = {
  month: {
    value: number
    label: string
  }
}
const generalLedgerDetailDataInitial: GeneralLedgerDetailDataEntity = {
  balanceInitial: 0,
  debit: 0,
  credit: 0,
  balanceEnd: 0,
  generalLedgerDetails: [],
}

export default function GeneralLedgerTable({}: {}) {
  const { permissions, generalLedgers } = useSelector(
    (store: AppStore) => store.auth
  )
  const options = generalLedgers.map((elem) => ({
    value: elem.id,
    label: elem.month,
  }))

  const { setValue, control } = useForm<Inputs>()
  const vmLoading = ViewModelLoading({})
  const [generalLedgerDetailData, setGeneralLedgerDetailData] =
    useState<GeneralLedgerDetailDataEntity>(generalLedgerDetailDataInitial)

  const details = async (generalLedgerId: number) => {
    vmLoading.loadingSimple()
    setGeneralLedgerDetailData(generalLedgerDetailDataInitial)
    ;(
      await new FetchGETTokenBlueI({
        url: `/v1/general-ledger-details/general-ledgers/${generalLedgerId}/data`,
      }).exec()
    ).fold(
      async (error) => {
        vmLoading.errorSimple({ error })
      },
      async (value) => {
        vmLoading.succesNoMessageWithoutLoadings()
        setGeneralLedgerDetailData(value.data as GeneralLedgerDetailDataEntity)
      }
    )
  }

  useEffect(() => {
    if (options.length > 0) details(options[0].value)
  }, [])

  return (
    <>
      <SelectReactSimple
        label={<LabelSimple name="month" label="Mayores" />}
        input={
          <Controller
            name="month"
            control={control}
            defaultValue={options.length > 0 ? options[0] : undefined}
            render={({ field }) => (
              <Select
                instanceId={1}
                {...field}
                options={options}
                required={true}
                className="text-black"
                onChange={(...event: any[]) => {
                  if (event) details(event[0].value)
                  return field.onChange(...event)
                }}
              />
            )}
          />
        }
      />

      <TableSimple
        theadTrs={[
          <TableColumn key={v4()}>Cuenta</TableColumn>,
          <TableColumn key={v4()}>Tipo</TableColumn>,
          <TableColumn key={v4()}>Saldo Inicial</TableColumn>,
          <TableColumn key={v4()}>Debe</TableColumn>,
          <TableColumn key={v4()}>Haber</TableColumn>,
          <TableColumn key={v4()}>Saldo Final</TableColumn>,
        ]}
      >
        {[
          ...generalLedgerDetailData.generalLedgerDetails.map((register) => (
            <TableRow key={register.id} className="text-black">
              <TableCell>
                <b>{register.accountAccountant.account}</b>
                <br />
                {register.accountAccountant.description}
              </TableCell>
              <TableCell>
                {AccountAccountantType[register.accountAccountant.type].label}
              </TableCell>
              <TableCell>{register.balanceInitial}</TableCell>
              <TableCell>{register.debit}</TableCell>
              <TableCell>{register.credit}</TableCell>
              <TableCell>{register.balanceEnd}</TableCell>
            </TableRow>
          )),
          <TableRow key={"key-1-sp"} className="text-black">
            <TableCell>Total:</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{generalLedgerDetailData.balanceInitial}</TableCell>
            <TableCell>{generalLedgerDetailData.debit}</TableCell>
            <TableCell>{generalLedgerDetailData.credit}</TableCell>
            <TableCell>{generalLedgerDetailData.balanceEnd}</TableCell>
          </TableRow>,
        ]}
      </TableSimple>
    </>
  )
}

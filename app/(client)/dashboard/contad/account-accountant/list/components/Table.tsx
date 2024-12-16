"use client"

import { BadgeBool } from "@component/badge"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import AccountAccountantConst, {
  AccountAccountantNature,
  AccountAccountantType,
  AccountAccountantTypePertain,
} from "@contad/account-accountant/domain/constantClient"
import { AccountAccountantListEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantListEntity"
import { AppStore } from "@rdtkl/store"
import { IconEdit } from "@tabler/icons-react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"

const constant = AccountAccountantConst

export default function AccountAccountantTable({
  registers,
}: {
  registers: AccountAccountantListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Cuenta</TNHC>,
        <TNHC key={v4()}>Naturaleza</TNHC>,
        <TNHC key={v4()}>Tipo</TNHC>,
        <TNHC key={v4()}>Tipo pertenece</TNHC>,
        <TNHC key={v4()}>Asocia centro costo?</TNHC>,
        <TNHC key={v4()}>De movimiento?</TNHC>,
        <TNHC key={v4()}>Activo?</TNHC>,
        <TNHC key={v4()}>Partida debito?</TNHC>,
        <TNHC key={v4()}>Partida credito?</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <b>{register.account}</b>
            <br />
            {register.description}
          </TNBC>
          <TNBC>{AccountAccountantNature[register.nature].label}</TNBC>
          <TNBC>{AccountAccountantType[register.type].label}</TNBC>
          <TNBC>
            {AccountAccountantTypePertain[register.typePertain].label}
          </TNBC>
          <TNBC>{<BadgeBool isActive={register.associateCenterCost} />}</TNBC>
          <TNBC>{<BadgeBool isActive={register.movement} />}</TNBC>
          <TNBC>{<BadgeBool isActive={register.isActive} />}</TNBC>
          <TNBC>
            <b>{register.budgetPartidaIncome?.partida}</b>
            <br />
            {register.budgetPartidaIncome?.name}
          </TNBC>
          <TNBC>
            <b>{register.budgetPartidaExpense?.partida}</b>
            <br />
            {register.budgetPartidaExpense?.name}
          </TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeAccountaccountant && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ accountAccountantId: register.id })}
                  icon={<IconEdit className="w-4 h-4" />}
                />
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

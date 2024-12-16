"use client"

import { IconEdit } from "@tabler/icons-react"
import { v4 } from "uuid"
import { BadgeBool } from "@component/badge"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import BudgetPartidaExpenseConst from "@budget/budget-partida-expense/domain/constantClient"
import { BudgetPartidaTypePertain } from "@budget/budget-partida/domain/constantClient"
import { BudgetPartidaExpenseListEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseListEntity"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"

const constant = BudgetPartidaExpenseConst

export default function BudgetPartidaExpenseTable({
  registers,
}: {
  registers: BudgetPartidaExpenseListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Partida</TNHC>,
        <TNHC key={v4()}>Descripction</TNHC>,
        <TNHC key={v4()}>Pertenece</TNHC>,
        <TNHC key={v4()}>Activo?</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <b>{register.partida}</b>
            <br />
            {register.name}
          </TNBC>
          <TNBC>{register.description}</TNBC>
          <TNBC>
            {BudgetPartidaTypePertain[register.typePertain]?.label ??
              register.typePertain}
          </TNBC>
          <TNBC>{<BadgeBool isActive={register.isActive} />}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBudgetpartidaexpense && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({
                    budgetPartidaExpenseId: register.id,
                  })}
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

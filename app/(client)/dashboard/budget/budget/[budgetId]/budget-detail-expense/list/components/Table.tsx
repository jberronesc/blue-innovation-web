"use client"

import { v4 } from "uuid"
import { IconEdit } from "@tabler/icons-react"
import { BudgetFindEntity } from "@budget/budget/domain/interfaces/BudgetFindEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import BudgetDetailExpenseConst from "../../domain/constantClient"
import { BudgetDetailExpenseListEntity } from "../../domain/interfaces/BudgetDetailExpenseListEntity"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"

const constant = BudgetDetailExpenseConst

export default function BudgetDetailExpenseTable({
  registers,
  params,
  budget,
}: {
  registers: BudgetDetailExpenseListEntity[]
  params: { budgetId: string }
  budget: BudgetFindEntity
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Partida</TNHC>,
        <TNHC key={v4()}>Asignado</TNHC>,
        <TNHC key={v4()}>Modificado</TNHC>,
        <TNHC key={v4()}>Condificado</TNHC>,
        <TNHC key={v4()}>Certificado</TNHC>,
        <TNHC key={v4()}>Devengado</TNHC>,
        <TNHC key={v4()}>Pagado</TNHC>,
        <TNHC key={v4()}>Saldo x devengar</TNHC>,
        <TNHC key={v4()}>Saldo x pagar</TNHC>,
        <TNHC key={v4()}>Porcentaje</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <span className="font-bold">
              {register.budgetPartidaExpense.partida}
            </span>
            <br />
            {register.budgetPartidaExpense.name}
          </TNBC>
          <TNBC className="text-right">{register.assigned}</TNBC>
          <TNBC className="text-right">{register.modified}</TNBC>
          <TNBC className="text-right">{register.encoded}</TNBC>
          <TNBC className="text-right">{register.certificate}</TNBC>
          <TNBC className="text-right">{register.devengado}</TNBC>
          <TNBC className="text-right">{register.paid}</TNBC>
          <TNBC className="text-right">{register.balanceXDevengar}</TNBC>
          <TNBC className="text-right">{register.balanceXPay}</TNBC>
          <TNBC className="text-right">{register.executionPercentage}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBudgetdetailincome &&
                budget.isStatusAssignedOrReviewed &&
                register.budgetPartidaExpense.isTypePertainItem && (
                  <ButtonLinkRoundedToGo
                    href={constant.editUrl({
                      budgetId: params.budgetId,
                      budgetDetailExpenseId: register.id,
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

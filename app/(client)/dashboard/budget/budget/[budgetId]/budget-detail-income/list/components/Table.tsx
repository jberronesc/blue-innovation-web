"use client"

import { v4 } from "uuid"
import { IconEdit } from "@tabler/icons-react"
import { BudgetFindEntity } from "@budget/budget/domain/interfaces/BudgetFindEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import BudgetDetailIncomeConst from "../../domain/constantClient"
import { BudgetDetailIncomeListEntity } from "../../domain/interfaces/BudgetDetailIncomeListEntity"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"

export default function BudgetDetailIncomeTable({
  registers,
  params,
  budget,
}: {
  registers: BudgetDetailIncomeListEntity[]
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
        <TNHC key={v4()}>Recibido</TNHC>,
        <TNHC key={v4()}>Saldo x devengar</TNHC>,
        <TNHC key={v4()}>Saldo x recibir</TNHC>,
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
              {register.budgetPartidaIncome.partida}
            </span>
            <br />
            {register.budgetPartidaIncome.name}
          </TNBC>
          <TNBC className="text-right">{register.assigned}</TNBC>
          <TNBC className="text-right">{register.modified}</TNBC>
          <TNBC className="text-right">{register.encoded}</TNBC>
          <TNBC className="text-right">{register.certificate}</TNBC>
          <TNBC className="text-right">{register.devengado}</TNBC>
          <TNBC className="text-right">{register.received}</TNBC>
          <TNBC className="text-right">{register.balanceXDevengar}</TNBC>
          <TNBC className="text-right">{register.balanceXReceive}</TNBC>
          <TNBC className="text-right">{register.executionPercentage}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBudgetdetailincome &&
                budget.isStatusAssignedOrReviewed &&
                register.budgetPartidaIncome.isTypePertainItem && (
                  <ButtonLinkRoundedToGo
                    href={BudgetDetailIncomeConst.editUrl({
                      budgetId: params.budgetId,
                      budgetDetailIncomeId: register.id,
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

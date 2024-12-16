"use client"

import { v4 } from "uuid"
import {
  IconCashBanknote,
  IconCashBanknoteOff,
  IconCheck,
  IconTrashXFilled,
} from "@tabler/icons-react"
import BudgetConst, { BudgetStatus } from "@budget/budget/domain/constantClient"
import { BudgetListEntity } from "@budget/budget/domain/interfaces/BudgetListEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import { AppStore } from "@rdtkl/store"
import { useSelector } from "react-redux"

const constant = BudgetConst

export default function BudgetTable({
  registers,
}: {
  registers: BudgetListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Ejercicio</TNHC>,
        <TNHC key={v4()}>Ingresos</TNHC>,
        <TNHC key={v4()}>Gastos</TNHC>,
        <TNHC key={v4()}>Estado</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.exercise.year}</TNBC>
          <TNBC>{register.income}</TNBC>
          <TNBC>{register.expense}</TNBC>
          <TNBC>{BudgetStatus[register.status].label}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.deleteBudget && register.canDelete && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({
                    budgetId: register.id,
                  })}
                  icon={<IconTrashXFilled className="w-4 h-4" />}
                />
              )}
              {permissions.reviewedBudget && register.isStatusAssigned && (
                <ButtonLinkRoundedToGo
                  href={constant.reviewedUrl({
                    budgetId: register.id,
                  })}
                  icon={<IconCheck className="w-4 h-4" />}
                />
              )}
              {permissions.approvedBudget && register.isStatusReviewed && (
                <ButtonLinkRoundedToGo
                  href={constant.approvedUrl({
                    budgetId: register.id,
                  })}
                  icon={<IconCheck className="w-4 h-4" />}
                />
              )}
              {permissions.viewBudgetdetailincome && (
                <ButtonLinkRoundedToGo
                  href={constant.budgetDetailIncomeListUrl({
                    budgetId: register.id,
                  })}
                  icon={<IconCashBanknote className="w-4 h-4" />}
                />
              )}
              {permissions.viewBudgetdetailexpense && (
                <ButtonLinkRoundedToGo
                  href={constant.budgetDetailExpenseListUrl({
                    budgetId: register.id,
                  })}
                  icon={<IconCashBanknoteOff className="w-4 h-4" />}
                />
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

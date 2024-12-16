"use client"

import { v4 } from "uuid"
import {
  IconCashBanknote,
  IconCashBanknoteOff,
  IconCheck,
  IconEdit,
  IconTrashXFilled,
} from "@tabler/icons-react"
import ReformBudgetConst, {
  ReformBudgetStatus,
  ReformBudgetClassModification,
} from "@budget/reform-budget/domain/constantClient"
import { ReformBudgetListEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetListEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"

const constant = ReformBudgetConst

export default function ReformBudgetTable({
  registers,
}: {
  registers: ReformBudgetListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Nº</TNHC>,
        <TNHC key={v4()}>Fecha</TNHC>,
        <TNHC key={v4()}>Doc. ref.</TNHC>,
        <TNHC key={v4()}>Concepto</TNHC>,
        <TNHC key={v4()}>Ingresos</TNHC>,
        <TNHC key={v4()}>Gastos</TNHC>,
        <TNHC key={v4()}>Estado</TNHC>,
        <TNHC key={v4()}>Clase Mod.</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.sequence}</TNBC>
          <TNBC>{register.date}</TNBC>
          <TNBC>{register.documentReference}</TNBC>
          <TNBC>{register.concept}</TNBC>
          <TNBC className="text-right">{register.income}</TNBC>
          <TNBC className="text-right">{register.expense}</TNBC>
          <TNBC>{ReformBudgetStatus[register.status].label}</TNBC>
          <TNBC>
            {ReformBudgetClassModification[register.classModification]?.label ??
              register.classModification}
          </TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeReformbudget &&
                register.isStatusAssignedOrReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.editUrl({
                      reformBudgetId: register.id,
                    })}
                    icon={<IconEdit className="w-4 h-4" />}
                  />
                )}
              {permissions.deleteReformbudget && register.canDelete && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({
                    reformBudgetId: register.id,
                  })}
                  icon={<IconTrashXFilled className="w-4 h-4" />}
                />
              )}
              {permissions.reviewedReformbudget && register.canReviewed && (
                <ButtonLinkRoundedToGo
                  href={constant.reviewedUrl({
                    reformBudgetId: register.id,
                  })}
                  icon={<IconCheck className="w-4 h-4" />}
                />
              )}
              {permissions.approvedReformbudget &&
                register.isStatusReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.approvedUrl({
                      reformBudgetId: register.id,
                    })}
                    icon={<IconCheck className="w-4 h-4" />}
                  />
                )}

              {permissions.viewReformbudgetdetailleft && (
                <ButtonLinkRoundedToGo
                  href={constant.reformBudgetDetailLeftUrl({
                    reformBudgetId: register.id,
                  })}
                  icon={<IconCashBanknote className="w-4 h-4" />}
                />
              )}

              {permissions.viewReformbudgetdetailright && (
                <ButtonLinkRoundedToGo
                  href={constant.reformBudgetDetailRightUrl({
                    reformBudgetId: register.id,
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

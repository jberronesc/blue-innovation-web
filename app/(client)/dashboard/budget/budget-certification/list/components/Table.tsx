"use client"

import { v4 } from "uuid"
import {
  IconCashBanknote,
  IconCheck,
  IconEdit,
  IconTrashXFilled,
} from "@tabler/icons-react"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import { BudgetCertificationListEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationListEntity"
import BudgetCertificationConst, {
  BudgetCertificationStatus,
} from "@budget/budget-certification/domain/constantClient"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"

const constant = BudgetCertificationConst

export default function BudgetCertificationTable({
  registers,
}: {
  registers: BudgetCertificationListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Nº</TNHC>,
        <TNHC key={v4()}>Fecha</TNHC>,
        <TNHC key={v4()}>Doc. ref.</TNHC>,
        <TNHC key={v4()}>Concepto</TNHC>,
        <TNHC key={v4()}>Monto</TNHC>,
        <TNHC key={v4()}>Saldo</TNHC>,
        <TNHC key={v4()}>Estado</TNHC>,
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
          <TNBC className="text-right">{register.amount}</TNBC>
          <TNBC className="text-right">{register.balance}</TNBC>
          <TNBC>
            {BudgetCertificationStatus[register.status]?.label ??
              register.status}
          </TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBudgetcertification &&
                register.isStatusAssignedOrReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.editUrl({
                      budgetCertificationId: register.id,
                    })}
                    icon={<IconEdit className="w-4 h-4" />}
                  />
                )}
              {permissions.deleteBudgetcertification && register.canDelete && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({
                    budgetCertificationId: register.id,
                  })}
                  icon={<IconTrashXFilled className="w-4 h-4" />}
                />
              )}
              {permissions.reviewedBudgetcertification &&
                register.isStatusAssigned && (
                  <ButtonLinkRoundedToGo
                    href={constant.reviewedUrl({
                      budgetCertificationId: register.id,
                    })}
                    icon={<IconCheck className="w-4 h-4" />}
                  />
                )}
              {permissions.approvedBudgetcertification &&
                register.isStatusReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.approvedUrl({
                      budgetCertificationId: register.id,
                    })}
                    icon={<IconCheck className="w-4 h-4" />}
                  />
                )}
              {permissions.viewBudgetcertificationdetail && (
                <ButtonLinkRoundedToGo
                  href={constant.budgetCertificationDetailUrl({
                    budgetCertificationId: register.id,
                  })}
                  icon={<IconCashBanknote className="w-4 h-4" />}
                />
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

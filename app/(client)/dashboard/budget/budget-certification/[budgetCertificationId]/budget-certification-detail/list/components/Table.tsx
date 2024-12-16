"use client"

import { v4 } from "uuid"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import BudgetCertificationDetailConst from "../../domain/constantClient"
import { BudgetCertificationDetailListEntity } from "../../domain/interfaces/BudgetCertificationDetailListEntity"
import { AppStore } from "@rdtkl/store"
import { useSelector } from "react-redux"

const constant = BudgetCertificationDetailConst

export default function BudgetCertificationDetailTable({
  params,
  registers,
  budgetCertification,
}: {
  params: { budgetCertificationId: string }
  registers: BudgetCertificationDetailListEntity[]
  budgetCertification: BudgetCertificationFindEntity
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Partida</TNHC>,
        <TNHC key={v4()}>Pg</TNHC>,
        <TNHC key={v4()}>Sp</TNHC>,
        <TNHC key={v4()}>Py</TNHC>,
        <TNHC key={v4()}>Act</TNHC>,
        <TNHC key={v4()}>Ubg</TNHC>,
        <TNHC key={v4()}>Fte</TNHC>,
        <TNHC key={v4()}>Org</TNHC>,
        <TNHC key={v4()}>N prest</TNHC>,
        <TNHC key={v4()}>Monto</TNHC>,
        <TNHC key={v4()}>Saldo</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <b>{register.budgetPartidaExpense.partida}</b>
            <br />
            {register.budgetPartidaExpense.name}
          </TNBC>
          <TNBC>{register.pg}</TNBC>
          <TNBC>{register.sp}</TNBC>
          <TNBC>{register.py}</TNBC>
          <TNBC>{register.act}</TNBC>
          <TNBC>{register.ubg}</TNBC>
          <TNBC>{register.fte}</TNBC>
          <TNBC>{register.org}</TNBC>
          <TNBC>{register.nPrest}</TNBC>
          <TNBC>{register.amount}</TNBC>
          <TNBC>{register.balance}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBudgetcertificationdetail &&
                budgetCertification.isStatusAssignedOrReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.editUrl({
                      budgetCertificationId: params.budgetCertificationId,
                      budgetCertificationDetailId: register.id,
                    })}
                    icon={<IconEdit className="w-4 h-4" />}
                  />
                )}
              {permissions.deleteBudgetcertificationdetail &&
                budgetCertification.isStatusAssignedOrReviewed && (
                  <ButtonLinkRoundedToGo
                    href={constant.deleteUrl({
                      budgetCertificationId: params.budgetCertificationId,
                      budgetCertificationDetailId: register.id,
                    })}
                    icon={<IconTrashXFilled className="w-4 h-4" />}
                  />
                )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

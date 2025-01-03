"use client"

import { v4 } from "uuid"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import ReformBudgetDetailLeftConst from "../../domain/constantClient"
import { ReformBudgetDetailLeftListEntity } from "../../domain/interfaces/ReformBudgetDetailLeftListEntity"
import { TablePresentateBudgetPartida } from "./TablePresentateBudgetPartida"
import { AppStore } from "@rdtkl/store"
import { useSelector } from "react-redux"

const constant = ReformBudgetDetailLeftConst

export default function ReformBudgetDetailLeftTable({
  params,
  registers,
  reformBudget,
}: {
  params: { reformBudgetId: string }
  registers: ReformBudgetDetailLeftListEntity[]
  reformBudget: ReformBudgetFindEntity
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)
  console.log({
    msg: "res",
    value: registers,
  })
  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Partida</TNHC>,
        <TNHC key={v4()}>Org</TNHC>,
        <TNHC key={v4()}>Ubg</TNHC>,
        <TNHC key={v4()}>Fte</TNHC>,
        <TNHC key={v4()}>Monto</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <TablePresentateBudgetPartida
              reformBudget={reformBudget}
              register={register}
            />
          </TNBC>
          <TNBC>{register.org}</TNBC>
          <TNBC>{register.ubg}</TNBC>
          <TNBC>{register.fte}</TNBC>
          <TNBC>{register.amount}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {reformBudget.isStatusAssignedOrReviewed && (
                <>
                  {permissions.changeReformbudgetdetailleft && (
                    <ButtonLinkRoundedToGo
                      href={constant.editUrl({
                        reformBudgetId: params.reformBudgetId,
                        reformBudgetDetailLeftId: register.id,
                      })}
                      icon={<IconEdit className="w-4 h-4" />}
                    />
                  )}

                  {permissions.deleteReformbudgetdetailleft && (
                    <ButtonLinkRoundedToGo
                      href={constant.deleteUrl({
                        reformBudgetId: params.reformBudgetId,
                        reformBudgetDetailLeftId: register.id,
                      })}
                      icon={<IconTrashXFilled className="w-4 h-4" />}
                    />
                  )}
                </>
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

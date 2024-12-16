"use client"

import { v4 } from "uuid"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableSimple } from "@component/table"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { TableColumn, TableRow, TableCell } from "@nextui-org/react"
import IncomeAffectationConstCli from "../../domain/constantClient"
import { IncomeAffectationListEntity } from "../../domain/interfaces/IncomeAffectationListEntity"

export default function IncomeAffectationTable({
  params,
  registers,
  incomeExecution,
}: {
  params: { incomeExecutionId: string }
  registers: IncomeAffectationListEntity[]
  incomeExecution: IncomeExecutionGetEntity
}) {
  return (
    <>
      <TableSimple
        theadTrs={[
          <TableColumn key={v4()}>TP</TableColumn>,
          <TableColumn key={v4()}>CS</TableColumn>,
          <TableColumn key={v4()}>Partida presupuestaria</TableColumn>,
          <TableColumn key={v4()}>UBG</TableColumn>,
          <TableColumn key={v4()}>Fte</TableColumn>,
          <TableColumn key={v4()}>Monto</TableColumn>,
          <TableColumn key={v4()}>Asociación Contable</TableColumn>,
          <TableColumn key={v4()}>
            <span className="sr-only">Opciones</span>
          </TableColumn>,
        ]}
      >
        {registers?.map((register) => (
          <TableRow key={register.id} className="text-black">
            <TableCell>{register.type}</TableCell>
            <TableCell>{register.cs}</TableCell>
            <TableCell>
              <span className="font-bold">
                {register.accountAccountant.budgetPartidaExpense.partida}
              </span>
              <br />
              {register.accountAccountant.budgetPartidaExpense.description}
            </TableCell>
            <TableCell>{register.ubg}</TableCell>
            <TableCell>{register.fte}</TableCell>
            <TableCell>{register.amount}</TableCell>
            <TableCell>
              <span className="font-bold">
                {register.accountAccountant.account}
              </span>
              <br />
              {register.accountAccountant.description}
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-3">
                {incomeExecution.isStatusExecution && (
                  <>
                    <ButtonLinkRoundedToGo
                      href={IncomeAffectationConstCli.editUrl({
                        incomeExecutionId: params.incomeExecutionId,
                        incomeAffectationId: register.id,
                      })}
                      icon={<IconEdit className="w-4 h-4" />}
                    />
                    <ButtonLinkRoundedToGo
                      href={IncomeAffectationConstCli.deleteUrl({
                        incomeExecutionId: params.incomeExecutionId,
                        incomeAffectationId: register.id,
                      })}
                      icon={<IconTrashXFilled className="w-4 h-4" />}
                    />
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableSimple>
    </>
  )
}

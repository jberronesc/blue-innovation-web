"use client"

import { v4 } from "uuid"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import {
  TableCell as TCE,
  TableColumn as TC,
  TableRow as TR,
} from "@nextui-org/react"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableSimple } from "@component/table"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import ExpenseExecutionBudgetCommitmentConstCli from "../../domain/constantClient"
import { ExpenseExecutionBudgetCommitmentListEntity } from "../../domain/interfaces/ExpenseExecutionBudgetCommitmentListEntity"

export default function ExpenseExecutionBudgetCommitmentTable({
  params,
  registers,
  expenseExecution,
}: {
  params: { expenseExecutionId: string }
  registers: ExpenseExecutionBudgetCommitmentListEntity[]
  expenseExecution: ExpenseExecutionGetEntity
}) {
  console.log({
    msg: "en fronty",
    value: expenseExecution,
  })
  return (
    <>
      <br />
      {registers?.map((register) => (
        <section key={v4()}>
          <div className="text-black">
            Compromiso: {register.budgetCommitment.sequence}
          </div>
          <TableSimple
            theadTrs={[
              <TC key={v4()}>TP</TC>,
              <TC key={v4()}>CS</TC>,
              <TC key={v4()}>Partida presupuestaria</TC>,
              <TC key={v4()}>UBG</TC>,
              <TC key={v4()}>Fte</TC>,
              <TC key={v4()}>Monto</TC>,
              <TC key={v4()}>Asociación Contable</TC>,
              <TC key={v4()}>
                <span className="sr-only">Opciones</span>
              </TC>,
            ]}
          >
            {register.expenseAffectationsExpenseExecutionBudgetCommitment?.map(
              (affectation) => (
                <TR key={affectation.id} className="text-black">
                  <TCE>{affectation.type}</TCE>
                  <TCE>{affectation.cs}</TCE>
                  <TCE>
                    <span className="font-bold">
                      {affectation.accountAccountant.account}
                    </span>
                    <br />
                    {affectation.accountAccountant.account}
                  </TCE>
                  <TCE>{affectation.ubg}</TCE>
                  <TCE>{affectation.fte}</TCE>
                  <TCE>{affectation.amount}</TCE>
                  <TCE>
                    <span className="font-bold">
                      {affectation.accountAccountant.account}
                    </span>
                    <br />
                    {affectation.accountAccountant.description}
                  </TCE>
                  <TCE>
                    <div className="flex justify-center gap-3">
                      {expenseExecution.isStatusExecution && (
                        <>
                          <ButtonLinkRoundedToGo
                            href={ExpenseExecutionBudgetCommitmentConstCli.editUrl(
                              {
                                expenseExecutionId: params.expenseExecutionId,
                                expenseExecutionBudgetCommitmentId: register.id,
                              }
                            )}
                            icon={<IconEdit className="w-4 h-4" />}
                          />
                          <ButtonLinkRoundedToGo
                            href={ExpenseExecutionBudgetCommitmentConstCli.deleteUrl(
                              {
                                expenseExecutionId: params.expenseExecutionId,
                                expenseExecutionBudgetCommitmentId: register.id,
                              }
                            )}
                            icon={<IconTrashXFilled className="w-4 h-4" />}
                          />
                        </>
                      )}
                    </div>
                  </TCE>
                </TR>
              )
            )}
          </TableSimple>
        </section>
      ))}
    </>
  )
}

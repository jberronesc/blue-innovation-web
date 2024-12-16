"use client"

import { v4 } from "uuid"
import {
  IconCheck,
  IconEdit,
  IconListDetails,
  IconTrashXFilled,
} from "@tabler/icons-react"
import {
  TableCell as TCE,
  TableColumn as TC,
  TableRow as TR,
} from "@nextui-org/react"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableSimple } from "@component/table"
import { TransactionClassRegister } from "@contad/transaction/domain/constantClient"
import ExpenseExecutionConstCli, {
  ExpenseExecutionStatus,
} from "@financial/expense-execution/domain/constantClient"
import { ExpenseExecutionListEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionListEntity"

export default function ExpenseExecutionTable({
  registers,
}: {
  registers: ExpenseExecutionListEntity[]
}) {
  return (
    <>
      <TableSimple
        theadTrs={[
          <TC key={v4()}>Nº</TC>,
          <TC key={v4()}>Fecha</TC>,
          <TC key={v4()}>Beneficiario</TC>,
          <TC key={v4()}>Clas Doc.</TC>,
          <TC key={v4()}>Doc Ref.</TC>,
          <TC key={v4()}>Clase de Registro</TC>,
          <TC key={v4()}>Facturado</TC>,
          <TC key={v4()}>Afectado</TC>,
          <TC key={v4()}>Retenido</TC>,
          <TC key={v4()}>A pagar</TC>,
          <TC key={v4()}>Estado</TC>,
          <TC key={v4()}>
            <span className="sr-only">Opciones</span>
          </TC>,
        ]}
      >
        {registers?.map((register) => (
          <TR key={register.id} className="text-black">
            <TCE>{register.sequence}</TCE>
            <TCE>{register.date}</TCE>
            <TCE>
              {register.supplier.firstName} - {register.supplier.lastName}
            </TCE>
            <TCE>-</TCE>
            <TCE>{register.documentReference}</TCE>
            <TCE>{TransactionClassRegister[register.classRegister].label}</TCE>
            <TCE>{register.totalInvoice}</TCE>
            <TCE>{register.totalAffected}</TCE>
            <TCE>{register.totalDeduction}</TCE>
            <TCE>{register.total}</TCE>
            <TCE>
              {ExpenseExecutionStatus[register.status].label ?? register.status}
            </TCE>
            <TCE>
              <div className="flex justify-center gap-3">
                {register.isStatusExecution && (
                  <>
                    <ButtonLinkRoundedToGo
                      href={ExpenseExecutionConstCli.editUrl({
                        expenseExecutionId: register.id,
                      })}
                      icon={<IconEdit className="w-4 h-4" />}
                    />
                    <ButtonLinkRoundedToGo
                      href={ExpenseExecutionConstCli.deleteUrl({
                        expenseExecutionId: register.id,
                      })}
                      icon={<IconTrashXFilled className="w-4 h-4" />}
                    />
                  </>
                )}
                {register.isStatusExecution && (
                  <ButtonLinkRoundedToGo
                    href={ExpenseExecutionConstCli.devengadoUrl({
                      expenseExecutionId: register.id,
                    })}
                    icon={<IconCheck className="w-4 h-4" />}
                  />
                )}
                <ButtonLinkRoundedToGo
                  href={ExpenseExecutionConstCli.expenseExecutionBudgetCommitmentUrl(
                    {
                      expenseExecutionId: register.id,
                    }
                  )}
                  icon={<IconListDetails className="w-4 h-4" />}
                />
              </div>
            </TCE>
          </TR>
        ))}
      </TableSimple>
    </>
  )
}

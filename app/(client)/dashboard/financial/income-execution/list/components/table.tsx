"use client"

import { v4 } from "uuid"
import {
  IconCheck,
  IconEdit,
  IconList,
  IconListDetails,
  IconTrashXFilled,
} from "@tabler/icons-react"

import { TableCell, TableColumn, TableRow } from "@nextui-org/react"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableSimple } from "@component/table"
import IncomeExecutionConstCli, {
  IncomeExecutionStatus,
} from "@financial/income-execution/domain/constantClient"
import { IncomeExecutionListEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionListEntity"

export default function IncomeExecutionTable({
  registers,
}: {
  registers: IncomeExecutionListEntity[]
}) {
  return (
    <>
      <TableSimple
        theadTrs={[
          <TableColumn key={v4()}>Nº</TableColumn>,
          <TableColumn key={v4()}>Fecha</TableColumn>,
          <TableColumn key={v4()}>Recaudador</TableColumn>,
          <TableColumn key={v4()}>Clas Doc.</TableColumn>,
          <TableColumn key={v4()}>Doc Ref.</TableColumn>,
          <TableColumn key={v4()}>Clas Ing.</TableColumn>,
          <TableColumn key={v4()}>Total</TableColumn>,
          <TableColumn key={v4()}>Estado</TableColumn>,
          <TableColumn key={v4()}>
            <span className="sr-only">Opciones</span>
          </TableColumn>,
        ]}
      >
        {registers?.map((register) => (
          <TableRow key={register.id} className="text-black">
            <TableCell>{register.sequence}</TableCell>
            <TableCell>{register.date.toString()}</TableCell>
            <TableCell>
              {register.supplier.firstName} - {register.supplier.lastName}
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>{register.documentReference}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{register.total}</TableCell>
            <TableCell>
              {IncomeExecutionStatus[register.status].label}
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-3">
                {register.isStatusExecution && (
                  <>
                    <ButtonLinkRoundedToGo
                      href={IncomeExecutionConstCli.editUrl({
                        incomeExecutionId: register.id,
                      })}
                      icon={<IconEdit className="w-4 h-4" />}
                    />
                    <ButtonLinkRoundedToGo
                      href={IncomeExecutionConstCli.deleteUrl({
                        incomeExecutionId: register.id,
                      })}
                      icon={<IconTrashXFilled className="w-4 h-4" />}
                    />
                  </>
                )}

                {register.isStatusExecution && (
                  <ButtonLinkRoundedToGo
                    href={IncomeExecutionConstCli.devengadoUrl({
                      incomeExecutionId: register.id,
                    })}
                    icon={<IconCheck className="w-4 h-4" />}
                  />
                )}

                <ButtonLinkRoundedToGo
                  href={IncomeExecutionConstCli.incomeExecutionDetailUrl({
                    incomeExecutionId: register.id,
                  })}
                  icon={<IconListDetails className="w-4 h-4" />}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableSimple>
    </>
  )
}

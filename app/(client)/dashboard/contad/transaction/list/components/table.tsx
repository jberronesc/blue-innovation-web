"use client"

import { v4 } from "uuid"
import TableSimple from "@/app/(client)/shared/ui/components/table/TableSimple"
import { TableCell, TableColumn, TableRow } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { AppStore } from "@/app/(client)/shared/ui/reduxt-toolkit/store"

export default function SupplierTable({
  registers,
}: {
  registers: TransactionListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <>
      <TableSimple
        theadTrs={[
          <TableColumn key={v4()}>Nº Trans.</TableColumn>,
          <TableColumn key={v4()}>
            Tipo/Nº Secuencia/Clase registro
          </TableColumn>,
          <TableColumn key={v4()}>Usuario/Dia</TableColumn>,
          <TableColumn key={v4()}>Fecha R./ Fecha Op. / Mayor</TableColumn>,
          <TableColumn key={v4()}>Diario</TableColumn>,
          <TableColumn key={v4()}>Detalle</TableColumn>,
          <TableColumn key={v4()}>
            <span className="sr-only">Opciones</span>
          </TableColumn>,
        ]}
      >
        {registers?.map((register) => (
          <TableRow key={register.id} className="text-black">
            <TableCell>{register.sequenceDisplay}</TableCell>
            <TableCell className="flex justify-between">
              <span>
                {register.type} / {register.sequenceTypeDisplay}
              </span>
              <span className="font-bold mr-5">{register.classRegister}</span>
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell className="text-center">
              [{register.generalLedger.month}] /
              {register.dateOperation.toString()}
              <br />
              <span className="font-bold">Fecha R.:</span>{" "}
              {register.date.toString()}
              <br />
            </TableCell>
            <TableCell>
              {register.journal.credit} - {register.journal.debit}
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <div className="flex justify-center gap-3"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableSimple>
    </>
  )
}

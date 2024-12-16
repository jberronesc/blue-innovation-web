"use client"

import { TableNative, TNHC, TNBR, TNBC } from "@component/table"
import { v4 } from "uuid"
import { ExerciseListEntity } from "@contad/exercise/domain/interfaces/ExerciseListEntity"
import { ExerciseStatus } from "@contad/exercise/domain/constantClient"

export default function ExerciseTable({
  registers,
}: {
  registers: ExerciseListEntity[]
}) {
  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Año</TNHC>,
        <TNHC key={v4()}>Estado</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.year}</TNBC>
          <TNBC>
            {ExerciseStatus[register.status]?.label ?? register.status}
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

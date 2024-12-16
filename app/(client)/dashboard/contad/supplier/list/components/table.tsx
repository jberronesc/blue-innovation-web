"use client"

import { v4 } from "uuid"
import TableSimple from "@/app/(client)/shared/ui/components/table/TableSimple"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { TableCell, TableColumn, TableRow } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { ButtonLinkRoundedToGo } from "@component/button"
import SupplierConstCli, {
  SupplierTypeContributor,
  SupplierTypeIdentification,
} from "@contad/supplier/domain/constantClient"
import { SupplierListEntity } from "@contad/supplier/domain/interfaces/SupplierListEntity"
import { AppStore } from "@rdtkl/store"

export default function SupplierTable({
  registers,
}: {
  registers: SupplierListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <>
      <TableSimple
        theadTrs={[
          <TableColumn key={v4()}>Nombre</TableColumn>,
          <TableColumn key={v4()}>Tipo contribuyente</TableColumn>,
          <TableColumn key={v4()}>Tipo identificacion</TableColumn>,
          <TableColumn key={v4()}>Dni</TableColumn>,
          <TableColumn key={v4()}>Rason social</TableColumn>,
          <TableColumn key={v4()}>Representante legal</TableColumn>,
          <TableColumn key={v4()}>Direccion</TableColumn>,
          <TableColumn key={v4()}>Phone</TableColumn>,
          <TableColumn key={v4()}>Email</TableColumn>,
          <TableColumn key={v4()}>
            <span className="sr-only">Opciones</span>
          </TableColumn>,
        ]}
      >
        {registers?.map((register) => (
          <TableRow key={register.id} className="text-black">
            <TableCell>
              {register.firstName} - {register.lastName}
            </TableCell>
            <TableCell>
              {SupplierTypeContributor[register.typeContributor].label}
            </TableCell>
            <TableCell>
              {SupplierTypeIdentification[register.typeIdentification].label}
            </TableCell>
            <TableCell>{register.dni}</TableCell>
            <TableCell>{register.nameReasonSocial}</TableCell>
            <TableCell>{register.legalRepresentative}</TableCell>
            <TableCell>{register.direction}</TableCell>
            <TableCell>{register.phone}</TableCell>
            <TableCell>{register.email}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-3">
                <ButtonLinkRoundedToGo
                  href={SupplierConstCli.editUrl({ supplierId: register.id })}
                  icon={<IconEdit className="w-4 h-4" />}
                />
                <ButtonLinkRoundedToGo
                  href={SupplierConstCli.deleteUrl({ supplierId: register.id })}
                  icon={<IconTrashXFilled className="w-4 h-4" />}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableSimple>
    </>
  )
}

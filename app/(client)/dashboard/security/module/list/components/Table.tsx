"use client"

import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { useSelector } from "react-redux"
import { AppStore } from "@/app/(client)/shared/ui/reduxt-toolkit/store"
import { BadgeBool } from "@component/badge"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNHC, TNBR, TNBC } from "@component/table"
import ModuleConst from "@security/module/domain/constantClient"
import { ModuleListEntity } from "@security/module/domain/interfaces/ModuleListEntity"
import { v4 } from "uuid"

const constant = ModuleConst

export default function ModuleTable({
  registers,
}: {
  registers: ModuleListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Nombre</TNHC>,
        <TNHC key={v4()}>Menu</TNHC>,
        <TNHC key={v4()}>Url</TNHC>,
        <TNHC key={v4()}>Icono</TNHC>,
        <TNHC key={v4()}>Activo?</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.name}</TNBC>
          <TNBC>{register.menu.name}</TNBC>
          <TNBC>
            <div>Url: {register.url}</div>
            <div>Match: {register.urlMatch}</div>
          </TNBC>
          <TNBC className="text-center">{register.icon}</TNBC>
          <TNBC className="text-center">
            <BadgeBool isActive={register.isActive} />
          </TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeModule && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ moduleId: register.id })}
                  icon={<IconEdit className="w-4 h-4" />}
                />
              )}
              {permissions.deleteModule && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({ moduleId: register.id })}
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

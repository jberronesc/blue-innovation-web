"use client"

import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { v4 } from "uuid"
import { ButtonLinkRoundedToGo } from "@component/button"
import GroupConst from "@security/group/domain/constantClient"
import { GroupListEntity } from "@security/group/domain/interfaces/GroupListEntity"
import { useSelector } from "react-redux"
import { AppStore } from "@rdtkl/store"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"

const constant = GroupConst

export default function GroupTable({
  registers,
}: {
  registers: GroupListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Nombre</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.name}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeGroup && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ groupId: register.id })}
                  icon={<IconEdit className="w-4 h-4" />}
                />
              )}
              {permissions.deleteGroup && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({ groupId: register.id })}
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

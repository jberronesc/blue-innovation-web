"use client"

import { IconEdit } from "@tabler/icons-react"
import { UserListEntity } from "../../domain/interfaces/UserListEntity"
import { BadgeBool, BadgeSimple } from "@component/badge"
import { ButtonLinkRoundedToGo } from "@component/button"
import { TableNative, TNBC, TNBR, TNHC } from "@component/table"
import UserConst from "@security/user/domain/constantClient"
import { AppStore } from "@rdtkl/store"
import { useSelector } from "react-redux"
import { v4 } from "uuid"

const constant = UserConst

export default function UserTable({
  registers,
}: {
  registers: UserListEntity[]
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Usuario</TNHC>,
        <TNHC key={v4()}>Username</TNHC>,
        <TNHC key={v4()}>Estado?</TNHC>,
        <TNHC key={v4()}>Grupos?</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>
            <p>
              {register.firstName} {register.lastName}
            </p>
            <p>{register.email}</p>
          </TNBC>
          <TNBC>{register.username}</TNBC>
          <TNBC>{<BadgeBool isActive={register.isActive} textActive />}</TNBC>
          <TNBC>
            {register.groups.map((group) => (
              <BadgeSimple key={group.id} label={group.name} />
            ))}
          </TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeUser && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ userId: register.id })}
                  icon={<IconEdit className="w-4 h-4" />}
                />
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

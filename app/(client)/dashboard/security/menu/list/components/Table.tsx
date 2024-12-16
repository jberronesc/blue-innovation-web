"use client";

import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { ButtonLinkRoundedToGo } from "@component/button";
import { TableNative, TNHC, TNBR, TNBC } from "@component/table";
import { AppStore } from "@rdtkl/store";
import MenuConst from "@security/menu/domain/constantClient";
import { MenuListEntity } from "@security/menu/domain/interfaces/MenuListEntity";
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react";

const constant = MenuConst;

export default function MenuTable({
  registers,
}: {
  registers: MenuListEntity[];
}) {
  const { permissions } = useSelector((store: AppStore) => store.auth);

  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Nombre</TNHC>,
        <TNHC key={v4()}>Icon</TNHC>,
        <TNHC key={v4()}>
          <span className="sr-only">Opciones</span>
        </TNHC>,
      ]}
    >
      {registers?.map((register) => (
        <TNBR key={register.id}>
          <TNBC>{register.name}</TNBC>
          <TNBC>{register.icon}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeMenu && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ menuId: register.id })}
                  icon={<IconEdit className="h-4 w-4" />}
                />
              )}
              {permissions.deleteMenu && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({ menuId: register.id })}
                  icon={<IconTrashXFilled className="h-4 w-4" />}
                />
              )}
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  );
}

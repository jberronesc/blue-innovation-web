"use client";

import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { ButtonLinkRoundedToGo } from "@component/button";
import { TableNative, TNHC, TNBR, TNBC } from "@component/table";
import { AppStore } from "@rdtkl/store";
import BodyConst from "@poaparameter/body/domain/constantClient";
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react";
import { BodyListEntity } from "@poaparameter/body/domain/interfaces/BodyListEntity";

const constant = BodyConst;

export default function BodyTable({
  registers,
}: {
  registers: BodyListEntity[];
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
          <TNBC>{register.code}</TNBC>
          <TNBC>{register.description}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              {permissions.changeBody && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ bodyId: register.id })}
                  icon={<IconEdit className="h-4 w-4" />}
                />
              )}
              {permissions.deleteBody && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({ bodyId: register.id })}
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

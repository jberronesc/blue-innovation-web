"use client";

import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { ButtonLinkRoundedToGo } from "@component/button";
import { TableNative, TNHC, TNBR, TNBC } from "@component/table";
import { AppStore } from "@rdtkl/store";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react";
import { DecentralizedUnitListEntity } from "@poaparameter/decentralized-unit/domain/interfaces/DecentralizedUnitListEntity";

const constant = DecentralizedUnitConst;

export default function DecentralizedUnitTable({
  registers,
}: {
  registers: DecentralizedUnitListEntity[];
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
              {permissions.changeDecentralizedunit && (
                <ButtonLinkRoundedToGo
                  href={constant.editUrl({ decentralizedUnitId: register.id })}
                  icon={<IconEdit className="h-4 w-4" />}
                />
              )}
              {permissions.deleteDecentralizedunit && (
                <ButtonLinkRoundedToGo
                  href={constant.deleteUrl({
                    decentralizedUnitId: register.id,
                  })}
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

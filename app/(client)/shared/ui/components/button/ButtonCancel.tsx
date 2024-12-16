import React from "react";
import { useSearchParams } from "next/navigation";
import { getParamsToBack } from "../../../utils/back-params/backParams";
import { ButtonLink } from "./ButtonLink";

export const ButtonCancel = ({
  href,
  persists,
}: {
  href: string;
  persists: { [x: string]: { key: string; type: string } }[];
}) => {
  const searchParams = useSearchParams();

  return (
    <ButtonLink
      href={href}
      query={getParamsToBack(searchParams, persists)}
      label="Cancelar"
      btn="danger"
    />
  );
};

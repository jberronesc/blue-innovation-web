import React from "react";
import { ButtonLink } from "./ButtonLink";

export const ButtonCancelHref = ({ href }: { href: string }) => {
  return <ButtonLink href={href} label="Cancelar" btn="danger" />;
};

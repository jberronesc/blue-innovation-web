import React from "react"
import { ButtonLink } from "./ButtonLink"

export const ButtonsDeleteCancel = ({
  href,
  query,
}: {
  href: string
  query?: string
}) => {
  return <ButtonLink href={href} query={query} label="Cancelar" btn="danger" />
}

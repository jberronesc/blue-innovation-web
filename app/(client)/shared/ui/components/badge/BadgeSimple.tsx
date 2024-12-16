import { Chip } from "@nextui-org/react"
import React from "react"

interface PropsParams {
  color?: "primary"
  label: string
}

export const BadgeSimple = ({ color = "primary", label }: PropsParams) => {
  return (
    <Chip color="primary" size="sm">
      {label}
    </Chip>
  )
}

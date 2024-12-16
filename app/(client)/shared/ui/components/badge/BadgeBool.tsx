import { Chip } from "@nextui-org/react"
import React from "react"

interface PropsParams {
  isActive: boolean
  textActive?: boolean
}

export const BadgeBool = ({ isActive, textActive = false }: PropsParams) => {
  return (
    <>
      {textActive ? (
        isActive ? (
          <Chip color="primary" size="sm">
            Activo
          </Chip>
        ) : (
          <Chip color="warning" size="sm">
            Inativo
          </Chip>
        )
      ) : isActive ? (
        <Chip color="primary" size="sm">
          SI
        </Chip>
      ) : (
        <Chip color="warning" size="sm">
          NO
        </Chip>
      )}
    </>
  )
}

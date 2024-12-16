import React from "react"
import { ButtonSimple } from "./ButtonSimple"

interface PropsParams {
  children: JSX.Element

  left?: JSX.Element
  center?: JSX.Element
  onClick: () => void
}

export const ButtonsDelete = (props: PropsParams) => {
  return (
    <div className="mt-6  grid grid-cols-3 gap-3">
      <div className="">{props.left}</div>
      <div className="">{props.center}</div>
      <div className="flex justify-end">
        {props.children}
        <ButtonSimple onClick={props.onClick}>Eliminar registo</ButtonSimple>
      </div>
    </div>
  )
}

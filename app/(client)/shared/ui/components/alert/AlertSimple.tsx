import React from "react"

export interface PropsParams {
  children?: JSX.Element
  additionalContent?: JSX.Element
  label?: string
  color?: "red"
  icon?: JSX.Element
  onDismiss?: boolean | (() => void)
  rounded?: boolean
  withBorderAccent?: boolean
}

export const AlertSimple = (props: PropsParams) => {
  return (
    <div
      id="alert-additional-content-2"
      className={`p-4 mb-4 text-${props.color}-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-${props.color}-800`}
      role="alert"
    >
      <div className="flex items-center">
        {props.icon}
        <span className="sr-only"></span>
        <h3 className="text-lg font-medium">{props.label}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{props.additionalContent}</div>
      <div className="flex">{props.children}</div>
    </div>
  )
}

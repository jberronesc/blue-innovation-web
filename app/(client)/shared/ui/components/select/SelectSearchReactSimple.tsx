import React from "react"
import { IconTextRecognition } from "@tabler/icons-react"

interface PropsParams {
  children?: JSX.Element
  label?: JSX.Element
  input: JSX.Element
  icon?: JSX.Element
  errors?: JSX.Element
  helpText?: string
}

export const SelectSearchReactSimple = ({
  label,
  input,
  icon,
  errors,
  helpText,
}: PropsParams) => {
  return (
    <div className="mb-4">
      {label}
      <div className="relative mt-0 rounded-md">
        <div className="relative">
          {input}

          {icon}
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
      </div>
      {errors}
    </div>
  )
}

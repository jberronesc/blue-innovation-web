import { Checkbox } from "@nextui-org/react"
import React from "react"

interface PropsParams {
  children?: JSX.Element
  label: string
  input?: JSX.Element
  icon?: JSX.Element
  errors?: JSX.Element
  helpText?: string

  register: {
    [x: string]: any
  }
}

export const CheckboxSimple = ({
  label,
  input,
  helpText,
  icon,
  errors,
  register,
}: PropsParams) => {
  return (
    <div className="mb-4">
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <Checkbox {...register} color="success">
            {" "}
            {label}{" "}
          </Checkbox>
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

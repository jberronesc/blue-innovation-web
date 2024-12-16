import React from "react"
import { Control, Controller, FieldValues } from "react-hook-form"
import SelectReact from "react-select"

interface PropsParams {
  children?: JSX.Element
  label?: JSX.Element
  input: JSX.Element
  icon?: JSX.Element
  errors?: JSX.Element
  helpText?: string
  control?:
    | Control<{
        [x: string]:
          | string
          | {
              label: string
              value: number
            }
      }>
    | undefined
  options: {
    value: number
    label: string
  }[]
  name: string
}

export const SelectReactCoverSimple = ({
  label,
  input,
  icon,
  errors,
  helpText,
  control,
  options,
  name,
}: PropsParams) => {
  return (
    <div className="mb-4">
      {label}
      <div className="relative mt-3 rounded-md">
        <div className="relative">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <SelectReact
                instanceId={1}
                {...field}
                options={options}
                className="text-black"
              />
            )}
          />

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

import React from "react"
import { IconCalendar, IconTextRecognition } from "@tabler/icons-react"
import { DatePicker, DateValue, Input } from "@nextui-org/react"
import { ChangeHandler, UseFormSetValue } from "react-hook-form"

interface PropsParams {
  children?: JSX.Element
  label: string
  icon?: JSX.Element
  errors?: JSX.Element
  helpText?: string
  register: {
    [x: string]: any
  }
}

export const DateSimple = ({
  label,
  icon,
  errors,
  register,
  helpText,
}: PropsParams) => {
  return (
    <div className="mb-4">
      <div className="relative mt-10 rounded-md">
        <div className="relative">
          <Input
            label={label}
            type="date"
            {...register}
            placeholder={`Ingrese: ${label}`}
            labelPlacement="outside"
            variant="bordered"
            autoComplete="off"
            startContent={
              icon || <IconCalendar className="form-input-group-icon" />
            }
            className="text-black"
          />
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

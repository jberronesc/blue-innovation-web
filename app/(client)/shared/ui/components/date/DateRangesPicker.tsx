import React from "react"
import { IconCalendarPlus } from "@tabler/icons-react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { DateValue } from "react-aria"
import { DatePickerSimple } from "./DatePickerSimple"
import { ErrorField } from "@component/form"

interface PropsParams {
  register: UseFormRegister<{
    [x: string]: string | any
  }>
  dateStartName: string
  dateEndName: string

  errors: FieldErrors<{
    [x: string]: string
  }>

  onChange: (e: DateValue) => void
}

export const DateRangesPicker = ({
  register,
  onChange,
  dateStartName,
  dateEndName,
  errors,
}: PropsParams) => {
  return (
    <>
      <DatePickerSimple
        label="Fecha inicio"
        onChange={onChange}
        icon={<IconCalendarPlus className="form-input-group-icon" />}
        errors={<ErrorField field={errors[dateStartName]} />}
      />
      <DatePickerSimple
        label="Fecha fin"
        onChange={onChange}
        icon={<IconCalendarPlus className="form-input-group-icon" />}
        errors={<ErrorField field={errors[dateEndName]} />}
      />
    </>
  )
}

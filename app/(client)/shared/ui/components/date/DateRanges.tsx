import React from "react"
import { IconCalendar, IconCalendarPlus } from "@tabler/icons-react"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ErrorField } from "@component/form"
import { InputSearchSimple } from "@component/input"

interface PropsParams {
  register: UseFormRegister<{
    [x: string]: string | any
  }>
  dateStartName: string
  dateEndName: string

  errors: FieldErrors<{
    [x: string]: string
  }>
}

export const DateRanges = ({
  register,
  dateStartName,
  dateEndName,
  errors,
}: PropsParams) => {
  return (
    <>
      <InputSearchSimple
        label="Fecha inicio"
        register={{
          ...register(dateStartName),
          type: "date",
        }}
        icon={<IconCalendar className="form-input-group-icon" />}
        errors={<ErrorField field={errors[dateStartName]} />}
      />
      <InputSearchSimple
        label="Fecha fin"
        register={{
          ...register(dateEndName),
          type: "date",
        }}
        icon={<IconCalendar className="form-input-group-icon" />}
        errors={<ErrorField field={errors[dateEndName]} />}
      />
    </>
  )
}

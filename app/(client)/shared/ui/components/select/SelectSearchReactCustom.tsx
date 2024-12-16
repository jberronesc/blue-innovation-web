// src/components/CustomSelect.tsx
import React from "react"
import Select, {
  Props as SelectProps,
  GroupBase,
  OptionsOrGroups,
} from "react-select"
import { Controller, Control } from "react-hook-form"

// Definir los tipos para las props del componente
interface CustomSelectProps<T> extends SelectProps<T, false, GroupBase<T>> {
  children?: JSX.Element
  label?: JSX.Element
  errors?: JSX.Element
  helpText?: string
  icon?: JSX.Element
  name: string
  control: Control<any>
  options: OptionsOrGroups<T, GroupBase<T>>
  rules?: any // Aquí puedes definir las reglas de validación de react-hook-form
}

export function SelectSearchReactCustom<T>({
  name,
  control,
  options,
  rules,
  label,
  icon,
  helpText,
  errors,
  ...rest
}: CustomSelectProps<T>) {
  return (
    <div className="mb-4">
      {label}
      <div className="relative mt-2.5 rounded-md">
        <div className="relative">
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                onChange={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                placeholder="Seleccionar"
                className="text-black"
                {...rest} // Permite que se pasen otras props como styles, placeholder, etc.
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

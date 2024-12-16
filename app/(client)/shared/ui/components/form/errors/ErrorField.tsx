import React from "react"
import { FieldError } from "react-hook-form"

export const ErrorField = ({ field }: { field: FieldError | undefined }) => {
  return (
    <>
      {field?.type && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">
            {field.message ? field.message : "El campo es requerido."}!
          </span>
        </p>
      )}

      {field?.type === "validate" && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">
            {field.message ? field.message : "Compruebe los errores."}!
          </span>
        </p>
      )}
    </>
  )
}

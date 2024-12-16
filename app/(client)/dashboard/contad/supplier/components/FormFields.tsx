import React from "react"

import Select from "react-select"
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import {
  SupplierTypeContributorOptions,
  SupplierTypeIdentificationOptions,
} from "../domain/constantClient"

type privateInferType = {
  typeContributor: {
    value: string
    label: string
  }
  typeIdentification: {
    value: string
    label: string
  }
  dni: string
  firstName: string
  lastName: string
  nameReasonSocial: string
  legalRepresentative: string
  direction: string
  phone: string
  email: string
}

const FormFields = ({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<privateInferType>
  control: Control<privateInferType, any>
  errors: FieldErrors<privateInferType>
}) => {
  return (
    <>
      <SelectReactSimple
        label={
          <LabelSimple name="typeContributor" label="Tipo contribuyente" />
        }
        input={
          <Controller
            name="typeContributor"
            control={control}
            render={({ field }) => (
              <Select
                instanceId={1}
                {...field}
                options={SupplierTypeContributorOptions}
                className="text-black"
              />
            )}
          />
        }
        errors={<ErrorField field={errors.typeContributor as FieldError} />}
      />
      <SelectReactSimple
        label={
          <LabelSimple name="typeIdentification" label="Tipo identificacion" />
        }
        input={
          <Controller
            name="typeIdentification"
            control={control}
            render={({ field }) => (
              <Select
                instanceId={1}
                {...field}
                options={SupplierTypeIdentificationOptions}
                className="text-black"
              />
            )}
          />
        }
        errors={<ErrorField field={errors.typeIdentification as FieldError} />}
      />

      <InputSimple
        label="Dni"
        register={{ ...register("dni") }}
        errors={<ErrorField field={errors.dni} />}
      />

      <InputSimple
        label="Nombres"
        register={{ ...register("firstName") }}
        errors={<ErrorField field={errors.firstName} />}
      />

      <InputSimple
        label="Apellidos"
        register={{ ...register("lastName") }}
        errors={<ErrorField field={errors.lastName} />}
      />

      <InputSimple
        label="Razon social"
        register={{ ...register("nameReasonSocial") }}
        errors={<ErrorField field={errors.nameReasonSocial} />}
      />

      <InputSimple
        label="Representante legal"
        register={{ ...register("legalRepresentative") }}
        errors={<ErrorField field={errors.legalRepresentative} />}
      />

      <InputSimple
        label="Direccion"
        register={{ ...register("direction") }}
        errors={<ErrorField field={errors.direction} />}
      />

      <InputSimple
        label="Telefono"
        register={{ ...register("phone") }}
        errors={<ErrorField field={errors.phone} />}
      />

      <InputSimple
        label="Email"
        register={{ ...register("email"), type: "email" }}
        errors={<ErrorField field={errors.email} />}
      />
    </>
  )
}

export default FormFields

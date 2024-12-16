"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { IconLock } from "@tabler/icons-react"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { GroupActiveEntity } from "@security/group/domain/interfaces/GroupActiveEntity"
import UserConst from "@security/user/domain/constantClient"
import { UserCreateType, UserCreateSchema } from "@security/user/domain/schemas"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { ViewModelBackUrl } from "@viewM/index"

const constant = UserConst

export default function UserCreateForm({
  groups,
}: {
  groups: GroupActiveEntity[]
}) {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    watch,
  } = useForm<UserCreateType>({
    resolver: zodResolver(UserCreateSchema),
  })

  const options = groups.map((elem) => ({
    value: elem.id,
    label: elem.name,
  }))

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/security/v1/users/create",
          body: {
            ...data,
            groups: data.groups?.map((elem) => elem.value),
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          vmBackUrl.goBackSimple()
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <InputSimple
            label="Nombre de usuario"
            register={{ ...register("username") }}
            errors={<ErrorField field={errors.username} />}
          />
          <InputSimple
            label="Contraseña"
            register={{ ...register("password"), type: "password" }}
            errors={<ErrorField field={errors.password} />}
          />
          <InputSimple
            label="Confirmar Contraseña"
            register={{
              ...register("passwordConfirm", {
                validate: (value) =>
                  value === watch("password") ||
                  "Las contraseñas no coinciden.",
              }),
              type: "password",
            }}
            errors={<ErrorField field={errors.passwordConfirm} />}
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
            label="Cédula o RUC"
            register={{ ...register("dni") }}
            errors={<ErrorField field={errors.dni} />}
          />
          <InputSimple
            label="Correo electrónico"
            register={{ ...register("email") }}
            errors={<ErrorField field={errors.email} />}
          />
          <CheckboxSimple
            label="Activo?"
            register={{ ...register("isActive") }}
          />
          <SelectReactCustom
            label={<LabelSimple name="groups" label="Grupos" />}
            name="groups"
            control={control}
            options={options}
            isMulti={true}
            closeMenuOnSelect={false}
            errors={<ErrorField field={errors.groups as FieldError} />}
          />
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

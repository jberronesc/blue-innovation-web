"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { GroupActiveEntity } from "@security/group/domain/interfaces/GroupActiveEntity"
import UserConst from "@security/user/domain/constantClient"
import { UserFindEntity } from "@security/user/domain/interfaces/UserFindEntity"
import { UserEditType, UserEditSchema } from "@security/user/domain/schemas"
import { IconLock } from "@tabler/icons-react"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { ViewModelBackUrl } from "@viewM/index"

const constant = UserConst

export default function UserEditForm({
  registerToEdit,
  groups,
}: {
  registerToEdit: UserFindEntity
  groups: GroupActiveEntity[]
}) {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    watch,
    getValues,
  } = useForm<UserEditType>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      ...registerToEdit,
      password: "",
      passwordConfirm: "",
      groups: registerToEdit.groups.map((elem) => ({
        value: elem.id,
        label: elem.name,
      })),
    },
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
        await new FetchPATCHTokenBlueI({
          url: `/security/v1/users/${registerToEdit.id}/update`,
          body: {
            ...data,
            groups: data.groups?.map((elem) => elem.value),
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
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
            register={{
              ...register("password"),
              type: "password",
            }}
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
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

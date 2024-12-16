"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { CheckboxSimple } from "@component/checkbox"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity"
import ModuleConst from "@security/module/domain/constantClient"
import {
  ModuleEditType,
  ModuleEditSchema,
} from "@security/module/domain/schemas"
import { PermissionActiveEntity } from "@security/permission/domain/interfaces/PermissionActiveEntity"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { SelectReactCustom } from "@component/select/SelectReactCustom"
import { ModuleFindEntity } from "@security/module/domain/interfaces/ModuleFindEntity"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ModuleConst

export default function ModuleEditForm({
  registerToEdit,
  menus,
  permissions,
}: {
  registerToEdit: ModuleFindEntity
  menus: MenuActiveEntity[]
  permissions: PermissionActiveEntity[]
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<ModuleEditType>({
    resolver: zodResolver(ModuleEditSchema),
    defaultValues: {
      ...registerToEdit,
      menu: {
        value: registerToEdit.menu.id,
        label: registerToEdit.menu.name,
      },
      permissions: registerToEdit.permissions.map((permission) => {
        const permissionFind = permissions.find(
          (elem) => elem.id == permission.id
        )

        return (
          permissionFind && {
            value: permissionFind.id,
            label: `${permissionFind.contentType.appLabeledName} | ${permissionFind.codename} - ${permissionFind.name}`,
          }
        )
      }),
    },
  })

  const options = menus.map((elem) => ({
    value: elem.id,
    label: elem.name,
  }))

  const permissionsOptions = permissions.map((elem) => ({
    value: elem.id,
    label: `${elem.contentType.appLabeledName} | ${elem.codename} - ${elem.name}`,
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
          url: `/security/v1/modules/${registerToEdit.id}/update`,
          body: {
            ...data,
            menu: data.menu.value,
            permissions: data.permissions?.map((elem) => elem.value) || [],
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
            label="Nombre"
            register={{ ...register("name") }}
            errors={<ErrorField field={errors.name} />}
          />
          <InputSimple
            label="Url"
            register={{ ...register("url") }}
            errors={<ErrorField field={errors.url} />}
          />
          <InputSimple
            label="Url Match"
            register={{ ...register("urlMatch") }}
            errors={<ErrorField field={errors.urlMatch} />}
          />
          <SelectReactCustom
            label={<LabelSimple name="menu" label="Menu" />}
            name="menu"
            control={control}
            options={options}
            errors={<ErrorField field={errors.menu as FieldError} />}
          />
          <InputSimple
            label="Descripccion"
            register={{ ...register("description") }}
            errors={<ErrorField field={errors.description} />}
          />
          <InputSimple
            label="Icono"
            register={{ ...register("icon") }}
            errors={<ErrorField field={errors.icon} />}
          />
          <CheckboxSimple
            label="Activo?"
            register={{ ...register("isActive") }}
          />
          <SelectReactCustom
            label={<LabelSimple name="permissions" label="Permisos" />}
            name="permissions"
            control={control}
            options={permissionsOptions}
            isMulti={true}
            closeMenuOnSelect={false}
            errors={<ErrorField field={errors.permissions as FieldError} />}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

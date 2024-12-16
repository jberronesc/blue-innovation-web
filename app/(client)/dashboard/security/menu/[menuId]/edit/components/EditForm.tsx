"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonsEdit, ButtonCancelHref } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import MenuConst from "@security/menu/domain/constantClient"
import { MenuFindEntity } from "@security/menu/domain/interfaces/MenuFindEntity"
import { MenuEditType, MenuEditSchema } from "@security/menu/domain/schemas"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = MenuConst

export default function MenuEditForm({
  registerToEdit,
}: {
  registerToEdit: MenuFindEntity
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MenuEditType>({
    resolver: zodResolver(MenuEditSchema),
    defaultValues: registerToEdit,
  })

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
          url: `/security/v1/menus/${registerToEdit.id}/update`,
          body: {
            ...data,
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
            label="Icono"
            register={{ ...register("icon") }}
            errors={<ErrorField field={errors.icon} />}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

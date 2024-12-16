"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonsCreate, ButtonCancelHref } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import MenuConst from "@security/menu/domain/constantClient"
import { MenuCreateType, MenuCreateSchema } from "@security/menu/domain/schemas"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = MenuConst

export default function MenuCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MenuCreateType>({
    resolver: zodResolver(MenuCreateSchema),
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
        await new FetchPOSTTokenBlueI({
          url: "/security/v1/menus/create",
          body: {
            ...data,
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
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

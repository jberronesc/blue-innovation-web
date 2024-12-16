"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import GroupModulesSelected from "@security/group/components/GroupModulesSelected"
import GroupConst from "@security/group/domain/constantClient"
import { GroupMenuModuleSelectedEntity } from "@security/group/domain/interfaces/GroupMenuModuleSelectedEntity"
import { groupGetMenusOnlySelected } from "@security/group/domain/menusSelected"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import {
  GroupCreateSchema,
  GroupCreateType,
} from "@security/group/domain/schemas"
import {
  ViewModelBackUrl,
  ViewModelConfirmModal,
  ViewModelLoading,
} from "@viewM/index"

const constant = GroupConst

export default function GroupCreateForm({
  menus: menusServer,
}: {
  menus: GroupMenuModuleSelectedEntity[]
}) {
  const [menus, setMenus] = useState(menusServer)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<GroupCreateType>({
    resolver: zodResolver(GroupCreateSchema),
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
          url: "/security/v1/groups/create",
          body: {
            ...data,
            groupModulePermissions: groupGetMenusOnlySelected(menus),
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
          <GroupModulesSelected menus={menus} setMenus={setMenus} />
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}

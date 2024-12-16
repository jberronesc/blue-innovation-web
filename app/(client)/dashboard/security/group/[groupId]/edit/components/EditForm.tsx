"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import GroupModulesSelected from "@security/group/components/GroupModulesSelected"
import GroupConst from "@security/group/domain/constantClient"
import { GroupFindEntity } from "@security/group/domain/interfaces/GroupFindEntity"
import { GroupMenuModuleSelectedEntity } from "@security/group/domain/interfaces/GroupMenuModuleSelectedEntity"
import { groupGetMenusOnlySelected } from "@security/group/domain/menusSelected"
import { GroupEditType, GroupEditSchema } from "@security/group/domain/schemas"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = GroupConst

export default function GroupEditForm({
  registerToEdit,
  menus: menusServer,
}: {
  registerToEdit: GroupFindEntity
  menus: GroupMenuModuleSelectedEntity[]
}) {
  const [menus, setMenus] = useState(menusServer)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<GroupEditType>({
    resolver: zodResolver(GroupEditSchema),
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
          url: `/security/v1/groups/${registerToEdit.id}/update`,
          body: {
            ...data,
            groupModulePermissions: groupGetMenusOnlySelected(menus),
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
          <GroupModulesSelected menus={menus} setMenus={setMenus} />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}

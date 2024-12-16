import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity"
import { PermissionActiveEntity } from "@security/permission/domain/interfaces/PermissionActiveEntity"
import ModuleConst from "../domain/constantClient"
import ModuleCreateForm from "./components/CreateForm"

const constant = ModuleConst

export default async function Page() {
  const [permissionRes, menuRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/permissions/actives",
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/menus/actives",
    }).exec(),
  ])

  const permissions: PermissionActiveEntity[] = permissionRes.isRight()
    ? (permissionRes.getRight().data as PermissionActiveEntity[])
    : []
  const menus = menuRes.isRight()
    ? (menuRes.getRight().data as MenuActiveEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de modulos"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={constant.listUrl({})}
              persists={constant.getPerst()}
            />
          }
        />
      }
    >
      <ModuleCreateForm menus={menus} permissions={permissions} />
    </CreateBase>
  )
}

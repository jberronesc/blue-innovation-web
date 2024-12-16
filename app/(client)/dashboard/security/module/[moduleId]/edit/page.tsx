import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { EditBase } from "@component/crud";
import ModuleConst from "@security/module/domain/constantClient";
import { PermissionActiveEntity } from "@security/permission/domain/interfaces/PermissionActiveEntity";
import { notFound } from "next/navigation";
import ModuleEditForm from "./components/EditForm";
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity";

const constant = ModuleConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { moduleId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes, permissionRes, menuRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/modules/${params.moduleId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/permissions/actives",
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/menus/actives",
    }).exec(),
  ]);

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound();
  const permissions: PermissionActiveEntity[] = permissionRes.isRight()
    ? (permissionRes.getRight().data as PermissionActiveEntity[])
    : [];
  const menus = menuRes.isRight()
    ? (menuRes.getRight().data as MenuActiveEntity[])
    : [];

  return (
    <EditBase
      title={"Editar registro de modulos"}
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
      <ModuleEditForm
        registerToEdit={registerToEdit}
        menus={menus}
        permissions={permissions}
      />
    </EditBase>
  );
}

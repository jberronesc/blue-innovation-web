import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { EditBase } from "@component/crud";
import GroupConst from "@security/group/domain/constantClient";
import { GroupFindEntity } from "@security/group/domain/interfaces/GroupFindEntity";
import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import GroupEditForm from "./components/EditForm";
import { ModuleActiveEntity } from "@security/module/domain/interfaces/ModuleActiveEntity";
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity";
import { GroupMenuModuleSelectedEntity } from "@security/group/domain/interfaces/GroupMenuModuleSelectedEntity";

const constant = GroupConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { groupId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes, moduleRes, menuRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/groups/${params.groupId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/modules/actives",
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/menus/actives`,
    }).exec(),
  ]);

  const registerToEdit = registerToEditRes.isRight()
    ? (registerToEditRes.getRight().data as GroupFindEntity)
    : notFound();

  const modules = moduleRes.isRight()
    ? (moduleRes.getRight().data as ModuleActiveEntity[])
    : [];
  const menus = menuRes.isRight()
    ? (menuRes.getRight().data as MenuActiveEntity[])
    : [];

  // TODO: ESTO DEBE ESTAR EN EL BACKEND - MOSTRAR COMO EJEMPLO

  const menusProcess: GroupMenuModuleSelectedEntity[] = menus.map((menu) => ({
    uuid: randomUUID(),
    menu,
    isSelected: false,
    modulesWrapper: modules
      .filter((module) => module.menu.id == menu.id)
      .map((module) => ({
        module: {
          ...module,
          permissions: module.permissions.map((elem) => ({
            ...elem,
            isSelected:
              registerToEdit?.groupModulePermissions.some(
                (sGroupModuleP) =>
                  sGroupModuleP.module.id == module.id &&
                  sGroupModuleP.permissions.some(
                    (permission) => permission.id == elem.id,
                  ),
              ) || false,
          })),
          permissionsCodenames: module.permissions.map((elem) => elem.codename),
        },
        menu,
        isSelected:
          registerToEdit?.groupModulePermissions.some(
            (elem) => elem.module.id == module.id,
          ) || false,
      })),
  }));

  return (
    <EditBase
      title={"Editar registro de grupos"}
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
      <GroupEditForm registerToEdit={registerToEdit} menus={menusProcess} />
    </EditBase>
  );
}

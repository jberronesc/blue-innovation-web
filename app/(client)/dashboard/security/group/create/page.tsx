import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { CreateBase } from "@component/crud";
import { randomUUID } from "crypto";
import GroupCreateForm from "./components/CreateForm";
import { ModuleActiveEntity } from "@security/module/domain/interfaces/ModuleActiveEntity";
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity";
import { GroupMenuModuleSelectedEntity } from "../domain/interfaces/GroupMenuModuleSelectedEntity";
import GroupConst from "../domain/constantClient";

const constant = GroupConst;

export default async function Page() {
  const [moduleRes, menuRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/modules/actives",
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/menus/actives`,
    }).exec(),
  ]);

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
            isSelected: false,
          })),
          permissionsCodenames: module.permissions.map((elem) => elem.codename),
        },
        menu,
        isSelected: false,
      })),
  }));

  return (
    <CreateBase
      title={"Nuevo registro de grupos"}
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
      <GroupCreateForm menus={menusProcess} />
    </CreateBase>
  );
}

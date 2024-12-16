import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { DeleteBase } from "@component/crud";
import MenuConst from "@security/menu/domain/constantClient";
import { notFound } from "next/navigation";
import MenuDeleteForm from "./components/DeleteForm";

const constant = MenuConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { menuId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/menus/${params.menuId}/find`,
    }).exec(),
  ]);

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound();

  return (
    <DeleteBase
      title={"Eliminar registro."}
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
      <MenuDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  );
}

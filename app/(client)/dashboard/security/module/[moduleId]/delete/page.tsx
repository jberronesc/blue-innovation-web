import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { DeleteBase } from "@component/crud";
import ModuleConst from "@security/module/domain/constantClient";
import { notFound } from "next/navigation";
import ModuleDeleteForm from "./components/DeleteForm";

const constant = ModuleConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { moduleId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/modules/${params.moduleId}/find`,
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
      <ModuleDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  );
}

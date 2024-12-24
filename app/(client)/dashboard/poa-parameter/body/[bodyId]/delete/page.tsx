import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { DeleteBase } from "@component/crud";
import BodyConst from "@poaparameter/body/domain/constantClient";
import { notFound } from "next/navigation";
import BodyDeleteForm from "./components/DeleteForm";

const constant = BodyConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { bodyId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/poa-parameter/v1/bodies/${params.bodyId}/find`,
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
      <BodyDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  );
}

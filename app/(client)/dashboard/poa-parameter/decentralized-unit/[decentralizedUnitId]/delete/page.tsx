import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { DeleteBase } from "@component/crud";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import { notFound } from "next/navigation";
import DecentralizedUnitDeleteForm from "./components/DeleteForm";

const constant = DecentralizedUnitConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { decentralizedUnitId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/poa-parameter/v1/decentralized-units/${params.decentralizedUnitId}/find`,
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
      <DecentralizedUnitDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  );
}

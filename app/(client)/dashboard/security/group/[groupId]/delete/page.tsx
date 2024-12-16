import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { DeleteBase } from "@component/crud";
import { notFound } from "next/navigation";
import GroupDeleteForm from "./components/DeleteForm";
import GroupConst from "@security/group/domain/constantClient";

const constant = GroupConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { groupId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/groups/${params.groupId}/find`,
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
      <GroupDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  );
}

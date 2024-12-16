import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { EditBase } from "@component/crud";
import UserConst from "@security/user/domain/constantClient";
import { notFound } from "next/navigation";
import UserEditForm from "./components/EditForm";
import { GroupActiveEntity } from "@security/group/domain/interfaces/GroupActiveEntity";

const constant = UserConst;

export default async function Page({
  params: paramsPromise,
}: {
  params: { userId: string };
}) {
  const params = await paramsPromise;

  const [registerToEditRes, groupRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/security/v1/users/${params.userId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/groups/actives",
    }).exec(),
  ]);

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound();
  const groups = groupRes.isRight()
    ? (groupRes.getRight().data as GroupActiveEntity[])
    : [];

  return (
    <EditBase
      title={"Editar registro de usuarios"}
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
      <UserEditForm registerToEdit={registerToEdit} groups={groups} />
    </EditBase>
  );
}

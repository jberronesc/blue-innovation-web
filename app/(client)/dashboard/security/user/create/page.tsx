import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import UserConst from "../domain/constantClient"
import UserCreateForm from "./components/CreateForm"
import { GroupActiveEntity } from "@security/group/domain/interfaces/GroupActiveEntity"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = UserConst

export default async function Page() {
  const [groupResponse] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/groups/actives",
    }).exec(),
  ])

  const groups = groupResponse.isRight()
    ? (groupResponse.getRight().data as GroupActiveEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de usuarios"}
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
      <UserCreateForm groups={groups} />
    </CreateBase>
  )
}

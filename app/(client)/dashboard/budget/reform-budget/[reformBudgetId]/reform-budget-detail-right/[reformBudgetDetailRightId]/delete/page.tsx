import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailRightConst from "../../domain/constantClient"
import ReformBudgetDetailRightDeleteForm from "./components/DeleteForm"

const constant = ReformBudgetDetailRightConst

export default async function Page({
  params,
}: {
  params: {
    reformBudgetId: string
    reformBudgetDetailRightId: string
  }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budget-detail-rights/${params.reformBudgetDetailRightId}/find`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <DeleteBase
      title={"Eliminar registro."}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={constant.listUrl({ ...params })}
              persists={constant.getPerst()}
            />
          }
        />
      }
    >
      <ReformBudgetDetailRightDeleteForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </DeleteBase>
  )
}

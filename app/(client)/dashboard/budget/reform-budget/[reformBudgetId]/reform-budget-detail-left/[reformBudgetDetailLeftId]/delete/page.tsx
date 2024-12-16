import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailLeftConst from "../../domain/constantClient"
import ReformBudgetDetailLeftDeleteForm from "./components/DeleteForm"

const constant = ReformBudgetDetailLeftConst

export default async function Page({
  params,
}: {
  params: {
    reformBudgetId: string
    reformBudgetDetailLeftId: string
  }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budget-detail-lefts/${params.reformBudgetDetailLeftId}/find`,
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
      <ReformBudgetDetailLeftDeleteForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </DeleteBase>
  )
}

import { notFound } from "next/navigation"
import BudgetConst from "../../domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import BudgetDeleteForm from "./components/DeleteForm"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = BudgetConst

export default async function Page({
  params,
}: {
  params: { budgetId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budgets/${params.budgetId}/find`,
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
              url={BudgetConst.listUrl({})}
              persists={BudgetConst.getPerst()}
            />
          }
        />
      }
    >
      <BudgetDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  )
}

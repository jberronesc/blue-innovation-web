import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetDetailExpenseConst from "../../domain/constantClient"
import BudgetDetailExpenseEditForm from "./components/EditForm"

const constant = BudgetDetailExpenseConst

export default async function Page({
  params,
}: {
  params: { budgetId: string; budgetDetailExpenseId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-detail-expenses/${params.budgetDetailExpenseId}/find`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <EditBase
      title={"Editar registro de presupuesto detalle de ingresos"}
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
      <BudgetDetailExpenseEditForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </EditBase>
  )
}

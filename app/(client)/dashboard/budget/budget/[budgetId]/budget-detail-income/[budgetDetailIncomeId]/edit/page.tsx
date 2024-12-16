import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetDetailIncomeConst from "../../domain/constantClient"
import BudgetDetailIncomeEditForm from "./components/EditForm"

const constant = BudgetDetailIncomeConst

export default async function Page({
  params,
}: {
  params: { budgetId: string; budgetDetailIncomeId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-detail-incomes/${params.budgetDetailIncomeId}/find`,
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
      <BudgetDetailIncomeEditForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </EditBase>
  )
}

import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetPartidaIncomeEditForm from "./components/EditForm"
import BudgetPartidaIncomeConst from "@budget/budget-partida-income/domain/constantClient"

const constant = BudgetPartidaIncomeConst

export default async function Page({
  params,
}: {
  params: { budgetPartidaIncomeId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-partida-incomes/${params.budgetPartidaIncomeId}/find`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <EditBase
      title={"Ediatr registro de partida presupuestaria de ingreso"}
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
      <BudgetPartidaIncomeEditForm registerToEdit={registerToEdit} />
    </EditBase>
  )
}

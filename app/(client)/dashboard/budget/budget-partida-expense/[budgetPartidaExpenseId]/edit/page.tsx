import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetPartidaExpenseEditForm from "./components/EditForm"
import BudgetPartidaExpenseConst from "@budget/budget-partida-expense/domain/constantClient"

const constant = BudgetPartidaExpenseConst

export default async function Page({
  params,
}: {
  params: { budgetPartidaExpenseId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-partida-expenses/${params.budgetPartidaExpenseId}/find`,
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
      <BudgetPartidaExpenseEditForm registerToEdit={registerToEdit} />
    </EditBase>
  )
}

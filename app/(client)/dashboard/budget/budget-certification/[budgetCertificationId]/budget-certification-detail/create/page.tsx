import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetCertificationDetailConst from "../domain/constantClient"
import { BudgetCertificationDetailBudgetPartidaExpenseEntity } from "../domain/interfaces/BudgetCertificationDetailBudgetPartidaExpenseEntity"
import BudgetCertificationDetailCreateForm from "./components/CreateForm"

const constant = BudgetCertificationDetailConst

export default async function Page({
  params,
}: {
  params: { budgetCertificationId: string }
}) {
  const [budgetCertificationRes, budgetPartidaExpensesRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/budget-certification-details/budget-partida-expenses`,
    }).exec(),
  ])

  const budgetCertification = budgetCertificationRes.isRight()
    ? (budgetCertificationRes.getRight().data as BudgetCertificationFindEntity)
    : notFound()

  const budgetPartidaExpenses = budgetPartidaExpensesRes.isRight()
    ? (budgetPartidaExpensesRes.getRight()
        .data as BudgetCertificationDetailBudgetPartidaExpenseEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de certificacion presupuestario detalle"}
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
      <BudgetCertificationDetailCreateForm
        params={params}
        budgetPartidaExpenses={budgetPartidaExpenses}
      />
    </CreateBase>
  )
}

import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetCertificationDetailConst from "../../domain/constantClient"
import { BudgetCertificationDetailBudgetPartidaExpenseEntity } from "../../domain/interfaces/BudgetCertificationDetailBudgetPartidaExpenseEntity"
import BudgetCertificationDetailEditForm from "./components/EditForm"

const constant = BudgetCertificationDetailConst

export default async function Page({
  params,
}: {
  params: {
    budgetCertificationId: string
    budgetCertificationDetailId: string
  }
}) {
  const [registerToEditRes, budgetCertificationRes, budgetPartidaExpensesRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/budget-certification-details/${params.budgetCertificationDetailId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/budget-certification-details/${params.budgetCertificationDetailId}/budget-partida-expenses/with-detail`,
      }).exec(),
    ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()
  const budgetCertification = budgetCertificationRes.isRight()
    ? (budgetCertificationRes.getRight().data as BudgetCertificationFindEntity)
    : notFound()
  const budgetPartidaExpenses = budgetPartidaExpensesRes.isRight()
    ? (budgetPartidaExpensesRes.getRight()
        .data as BudgetCertificationDetailBudgetPartidaExpenseEntity[])
    : []

  return (
    <EditBase
      title={"Editar registro de certificacion de presupuestario detalle"}
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
      <BudgetCertificationDetailEditForm
        registerToEdit={registerToEdit}
        params={params}
        budgetPartidaExpenses={budgetPartidaExpenses}
      />
    </EditBase>
  )
}

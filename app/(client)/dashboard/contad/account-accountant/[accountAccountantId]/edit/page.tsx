import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BudgetPartidaTypePertain } from "@budget/budget-partida/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import AccountAccountantConst from "@contad/account-accountant/domain/constantClient"
import { notFound } from "next/navigation"
import AccountAccountantEditForm from "./components/EditForm"
import { BudgetPartidaIncomeActiveEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeActiveEntity"
import { BudgetPartidaExpenseActiveEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseActiveEntity"

const constant = AccountAccountantConst

export default async function Page({
  params,
}: {
  params: { accountAccountantId: string }
}) {
  const [registerToEditRes, budgetPartidaIncomeRes, budgetPartidaExpenseRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: `/contad/v1/account-accountants/${params.accountAccountantId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: "/budget/v1/budget-partida-incomes/actives",
        shearhParams: {
          typePertain: BudgetPartidaTypePertain.ITEM.value,
        },
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: "/budget/v1/budget-partida-expenses/actives",
        shearhParams: {
          typePertain: BudgetPartidaTypePertain.ITEM.value,
        },
      }).exec(),
    ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  const budgetPartidaIncomes = budgetPartidaIncomeRes.isRight()
    ? (budgetPartidaIncomeRes.getRight()
        .data as BudgetPartidaIncomeActiveEntity[])
    : []

  const budgetPartidaExpenses = budgetPartidaExpenseRes.isRight()
    ? (budgetPartidaExpenseRes.getRight()
        .data as BudgetPartidaExpenseActiveEntity[])
    : []

  return (
    <EditBase
      title={"Editar registro de cuenta contable"}
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
      <AccountAccountantEditForm
        registerToEdit={registerToEdit}
        budgetPartidaIncomes={budgetPartidaIncomes}
        budgetPartidaExpenses={budgetPartidaExpenses}
      />
    </EditBase>
  )
}

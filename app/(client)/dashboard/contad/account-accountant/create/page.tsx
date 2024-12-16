import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BudgetPartidaTypePertain } from "@budget/budget-partida/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import AccountAccountantConst from "../domain/constantClient"
import AccountAccountantCreateForm from "./components/CreateForm"
import { BudgetPartidaIncomeActiveEntity } from "@budget/budget-partida-income/domain/interfaces/BudgetPartidaIncomeActiveEntity"
import { BudgetPartidaExpenseActiveEntity } from "@budget/budget-partida-expense/domain/interfaces/BudgetPartidaExpenseActiveEntity"

const constant = AccountAccountantConst

export default async function Page() {
  const [budgetPartidaIncomeRes, budgetPartidaExpenseRes] = await Promise.all([
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

  const budgetPartidaIncomes = budgetPartidaIncomeRes.isRight()
    ? (budgetPartidaIncomeRes.getRight()
        .data as BudgetPartidaIncomeActiveEntity[])
    : []

  const budgetPartidaExpenses = budgetPartidaExpenseRes.isRight()
    ? (budgetPartidaExpenseRes.getRight()
        .data as BudgetPartidaExpenseActiveEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de cuentas contable"}
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
      <AccountAccountantCreateForm
        budgetPartidaIncomes={budgetPartidaIncomes}
        budgetPartidaExpenses={budgetPartidaExpenses}
      />
    </CreateBase>
  )
}

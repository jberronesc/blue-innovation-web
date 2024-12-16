import { ReformBudgetDetailBudgetPartidaExpenseEntity } from "./ReformBudgetDetailBudgetPartidaExpenseEntity"
import { ReformBudgetDetailBudgetPartidaIncomeEntity } from "./ReformBudgetDetailBudgetPartidaIncomeEntity"

export type ReformBudgetDetailBaseEntity = {
  id: number
  org: string
  ubg: string
  fte: string
  amount: number
  budgetPartidaIncome?: ReformBudgetDetailBudgetPartidaIncomeEntity
  budgetPartidaExpense?: ReformBudgetDetailBudgetPartidaExpenseEntity
}

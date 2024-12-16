import { ReformBudgetDetailBudgetPartidaIncomeEntity } from "@budget/reform-budget/[reformBudgetId]/reform-budget-detail/domain/interfaces/ReformBudgetDetailBudgetPartidaIncomeEntity"
import { ReformBudgetDetailBudgetPartidaExpenseEntity } from "@budget/reform-budget/[reformBudgetId]/reform-budget-detail/domain/interfaces/ReformBudgetDetailBudgetPartidaExpenseEntity"

export type ReformBudgetDetailLeftBudgetPartidaEntity = {
  budgetPartidaIncomes: ReformBudgetDetailBudgetPartidaIncomeEntity[]
  budgetPartidaExpenses: ReformBudgetDetailBudgetPartidaExpenseEntity[]
}

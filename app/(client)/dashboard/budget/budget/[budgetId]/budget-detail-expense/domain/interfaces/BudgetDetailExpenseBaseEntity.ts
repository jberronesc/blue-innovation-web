import { BudgetDetailBaseEntity } from "@budget/budget/[budgetId]/budget-detail/domain/interfaces/BudgetDetailBaseEntity"

export type BudgetDetailExpenseBaseEntity = BudgetDetailBaseEntity & {
  budgetPartidaExpense: number
  paid: number
  balanceXPay: number
}

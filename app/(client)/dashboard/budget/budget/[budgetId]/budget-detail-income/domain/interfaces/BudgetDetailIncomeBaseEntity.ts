import { BudgetDetailBaseEntity } from "@budget/budget/[budgetId]/budget-detail/domain/interfaces/BudgetDetailBaseEntity"

export type BudgetDetailIncomeBaseEntity = BudgetDetailBaseEntity & {
  budgetPartidaIncome: number
  received: number
  balanceXReceive: number
}

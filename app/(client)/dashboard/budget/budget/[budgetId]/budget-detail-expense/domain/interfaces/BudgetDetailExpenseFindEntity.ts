import { BudgetDetailExpenseBaseEntity } from "./BudgetDetailExpenseBaseEntity"

export type BudgetDetailExpenseFindEntity = BudgetDetailExpenseBaseEntity & {
  budgetPartidaExpense: {
    id: number
    partida: string
    name: string
    description: string
    typePertain: string
    isActive: boolean
    isTypePertainItem: string
  }
}

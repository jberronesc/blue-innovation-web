import { BudgetDetailExpenseBaseEntity } from "./BudgetDetailExpenseBaseEntity"

export type BudgetDetailExpenseListEntity = BudgetDetailExpenseBaseEntity & {
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

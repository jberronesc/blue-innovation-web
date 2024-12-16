import { BudgetDetailIncomeBaseEntity } from "./BudgetDetailIncomeBaseEntity"

export type BudgetDetailIncomeListEntity = BudgetDetailIncomeBaseEntity & {
  budgetPartidaIncome: {
    id: number
    partida: string
    name: string
    description: string
    typePertain: string
    isActive: boolean
    isTypePertainItem: string
  }
}

import { BudgetCertificationDetailBudgetPartidaExpenseBaseEntity } from "./BudgetCertificationDetailBudgetPartidaExpenseBaseEntity"

export type BudgetCertificationDetailBaseEntity = {
  id: number
  budgetPartidaExpense: BudgetCertificationDetailBudgetPartidaExpenseBaseEntity
  pg: string
  sp: string
  py: string
  act: string
  ubg: string
  fte: string
  org: string
  nPrest: string
  amount: number
  balance: number
}

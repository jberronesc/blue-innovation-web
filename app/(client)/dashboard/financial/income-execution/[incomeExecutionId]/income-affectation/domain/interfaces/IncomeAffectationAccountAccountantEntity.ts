export type IncomeAffectationAccountAccountantEntity = {
  id: number
  account: string
  description: string
  nature: string
  type: string
  associateCenterCost: boolean
  movement: boolean
  isActive: boolean
  typePertain: string
  budgetPartidaExpense: {
    id: number
    partida: string
    name: string
    description: string
    type: string
    typePertain: string
    isActive: boolean
  }
}

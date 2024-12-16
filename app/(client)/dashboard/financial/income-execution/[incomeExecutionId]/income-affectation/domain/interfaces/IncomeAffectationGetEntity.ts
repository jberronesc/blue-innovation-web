export type IncomeAffectationGetEntity = {
  id: number
  accountAccountant: {
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
  type: string
  cs: string
  ubg: string
  fte: string
  geo: string
  amount: number
}

export type AccountAccountantBaseEntity = {
  id: number
  account: string
  description: string
  nature: string
  type: string
  associateCenterCost: boolean
  movement: boolean
  isActive: boolean
  typePertain: string
  budgetPartidaIncome?: {
    id: number
    partida: string
    name: string
    description: string
    type: string
    typePertain: string
    isActive: boolean
  }
  budgetPartidaExpense?: {
    id: number
    partida: string
    name: string
    description: string
    type: string
    typePertain: string
    isActive: boolean
  }
}

export type BudgetCommitmentDetailsBudgetCommitment = {
  id: number
  budgetPartida: {
    id: number
    partida: string
    name: string
    description: string
    type: string
    typePertain: string
    isActive: boolean
  }
  pg: string
  sp: string
  py: string
  act: string
  ubg: string
  fte: string
  org: string
  n_prest: string
  amount: number
  balance: number
}

export type ExpenseExecutionBudgetCommitmentActiveEntity = {
  id: number
  sequence: number
  date: string
  documentReference: string
  concept: string
  amount: number
  balance: number
  status: string
  budgetCommitmentDetailsBudgetCommitment: BudgetCommitmentDetailsBudgetCommitment[]
}

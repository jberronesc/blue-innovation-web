export type ExpenseExecutionBudgetCommitmentListEntity = {
  id: number
  budgetCommitment: {
    id: number
    sequence: number
    date: string
    documentReference: string
    concept: string
    amount: number
    balance: number
    status: string
  }
  expenseAffectationsExpenseExecutionBudgetCommitment: {
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
  }[]
}

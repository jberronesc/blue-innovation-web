export type IncomeXCobrarTransaction = {
  id: number
  sequence: number
  sequenceDisplay: string
  sequenceType: number
  sequenceTypeDisplay: string
  date: string
  dateOperation: string
  documentReference: string
  concept: string
  type: string
  classRegister: string
}

export type IncomeXCobrarAccountAccountant = {
  id: number
  account: string
  description: string
  nature: string
  type: string
  associateCenterCost: boolean
  movement: boolean
  isActive: boolean
  typePertain: string
}

export type IncomeXCobrarSupplierInfoEntity = {
  incomeXCobrarsResult: {
    id: number
    transaction: IncomeXCobrarTransaction
    amount: number
    balance: number
    isCollected: boolean
    incomeXCobrarDetails: {
      id: number
      incomeAffectation: {
        id: number
        cs: string
        type: string
        ubg: string
        fte: string
        geo: string
        amount: number
      }
      accountAccountant: IncomeXCobrarAccountAccountant
      amount: number
      balance: number
      isCollected: boolean
    }[]
  }[]
  expenseXPaysResult: {
    id: number
    transaction: IncomeXCobrarTransaction
    amount: number
    balance: number
    isPaid: boolean
    expenseXPayDetails: {
      id: number
      expenseAffectation: {
        id: number
        cs: string
        type: string
        ubg: string
        fte: string
        geo: string
        amount: number
      }
      accountAccountant: IncomeXCobrarAccountAccountant
      amount: number
      balance: number
      isPaid: boolean
    }[]
  }[]
}

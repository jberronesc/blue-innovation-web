export type IncomeXTransferTransaction = {
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

export type IncomeXTransferAccountAccountant = {
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

export type IncomeXTransferSupplierInfoEntity = {
  id: number
  transaction: IncomeXTransferTransaction
  amount: number
  balance: number
  isTransferred: boolean
  accountAccountant: IncomeXTransferAccountAccountant
  incomeXTransferDetails: {
    id: number
    amount: number
    balance: number
    isTransferred: boolean
  }[]
}

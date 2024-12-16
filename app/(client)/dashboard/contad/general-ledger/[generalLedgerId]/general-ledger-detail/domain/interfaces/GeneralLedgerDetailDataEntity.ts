export type GeneralLedgerDetailDataEntity = {
  balanceInitial: number
  debit: number
  credit: number
  balanceEnd: number
  generalLedgerDetails: {
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
    }
    balanceInitial: number
    debit: number
    credit: number
    balanceEnd: number
  }[]
}

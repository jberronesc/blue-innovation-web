export type GeneralJournalAccountAccountantInfoEntitySpecificType = {
  value: number
  label: string
  account: string
  description: string
  subgroup: string
}

export type GeneralJournalAccountAccountantInfoEntitytSelectedType = {
  accountAccountant: GeneralJournalAccountAccountantInfoEntitySpecificType
  amount: number
  concept: string
  centerCosts: {
    id: number
    name: string
  }[]
}

export type GeneralJournalBudgetPartida = {
  id: number
  partida: string
  name: string
  description: string
  type: string
  typePertain: string
  isActive: boolean
}

export type GeneralJournalSupplier = {
  id: number
  typeContributor: string
  typeIdentification: string
  dni: string
  firstName: string
  lastName: string
  nameReasonSocial: string
  legalRepresentative: string
  direction: string
  phone: string
  email: string
}

export type GeneralJournalInfo = {
  typeTransaction: string
  typeTransactionisOpening: boolean
  typeTransactionisOpeningInitial: boolean
  typeTransactionisNormal: boolean
  typeTransactionisOpeningOrOpeningInitial: boolean
  dateOperationMin: string
  dateOperationMax: string
  debits: GeneralJournalAccountAccountantInfoEntitytSelectedType[]
  credits: GeneralJournalAccountAccountantInfoEntitytSelectedType[]
  budgetPartidas: GeneralJournalBudgetPartida[]
  companyInfo?: {
    supplier: GeneralJournalSupplier
  }
  suppliers: GeneralJournalSupplier[]
}

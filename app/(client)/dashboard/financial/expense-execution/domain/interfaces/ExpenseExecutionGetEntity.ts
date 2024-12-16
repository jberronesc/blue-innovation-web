export type ExpenseExecutionGetEntity = {
  id: number
  sequence: number
  date: string
  classRegister: string
  supplier: {
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
  classExpense: string
  concept: string
  documentReference: string
  status: string
  total: number
  totalAffected: number
  totalDeduction: number
  totalRetentionRenta: number
  totalRetentionIva: number
  totalInvoice: number
  isStatusExecution: boolean
}

export type IncomeExecutionGetEntity = {
  id: number
  sequence: number
  date: string
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
  concept: string
  documentReference: string
  status: string
  total: number
  isStatusExecution: boolean
}

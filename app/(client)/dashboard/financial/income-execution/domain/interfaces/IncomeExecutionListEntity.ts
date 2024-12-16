export type IncomeExecutionListEntity = {
  id: number
  sequence: number
  sequenceDisplay: string
  date: Date
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
  isStatusDevengado: boolean
  isStatusReversed: boolean
  isStatusReverse: boolean
}

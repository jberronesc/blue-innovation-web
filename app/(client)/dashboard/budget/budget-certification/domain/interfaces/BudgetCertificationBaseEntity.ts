export type BudgetCertificationBaseEntity = {
  id: number
  sequence: number
  date: string
  documentReference: string
  concept: string
  amount: number
  balance: number
  status: string
  reviewedConcept: string
  approveConcept: string
  isStatusAssignedOrReviewed: boolean
  isStatusAssigned: boolean
  isStatusReviewed: boolean
  isStatusApproved: boolean
  canReviewed: boolean
  canDelete: boolean
}

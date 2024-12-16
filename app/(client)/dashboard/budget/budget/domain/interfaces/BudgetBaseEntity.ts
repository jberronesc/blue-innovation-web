export type BudgetBaseEntity = {
  id: number
  status: string
  income: number
  expense: number
  isStatusAssigned: boolean
  isStatusReviewed: boolean
  isStatusAssignedOrReviewed: boolean
  canDelete: boolean
}

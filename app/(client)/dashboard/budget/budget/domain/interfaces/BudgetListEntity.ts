import { BudgetBaseEntity } from "./BudgetBaseEntity"

export type BudgetListEntity = BudgetBaseEntity & {
  exercise: {
    id: number
    year: number
    isClose: boolean
    inUse: boolean
    isNext: boolean
  }
}

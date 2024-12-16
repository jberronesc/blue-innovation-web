import { BudgetBaseEntity } from "./BudgetBaseEntity"

export type BudgetFindEntity = BudgetBaseEntity & {
  exercise: { year: number }
}

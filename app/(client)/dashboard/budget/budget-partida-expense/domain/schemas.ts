import { BudgetPartidaSchema } from "@budget/budget-partida/domain/schemas"
import { z } from "zod"

export const BudgetPartidaExpenseSchema = BudgetPartidaSchema.extend({})

const BudgetPartidaExpenseCreateExtendSchema =
  BudgetPartidaExpenseSchema.extend({})

export const BudgetPartidaExpenseCreateSchema =
  BudgetPartidaExpenseCreateExtendSchema.pick({
    partida: true,
    name: true,
    description: true,
    isActive: true,
  })

export type BudgetPartidaExpenseCreateType = z.infer<
  typeof BudgetPartidaExpenseCreateSchema
>

const BudgetPartidaExpenseEditExtendSchema = BudgetPartidaExpenseSchema.extend(
  {}
)

export const BudgetPartidaExpenseEditSchema =
  BudgetPartidaExpenseEditExtendSchema.pick({
    partida: true,
    name: true,
    description: true,
    isActive: true,
  })

export type BudgetPartidaExpenseEditType = z.infer<
  typeof BudgetPartidaExpenseEditSchema
>

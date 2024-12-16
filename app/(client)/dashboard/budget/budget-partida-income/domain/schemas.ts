import { BudgetPartidaSchema } from "@budget/budget-partida/domain/schemas"
import { z } from "zod"

export const BudgetPartidaIncomeSchema = BudgetPartidaSchema.extend({})

const BudgetPartidaIncomeCreateExtendSchema = BudgetPartidaIncomeSchema.extend(
  {}
)

export const BudgetPartidaIncomeCreateSchema =
  BudgetPartidaIncomeCreateExtendSchema.pick({
    partida: true,
    name: true,
    description: true,
    isActive: true,
  })

export type BudgetPartidaIncomeCreateType = z.infer<
  typeof BudgetPartidaIncomeCreateSchema
>

const BudgetPartidaIncomeEditExtendSchema = BudgetPartidaIncomeSchema.extend({})

export const BudgetPartidaIncomeEditSchema =
  BudgetPartidaIncomeEditExtendSchema.pick({
    partida: true,
    name: true,
    description: true,
    isActive: true,
  })

export type BudgetPartidaIncomeEditType = z.infer<
  typeof BudgetPartidaIncomeEditSchema
>

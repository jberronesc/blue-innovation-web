import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const ReformBudgetDetailSchema = zConfig.object({
  id: zConfig.number(),
  budgetPartidaIncome: zConfig
    .object({
      value: zConfig.number(),
      label: zConfig.string(),
    })
    .optional(),
  budgetPartidaExpense: zConfig
    .object({
      value: zConfig.number(),
      label: zConfig.string(),
    })
    .optional(),
  org: zConfig.string().trim().min(1).max(100),
  ubg: zConfig.string().trim().min(1).max(100),
  fte: zConfig.string().trim().min(1).max(100),
  amount: zConfig.string().trim().min(1).max(100),
})

const ReformBudgetDetailCreateExtendSchema = ReformBudgetDetailSchema.extend({})

export const ReformBudgetDetailCreateSchema =
  ReformBudgetDetailCreateExtendSchema.pick({
    budgetPartidaIncome: true,
    budgetPartidaExpense: true,
    org: true,
    ubg: true,
    fte: true,
    amount: true,
  })

export type ReformBudgetDetailCreateType = z.infer<
  typeof ReformBudgetDetailCreateSchema
>

const ReformBudgetDetailEditExtendSchema = ReformBudgetDetailSchema.extend({})

export const ReformBudgetDetailEditSchema =
  ReformBudgetDetailEditExtendSchema.pick({
    budgetPartidaIncome: true,
    budgetPartidaExpense: true,
    org: true,
    ubg: true,
    fte: true,
    amount: true,
  })

export type ReformBudgetDetailEditType = z.infer<
  typeof ReformBudgetDetailEditSchema
>

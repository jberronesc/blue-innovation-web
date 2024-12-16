import { zConfig } from "@/app/(client)/layout"
import { SchemaApproved } from "@utils/schemas/SchemaApproved"
import { SchemaReviewed } from "@utils/schemas/SchemaReviewed"
import { z } from "zod"

export const ReformBudgetSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  classModification: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
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
})

const ReformBudgetCreateExtendSchema = ReformBudgetSchema.extend({})

export const ReformBudgetCreateSchema = ReformBudgetCreateExtendSchema.pick({
  date: true,
  documentReference: true,
  concept: true,
  classModification: true,
  budgetPartidaIncome: true,
  budgetPartidaExpense: true,
})

export type ReformBudgetCreateType = z.infer<typeof ReformBudgetCreateSchema>

const ReformBudgetEditExtendSchema = ReformBudgetSchema.extend({})

export const ReformBudgetEditSchema = ReformBudgetEditExtendSchema.pick({
  date: true,
  documentReference: true,
  concept: true,
  classModification: true,
  budgetPartidaIncome: true,
  budgetPartidaExpense: true,
})

export type ReformBudgetEditType = z.infer<typeof ReformBudgetEditSchema>

export const ReformBudgetReviewedSchema = SchemaReviewed

export type ReformBudgetReviewedType = z.infer<
  typeof ReformBudgetReviewedSchema
>

export const ReformBudgetApprovedSchema = SchemaApproved

export type ReformBudgetApprovedType = z.infer<
  typeof ReformBudgetApprovedSchema
>

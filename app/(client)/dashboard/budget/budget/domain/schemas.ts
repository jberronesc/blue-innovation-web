import { zConfig } from "@/app/(client)/layout"
import { SchemaApproved } from "@utils/schemas/SchemaApproved"
import { SchemaReviewed } from "@utils/schemas/SchemaReviewed"
import { z } from "zod"

export const BudgetSchema = zConfig.object({
  id: zConfig.number(),
})

const BudgetCreateExtendSchema = BudgetSchema.extend({})

export const BudgetCreateSchema = BudgetCreateExtendSchema.pick({})

export type BudgetCreateType = z.infer<typeof BudgetCreateSchema>

export const BudgetReviewedSchema = SchemaReviewed

export type BudgetReviewedType = z.infer<typeof BudgetReviewedSchema>

export const BudgetApprovedSchema = SchemaApproved

export type BudgetApprovedType = z.infer<typeof BudgetApprovedSchema>

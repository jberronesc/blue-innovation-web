import { zConfig } from "@/app/(client)/layout"
import { SchemaApproved } from "@utils/schemas/SchemaApproved"
import { SchemaReviewed } from "@utils/schemas/SchemaReviewed"
import { z } from "zod"

export const BudgetCertificationSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
})

const BudgetCertificationCreateExtendSchema = BudgetCertificationSchema.extend(
  {}
)

export const BudgetCertificationCreateSchema =
  BudgetCertificationCreateExtendSchema.pick({
    date: true,
    documentReference: true,
    concept: true,
  })

export type BudgetCertificationCreateType = z.infer<
  typeof BudgetCertificationCreateSchema
>

const BudgetCertificationEditExtendSchema = BudgetCertificationSchema.extend({})

export const BudgetCertificationEditSchema =
  BudgetCertificationEditExtendSchema.pick({
    date: true,
    documentReference: true,
    concept: true,
  })

export type BudgetCertificationEditType = z.infer<
  typeof BudgetCertificationEditSchema
>

export const BudgetCertificationReviewedSchema = SchemaReviewed

export type BudgetCertificationReviewedType = z.infer<
  typeof BudgetCertificationReviewedSchema
>

export const BudgetCertificationApprovedSchema = SchemaApproved

export type BudgetCertificationApprovedType = z.infer<
  typeof BudgetCertificationApprovedSchema
>

import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const BudgetCommitmentSelectionSchema = zConfig.object({
  budgetCommitment: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
})

const BudgetCommitmentSelectionCreateSchema =
  BudgetCommitmentSelectionSchema.extend({})

export const BudgetCommitmentSelectionCreateFormSchemaClient =
  BudgetCommitmentSelectionCreateSchema.pick({
    budgetCommitment: true,
  })

export type BudgetCommitmentSelectionCreateFormTypeClient = z.infer<
  typeof BudgetCommitmentSelectionCreateFormSchemaClient
>

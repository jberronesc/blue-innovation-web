import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const BudgetDetailSchema = zConfig.object({
  id: zConfig.number(),
  assigned: zConfig.string(),
})

const BudgetDetailEditSchemaClient = BudgetDetailSchema.extend({})

export const BudgetDetailEditSchema = BudgetDetailEditSchemaClient.pick({
  assigned: true,
})

export type BudgetDetailEditType = z.infer<typeof BudgetDetailEditSchema>

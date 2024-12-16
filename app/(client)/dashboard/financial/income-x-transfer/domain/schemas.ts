import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const IncomeXTransferSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  supplier: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
})

const IncomeXTransferCreateSchemaClient = IncomeXTransferSchema.extend({})

export const IncomeXTransferCreateFormSchemaClient =
  IncomeXTransferCreateSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    supplier: true,
  })

export type IncomeXTransferCreateFormTypeClient = z.infer<
  typeof IncomeXTransferCreateFormSchemaClient
>

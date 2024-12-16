import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const IncomeXCobrarSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  classRegister: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  supplier: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
})

const IncomeXCobrarCreateSchemaClient = IncomeXCobrarSchema.extend({})

export const IncomeXCobrarCreateFormSchemaClient =
  IncomeXCobrarCreateSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    classRegister: true,
    supplier: true,
  })

export type IncomeXCobrarCreateFormTypeClient = z.infer<
  typeof IncomeXCobrarCreateFormSchemaClient
>

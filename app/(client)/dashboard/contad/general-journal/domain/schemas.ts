import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const GeneralJournalSchema = zConfig.object({
  date: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  supplier: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
})

const GeneralJournalCreateSchemaClient = GeneralJournalSchema.extend({})

export const GeneralJournalCreateFormSchemaClient =
  GeneralJournalCreateSchemaClient.pick({
    date: true,
    concept: true,
    documentReference: true,
    supplier: true,
  })

export type GeneralJournalCreateFormTypeClient = z.infer<
  typeof GeneralJournalCreateFormSchemaClient
>

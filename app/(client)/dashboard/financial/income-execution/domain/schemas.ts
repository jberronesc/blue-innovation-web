import { zConfig } from "@/app/(client)/layout"
import { SchemaVoid } from "@utils/schemas/SchemaVoid"
import { z } from "zod"

export const IncomeExecutionSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  supplier: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
})

const IncomeExecutionCreateSchemaClient = IncomeExecutionSchema.extend({})

export const IncomeExecutionCreateFormSchemaClient =
  IncomeExecutionCreateSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    supplier: true,
  })

export type IncomeExecutionCreateFormTypeClient = z.infer<
  typeof IncomeExecutionCreateFormSchemaClient
>

const IncomeExecutionEditSchemaClient = IncomeExecutionSchema.extend({})

export const IncomeExecutionEditFormSchemaClient =
  IncomeExecutionEditSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    supplier: true,
  })

export type IncomeExecutionEditFormTypeClient = z.infer<
  typeof IncomeExecutionEditFormSchemaClient
>

export const IncomeExecutionDevengadoFormSchemaClient = SchemaVoid

export type IncomeExecutionDevengadoFormTypeClient = z.infer<
  typeof IncomeExecutionDevengadoFormSchemaClient
>

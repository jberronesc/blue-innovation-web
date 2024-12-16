import { zConfig } from "@/app/(client)/layout"
import { SchemaVoid } from "@utils/schemas/SchemaVoid"

import { z } from "zod"

export const ExpenseExecutionSchema = zConfig.object({
  id: zConfig.number(),
  date: zConfig.string().trim().min(1).max(100),
  documentReference: zConfig.string().trim().min(1).max(100),
  concept: zConfig.string().trim().min(1).max(100),
  supplier: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
  classRegister: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  classExpense: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
})

const ExpenseExecutionCreateSchemaClient = ExpenseExecutionSchema.extend({})

export const ExpenseExecutionCreateFormSchemaClient =
  ExpenseExecutionCreateSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    supplier: true,
    classRegister: true,
    classExpense: true,
  })

export type ExpenseExecutionCreateFormTypeClient = z.infer<
  typeof ExpenseExecutionCreateFormSchemaClient
>

const ExpenseExecutionEditSchemaClient = ExpenseExecutionSchema.extend({})

export const ExpenseExecutionEditFormSchemaClient =
  ExpenseExecutionEditSchemaClient.pick({
    date: true,
    documentReference: true,
    concept: true,
    supplier: true,
    classRegister: true,
    classExpense: true,
  })

export type ExpenseExecutionEditFormTypeClient = z.infer<
  typeof ExpenseExecutionEditFormSchemaClient
>

export const ExpenseExecutionDevengadoFormSchemaClient = SchemaVoid

export type ExpenseExecutionDevengadoFormTypeClient = z.infer<
  typeof ExpenseExecutionDevengadoFormSchemaClient
>

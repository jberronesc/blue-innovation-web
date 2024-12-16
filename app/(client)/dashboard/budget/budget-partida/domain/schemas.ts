import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const BudgetPartidaSchema = zConfig.object({
  id: zConfig.number(),
  partida: zConfig.string().trim().min(1).max(100),
  name: zConfig.string().trim().min(1).max(100),
  description: zConfig.string().trim().min(1).max(100),
  type: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  isActive: zConfig.boolean(),
})

const BudgetPartidaCreateSchemaClient = BudgetPartidaSchema.extend({})

export const BudgetPartidaCreateFormSchemaClient =
  BudgetPartidaCreateSchemaClient.pick({
    partida: true,
    name: true,
    description: true,
    type: true,
    isActive: true,
  })

export type BudgetPartidaCreateFormTypeClient = z.infer<
  typeof BudgetPartidaCreateFormSchemaClient
>

const BudgetPartidaEditSchemaClient = BudgetPartidaSchema.extend({})

export const BudgetPartidaEditFormSchemaClient =
  BudgetPartidaEditSchemaClient.pick({
    partida: true,
    name: true,
    description: true,
    type: true,
    isActive: true,
  })

export type BudgetPartidaEditFormTypeClient = z.infer<
  typeof BudgetPartidaEditFormSchemaClient
>

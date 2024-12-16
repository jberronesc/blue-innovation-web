import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const IncomeAffectationSchema = zConfig.object({
  id: zConfig.number(),
  accountAccountant: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
  cs: zConfig.string().trim().min(1).max(100),
  type: zConfig.string().trim().min(1).max(100),
  ubg: zConfig.string().trim().min(1).max(100),
  fte: zConfig.string().trim().min(1).max(100),
  geo: zConfig.string().trim().min(1).max(100),
  amount: zConfig.string().trim().min(1).max(100),
})

const IncomeAffectationCreateSchemaClient = IncomeAffectationSchema.extend({})

export const IncomeAffectationCreateFormSchemaClient =
  IncomeAffectationCreateSchemaClient.pick({
    accountAccountant: true,
    cs: true,
    type: true,
    ubg: true,
    fte: true,
    geo: true,
    amount: true,
  })

export type IncomeAffectationCreateFormTypeClient = z.infer<
  typeof IncomeAffectationCreateFormSchemaClient
>

const IncomeAffectationEditSchemaClient = IncomeAffectationSchema.extend({})

export const IncomeAffectationEditFormSchemaClient =
  IncomeAffectationEditSchemaClient.pick({
    accountAccountant: true,
    cs: true,
    type: true,
    ubg: true,
    fte: true,
    geo: true,
    amount: true,
  })

export type IncomeAffectationEditFormTypeClient = z.infer<
  typeof IncomeAffectationEditFormSchemaClient
>

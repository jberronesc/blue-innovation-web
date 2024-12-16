import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const AccountAccountantSchema = zConfig.object({
  id: zConfig.number(),
  account: zConfig.string().trim().min(1).max(100),
  description: zConfig.string().trim().min(1).max(100),
  nature: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  type: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  associateCenterCost: zConfig.boolean(),
  movement: zConfig.boolean(),
  isActive: zConfig.boolean(),
  budgetPartidaIncome: zConfig
    .object({
      value: zConfig.number(),
      label: zConfig.string(),
    })
    .optional(),
  budgetPartidaExpense: zConfig
    .object({
      value: zConfig.number(),
      label: zConfig.string(),
    })
    .optional(),
})

const AccountAccountantCreateExtendSchema = AccountAccountantSchema.extend({})

export const AccountAccountantCreateSchema =
  AccountAccountantCreateExtendSchema.pick({
    account: true,
    description: true,
    nature: true,
    type: true,
    associateCenterCost: true,
    movement: true,
    isActive: true,
    budgetPartidaIncome: true,
    budgetPartidaExpense: true,
  })

export type AccountAccountantCreateType = z.infer<
  typeof AccountAccountantCreateSchema
>

const AccountAccountantEditExtendSchema = AccountAccountantSchema.extend({})

export const AccountAccountantEditSchema =
  AccountAccountantEditExtendSchema.pick({
    account: true,
    description: true,
    nature: true,
    type: true,
    associateCenterCost: true,
    movement: true,
    isActive: true,
    budgetPartidaIncome: true,
    budgetPartidaExpense: true,
  })

export type AccountAccountantEditType = z.infer<
  typeof AccountAccountantEditSchema
>

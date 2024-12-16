import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const BudgetCertificationDetailSchema = zConfig.object({
  id: zConfig.number(),
  budgetPartidaExpense: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
  pg: zConfig.string().trim().min(1).max(100),
  sp: zConfig.string().trim().min(1).max(100),
  py: zConfig.string().trim().min(1).max(100),
  act: zConfig.string().trim().min(1).max(100),
  ubg: zConfig.string().trim().min(1).max(100),
  fte: zConfig.string().trim().min(1).max(100),
  org: zConfig.string().trim().min(1).max(100),
  nPrest: zConfig.string().trim().min(1).max(100),
  amount: zConfig.string().trim().min(1).max(100),
})

const BudgetCertificationDetailCreateExtendSchema =
  BudgetCertificationDetailSchema.extend({})

export const BudgetCertificationDetailCreateSchema =
  BudgetCertificationDetailCreateExtendSchema.pick({
    budgetPartidaExpense: true,
    pg: true,
    sp: true,
    py: true,
    act: true,
    ubg: true,
    fte: true,
    org: true,
    nPrest: true,
    amount: true,
  })

export type BudgetCertificationDetailCreateType = z.infer<
  typeof BudgetCertificationDetailCreateSchema
>

const BudgetCertificationDetailEditExtendSchema =
  BudgetCertificationDetailSchema.extend({})

export const BudgetCertificationDetailEditSchema =
  BudgetCertificationDetailEditExtendSchema.pick({
    budgetPartidaExpense: true,
    pg: true,
    sp: true,
    py: true,
    act: true,
    ubg: true,
    fte: true,
    org: true,
    nPrest: true,
    amount: true,
  })

export type BudgetCertificationDetailEditType = z.infer<
  typeof BudgetCertificationDetailEditSchema
>

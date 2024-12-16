import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const ExpenseExecutionBudgetCommitmentAffectationSchema = zConfig.object(
  {
    id: zConfig.number(),
    budgetPartida: zConfig.object({
      value: zConfig.number(),
      label: zConfig.string(),
    }),
    type: zConfig.string().trim().min(1).max(100),
    ubg: zConfig.string().trim().min(1).max(100),
    fte: zConfig.string().trim().min(1).max(100),
    subTotal0: zConfig.string().trim().min(1).max(100),
    subTotalDifferent0: zConfig.string().trim().min(1).max(100),
    baseImponibleNoRetention: zConfig.string().trim().min(1).max(100),
    baseImponibleRenta: zConfig.string().trim().min(1).max(100),
    codeRetentionRenta: zConfig
      .object({
        value: zConfig.number(),
        label: zConfig.string(),
      })
      .optional(),
    totalRetentionRenta: zConfig.string().trim().min(1).max(100),
    baseImponibleIva: zConfig.string().trim().min(1).max(100),
    codeRetentionIva: zConfig
      .object({
        value: zConfig.number(),
        label: zConfig.string(),
      })
      .optional(),
    totalRetentionIva: zConfig.string().trim().min(1).max(100),
    amount: zConfig.string().trim().min(1).max(100),
  }
)

const ExpenseExecutionBudgetCommitmentAffectationCreateSchemaClient =
  ExpenseExecutionBudgetCommitmentAffectationSchema.extend({})

export const ExpenseExecutionBudgetCommitmentAffectationCreateFormSchemaClient =
  ExpenseExecutionBudgetCommitmentAffectationCreateSchemaClient.pick({
    id: true,
    budgetPartida: true,
    type: true,
    ubg: true,
    fte: true,
    subTotal0: true,
    subTotalDifferent0: true,
    baseImponibleNoRetention: true,
    baseImponibleRenta: true,
    codeRetentionRenta: true,
    totalRetentionRenta: true,
    baseImponibleIva: true,
    codeRetentionIva: true,
    totalRetentionIva: true,
    amount: true,
  })

export type ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient =
  z.infer<
    typeof ExpenseExecutionBudgetCommitmentAffectationCreateFormSchemaClient
  >

const ExpenseExecutionBudgetCommitmentAffectationEditSchemaClient =
  ExpenseExecutionBudgetCommitmentAffectationSchema.extend({})

export const ExpenseExecutionBudgetCommitmentAffectationEditFormSchemaClient =
  ExpenseExecutionBudgetCommitmentAffectationEditSchemaClient.pick({
    budgetPartida: true,
    type: true,
    ubg: true,
    fte: true,
    subTotal0: true,
    subTotalDifferent0: true,
    baseImponibleNoRetention: true,
    baseImponibleRenta: true,
    codeRetentionRenta: true,
    totalRetentionRenta: true,
    baseImponibleIva: true,
    codeRetentionIva: true,
    totalRetentionIva: true,
    amount: true,
  })

export type ExpenseExecutionBudgetCommitmentAffectationEditFormTypeClient =
  z.infer<
    typeof ExpenseExecutionBudgetCommitmentAffectationEditFormSchemaClient
  >

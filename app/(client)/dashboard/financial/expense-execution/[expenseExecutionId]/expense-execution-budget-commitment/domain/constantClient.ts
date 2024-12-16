import { getParamsToBack } from "@/app/(client)/shared/utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"
import { ReadonlyURLSearchParams } from "next/navigation"

const ExpenseExecutionBudgetCommitmentConstCli = {
  pQ: {
    page: "expenseExecutionBudgetCommitmentPage",
    query: "expenseExecutionBudgetCommitmentQuery",
  },
  persistWhenClean: {},
  getPerst: () => [ExpenseExecutionBudgetCommitmentConstCli.pQ],
  listUrl: ({ expenseExecutionId }: { expenseExecutionId: string | number }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/expense-execution-budget-commitment/list`,
  createUrl: ({
    expenseExecutionId,
  }: {
    expenseExecutionId: string | number
  }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/expense-execution-budget-commitment/create`,
  editUrl: ({
    expenseExecutionId,
    expenseExecutionBudgetCommitmentId,
  }: {
    expenseExecutionId: string | number
    expenseExecutionBudgetCommitmentId: string | number
  }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/expense-execution-budget-commitment/${expenseExecutionBudgetCommitmentId}/edit`,
  deleteUrl: ({
    expenseExecutionId,
    expenseExecutionBudgetCommitmentId,
  }: {
    expenseExecutionId: string | number
    expenseExecutionBudgetCommitmentId: string | number
  }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/expense-execution-budget-commitment/${expenseExecutionBudgetCommitmentId}/delete`,
}

export default ExpenseExecutionBudgetCommitmentConstCli

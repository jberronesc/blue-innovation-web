import { TypeStructure } from "@utils/types/TypeStructure"

const ExpenseExecutionConstCli = {
  pQ: {
    page: "page",
    query: "query",
  },
  persistWhenClean: {},
  getPerst: () => [ExpenseExecutionConstCli.pQ],
  listUrl: ({}) => "/dashboard/financial/expense-execution/list",
  createUrl: ({}) => "/dashboard/financial/expense-execution/create",
  editUrl: ({ expenseExecutionId }: { expenseExecutionId: string | number }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/edit`,
  deleteUrl: ({
    expenseExecutionId,
  }: {
    expenseExecutionId: string | number
  }) => `/dashboard/financial/expense-execution/${expenseExecutionId}/delete`,
  devengadoUrl: ({
    expenseExecutionId,
  }: {
    expenseExecutionId: string | number
  }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/devengado`,
  expenseExecutionBudgetCommitmentUrl: ({
    expenseExecutionId,
  }: {
    expenseExecutionId: string | number
  }) =>
    `/dashboard/financial/expense-execution/${expenseExecutionId}/expense-execution-budget-commitment/list`,
}

export default ExpenseExecutionConstCli

export const ExpenseExecutionClassExpense: { [x: string]: TypeStructure } = {
  SALARIES: {
    label: "SUELDOS",
    value: "SALARIES",
    color: "primary",
  },
  ASSETS_AND_INVENTORY: {
    label: "BIENES Y EXISTENCIAS",
    value: "ASSETS_AND_INVENTORY",
    color: "primary",
  },
  OTHER_EXPENSES: {
    label: "OTROS GASTOS",
    value: "OTHER_EXPENSES",
    color: "primary",
  },
}

export const ExpenseExecutionClassExpenseOptions: TypeStructure[] = [
  ExpenseExecutionClassExpense.SALARIES,
  ExpenseExecutionClassExpense.ASSETS_AND_INVENTORY,
  ExpenseExecutionClassExpense.OTHER_EXPENSES,
]

export const ExpenseExecutionStatus: { [x: string]: TypeStructure } = {
  EXECUTION: {
    label: "EJECUCION",
    value: "EXECUTION",
    color: "primary",
  },
  DEVENGADO: {
    label: "DEVENGADO",
    value: "DEVENGADO",
    color: "primary",
  },
  REVERSED: {
    label: "REVERSADO",
    value: "REVERSED",
    color: "primary",
  },
  REVERSE: {
    label: "REVERSO",
    value: "REVERSE",
    color: "primary",
  },
}

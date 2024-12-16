import { TypeStructure } from "@utils/types/TypeStructure"

const IncomeExecutionConstCli = {
  pQ: {
    page: "page",
    query: "query",
  },
  persistWhenClean: {},
  getPerst: () => [IncomeExecutionConstCli.pQ],
  listUrl: ({}) => "/dashboard/financial/income-execution/list",
  createUrl: ({}) => "/dashboard/financial/income-execution/create",
  editUrl: ({ incomeExecutionId }: { incomeExecutionId: string | number }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/edit`,
  deleteUrl: ({ incomeExecutionId }: { incomeExecutionId: string | number }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/delete`,
  devengadoUrl: ({
    incomeExecutionId,
  }: {
    incomeExecutionId: string | number
  }) => `/dashboard/financial/income-execution/${incomeExecutionId}/devengado`,
  incomeExecutionDetailUrl: ({
    incomeExecutionId,
  }: {
    incomeExecutionId: string | number
  }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/income-affectation/list`,
}

export default IncomeExecutionConstCli

export const IncomeExecutionStatus: { [x: string]: TypeStructure } = {
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

const IncomeAffectationConstCli = {
  pQ: {
    page: "incomeAffectationPage",
    query: "incomeAffectationQuery",
  },
  persistWhenClean: {},
  getPerst: () => [IncomeAffectationConstCli.pQ],
  listUrl: ({ incomeExecutionId }: { incomeExecutionId: string | number }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/income-affectation/list`,
  createUrl: ({ incomeExecutionId }: { incomeExecutionId: string | number }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/income-affectation/create`,
  editUrl: ({
    incomeExecutionId,
    incomeAffectationId,
  }: {
    incomeExecutionId: string | number
    incomeAffectationId: string | number
  }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/income-affectation/${incomeAffectationId}/edit`,
  deleteUrl: ({
    incomeExecutionId,
    incomeAffectationId,
  }: {
    incomeExecutionId: string | number
    incomeAffectationId: string | number
  }) =>
    `/dashboard/financial/income-execution/${incomeExecutionId}/income-affectation/${incomeAffectationId}/delete`,
}

export default IncomeAffectationConstCli

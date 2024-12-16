const BudgetCertificationDetailConst = {
  pQ: {
    page: { key: "bCDPage", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetCertificationDetailConst.pQ],
  listUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/budget-certification-detail/list`,
  createUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/budget-certification-detail/create`,
  editUrl: ({
    budgetCertificationId,
    budgetCertificationDetailId,
  }: {
    budgetCertificationId: string | number
    budgetCertificationDetailId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/budget-certification-detail/${budgetCertificationDetailId}/edit`,
  deleteUrl: ({
    budgetCertificationId,
    budgetCertificationDetailId,
  }: {
    budgetCertificationId: string | number
    budgetCertificationDetailId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/budget-certification-detail/${budgetCertificationDetailId}/delete`,
}

export default BudgetCertificationDetailConst

import { TypeStructure } from "@utils/types/TypeStructure"

const BudgetCertificationConst = {
  pQ: {
    page: { key: "page", type: "text" },
    sequence: { key: "sequence", type: "text" },
    dateStart: { key: "dateStart", type: "text" },
    dateEnd: { key: "dateEnd", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetCertificationConst.pQ],
  listUrl: ({}) => "/dashboard/budget/budget-certification/list",
  createUrl: ({}) => "/dashboard/budget/budget-certification/create",
  editUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) => `/dashboard/budget/budget-certification/${budgetCertificationId}/edit`,
  deleteUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/delete`,
  reviewedUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/reviewed`,
  approvedUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/approved`,
  budgetCertificationDetailUrl: ({
    budgetCertificationId,
  }: {
    budgetCertificationId: string | number
  }) =>
    `/dashboard/budget/budget-certification/${budgetCertificationId}/budget-certification-detail/list`,
}

export default BudgetCertificationConst

export const BudgetCertificationStatus: { [x: string]: TypeStructure } = {
  ASSIGNED: {
    label: "ASIGNADO",
    value: "ASSIGNED",
    color: "primary",
  },
  REVIEWED: {
    label: "REVISADO",
    value: "REVIEWED",
    color: "primary",
  },
  APPROVED: {
    label: "APROVADO",
    value: "APPROVED",
    color: "primary",
  },
  LIQUIDATED: {
    label: "LIQUIDADO",
    value: "LIQUIDATED",
    color: "primary",
  },
  ANULLED: {
    label: "ANULADO",
    value: "ANULLED",
    color: "primary",
  },
  LIQUIDATION: {
    label: "LIQUIDACION",
    value: "LIQUIDATION",
    color: "primary",
  },
  LIQUIDATION_ANULLED: {
    label: "LIQUIDACION ANULADO",
    value: "LIQUIDATION_ANULLED",
    color: "primary",
  },
}

import { getParamsToBack } from "@utils/back-params/backParams"
import { TypeStructure } from "@utils/types/TypeStructure"
import { ParamBack } from "@utils/types/url/ParamBack"

const BudgetConst = {
  pQ: {
    page: { key: "page", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetConst.pQ],
  listUrl: ({}) => "/dashboard/budget/budget/list",
  createUrl: ({}) => "/dashboard/budget/budget/create",
  deleteUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/delete`,
  reviewedUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/reviewed`,
  approvedUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/approved`,
  budgetDetailIncomeListUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-income/list`,
  budgetDetailExpenseListUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-expense/list`,
}

export default BudgetConst

export const BudgetStatus: { [x: string]: TypeStructure } = {
  ASSIGNED: {
    label: "ASIGNADO",
    value: "ASSIGNED",
    color: "primary",
  },
  REVIEWED: {
    label: "REVISADO",
    value: "REVIEWED",
    color: "secondary",
  },
  APPROVED: {
    label: "APROVADO",
    value: "APPROVED",
    color: "success",
  },
  LIQUIDATED: {
    label: "LIQUIDADO",
    value: "LIQUIDATED",
    color: "default",
  },
  ANULLED: {
    label: "ANULADO",
    value: "ANULLED",
    color: "default",
  },
  LIQUIDATION: {
    label: "LIQUIDACION",
    value: "LIQUIDATION",
    color: "default",
  },
  LIQUIDATION_ANULLED: {
    label: "LIQUIDACION ANULADO",
    value: "LIQUIDATION_ANULLED",
    color: "default",
  },
}

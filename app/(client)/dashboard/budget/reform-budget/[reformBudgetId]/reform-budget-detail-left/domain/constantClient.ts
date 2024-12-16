import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const ReformBudgetDetailLeftConst = {
  pQ: {
    page: { key: "reformBudgetDetailLeftPage", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [ReformBudgetDetailLeftConst.pQ],
  listUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-left/list`,
  createUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-left/create`,
  editUrl: ({
    reformBudgetId,
    reformBudgetDetailLeftId,
  }: {
    reformBudgetId: string | number
    reformBudgetDetailLeftId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-left/${reformBudgetDetailLeftId}/edit`,
  deleteUrl: ({
    reformBudgetId,
    reformBudgetDetailLeftId,
  }: {
    reformBudgetId: string | number
    reformBudgetDetailLeftId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-left/${reformBudgetDetailLeftId}/delete`,
}

export default ReformBudgetDetailLeftConst

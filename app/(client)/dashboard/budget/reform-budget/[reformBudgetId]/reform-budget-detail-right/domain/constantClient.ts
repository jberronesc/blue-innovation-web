import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const ReformBudgetDetailRightConst = {
  pQ: {
    page: { key: "reformBudgetDetailRightPage", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [ReformBudgetDetailRightConst.pQ],
  listUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-right/list`,
  createUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-right/create`,
  editUrl: ({
    reformBudgetId,
    reformBudgetDetailRightId,
  }: {
    reformBudgetId: string | number
    reformBudgetDetailRightId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-right/${reformBudgetDetailRightId}/edit`,
  deleteUrl: ({
    reformBudgetId,
    reformBudgetDetailRightId,
  }: {
    reformBudgetId: string | number
    reformBudgetDetailRightId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-right/${reformBudgetDetailRightId}/delete`,
}

export default ReformBudgetDetailRightConst

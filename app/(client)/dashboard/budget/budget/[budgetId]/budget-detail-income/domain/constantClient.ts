import BudgetConst from "@budget/budget/domain/constantClient"
import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const BudgetDetailIncomeConst = {
  pQ: {
    page: { key: "budgetDetailIncomePage", type: "text" },
    query: { key: "budgetDetailIncomeQuery", type: "text" },
    typePertain: { key: "budgetDetailIncomeTypePertain", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetConst.pQ, BudgetDetailIncomeConst.pQ],
  listUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-income/list`,
  editUrl: ({
    budgetId,
    budgetDetailIncomeId,
  }: {
    budgetId: string | number
    budgetDetailIncomeId: string | number
  }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-income/${budgetDetailIncomeId}/edit`,
}

export default BudgetDetailIncomeConst

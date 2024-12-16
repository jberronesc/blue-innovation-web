import BudgetConst from "@budget/budget/domain/constantClient"
import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const BudgetDetailExpenseConst = {
  pQ: {
    page: { key: "budgetDetailExpensePage", type: "text" },
    query: { key: "budgetDetailExpenseQuery", type: "text" },
    typePertain: { key: "budgetDetailExpenseTypePertain", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetConst.pQ, BudgetDetailExpenseConst.pQ],
  listUrl: ({ budgetId }: { budgetId: string | number }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-expense/list`,
  editUrl: ({
    budgetId,
    budgetDetailExpenseId,
  }: {
    budgetId: string | number
    budgetDetailExpenseId: string | number
  }) =>
    `/dashboard/budget/budget/${budgetId}/budget-detail-expense/${budgetDetailExpenseId}/edit`,
}

export default BudgetDetailExpenseConst

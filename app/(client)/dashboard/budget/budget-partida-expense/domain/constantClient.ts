import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const BudgetPartidaExpenseConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
    partidaInit: { key: "partidaInit", type: "text" },
    typePertain: { key: "typePertain", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetPartidaExpenseConst.pQ],
  listUrl: ({}) => "/dashboard/budget/budget-partida-expense/list",
  createUrl: ({}) => "/dashboard/budget/budget-partida-expense/create",
  editUrl: ({
    budgetPartidaExpenseId,
  }: {
    budgetPartidaExpenseId: string | number
  }) =>
    `/dashboard/budget/budget-partida-expense/${budgetPartidaExpenseId}/edit`,
}

export default BudgetPartidaExpenseConst

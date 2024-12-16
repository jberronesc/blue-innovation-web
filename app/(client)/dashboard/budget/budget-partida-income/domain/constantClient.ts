import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const BudgetPartidaIncomeConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
    partidaInit: { key: "partidaInit", type: "text" },
    typePertain: { key: "typePertain", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [BudgetPartidaIncomeConst.pQ],
  listUrl: ({}) => "/dashboard/budget/budget-partida-income/list",
  createUrl: ({}) => "/dashboard/budget/budget-partida-income/create",
  editUrl: ({
    budgetPartidaIncomeId,
  }: {
    budgetPartidaIncomeId: string | number
  }) => `/dashboard/budget/budget-partida-income/${budgetPartidaIncomeId}/edit`,
}

export default BudgetPartidaIncomeConst

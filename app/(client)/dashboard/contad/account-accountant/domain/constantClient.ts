import { getParamsToBack } from "@utils/back-params/backParams"
import { TypeStructure } from "@utils/types/TypeStructure"
import { ParamBack } from "@utils/types/url/ParamBack"

const AccountAccountantConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
    nature: { key: "nature", type: "optionText" },
    type: { key: "type", type: "optionText" },
    typePertain: { key: "typePertain", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [AccountAccountantConst.pQ],
  listUrl: ({}) => "/dashboard/contad/account-accountant/list",
  createUrl: ({}) => "/dashboard/contad/account-accountant/create",
  editUrl: ({
    accountAccountantId,
  }: {
    accountAccountantId: string | number
  }) => `/dashboard/contad/account-accountant/${accountAccountantId}/edit`,
}

export default AccountAccountantConst

export const AccountAccountantType: { [x: string]: TypeStructure } = {
  ASSET: {
    label: "ACTIVOS",
    value: "ASSET",
    color: "primary",
  },
  LIABILITY: {
    label: "PASIVOS",
    value: "LIABILITY",
    color: "primary",
  },
  EQUITY: {
    label: "PATRIMONIO",
    value: "EQUITY",
    color: "primary",
  },
  INCOME: {
    label: "INGRESOS",
    value: "INCOME",
    color: "primary",
  },
  COST: {
    label: "COSTOS",
    value: "COST",
    color: "primary",
  },
  EXPENSE: {
    label: "GASTOS",
    value: "EXPENSE",
    color: "primary",
  },
  ORDER: {
    label: "ORDEN",
    value: "ORDER",
    color: "primary",
  },
}

export const AccountAccountantTypeOptions: TypeStructure[] = [
  AccountAccountantType.ASSET,
  AccountAccountantType.LIABILITY,
  AccountAccountantType.EQUITY,
  AccountAccountantType.INCOME,
  AccountAccountantType.COST,
  AccountAccountantType.EXPENSE,
  AccountAccountantType.ORDER,
]

export const AccountAccountantTypePertain: { [x: string]: TypeStructure } = {
  TITLE: {
    label: "TITULO",
    value: "TITLE",
    color: "secondary",
  },
  GROUP: {
    label: "GRUPO",
    value: "GROUP",
    color: "secondary",
  },
  SUBGROUP: {
    label: "SUB GRUPO",
    value: "SUBGROUP",
    color: "secondary",
  },
  ACCOUNT_LEVEL_1: {
    label: "CUENTA NIVEL 1",
    value: "ACCOUNT_LEVEL_1",
    color: "secondary",
  },
  ACCOUNT_LEVEL_2: {
    label: "CUENTA NIVEL 2",
    value: "ACCOUNT_LEVEL_2",
    color: "secondary",
  },
  ACCOUNT_LEVEL_3: {
    label: "CUENTA NIVEL 3",
    value: "ACCOUNT_LEVEL_3",
    color: "secondary",
  },
}

export const AccountAccountantTypePertainOptions: TypeStructure[] = [
  AccountAccountantTypePertain.TITLE,
  AccountAccountantTypePertain.GROUP,
  AccountAccountantTypePertain.SUBGROUP,
  AccountAccountantTypePertain.ACCOUNT_LEVEL_1,
  AccountAccountantTypePertain.ACCOUNT_LEVEL_2,
  AccountAccountantTypePertain.ACCOUNT_LEVEL_3,
]

export const AccountAccountantNature: { [x: string]: TypeStructure } = {
  DEBIT: {
    label: "DEUDORA",
    value: "DEBIT",
    color: "primary",
  },
  CREDIT: {
    label: "ACREEDORA",
    value: "CREDIT",
    color: "primary",
  },
}

export const AccountAccountantNatureOptions: TypeStructure[] = [
  AccountAccountantNature.DEBIT,
  AccountAccountantNature.CREDIT,
]

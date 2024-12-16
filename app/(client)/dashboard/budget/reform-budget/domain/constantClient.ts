import { getParamsToBack } from "@utils/back-params/backParams"
import { TypeStructure } from "@utils/types/TypeStructure"
import { ParamBack } from "@utils/types/url/ParamBack"
import { ZodConstant } from "@utils/zod/zod.constant"

const ReformBudgetConst = {
  pQ: {
    page: { key: "page", type: "text" },
    sequence: { key: "sequence", type: "text" },
    dateStart: { key: "dateStart", type: "text" },
    dateEnd: { key: "dateEnd", type: "text" },
    classModification: { key: "classModification", type: "optionText" },
  },
  persistWhenClean: {},
  getPerst: () => [ReformBudgetConst.pQ],
  listUrl: ({}) => "/dashboard/budget/reform-budget/list",
  createUrl: ({}) => "/dashboard/budget/reform-budget/create",
  editUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/edit`,
  deleteUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/delete`,
  reviewedUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reviewed`,
  approvedUrl: ({ reformBudgetId }: { reformBudgetId: string | number }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/approved`,
  reformBudgetDetailLeftUrl: ({
    reformBudgetId,
  }: {
    reformBudgetId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-left/list`,
  reformBudgetDetailRightUrl: ({
    reformBudgetId,
  }: {
    reformBudgetId: string | number
  }) =>
    `/dashboard/budget/reform-budget/${reformBudgetId}/reform-budget-detail-right/list`,
}

export default ReformBudgetConst

export const ReformBudgetClassModification: { [x: string]: TypeStructure } = {
  EXTENSION: {
    label: "EXTENSION",
    value: "EXTENSION",
    color: "primary",
  },
  DECREASE: {
    label: "DISMINUIR",
    value: "DECREASE",
    color: "primary",
  },
  ORDER: {
    label: "ORDEN",
    value: "ORDER",
    color: "primary",
  },
  REFGROUPINCOME: {
    label: "REF GRUPO INGRESO",
    value: "REFGROUPINCOME",
    color: "primary",
  },
  REFGROUPEXPENSE: {
    label: "REF GRUPO GASTO",
    value: "REFGROUPEXPENSE",
    color: "primary",
  },
  TRANSITEMINCOME: {
    label: "TRANS ITEM INGRESO",
    value: "TRANSITEMINCOME",
    color: "primary",
  },
  TRANSITEMEXPENSE: {
    label: "TRANS ITEM GASTO",
    value: "TRANSITEMEXPENSE",
    color: "primary",
  },
}

export const ReformBudgetClassModificationOptions: TypeStructure[] = [
  ReformBudgetClassModification.EXTENSION,
  ReformBudgetClassModification.DECREASE,
  ReformBudgetClassModification.ORDER,
  ReformBudgetClassModification.REFGROUPINCOME,
  ReformBudgetClassModification.REFGROUPEXPENSE,
  ReformBudgetClassModification.TRANSITEMINCOME,
  ReformBudgetClassModification.TRANSITEMEXPENSE,
]

export const ReformBudgetClassModificationOptionsEmpty = [
  ZodConstant.optionStringEmpty,
  ...ReformBudgetClassModificationOptions,
]

export const ReformBudgetStatus: { [x: string]: TypeStructure } = {
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

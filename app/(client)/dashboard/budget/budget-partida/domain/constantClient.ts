import { TypeStructure } from "@utils/types/TypeStructure"
import { ZodConstant } from "@utils/zod/zod.constant"

export const BudgetPartidaTypePertain: { [x: string]: TypeStructure } = {
  NATURE: {
    label: "NATURALEZA",
    value: "NATURE",
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
  ITEM: {
    label: "ITEM",
    value: "ITEM",
    color: "secondary",
  },
}

export const BudgetPartidaTypePertainOptions: TypeStructure[] = [
  BudgetPartidaTypePertain.NATURE,
  BudgetPartidaTypePertain.GROUP,
  BudgetPartidaTypePertain.SUBGROUP,
  BudgetPartidaTypePertain.ITEM,
]

export const BudgetPartidaTypePertainOptionsEmpty = [
  ZodConstant.optionStringEmpty,
  ...BudgetPartidaTypePertainOptions,
]

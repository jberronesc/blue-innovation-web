import { getParamsToBack } from "@utils/back-params/backParams"
import { TypeStructure } from "@utils/types/TypeStructure"
import { ParamBack } from "@utils/types/url/ParamBack"

const ExerciseConst = {
  pQ: {
    page: { key: "page", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [ExerciseConst.pQ],
  listUrl: ({}) => "/dashboard/contad/exercise/list",

  createUrl: ({}) => "/dashboard/contad/exercise/create",
}

export default ExerciseConst

export const ExerciseStatus: { [x: string]: TypeStructure } = {
  CURRENT: {
    label: "ACTUAL",
    value: "CURRENT",
    color: "primary",
  },
  IS_NEXT: {
    label: "ES SIGUIENTE",
    value: "IS_NEXT",
    color: "secondary",
  },
  IS_CLOSE: {
    label: "ES CERRADO",
    value: "IS_CLOSE",
    color: "success",
  },
}

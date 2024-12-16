import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const ModuleConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
    menu: { key: "menu", type: "optionNumber" },
  },
  persistWhenClean: {},
  getPerst: () => [ModuleConst.pQ],
  listUrl: ({}) => "/dashboard/security/module/list",
  createUrl: ({}) => "/dashboard/security/module/create",
  editUrl: ({ moduleId }: { moduleId: string | number }) =>
    `/dashboard/security/module/${moduleId}/edit`,
  deleteUrl: ({ moduleId }: { moduleId: string | number }) =>
    `/dashboard/security/module/${moduleId}/delete`,
}

export default ModuleConst

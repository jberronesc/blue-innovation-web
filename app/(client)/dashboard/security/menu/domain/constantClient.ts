import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const MenuConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [MenuConst.pQ],
  listUrl: ({}) => "/dashboard/security/menu/list",
  createUrl: ({}) => "/dashboard/security/menu/create",
  editUrl: ({ menuId }: { menuId: string | number }) =>
    `/dashboard/security/menu/${menuId}/edit`,
  deleteUrl: ({ menuId }: { menuId: string | number }) =>
    `/dashboard/security/menu/${menuId}/delete`,
}

export default MenuConst

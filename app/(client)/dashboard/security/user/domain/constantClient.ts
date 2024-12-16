import { getParamsToBack } from "@utils/back-params/backParams"
import { ParamBack } from "@utils/types/url/ParamBack"

const UserConst = {
  pQ: {
    page: { key: "page", type: "text" },
    query: { key: "query", type: "text" },
    dateStart: { key: "dateStart", type: "text" },
    dateEnd: { key: "dateEnd", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [UserConst.pQ],
  listUrl: ({}) => "/dashboard/security/user/list",
  createUrl: ({}) => "/dashboard/security/user/create",
  editUrl: ({ userId }: { userId: string | number }) =>
    `/dashboard/security/user/${userId.toString()}/edit`,
}

export default UserConst

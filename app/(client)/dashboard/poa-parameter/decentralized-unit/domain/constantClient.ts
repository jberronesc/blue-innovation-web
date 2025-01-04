const DecentralizedUnitConst = {
  pQ: {
    page: { key: "page", type: "text" }, // siempre
    query: { key: "query", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [DecentralizedUnitConst.pQ],
  listUrl: ({}) => "/dashboard/poa-parameter/decentralized-unit/list",
  createUrl: ({}) => "/dashboard/poa-parameter/decentralized-unit/create",
  editUrl: ({
    decentralizedUnitId,
  }: {
    decentralizedUnitId: string | number;
  }) =>
    `/dashboard/poa-parameter/decentralized-unit/${decentralizedUnitId}/edit`,
  deleteUrl: ({
    decentralizedUnitId,
  }: {
    decentralizedUnitId: string | number;
  }) =>
    `/dashboard/poa-parameter/decentralized-unit/${decentralizedUnitId}/delete`,
};

export default DecentralizedUnitConst;

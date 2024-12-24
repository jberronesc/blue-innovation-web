const BodyConst = {
  pQ: {
    page: { key: "page", type: "text" }, // siempre
    query: { key: "query", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [BodyConst.pQ],
  listUrl: ({}) => "/dashboard/poa-parameter/body/list",
  createUrl: ({}) => "/dashboard/poa-parameter/body/create",
  editUrl: ({ bodyId }: { bodyId: string | number }) =>
    `/dashboard/poa-parameter/body/${bodyId}/edit`,
  deleteUrl: ({ bodyId }: { bodyId: string | number }) =>
    `/dashboard/poa-parameter/body/${bodyId}/delete`,
};

export default BodyConst;

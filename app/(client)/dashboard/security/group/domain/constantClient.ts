const GroupConst = {
  pQ: {
    page: { key: "page", type: "text" },
  },
  persistWhenClean: {},
  getPerst: () => [GroupConst.pQ],
  listUrl: ({}) => "/dashboard/security/group/list",
  createUrl: ({}) => "/dashboard/security/group/create",
  editUrl: ({ groupId }: { groupId: string | number }) =>
    `/dashboard/security/group/${groupId.toString()}/edit`,
  deleteUrl: ({ groupId }: { groupId: string | number }) =>
    `/dashboard/security/group/${groupId.toString()}/delete`,
};

export default GroupConst;

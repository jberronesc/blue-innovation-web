import PaginationConst from "./constants"

const getInfoFilterPagination = ({
  page,
  take = PaginationConst.ITEMS_PER_PAGE,
}: {
  page: number
  take?: number
}): {
  take: number
  skip: number
} => {
  const skip: number = page == 1 ? 0 : (page - 1) * take

  return {
    take,
    skip: skip === 0 ? skip : skip,
  }
}

const getInfoPagination = ({
  count,
  take = PaginationConst.ITEMS_PER_PAGE,
}: {
  count: number
  take?: number
}): {
  total: number
  totalPages: number
} => ({
  total: count,
  totalPages: Math.ceil(Number(count) / take),
})

export { getInfoFilterPagination, getInfoPagination }

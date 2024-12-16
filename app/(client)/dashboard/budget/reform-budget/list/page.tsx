import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import ReformBudgetConst from "../domain/constantClient"
import ReformBudgetSearch from "./components/Search"
import ReformBudgetTable from "./components/Table"
import { Pagination } from "@component/pagination"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = ReformBudgetConst

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const sequence = searchParams?.[constant.pQ.sequence.key] || ""
  const dateStart = searchParams?.[constant.pQ.dateStart.key] || ""
  const dateEnd = searchParams?.[constant.pQ.dateEnd.key] || ""
  const classModification =
    searchParams?.[constant.pQ.classModification.key] || ""
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/budget/v1/reform-budgets/list",
      shearhParams: {
        page: page.toString(),
        ...(sequence && { sequence }),
        ...(dateStart && { dateStart }),
        ...(dateEnd && { dateEnd }),
        ...(classModification && { classModification }),
      },
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Reformas prosupuestarias"
      info={<ReformBudgetSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <ReformBudgetTable registers={registersData.results} />
    </ListBase>
  )
}

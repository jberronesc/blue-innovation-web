import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import BudgetConst from "../domain/constantClient"
import BudgetSearch from "./components/Search"
import BudgetTable from "./components/Table"
import { Pagination } from "@component/pagination"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = BudgetConst

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/budget/v1/budgets/list",
      shearhParams: {
        page: page.toString(),
      },
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Presupuestos"
      info={<BudgetSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <BudgetTable registers={registersData.results} />
    </ListBase>
  )
}

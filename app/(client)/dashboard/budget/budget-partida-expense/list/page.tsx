import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import BudgetPartidaExpenseConst from "../domain/constantClient"
import BudgetPartidaExpenseSearch from "./components/Search"
import BudgetPartidaExpenseTable from "./components/Table"
import { Pagination } from "@component/pagination"

const constant = BudgetPartidaExpenseConst

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const query = searchParams?.[constant.pQ.query.key] || ""
  const partidaInit = searchParams?.[constant.pQ.partidaInit.key] || ""
  const typePertain = searchParams?.[constant.pQ.typePertain.key] || ""
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/budget/v1/budget-partida-expenses/list",
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
        ...(partidaInit && { partidaInit }),
        ...(typePertain && { typePertain }),
      },
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Partidas presupuestarias de gastos"
      info={<BudgetPartidaExpenseSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <BudgetPartidaExpenseTable registers={registersData.results} />
    </ListBase>
  )
}

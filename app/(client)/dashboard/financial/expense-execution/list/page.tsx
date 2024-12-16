import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import { Pagination } from "@nextui-org/react"
import ExpenseExecutionConstCli from "../domain/constantClient"
import ExpenseExecutionSearch from "./components/search"
import ExpenseExecutionTable from "./components/table"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const query = searchParams?.[ExpenseExecutionConstCli.pQ.query] || ""
  const page = Number(searchParams?.[ExpenseExecutionConstCli.pQ.page]) || 1
  const provokeBack = randomUUID().toString()

  const shearhParams = () => {
    let result: { [x: string]: string } = {
      page: page.toString(),
    }
    if (query) result["query"] = query
    return result
  }

  const [response] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/v1/expense-executions",
      shearhParams: shearhParams(),
    }).exec(),
  ])

  const responseJson = response.isRight()
    ? response.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Ejecuciones gastos"
      info={<ExpenseExecutionSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+responseJson.meta.itemCount}
          pageName={ExpenseExecutionConstCli.pQ.page}
        />
      }
    >
      <ExpenseExecutionTable registers={responseJson.data} />
    </ListBase>
  )
}

import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { Breadcrumbs, Pagination } from "@nextui-org/react"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import IncomeAffectationConstCli from "../domain/constantClient"
import IncomeAffectationSearch from "./components/search"
import IncomeAffectationTable from "./components/table"

export default async function Page({
  params,
  searchParams,
}: {
  params: { incomeExecutionId: string }
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const query = searchParams?.[IncomeAffectationConstCli.pQ.query] || ""
  const page = Number(searchParams?.[IncomeAffectationConstCli.pQ.page]) || 1
  const provokeBack = randomUUID().toString()

  const shearhParams = () => {
    let result: { [x: string]: string } = {
      page: page.toString(),
    }
    if (query) result["query"] = query
    return result
  }

  const [response, incomeExecutionRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-affectations/income-executions/${params.incomeExecutionId}`,
      shearhParams: shearhParams(),
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-executions/${params.incomeExecutionId}`,
    }).exec(),
  ])

  const responseJson: any = response.getRight() ? response.getRight().data : {}
  const incomeExecution: IncomeExecutionGetEntity = incomeExecutionRes.isRight()
    ? (incomeExecutionRes.getRight().data as IncomeExecutionGetEntity)
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Afectacion de ingresos"
      info={
        <IncomeAffectationSearch
          provokeBack={provokeBack}
          params={params}
          incomeExecution={incomeExecution}
        />
      }
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={IncomeExecutionConstCli.listUrl({})}
              persists={IncomeExecutionConstCli.getPerst()}
            />
          }
        />
      }
      pagination={
        <Pagination
          itemCount={+responseJson.meta.itemCount}
          pageName={IncomeAffectationConstCli.pQ.page}
        />
      }
    >
      <IncomeAffectationTable
        registers={responseJson.data}
        params={params}
        incomeExecution={incomeExecution}
      />
    </ListBase>
  )
}

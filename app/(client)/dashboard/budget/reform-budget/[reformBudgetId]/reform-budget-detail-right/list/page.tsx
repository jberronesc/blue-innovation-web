import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import ReformBudgetDetailRightConst from "../domain/constantClient"
import ReformBudgetDetailRightSearch from "./components/Search"
import ReformBudgetDetailRightTable from "./components/Table"
import { Pagination } from "@component/pagination"
import ReformBudgetConst from "@budget/reform-budget/domain/constantClient"

const constant = ReformBudgetDetailRightConst

export default async function Page({
  params,
  searchParams,
}: {
  params: { reformBudgetId: string }
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const provokeBack = randomUUID().toString()

  const [regitersRes, reformBudgetRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/reform-budget-detail-rights/list`,
      shearhParams: {
        page: page.toString(),
      },
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/find`,
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()
  const reformBudget = reformBudgetRes.isRight()
    ? (reformBudgetRes.getRight().data as ReformBudgetFindEntity)
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Reforma presupuestaria detalle derecha"
      info={
        <ReformBudgetDetailRightSearch
          provokeBack={provokeBack}
          params={params}
          reformBudget={reformBudget}
        />
      }
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={ReformBudgetConst.listUrl({ ...params })}
              persists={ReformBudgetConst.getPerst()}
            />
          }
        />
      }
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <ReformBudgetDetailRightTable
        registers={registersData.results}
        params={params}
        reformBudget={reformBudget}
      />
    </ListBase>
  )
}

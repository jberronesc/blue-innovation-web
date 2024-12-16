import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetConst from "@budget/budget/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import BudgetDetailExpenseConst from "../domain/constantClient"
import BudgetDetailExpenseSearch from "./components/Search"
import BudgetDetailExpenseTable from "./components/Table"
import { Pagination } from "@component/pagination"

export const dynamic = "force-dynamic"
export const revalidate = 0

const constant = BudgetDetailExpenseConst

export default async function Page({
  params,
  searchParams,
}: {
  params: { budgetId: string }
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const query = searchParams?.[constant.pQ.query.key] || ""
  const typePertain = searchParams?.[constant.pQ.typePertain.key] || ""
  const provokeBack = randomUUID().toString()

  const [regitersRes, budgetRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budgets/${params.budgetId}/budget-detail-expenses/list`,
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
        ...(typePertain && { typePertain }),
      },
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budgets/${params.budgetId}/find`,
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()
  const budget: any = budgetRes.isRight()
    ? budgetRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Presupuesto detaille gastos"
      info={
        <BudgetDetailExpenseSearch provokeBack={provokeBack} params={params} />
      }
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={BudgetConst.listUrl({})}
              persists={BudgetConst.getPerst()}
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
      <BudgetDetailExpenseTable
        registers={registersData.results}
        params={params}
        budget={budget}
      />
    </ListBase>
  )
}

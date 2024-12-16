import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetConst from "@budget/budget/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import BudgetDetailIncomeConst from "../domain/constantClient"
import BudgetDetailIncomeSearch from "./components/Search"
import BudgetDetailIncomeTable from "./components/Table"
import { Pagination } from "@component/pagination"

const constant = BudgetDetailIncomeConst

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
      url: `/budget/v1/budgets/${params.budgetId}/budget-detail-incomes/list`,
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
      title="Presupuesto detalle de ingresos"
      info={
        <BudgetDetailIncomeSearch provokeBack={provokeBack} params={params} />
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
      <BudgetDetailIncomeTable
        registers={registersData.results}
        budget={budget}
        params={params}
      />
    </ListBase>
  )
}

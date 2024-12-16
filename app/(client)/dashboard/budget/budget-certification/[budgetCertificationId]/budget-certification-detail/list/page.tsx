import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import BudgetCertificationDetailConst from "../domain/constantClient"
import BudgetCertificationDetailSearch from "./components/Search"
import BudgetCertificationDetailTable from "./components/Table"
import { Pagination } from "@component/pagination"

const constant = BudgetCertificationDetailConst

export default async function Page({
  params,
  searchParams,
}: {
  params: { budgetCertificationId: string }
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const provokeBack = randomUUID().toString()

  const [regitersRes, budgetCertificationRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/budget-certification-details/list`,
      shearhParams: {
        page: page.toString(),
      },
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/find`,
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()
  const budgetCertification = budgetCertificationRes.isRight()
    ? (budgetCertificationRes.getRight().data as BudgetCertificationFindEntity)
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Compromiso presupuestaros detalle"
      info={
        <BudgetCertificationDetailSearch
          provokeBack={provokeBack}
          params={params}
          budgetCertification={budgetCertification}
        />
      }
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={BudgetCertificationConst.listUrl({})}
              persists={BudgetCertificationConst.getPerst()}
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
      <BudgetCertificationDetailTable
        registers={registersData.results}
        params={params}
        budgetCertification={budgetCertification}
      />
    </ListBase>
  )
}

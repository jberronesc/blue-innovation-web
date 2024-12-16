import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import BudgetCertificationConst from "../domain/constantClient"
import BudgetCertificationSearch from "./components/Search"
import BudgetCertificationTable from "./components/Table"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { Pagination } from "@component/pagination"

const constant = BudgetCertificationConst

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
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/budget/v1/budget-certifications/list",
      shearhParams: {
        page: page.toString(),
        ...(sequence && { sequence }),
        ...(dateStart && { dateStart }),
        ...(dateEnd && { dateEnd }),
      },
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Certificacion presupuestarias"
      info={<BudgetCertificationSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <BudgetCertificationTable registers={registersData.results} />
    </ListBase>
  )
}

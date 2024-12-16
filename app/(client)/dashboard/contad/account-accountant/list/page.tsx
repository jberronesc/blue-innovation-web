import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import AccountAccountantConst from "../domain/constantClient"
import AccountAccountantSearch from "./components/Search"
import AccountAccountantTable from "./components/Table"
import { Pagination } from "@component/pagination"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = AccountAccountantConst

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchParams?.[constant.pQ.page.key]) || 1
  const query = searchParams?.[constant.pQ.query.key] || ""
  const nature = searchParams?.[constant.pQ.nature.key] || ""
  const type = searchParams?.[constant.pQ.type.key] || ""
  const typePertain = searchParams?.[constant.pQ.typePertain.key] || ""
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/contad/v1/account-accountants/list",
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
        ...(nature && { nature }),
        ...(type && { type }),
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
      title="Cuentas contables"
      info={<AccountAccountantSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <AccountAccountantTable registers={registersData.results} />
    </ListBase>
  )
}

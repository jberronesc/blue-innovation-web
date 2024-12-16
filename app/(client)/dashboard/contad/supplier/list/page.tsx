import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import { Pagination } from "@nextui-org/react"
import SupplierConstCli from "../domain/constantClient"
import SupplierSearch from "./components/search"
import SupplierTable from "./components/table"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const query = searchParams?.[SupplierConstCli.pQ.query] || ""
  const page = Number(searchParams?.[SupplierConstCli.pQ.page]) || 1
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
      url: "/v1/suppliers",
      shearhParams: shearhParams(),
    }).exec(),
  ])

  if (response.isLeft()) notFound()

  const responseJson = response.getRight().data

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Suppliers"
      info={<SupplierSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+responseJson.meta.itemCount}
          pageName={SupplierConstCli.pQ.page}
        />
      }
    >
      <SupplierTable registers={responseJson.data} />
    </ListBase>
  )
}
